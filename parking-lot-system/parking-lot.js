const lot = document.querySelector(".lot");
const booked = document.querySelector("#total-slots span");
const space = '<div class="slot" />';

for (let i = 0; i < 20; i++) {
  lot.innerHTML += space;
}

let slots = document.querySelectorAll(".slot");
let bookedNum = 0;

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
      elem.innerHTML = '';
      bookedNum--;
    }
    booked.innerHTML = bookedNum;
  };
});
