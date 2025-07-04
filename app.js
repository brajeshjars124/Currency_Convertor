const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const dropdowns =document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const change = document.querySelector("i");

for(let select of dropdowns){
  for(let currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";

    }
    else if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
     updateFlag(evt.target);
    }
  );
}

updateFlag =(element)=>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  console.log(currCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


btn.addEventListener("click", async (evt)=>{
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  console.log(amtVal);
  if(amtVal < 1){
    amtVal = 1;
    amount.value = 1;
  }

  a = fromCurr.value.toLowerCase();
  b = toCurr.value.toLowerCase();
  console.log(fromCurr.value, toCurr.value);
  const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
  console.log(URL);
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();
  console.log(data);
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  console.log(rate);
  let finalAmount = rate * amtVal;
  console.log(finalAmount);

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});




