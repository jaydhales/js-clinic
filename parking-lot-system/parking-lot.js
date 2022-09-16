const lot = document.querySelector(".lot");
const booked = document.querySelector("#total-slots span");
const bookedAlert = document.querySelector(".alert");
let bookedNum = 0;

// create slots from Js
for (let i = 0; i < 20; i++) {
  lot.innerHTML += '<div class="slot" />';
}

let slots = document.querySelectorAll(".slot");

slots.forEach((slot) => {
  slot.onclick = (e) => {
    const elem = e.target;
    if (elem.id === "") {
      const reg = "CBE-" + (Math.floor(Math.random() * 899) + 100);
      elem.id = reg;
      elem.classList.add("booked");
      elem.innerHTML = reg;
      bookedNum++;
    } else {
      elem.id = "";
      elem.classList.remove("booked");
      elem.innerHTML = "";
      bookedNum--;
    }
    updateDom();
  };
});

const updateDom = () => {
  booked.innerHTML = bookedNum;
  bookedNum === 20
    ? bookedAlert.classList.add("visible")
    : bookedAlert.classList.remove("visible");
};
