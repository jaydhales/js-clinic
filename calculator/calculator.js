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
let lastResult;
let isCalc = false;

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
        if (isCalc) {
          info.data = "";
          isCalc = false;
          prevInput = "";
        }
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
      printInput(input);
      break;
    case "equal":
      calculate(prevInput, operator, input, true);

      break;

    default:
      runMath(value);
      isCalc = false;
  }
};

const runMath = (value) => {
  if (prevInput !== "" && input !== "") {
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
  prev = parseFloat(prev);
  current = parseFloat(current);
  if (isNaN(current)) {
    runDisplay("ERROR");
    return;
  }
  switch (value) {
    case "divide":
      info.data += `/${current}`;
      break;

    case "add":
      info.data += `+${current}`;
      break;

    case "minus":
      info.data += `-${current}`;
      break;

    case "multiply":
      info.data += `*${current}`;
      break;

    default:
      break;
  }

  try {
    if (info.data !== "") info.result = eval(info.data);
    runDisplay(info.result);
    inputHistory.push({ ...info });

    lastResult = inputHistory[inputHistory.length - 1];
  } catch (error) {
    runDisplay("ERROR");
  }

  if (isEqual) {
    printInput(lastResult.data);
    clearAll(isEqual);
  }

  info.data = lastResult.result;
};

const runDisplay = (value) => {
  result.innerHTML = value;
};

const printInput = (input) => (display.innerHTML = input);

const clearAll = (bool) => {
  signIcon.innerText = "";
  operator = "";
  info.result = "";
  input = "";
  if (!bool) {
    prevInput = "";
    info.data = "";
    printInput("");
  } else {
    isCalc = true;
  }
};
