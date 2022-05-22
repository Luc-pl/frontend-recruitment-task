/* Modal */

function popUp() {
  const modal = document.getElementById("overlay");
  const btn = document.querySelector(".btn");
  const span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
popUp();

/* Max click counter modal */

const btn = document.querySelector(".btn");
const infoClick = document.querySelector(".info-click");
const el = document.createElement("span");

let counter = 0;

function elementClick() {
    counter++;
    infoClick.innerText = `${counter} times`;
    if (counter >= 5) {
        btn.removeEventListener("click", elementClick)
    } if (counter == 5) {
      el.classList.add("element");
      el.innerText = `Reset Now!`;

      const span = document.querySelector(".btn-reset");
      span.appendChild(el);
    }
}

btn.addEventListener("click", elementClick);