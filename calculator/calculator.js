const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display .text");
const result = document.querySelector(".result .text");
const signIcon = document.querySelector("span");
let input = "";
let prevInput = "";
let inputHistory = [];
const info = {
  data: "",
  result: "",
};
let operator = "";

buttons.forEach(
  (btn) =>
    (btn.onclick = (e) => {
      if (btn.classList.contains("fn")) {
        if (btn.id === "clear") {
          runDisplay("");
          clearAll();
        }
        handleArithmetics(btn.id);
      } else {
        // add number to input
        input += btn.innerText;
        runDisplay("");
        signIcon.innerText = "";
        // disable decimal after first click
        if (btn.id === "dot") btn.disabled = true;
        printInput(input);
      }
    })
);

const handleArithmetics = (value) => {
  switch (value) {
    case "delete":
      input = input.slice(0, -1);
      break;
    case "equal":
      if (prevInput == "") {
        calculate(input, "add", 0, true);
      } else {
        calculate(prevInput, operator, input, true);
      }
      break;

    default:
      runMath(value);
  }
};

const runMath = (value) => {
  if (prevInput !== "") {
    calculate(prevInput, operator, input, false);
  } else {
    prevInput = input;
    info.data += prevInput;
  }
  operator = value;
  signIcon.innerText = operator;
  input = "";
};

const calculate = (prev, value, current, isEqual) => {
  let result;
  prev = parseFloat(prev);
  current = parseFloat(current);
  switch (value) {
    case "divide":
      result = prev / current;
      info.data += "/";
      break;

    case "add":
      result = prev + current;
      info.data += "+";
      break;

    case "minus":
      result = prev - current;
      info.data += "-";
      break;

    case "multiply":
      result = prev * current;
      info.data += "x";
      break;

    default:
      break;
  }
  info.data += current;
  runDisplay(result);

  if (isEqual) {
    info.result = result;
    inputHistory.push({ ...info });
    let disp = inputHistory[inputHistory.length - 1].data;
    printInput(disp);

    clearAll();
  } else {
    prevInput = result;
  }
};

const runDisplay = (value) => {
  result.innerHTML = value;
};

const printInput = (input) => (display.innerHTML = input);

const clearAll = () => {
  input = "";
  operator = "";
  prevInput = "";
  signIcon.innerText = "";
  info.data = "";
  info.result = "";
};
