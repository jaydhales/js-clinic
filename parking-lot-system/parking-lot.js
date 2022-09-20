if (!localStorage.bookings) localStorage.bookings = JSON.stringify([]);
const bookings = JSON.parse(localStorage.bookings);
const lot = document.querySelector(".lot");
form = document.querySelector("form");
const booked = document.querySelector("#total-slots span");
const bookedAlert = document.querySelector(".alert");
let bookedNum = 0;

// create slots from Js
for (let i = 0; i < 12; i++) {
  lot.innerHTML += '<div class="slot large" />';
}
for (let i = 0; i < 8; i++) {
  lot.innerHTML += '<div class="slot small" />';
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

form.onsubmit = (e) => {
  e.preventDefault();
  const isBooked = confirm("Do you want to book a slot");

  if (!isBooked) return null;

  const formData = {
    name: form.elements["name"].value,
    regNum: form.elements["reg"].value,
    type: form.elements["type"].value,
    timeIn: new Date().getTime(),
  };

  bookings.push(formData);

  localStorage.bookings = JSON.stringify(bookings);

  form.clear();
};

const updateDom = () => {
  booked.innerHTML = bookedNum;
  bookedNum === 20
    ? bookedAlert.classList.add("visible")
    : bookedAlert.classList.remove("visible");
};
