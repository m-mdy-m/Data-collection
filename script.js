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

function getPrice() {
  let getPrice = document.querySelector(".coinPrice");
  let price = getPrice.innerHTML;
  return price;
}
getPrice();
