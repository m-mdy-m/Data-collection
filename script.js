const fetch = require("node-fetch");
const jsdom = require("jsdom");
const twilio = require("twilio");
const api = new twilio('AC5f14e05e71aa7c8e6adde243ec64d203','53fbbac013a3710cf43112122dea0307')
async function fetchHTML(url) {
  try {
    const response = await fetch(url);

    const txt = await response.text();

    const page = new jsdom.JSDOM(txt);
    return page;
  } catch (e) {
    return false;
  }
}

function getPrice(page) {
  let getPrice = page.window.document.querySelector(".coinPrice");
  let price = getPrice.textContent;
  const priceNumber = Number(price.replace(/[^0-9.-]+/g, ""));

  return priceNumber;
}
function checkPrice(price, value) {
  if (price > value) {
    console.log(`the price is over $${value}`);
  } else {
    console.log(`the price is Not over $${value}`);
  }
}

function sendMessage(){
    
}

const cryptoObj = {
  bitcoin: 40400,
  ethereum: 20,
  tether: 2,
};
for (const cryptoName in cryptoObj) {
  let URL = `https://arzdigital.com/coins/${cryptoName}`;
  fetchHTML(URL).then((page) => {
    const price = getPrice(page);
    console.log(`the current price of ${cryptoName} is $${price}`);
    checkPrice(price, cryptoObj[cryptoName]);
  });
}
