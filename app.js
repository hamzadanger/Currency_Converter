const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
let MOD_URL;
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector("form .msg");

dropdowns.forEach((select) => {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
});
const updateFlag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  } else {
    const fromCurr = document.querySelector(".from select");
    const toCurr = document.querySelector(".to select");

    const fromCurrVal = fromCurr.value.toLowerCase();
    const toCurrVal = toCurr.value.toLowerCase();

    MOD_URL = `${BASE_URL}${fromCurrVal}.json`;
    let rate = fetchData(MOD_URL, fromCurrVal, toCurrVal);
    console.log(rate);
    rate.then((data) => {
      let total = (amtval * data).toFixed(2);
      msg.innerText = `${amtval} ${fromCurrVal.toUpperCase()} = ${total} ${toCurrVal.toUpperCase()}`;
    });
    rate.catch((err) => {
      msg.innerText = err;
    });
  }
});
const fetchData = async (MOD_URL, fromCurrVal, toCurrVal) => {
  let response = await fetch(MOD_URL);
  let data = await response.json();
  let rate = data[fromCurrVal][toCurrVal];
  return rate;
};
