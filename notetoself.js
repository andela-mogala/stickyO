window.onload = () => {
  const button = document.querySelector("#add_button");
  button.onclick = createSticky;

  document
    .querySelector("#clear_button")
    .onclick = () => {
      localStorage.clear();
    }

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.substring(0, 6) === "sticky") {
      let value = localStorage.getItem(key);
      addStickyToDOM(value);
    }
  }
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
  let value = document.querySelector("#note_text").value;
  if (value) {
    let key = "sticky_" + localStorage.length;
    localStorage.setItem(key, value);
  } else {
    return alert("You can't store empty notes");
  }

  addStickyToDOM(value);
  document.querySelector("#note_text").value = "";
 }