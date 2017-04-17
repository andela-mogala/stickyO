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
    addStickyToDOM(stickiesArray[key]);
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

function addStickyToDOM(value) {
  let stickies = document.querySelector("#stickies");
  let sticky = document.createElement("li");
  let span = document.createElement("span");
  span.setAttribute("class", "sticky");
  span.innerHTML = value;
  sticky.appendChild(span);
  stickies.appendChild(sticky);
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

  addStickyToDOM(value);
  document.querySelector("#note_text").value = "";
 }