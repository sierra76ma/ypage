// 大分類、小分類、商品名の選択肢を配列でそれぞれ用意
const categories = [
  'エコグッズ',
  '衛生グッズ',
  '防災グッズ'
];

// 小分類と商品名は、それぞれ一つ前の選択肢と紐付けるためにオブジェクト型を使う
const subCategories = [
  {category: 'エコグッズ', name: '天然素材'},
  {category: 'エコグッズ', name: 'リサイクル素材'},
  {category: '衛生グッズ', name: 'マスク'},
  {category: '衛生グッズ', name: '除菌'},
  {category: '防災グッズ', name: 'セット物'},
  {category: '防災グッズ', name: 'ライト'}
];

const products = [
  {subCategory: '天然素材', name: 'バンブーマグカップ'},
  {subCategory: '天然素材', name: 'リユースコーヒータンブラー'},
  {subCategory: 'リサイクル素材', name: 'リサイクルコットンバッグ'},
  {subCategory: 'リサイクル素材', name: '再生PETブランケット'},
  {subCategory: 'マスク', name: '不織布マスク'},
  {subCategory: 'マスク', name: 'ウレタンマスク'},
  {subCategory: '除菌', name: '除菌スプレー'},
  {subCategory: '除菌', name: '除菌ウェットティッシュ'},
  {subCategory: 'セット物', name: '防災10点セット'},
  {subCategory: 'セット物', name: '防災20点セット'},
  {subCategory: 'ライト', name: 'LED電灯'},
  {subCategory: 'ライト', name: 'ランタン'}
];

// 「選択してください」というプルダウンの選択肢を作成する関数
function firstOption() {
  const first = document.createElement('option');
  first.textContent = '選択してください';

  return first;
}

// 引数に指定されたノードをすべて削除する関数
function optionClear(node) {
  const options = document.querySelectorAll(node);
  options.forEach(option => {
    option.remove();
  });
}

const categorySelect3 = document.getElementById('category-select-3');
const subCategorySelect3 = document.getElementById('sub-category-select-3');
const productSelect = document.getElementById('product-select');

// 大分類のプルダウンを生成
categories.forEach(category => {
  const option = document.createElement('option');
  option.textContent = category;

  categorySelect3.appendChild(option);    
});

// 大分類が選択されたら小分類のプルダウンを生成
categorySelect3.addEventListener('input', () => {

  // 小分類のプルダウンを「選択してください」のみにし、選択（クリック）できるようにする
  optionClear('#sub-category-select-3 > option');
  subCategorySelect3.appendChild(firstOption());
  subCategorySelect3.disabled = false;

  // 商品のプルダウンを「選択してください」のみにし、選択（クリック）できないようにする
  optionClear('#product-select > option');
  productSelect.appendChild(firstOption());
  productSelect.disabled = true;

  // 大分類が選択されていない（「選択してください」になっている）とき、小分類を選択（クリック）できないようにする
  if (categorySelect3.value == '選択してください') {
    subCategorySelect3.disabled = true;
    return;
  }

  // 大分類で選択されたカテゴリーと同じ小分類のみを、プルダウンの選択肢に設定する
  subCategories.forEach(subCategory => {
    if (categorySelect3.value == subCategory.category) {
      const option = document.createElement('option');
      option.textContent = subCategory.name;
      
      subCategorySelect3.appendChild(option);
    }
  });
});

// 小分類が選択されたら商品のプルダウンを生成
subCategorySelect3.addEventListener('input', () => {
  
  // 商品のプルダウンを「選択してください」のみにし、選択（クリック）できるようにする
  optionClear('#product-select > option');
  productSelect.appendChild(firstOption());
  productSelect.disabled = false;
  
  // 小分類が選択されていない（「選択してください」になっている）とき、商品を選択（クリック）できないようにする
  if (subCategorySelect3.value == '選択してください') {
    productSelect.disabled = true;
    return;
  }
  
  // 小分類で選択されたカテゴリーと同じ商品のみを、プルダウンの選択肢に設定する
  products.forEach(product => {
    if (subCategorySelect3.value == product.subCategory) {
      const option = document.createElement('option');
      option.textContent = product.name;
  
      productSelect.appendChild(option);
    }
  });
});