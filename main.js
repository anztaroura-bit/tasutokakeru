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
   季節のフレーバー図鑑を表示するしくみ
   flavors.js のデータから、季節のボタンとフレーバーのカードを作る
   ========================================================= */

const SEASONS = [
  { key: "spring",  label: "春",   en: "Spring" },
  { key: "summer",  label: "夏",   en: "Summer" },
  { key: "autumn",  label: "秋",   en: "Autumn" },
  { key: "winter",  label: "冬",   en: "Winter" },
  { key: "classic", label: "定番", en: "Classic" },
];

const tabs = document.getElementById("season-tabs");
const grid = document.getElementById("flavor-grid");

// 今日の月から、今の季節を決める（最初に開く季節）
function currentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

// フレーバー1つ分のカードを作る（index は順番に現れるための番号）
function makeCard(flavor, index) {
  const card = document.createElement("figure");
  card.className = "flavor " + flavor.season;
  card.style.setProperty("--i", index);

  const photo = document.createElement("div");
  photo.className = "flavor-photo";
  if (flavor.photo) {
    const img = document.createElement("img");
    img.src = "images/flavors/" + flavor.photo;
    img.alt = flavor.name;
    img.loading = "lazy";
    img.onerror = () => img.remove();  // 写真がまだなければ、季節の色の四角を見せる
    photo.appendChild(img);
  }

  const caption = document.createElement("figcaption");
  const name = document.createElement("span");
  name.className = "flavor-name";
  name.textContent = flavor.name;
  caption.appendChild(name);
  if (flavor.note) {
    const note = document.createElement("small");
    note.textContent = flavor.note;
    caption.appendChild(note);
  }

  card.append(photo, caption);
  return card;
}

// 選んだ季節のフレーバーだけを並べる
function showSeason(key) {
  tabs.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-selected", button.dataset.season === key);
  });
  grid.replaceChildren(...FLAVORS.filter((f) => f.season === key).map(makeCard));
}

// 季節のボタンを作る（フレーバーが1つもない季節は出さない）
const usedSeasons = SEASONS.filter((s) => FLAVORS.some((f) => f.season === s.key));
usedSeasons.forEach((season) => {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("role", "tab");
  button.dataset.season = season.key;
  button.innerHTML = `${season.label}<span>${season.en}</span>`;
  button.addEventListener("click", () => showSeason(season.key));
  tabs.appendChild(button);
});

const first = usedSeasons.some((s) => s.key === currentSeason()) ? currentSeason() : usedSeasons[0].key;
showSeason(first);


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
  ".flavors .container > *",
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
