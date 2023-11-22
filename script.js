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
  const priceNumber = Number(price.replace(/[^0-9.-]+/g,""));
  return priceNumber;
}
function checkPrice(price, value) {
  if (price > value) {
    console.log(`the price is over $${value}`);
  } else {
    console.log(`the price is Not over $${value}`);
  }
}

const cryptoObj = {
  "bitcoin": 40400,
  "ethereum": 20,
  "tether": 2,
};
for (const cryptoName in cryptoObj) {
  let URL = `https://arzdigital.com/coins/${cryptoName}`;
  fetchHTML(URL).then((page) => {
    const price = getPrice(page);
    console.log(`the current price of ${cryptoName} is $${price}`);
    checkPrice(price,cryptoObj[cryptoName]);
  });
}
