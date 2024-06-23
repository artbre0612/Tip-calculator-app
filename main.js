// 金額輸入欄位
const bill = document.querySelector("#bill");
//人數輸入欄位
const people = document.querySelector("#people");
//客製化小費
const customTip = document.querySelector(".customTip");
//小費輸入欄位
const inputBtn = document.querySelectorAll('input[type="button"]');
//小費/人數 顯示欄位
const tipPerPerson = document.querySelector(".tipPerPerson");
//總金額/人數 顯示欄位
const totalPerPerson = document.querySelector(".totalPerPerson");
//輸入警告
const peopleAlert = document.querySelector(".people-input span");
const tipsAlert = document.querySelector(".tips span");
const billAlert = document.querySelector(".billAlert");
//Reset button
const resetBtn = document.querySelector(".resetBtn");

//小費趴數
let tip;

//除人數後的小費
function getEvenTip() {
  if (!tip) return;
  let tipAmount = Math.round((Number(bill.value) * tip) / Number(people.value));
  tipPerPerson.innerText = `$ ${tipAmount}`;
}

//除人數後的總金額
function getEvenTotal() {
  if (!tip) return;
  let total = Math.round(
    (Number(bill.value) + Number(bill.value) * tip) / Number(people.value)
  );
  totalPerPerson.innerText = `$ ${total}`;
}

//移除按鈕的active狀態
function removeActive() {
  inputBtn.forEach((input) => {
    if (input.classList.contains("active")) {
      input.classList.remove("active");
    }
  });
}

//按按鈕後把tip的value放進變數中
//並判斷金額與人數欄位是否有值，有的話就再次運算
inputBtn.forEach((input) => {
  input.addEventListener("click", () => {
    tip = Number(input.value.replace("%", "")) / 100;
    tipsAlert.style.display = "none";
    removeActive();
    if (bill.value && people.value != 0) {
      getEvenTip();
      getEvenTotal();
    }
    input.classList.add("active");
  });
});

//輸入人數後觸發計算函式
people.addEventListener("input", () => {
  peopleValidation();
  if (people.value == 0) {
    return;
  } else {
    getEvenTip();
    getEvenTotal();
  }
});

//綁定驗證
//並判斷小費與人數欄位是否有值，有的話就再次運算
bill.addEventListener("input", () => {
  billValidation();
  if (tip && people.value) {
    getEvenTip();
    getEvenTotal();
  }
});

//客製化小費
customTip.addEventListener("click", () => {
  let currentValue = customTip.value;
  if (typeof currentValue === "string") {
    customTip.value = "";
  }
  customTip.type = "number";
});

//客製化小費按鈕邏輯
customTip.addEventListener("input", () => {
  tip = customTip.value / 100;
  if (bill.value && people.value) {
    getEvenTip();
    getEvenTotal();
  }
});

//表單驗證
function billValidation() {
  //金額輸入框驗證
  if (bill.value > 0) {
    bill.style.border = "2px solid #449393";
    billAlert.style.display = "none";
  } else if (bill.value == 0) {
    bill.style.outline = "0";
    bill.style.border = "2px solid #fa5252";
    billAlert.style.display = "block";
    return;
  } else {
    bill.style.border = "0";
  }
}

function peopleValidation() {
  //人數輸入框驗證
  if (people.value == 0) {
    people.style.border = "2px solid #fa5252";
    people.style.outline = "0";
    peopleAlert.style.display = "block";
    return;
  } else {
    people.style.border = "0";
    peopleAlert.style.display = "none";
  }
}

//reset按鈕
resetBtn.addEventListener("click", () => {
  bill.value = "";
  people.value = "";
  customTip.value = "";
  removeActive();
  bill.focus();
  reset();
});

function reset() {
  tip = 0;
  tipPerPerson.innerText = "$0";
  totalPerPerson.innerText = "$0";
  customTip.type = "button";
  customTip.value = "Custom";
}
