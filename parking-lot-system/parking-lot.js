if (!localStorage.bookings) localStorage.bookings = JSON.stringify([]);
const bookings = JSON.parse(localStorage.bookings);
const slotSection = document.querySelector(".lot");
const form = document.querySelector("form");
const booked = document.querySelector("#total-slots span");
const bookedAlert = document.querySelector(".alert");
let bookedNum = 0;

// create slotSections from Js
for (let i = 0; i < 12; i++) {
  slotSection.innerHTML += '<div class="slot small" />';
}
for (let i = 0; i < 8; i++) {
  slotSection.innerHTML += '<div class="slot large" />';
}

let smallSlots = document.querySelectorAll(".slot.small");
let largeSlots = document.querySelectorAll(".slot.large");

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

  const regExist = bookings.filter((slot) => slot.regNum === formData.regNum);

  if (regExist.length > 0) {
    alert(`A car with the registration number ${formData.regNum} exists`);
    return null;
  }

  bookings.push(formData);

  localStorage.bookings = JSON.stringify(bookings);

  form.reset();
  updateDom();
};

const updateDom = () => {
  updateBooking();
  booked.innerHTML = bookings.length;

  const disableForm = (bool) => {
    for (let i = 0; i < form.elements.length; i++) {
      form.elements[i].disabled = bool;
    }
  };

  if (bookedNum === 20) {
    bookedAlert.classList.add("visible");
    disableForm(true);
  } else {
    bookedAlert.classList.remove("visible");
    disableForm(false);
  }
};

const updateBooking = () => {
  const smallFilled = bookings.filter((slot) => slot.type === "small");
  const largeFilled = bookings.filter((slot) => slot.type === "large");
  const updateSlot = (slot, booking) =>
    (slot.innerHTML = `<div>
        <p>${booking.type}</p>
        </div>`);

  bookings.forEach((booking) => {
    // fill largeSlots when smallSlots are filled i.e 12 max
    if (booking.type === "small" && smallFilled.length <= 12) {
      for (let i = 0; i < smallFilled.length; i++) {
        const slot = smallSlots[i];
        updateSlot(slot, booking);
      }
    } else {
      for (let i = 0; i < largeFilled.length; i++) {
        const slot = largeSlots[i];
        updateSlot(slot, booking);
      }
    }
  });
};

window.onload = updateDom();

// slots.forEach((slot) => {
//   slot.onclick = (e) => {
//     const elem = e.target;
//     if (elem.id === "") {
//       const reg = "CBE-" + (Math.floor(Math.random() * 899) + 100);
//       elem.id = reg;
//       elem.classList.add("booked");
//       elem.innerHTML = reg;
//       bookedNum++;
//     } else {
//       elem.id = "";
//       elem.classList.remove("booked");
//       elem.innerHTML = "";
//       bookedNum--;
//     }
//     updateDom();
//   };
// });
