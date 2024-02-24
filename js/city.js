
const clinicLists = c_list;
// [
//   {'id': 1, 'name': '成増医院', 'address': '東京', 'tel': '03', 'station': ['成増駅',], 'subject': ['内科', '精神科', '歯科',],},
// ];

//クリニック結果ボックスの生成関数
function resultCreate(per, i) {
  const resultLi = document.createElement('li');
  //クリニック名パーツ
  resultLi.classList.add('clinic-result-item');
  const divTtl = document.createElement('div');
  divTtl.classList.add('clinic-result-item-ttl');
  const h2 = document.createElement('h2');
  h2.classList.add('clinic-name');
  h2.textContent = clinicListSlice[per][i].name;
  //クリニックdetailパーツ
  const divDetail = document.createElement('div');
  divDetail.classList.add('clinic-detail');
  const ul = document.createElement('ul');
  ul.classList.add('clinic-detail-list');
  const addressDetailLi = document.createElement('li');
  addressDetailLi.classList.add('clinic-detail-item');
  const telDetailLi = document.createElement('li');
  telDetailLi.classList.add('clinic-detail-item');
  const stationDetailLi = document.createElement('li');
  stationDetailLi.classList.add('clinic-detail-item');
  const subjectDetailLi = document.createElement('li');
  subjectDetailLi.classList.add('clinic-detail-item');
  const addressImg = document.createElement('img');
  addressImg.src = '../../../images/location-icon.png';
  const telImg = document.createElement('img');
  telImg.src = '../../../images/phone-icon.png';
  const stationImg = document.createElement('img');
  stationImg.src = '../../../images/railway-icon.png';
  const subjectImg = document.createElement('img');
  subjectImg.src = '../../../images/stethoscope-icon2.png';
  const addressSpan = document.createElement('span');
  addressSpan.textContent = clinicListSlice[per][i].address;
  const telSpan = document.createElement('span');
  telSpan.textContent = clinicListSlice[per][i].tel;
  
  //配置
  const resultUl = document.querySelector('.clinic-result-list');
  resultUl.appendChild(resultLi);
  resultLi.appendChild(divTtl);
  divTtl.appendChild(h2);

  resultLi.appendChild(divDetail);
  divDetail.appendChild(ul);
  ul.appendChild(addressDetailLi);
  addressDetailLi.appendChild(addressImg);
  addressDetailLi.appendChild(addressSpan);
  ul.appendChild(telDetailLi);
  telDetailLi.appendChild(telImg);
  telDetailLi.appendChild(telSpan);
  ul.appendChild(stationDetailLi);
  stationDetailLi.appendChild(stationImg);
  ul.appendChild(subjectDetailLi);
  subjectDetailLi.appendChild(subjectImg);
  //clinicListのオブジェクトの値が複数の場合は生成と配置を一括で行う
  const stationArray = clinicListSlice[per][i].station;
  for (let i = 0; i < stationArray.length; i++) {
    const stationSpan = document.createElement('span');
    stationSpan.textContent = stationArray[i];
    stationDetailLi.appendChild(stationSpan);
  }
  const subjectArray = clinicListSlice[per][i].subject;
  for (let i = 0; i < subjectArray.length; i++) {
    const subjectSpan = document.createElement('span');
    subjectSpan.textContent = subjectArray[i];
    subjectDetailLi.appendChild(subjectSpan);
  }
}

//subjectクリックした時にページ更新して値(科目)を受け取る
const urlParams = new URLSearchParams(window.location.search);
const subjectValue = urlParams.get('value');
console.log('受け取った値:', subjectValue);

//クリックした診療科目が入ったオブジェクトで新規配列作成
let clinicListSub = clinicLists.filter((obj) => {
  return obj.subject.includes(subjectValue);
})
console.log(clinicListSub);
//該当診療科目のクリニックがない場合
if (clinicListSub.length === 0) {
  clinicListSub.push({'id': 1, 'name': '準備中', 'address': '準備中', 'tel': '準備中', 'station': ['準備中',], 'subject': ['準備中',],},);
}
console.log(clinicListSub);


//診療科目をクリックしたかチェックする関数
let clinicList;
function listCheck() {
  clinicList = subjectValue === null ? clinicLists : clinicListSub;
}
listCheck();
console.log(clinicList);

