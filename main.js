/* =========================================================
   写真の切り替え（トップ：6秒ごと、スイーツ・ワイン：5秒ごと）
   写真が1枚なら何もしない
   ========================================================= */

// トップのスマホ用の写真（-sp.jpg）がまだなければ、パソコン用の写真を使う
document.querySelectorAll("#hero-slides source").forEach((source) => {
  const test = new Image();
  test.onerror = () => source.remove();
  test.src = source.srcset;
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function startSlideshow(container, interval) {
  const slides = container.querySelectorAll("img");
  if (slides.length < 2 || reduceMotion) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
  }, interval);
}

startSlideshow(document.getElementById("hero-slides"), 6000);
document.querySelectorAll(".pair-slides").forEach((el) => startSlideshow(el, 5000));


/* =========================================================
   上のバー：トップの写真を通り過ぎたら濃い色にする
   ========================================================= */

const header = document.querySelector(".header");
const hero = document.querySelector(".hero");

function updateHeader() {
  const passedHero = window.scrollY > hero.offsetHeight - header.offsetHeight;
  header.classList.toggle("is-scrolled", passedHero);
}
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("load", updateHeader);  // ページ内リンクから開いたときのため
updateHeader();


/* =========================================================
   スクロールすると、ふわっと浮かび上がる
   並んでいるものは、少しずつ時間をずらして順番に出す
   ========================================================= */

const REVEAL_TARGETS = [
  ".two-col > *",
  ".pairing-head",
  ".pair",
  ".parfait .container > :not(.parfait-grid)",
  ".parfait-card",
  ".ig-band > *",
];

if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(REVEAL_TARGETS.join(","));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
      // 表示し終わったら時間差を消す（ボタンの色の変化などが遅れないように）
      setTimeout(() => { entry.target.style.transitionDelay = ""; }, 2000);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  targets.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.matches(REVEAL_TARGETS.join(",")));
    const order = Math.min(siblings.indexOf(el), 4);
    el.style.transitionDelay = `${order * 0.15}s`;
    el.classList.add("reveal");
    observer.observe(el);
  });
}
