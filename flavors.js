/* =========================================================
   季節のフレーバー図鑑のデータ
   1行 = 1つのフレーバー。追加するときは1行足すだけ。

   season : spring（春） summer（夏） autumn（秋） winter（冬） classic（定番）
   name   : フレーバー名
   note   : ひとこと説明（なければ "" のまま）
   photo  : images/flavors/ に入れた写真のファイル名
            写真がまだないときは、季節の色の四角が代わりに表示される
   ========================================================= */

const FLAVORS = [
  // 春
  { season: "spring",  name: "イチゴ",               note: "",                                   photo: "ichigo.jpg" },
  { season: "spring",  name: "フキノトウ",           note: "ほろ苦い、春の香り",                 photo: "fukinotou.jpg" },

  // 夏
  { season: "summer",  name: "ブルーベリー",         note: "",                                   photo: "blueberry.jpg" },
  { season: "summer",  name: "実山椒",               note: "さわやかな、ぴりっとした刺激",       photo: "misansho.jpg" },
  { season: "summer",  name: "トマト＆ミルク",       note: "ピンクと白のマーブル",               photo: "tomato-milk.jpg" },

  // 秋
  { season: "autumn",  name: "りんごのタルト",       note: "りんごのコンフィチュールとクッキー生地", photo: "ringo-tart.jpg" },
  { season: "autumn",  name: "いちじくとバルサミコ", note: "ハニーバルサミコで深みを",           photo: "ichijiku-balsamic.jpg" },
  { season: "autumn",  name: "大山ほうじ茶",         note: "悠二農園さんの生姜ソースを添えて",   photo: "daisen-houjicha.jpg" },

  // 冬
  { season: "winter",  name: "ユズ",                 note: "",                                   photo: "yuzu.jpg" },
  { season: "winter",  name: "大根",                 note: "",                                   photo: "daikon.jpg" },
  { season: "winter",  name: "あずき 藻塩 ミルク",   note: "北海道あずきに、ほんのりお塩",       photo: "azuki-moshio-milk.jpg" },

  // 定番
  { season: "classic", name: "カスタードプディング", note: "卵のこくと、バニラビーンズの香り",   photo: "custard-pudding.jpg" },
  { season: "classic", name: "濃いベリー",           note: "",                                   photo: "koi-berry.jpg" },
  { season: "classic", name: "カカオ75",             note: "",                                   photo: "cacao75.jpg" },
  { season: "classic", name: "イナサ醤油",           note: "鳥取・山崎醸造本舗のお醤油で",       photo: "inasa-shoyu.jpg" },
];