//ページ設定
const clinicTotal = clinicList.length;  //クリニックリストの総数
const perPage = 10; //1ページの表示件数
const initialPage = 1; //最初のページ番号
//現在のページ番号の抽出、currentPageへ代入
const pathArray = location.pathname.split('/');
const pathCityName = (pathArray[pathArray.length - 1].replace(/\d/g, '')).split('_')[1]; //市区町村名を抽出
const pathNum = parseInt(pathArray[pathArray.length - 1].replace(/[^0-9]/g, ''));
let currentPage = pathNum; //現在のページ番号
//ページ数のカウント定数
const pageCount = Math.ceil(clinicTotal / perPage); //小数点切り上げ

//clinicLists,clinicListSubの配列分割関数
const clinicListSlice = new Array(pageCount).fill().map((_, i) => clinicList.slice(i * perPage, (i + 1) * perPage));
console.log(clinicListSlice);

//クリニック結果ボックス生成の関数実行
function resultCreateAction() {
  const per = currentPage - 1;
  console.log(per);
  const sliceLength = clinicListSlice[per].length
  for (let i = 0; i < sliceLength; i++) {
    resultCreate(per, i);
  }
}
resultCreateAction();

//------診療科目クリック関数------
function subjectTextGet() {
  let subjectText;
  const subjectBtnList = document.querySelectorAll('.subject-box-item');
  subjectBtnList.forEach((btnItem) => {
    if (btnItem.children.item(0).textContent === subjectValue) {
      btnItem.classList.add('current');
    } else {
      btnItem.classList.remove('current');
    }
    btnItem.addEventListener('click', () => {
      subjectText = btnItem.children.item(0).textContent;
        window.location.href = `c_${pathCityName}_1.html?value=${subjectText}`;
    });
  });
}
subjectTextGet();

// ------ページネーション------
const prev = document.querySelector('#pagination-prev')
const next = document.querySelector('#pagination-next')

// 表示件数のレンダリング関数
function renderCount() {
  const pageCount = document.querySelector('#pagination-count');
  pageCount.textContent = `${clinicTotal}件中${((currentPage - 1) * perPage) + 1}〜${currentPage * perPage}件を表示`
}
renderCount();

//ページ番号ボタン追加
function pageBtn() {
  for (let i = 0; i < pageCount; i++) {
    const li = document.createElement('li');
    li.classList.add('pagination-number');
    const a = document.createElement('a');
    let aHref = subjectValue === null ? `c_${pathCityName}_${initialPage + i}.html` : `c_${pathCityName}_${initialPage + i}.html?value=${subjectValue}`;
    a.href = aHref;
    a.textContent = initialPage + i;

    li.appendChild(a);

    next.before(li);
  }
}
pageBtn();

//nextボタンのイベントリスナー
next.addEventListener('click', (e) => {
  if (currentPage >= pageCount) {
    e.preventDefault();
    currentPage = pageCount;
    return;
  } else {
    window.location.href = subjectValue === null ? `c_itabashi_${currentPage + 1}.html` : `c_${pathCityName}_${currentPage + 1}.html?value=${subjectValue}`;
    currentPage++;
    renderCount();
    isDisabled();
    isCurrent();
  }

});

//prevボタンのイベントリスナー
prev.addEventListener('click', (e) => {
  if (currentPage <= 1) {
    e.preventDefault();
    currentPage = 1;
    return;
  } else {
    window.location.href = subjectValue === null ? `c_itabashi_${currentPage - 1}.html` : `c_${pathCityName}_${currentPage - 1}.html?value=${subjectValue}`;
    currentPage--;
    renderCount();
    isDisabled();
    isCurrent();
  }
});

//is-disabledクラスの付与関数
function isDisabled() {
  if (currentPage >= pageCount) {
    next.classList.add('is-disabled');
  }
  if (currentPage <= 1) {
    prev.classList.add('is-disabled');
  }
}
isDisabled();

//is-currentクラスの付与関数
function isCurrent() {
  const pageNum = document.querySelectorAll('.pagination-number');
  pageNum.forEach((num) => {
    const numText = num.children.item(0).textContent;
    if (Number(numText) === currentPage) {
      num.classList.add('is-current');
    } else {
      num.classList.remove('is-current');
    }
  });
}
isCurrent();


























