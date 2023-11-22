const jsdom = require("jsdom");
const fetch = require("node-fetch");
async function fetchHTML(url) {
  try {
    const response = await fetch(url);

    const txt = await response.text();

    const page = new jsdom.JSDOM(txt);
    return page
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
  });
}
