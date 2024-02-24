'use strict';
{


// エリア
// const areas = [
//   '北海道・東北',
//   '関東',
//   '信越・北陸',
// ];
// 都道府県
// const prefectures = [
//   {category: '北海道・東北', name: '北海道'},
//   {category: '北海道・東北', name: '秋田県'},
//   {category: '関東', name: '東京都'},
//   {category: '関東', name: '神奈川県'},
//   {category: '信越・北陸', name: '長野県'},
//   {category: '信越・北陸', name: '石川県'},
// ];
// 市区町村
// const cities = [
//   {category: '北海道', name: '札幌市'},
//   {category: '秋田県', name: '秋田市'},
//   {category: '東京都', name: '板橋区'},
//   {category: '東京都', name: '豊島区'},
//   {category: '神奈川県', name: '横浜市'},
//   {category: '神奈川県', name: '川崎市'},
//   {category: '長野県', name: '松本市'},
//   {category: '石川県', name: '金沢市'},
// ];

// URL
// const urlArray = [
//   {category: '札幌市', url: '../../../index.html'},
//   {category: '秋田市', url: '../../../index.html'},
//   {category: '板橋区', url: '../c_tokyo.html'},
//   {category: '豊島区', url: '../../../index.html'},
//   {category: '横浜市', url: '../../../index.html'},
//   {category: '川崎市', url: '../../../index.html'},
//   {category: '松本市', url: '../../../index.html'},
//   {category: '金沢市', url: '../../../index.html'},
// ];

// セレクトボックスのHTML要素取得
const selectCategory1 = document.querySelector('.select-category-1');
const selectCategory2 = document.querySelector('.select-category-2');
const selectCategory3 = document.querySelector('.select-category-3');


// optionタグを全削除する関数（引数に指定されたノードをすべて削除する）
function optionClear(node) {
  const options = document.querySelectorAll(node);
  options.forEach((option) => {
    option.remove();
  });
}

// optionタグを作成する関数（「選択してください」というプルダウンの選択肢を作成する）
function firstOption(text) {
  // option内のテキストによって条件分岐
  if (text === 'prefectureText') {
    const first = document.createElement('option');
    first.textContent = '都道府県を選択';
    return first;
  } else if (text === 'cityText') {
    const first = document.createElement('option');
    first.textContent = '市区町村を選択';
    return first;
  }
  
}

// エリアのプルダウンを生成
areas.forEach((area) => {
  const option = document.createElement('option');
  option.textContent = area;

  selectCategory1.appendChild(option);
});

// ーーーエリアが選択されたら都道府県のプルダウンを生成ーーー
selectCategory1.addEventListener('input', () => {
  
  // 都道府県のプルダウンを「都道府県を選択」のみにし、選択（クリック）できるようにする
  optionClear('.select-category-2 > option');
  selectCategory2.appendChild(firstOption('prefectureText'));
  selectCategory2.disabled = false;

  // 市区町村のプルダウンを「市区町村を選択」のみにし、選択（クリック）できないようにする
  optionClear('.select-category-3 > option');
  selectCategory3.appendChild(firstOption('cityText'));
  selectCategory3.disabled = true;

  // エリアが選択されていない（「エリアを選択」になっている）とき、都道府県を選択（クリック）できないようにする
  if (selectCategory1.value === 'エリアを選択') {
    selectCategory2.disabled = true;
    return;
  }

  // エリアで選択されたカテゴリーと同じ都道府県のみを、プルダウンの選択肢に設定する
  prefectures.forEach((prefecture) => {
    if (selectCategory1.value === prefecture.category) {
      const option = document.createElement('option');
      option.textContent = prefecture.name;

      selectCategory2.appendChild(option);
    }
  });
});

// ーーー都道府県が選択されたら市区町村のプルダウンを生成ーーー
selectCategory2.addEventListener('input', () => {
  
  // 市区町村のプルダウンを「市区町村を選択」のみにし、選択（クリック）できるようにする
  optionClear('.select-category-3 > option');
  selectCategory3.appendChild(firstOption('cityText'));
  selectCategory3.disabled = false;

  // 都道府県が選択されていない（「都道府県を選択」になっている）とき、市区町村を選択（クリック）できないようにする
  if (selectCategory2.value === '都道府県を選択') {
    selectCategory3.disabled = true;
    return;
  }

  // 都道府県で選択されたカテゴリーと同じ市区町村のみを、プルダウンの選択肢に設定する
  cities.forEach((city) => {
    if (selectCategory2.value === city.category) {
      const option = document.createElement('option');
      option.textContent = city.name;

      selectCategory3.appendChild(option);
    }
  });

});

// 市区町村を選択したら該当ページへ遷移
selectCategory3.addEventListener('input', () => {
  urlArray.forEach((urlItem) => {
    if (selectCategory3.value === urlItem.category) {
      location.href = urlItem.url;
    }
    
  })
  
})














}