if (!localStorage.bookings) localStorage.bookings = JSON.stringify([]);
let bookings = JSON.parse(localStorage.bookings);
const slotSection = document.querySelector(".lot");
const form = document.querySelector("form");
const booked = document.querySelector("#total-slots span");
const bookedAlert = document.querySelector(".alert");
const dialog = document.querySelector(".dialog");
let checkoutBtns;
let bookedNum = 0;

// create slotSections from Js
for (let i = 0; i < 12; i++) {
  slotSection.innerHTML += '<div class="slot small" />';
}
for (let i = 0; i < 8; i++) {
  slotSection.innerHTML += '<div class="slot large" />';
}

const allSlots = document.querySelectorAll(".slot");
const smallSlots = document.querySelectorAll(".slot.small");
const largeSlots = document.querySelectorAll(".slot.large");

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

  checkoutBtns = document.querySelectorAll(".unbook");
  handleCheckout();
};

const updateBooking = () => {
  allSlots.forEach((slot) => (slot.innerHTML = ""));
  //  All slots cleared for re-update

  const smallFilled = bookings.filter((slot) => slot.type === "small");
  const largeFilled = bookings.filter((slot) => slot.type === "large");
  const updateSlot = (slot, booking) =>
    (slot.innerHTML = `<div id=${booking.regNum} class='booked'>
        <p>${booking.type}</p>
        <a href="#" class='unbook'>Checkout</a>
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

const handleCheckout = () => {
  // const shouldClear = confirm("Do you want to clear");

  checkoutBtns.forEach(
    (btn) =>
      (btn.onclick = (e) => {
        e.preventDefault();
        handlePayment(e.target.parentElement.id);

        // bookings = bookings.filter(
        //   (booking) => booking.regNum !== e.target.parentElement.id
        // );

        // localStorage.bookings = JSON.stringify(bookings);
        // updateDom();
      })
  );
};

const handlePayment = (id) => {
  const currentSlot = bookings.filter((booking) => booking.regNum == id)[0];
  const timeOut = new Date().getTime();
  const timeSpent = new Date(timeOut - currentSlot.timeIn);
  const minuteSpent = timeSpent.getMinutes();
  const seconds = timeSpent.getSeconds();
  const pricePerTime = currentSlot.type === "large" ? 4 : 2;

  const totalBill = pricePerTime * (minuteSpent + Math.round(seconds / 60)); // >30sec = 1mins, otherwise 0

  runPaymentDialog(currentSlot, minuteSpent, seconds, pricePerTime, totalBill);

  console.log({ minuteSpent, seconds, pricePerTime, totalBill });
};

const runPaymentDialog = (
  currentSlot,
  minutes,
  seconds,
  pricePerTime,
  totalBill
) => {
  dialog.innerHTML = `<div class='dialog-box'>
    <h4>Thanks you for choosing us</h4>
    <p>Your Bill</p>
    <p>Name: ${currentSlot.name}</p>
    <p>Reg: ${currentSlot.regNum}</p>
    <p>Vehicle Type: ${currentSlot.type}</p>
    <p>Price Unit: ₦${pricePerTime}/minutes</p>
    <p>Time Spent: ${minutes} minutes, ${seconds} seconds </p>

    <p>Total Bill: ₦${totalBill}</p>
    <div> </div>
  </div>`;
};

window.onload = updateDom();
