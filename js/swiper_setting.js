

const swiper = new Swiper(".swiper", {
  loop: true, // ループ
  effect: 'fade', // フェード
  fadeEffect: {  //activeのみ表示させる
    crossFade: true
  },
  autoplay: { // 自動再生
    delay: 3500, // 1秒後に次のスライド（初期値：3000）
    disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
  },
  // 前後の矢印
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // ページネーション
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // クリック有効化
  },
  threshold: 10,

});
