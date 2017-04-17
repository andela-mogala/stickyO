window.onload = () => {
  const button = document.querySelector("#add_button");
  button.onclick = createSticky;

  document
    .querySelector("#clear_button")
    .onclick = () => {
      localStorage.clear();
    }

  let stickiesArray = getStickiesArray();

  for (let key in stickiesArray) {
    addStickyToDOM(key, stickiesArray[key]);
  }
}

function getStickiesArray() {
  let stickiesArray = localStorage.getItem("stickiesArray");
  if (!stickiesArray) {
    stickiesArray = [];
    localStorage.setItem("stickesArray", JSON.stringify(stickiesArray));
  } else {
      stickiesArray = JSON.parse(stickiesArray);
  }
  return stickiesArray;
}

function addStickyToDOM(key, value) {
  let stickies = document.querySelector("#stickies");
  let sticky = document.createElement("li");
  sticky.setAttribute("id", key);
  let span = document.createElement("span");
  span.setAttribute("class", "sticky");
  span.innerHTML = value;
  sticky.appendChild(span);
  stickies.appendChild(sticky);
  sticky.onclick = deleteSticky;
}

 function createSticky(event) {
  event.preventDefault();

  let stickiesArray = getStickiesArray();
  let value = document.querySelector("#note_text").value;

  if (value) {
    stickiesArray.push(value);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
  } else {
    return alert("You can't store empty notes");
  }

  addStickyToDOM(stickiesArray.length - 1, value);
  document.querySelector("#note_text").value = "";
 }

 function deleteSticky(event) {
  let key = event.target.id;
  if (event.target.tagName.toLowerCase() === "span") {
    key = event.target.parentNode.id;
  }

  const stickiesArray = getStickiesArray();
  for (let arrKey in stickiesArray) {
    if (key === arrKey) {
      stickiesArray.splice(arrKey, 1);
      localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    }
  }
  removeStickyFromDOM(key);
 }

 function removeStickyFromDOM(key) {
  let sticky = document.getElementById(key);
  sticky.parentNode.removeChild(sticky);
 }