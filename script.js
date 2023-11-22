async function fetchHTML(url) {
  try {
    const response = await fetch(url);

    const txt = await response.text();

    const page = new DOMParser().parseFromString(txt, "text/html");
    return page;
  } catch (e) {
    return false;
  }
}

function getPrice(page) {
  let getPrice = page.querySelector(".coinPrice");
  let price = getPrice.innerHTML;
  return price;
}
function checkPrice(price) {
  if (price > 40000) {
    console.log("the price is over $40,000");
  } else {
    console.log("the price is Not over $40,000");
  }
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
    console.log(`the current price is ${price}`);
    checkPrice(price);
  });
}
