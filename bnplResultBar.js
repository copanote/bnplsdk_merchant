const bnplResultBar = (btnMsg) => {
  const eligibilityFaillTitleMsg = '<strong>이용 가능</strong>';
  const eligibilitySuccessTitleMsg = '<strong class="ty">이용 불가</strong>';

  const eligibilityFaillBodyMsg = '결제계좌 등록 및 <br />동의 절차를 진행해주셔야  <br />최종적으로 결제가 완료됩니다';
  const eligibilitySuccessBodyMsg = '고객님, 죄송합니다. <br />서비스  이용이 불가해 <br />다른  결제수단을 이용해 주세요';

  const mkPageConfirmDiv = (btnMsg) => {
    let btnBtnT1 = document.createElement('button');
    btnBtnT1.type = 'Button';
    btnBtnT1.className = 'btn-t1';

    let pageConfirmDiv = document.createElement('div');
    pageConfirmDiv.className = 'page-confirm';
    pageConfirmDiv.appendChild(btnBtnT1);
  };
};

const makeRusultDiv = () => {
  var lpopHeaderHeader = document.createElement('header');
  lpopHeaderHeader.className = 'lpop-cont';
  lpopHeaderHeader.innerHTML = '김정현님 <br />심사가 완료되었어요!';

  var lpopContDiv = document.createElement('div');
  lpopContDiv.className = 'pop-cont';

  var txt1P = document.createElement('p');
  txt1P.className = 'txt1';
  var txt2P = document.createElement('p');
  txt2P.className = 'txt2';

  var btnBtnT1 = document.createElement('button');
  btnBtnT1.onclick = 'bcfn.CloseSelect();';
  btnBtnT1.type = 'Button';
  btnBtnT1.className = 'btn-t1';

  var pageConfirmDiv = document.createElement('div');
  pageConfirmDiv.className = 'page-confirm';
  pageConfirmDiv.appendChild(btnBtnT1);

  lpopContDiv.appendChild(txt1P);
  lpopContDiv.appendChild(txt2P);
  lpopContDiv.appendChild(pageConfirmDiv);

  var selectLPopSection = document.createElement('section');
  selectLPopSection.className = 'select-lpop';

  selectLPopSection.appendChild(lpopHeaderHeader);
  selectLPopSection.appendChild(lpopContDiv);

  var lPopInnerdiv = document.createElement('div');
  selectLPopSection.className = 'lpop-inner';
  lPopInnerdiv.appendChild(selectLPopSection);

  var selectLpopWrap = document.createElement('div');
  selectLPopSection.className = 'select-lpop-wrap resualt-msg';

  selectLpopWrap.appendChild(lPopInnerdiv);

  return selectLpopWrap;
};

makeRusultDiv();

// <div class="select-lpop-wrap resualt-msg">
//     <div class="lpop-inner">
//         <section class="select-lpop">
//             <header class="lpop-header">
//                 김정현님 <br />심사가 완료되었어요!
//             </header>
//             <div class="lpop-cont">
//                 <p class="txt1">"<strong class="ty">이용 불가</strong>"</p>
//                 <p class="txt2">고객님, 죄송합니다. <br />서비스  이용이 불가해 <br />다른  결제수단을 이용해 주세요</p>
//                 <div class="page-confirm">
//                     <button class="btn-t1" type="button" onclick="bcfn.CloseSelect();">결제창으로 돌아가기</button>
//                 </div>
//             </div>
//         </section>
//     </div>
// </div>

// <div id="bnplEilResultDiv" class="select-lpop-wrap resualt-msg">
//     <div class="lpop-inner">
//         <section class="select-lpop">
//             <header id="bnplEilResultHeader" class="lpop-header">

//             </header>
//             <div class="lpop-cont">
//                 <p class="txt1" id="bnplEilResultTitle"></p>
//                 <p class="txt2" id="bnplEilResultBody" ></p>
//                 <div class="page-confirm">
//                     <button class="btn-t1" type="button" onclick="bcfn.CloseSelect();">결제계좌 등록하기</button>
//                 </div>
//             </div>
//         </section>
//     </div>
// </div>

//     <div id="bnplEilResultDiv" class="select-lpop-wrap resualt-msg">
//     <div class="lpop-inner">
//         <section class="select-lpop">
//             <header id="bnplEilResultHeader" class="lpop-header">
//                 김정현님 <br />심사가 완료되었어요!
//             </header>
//             <div class="lpop-cont">
//                 <p class="txt1" id="bnplEilResultTitle">"<strong>이용 가능</strong>"</p>
//                 <p class="txt2" id="bnplEilResultBody" >결제계좌 등록 및 <br />동의 절차를 진행해주셔야  <br />최종적으로 결제가 완료됩니다.</p>
//                 <div class="page-confirm">
//                     <button class="btn-t1" type="button" onclick="bcfn.CloseSelect();">결제계좌 등록하기</button>
//                 </div>
//             </div>
//         </section>
//     </div>
// </div>
