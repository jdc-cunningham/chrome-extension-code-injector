const apiGetterUrl = "https://your-node-api.com/get-reddit-json-from-url";
let redditJsonUrl;

let curIndex = 0;
let arrOfStrs = [];
let cbpTarget = "Flex-sc-ap3nvf StyledMarketNavbar-sc-2ct72g gQufFe".split(' ').join('.'); // this may change in the future
let inputElemsRemoved = false;

const removeInputElems = () => {
  inputElemsRemoved = true;
  document.getElementById('submit-url-target').remove();
  document.getElementById('url-text-input-target').remove();
}

const parseRes = (res) => {
  const redditData = JSON.parse(res);
  if (Object.keys(redditData[1]).length) {
    arrOfStrs = redditData[1].data.children.map(child => {
      return child.data.body?.substring(0, 100)
    });

    if (!inputElemsRemoved) {
      removeInputElems();
    }

    insertDisp();
    cycleStrings();
  } else {
    alert('something broke'); // lol
  }
}

// plain JS get from MDN
const getAjax = (url, success) => {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();
  return xhr;
}

// this is the container that generally holds anything you add
// this is added once and not removed
const insertDisp = () => {
  document.querySelector(`.${cbpTarget}`).innerHTML +=
    `<div style="color: white;" id="custom-injector"></div>`;
}

const cycleStrings = () => {
  if (curIndex < arrOfStrs.length) {
    curIndex += 1;
  } else {
    curIndex = 0;
    console.log('fetched reddit again'); // for logs in CBP
    getAjax(`${apiGetterUrl}?url=${redditJsonUrl}`, parseRes); // start over
    return;
  }

  // you could add fading/sliding by CSS and what not but I don't have time for it, I'll add a fake loading
  document.getElementById('custom-injector').innerText = "";
  setTimeout(() => {
    document.getElementById('custom-injector').innerText = arrOfStrs[curIndex];

    setTimeout(() => {
      cycleStrings();
    }, 5000);
  }, 150);
}

// this is the text input and submit button
const insertUrlInput = () => {
  document.querySelector(`.${cbpTarget}`).innerHTML +=
    `
      <input style="border: 1px solid purple; color: black;" type="text"  id="url-text-input-target" placeholder="reddit thread url"/>
      <button style="background-color: white; color: black;" type="button" id="submit-url-target">Get posts</button>
    `;
  // bind events
  document.getElementById('submit-url-target').addEventListener('click', () => {
    // check not empty
    const urlInputElem = document.getElementById('url-text-input-target');
    if (urlInputElem.value.length) {
      redditJsonUrl = urlInputElem.value;
      getAjax(`${apiGetterUrl}?url=${redditJsonUrl}`, parseRes);
    }
  });
}

// first run insert the input and button
setTimeout(() => {
  console.log('>>> cbp');
  insertUrlInput();
}, 15000);
