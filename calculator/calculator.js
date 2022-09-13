const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const result = document.querySelector(".result");
let input = "";
let inputArr = [];
let fn = "";

buttons.forEach(
  (btn) =>
    (btn.onclick = (e) => {
      if (btn.classList.contains("fn")) {
        switch (btn.id) {
          case "clear":
            input = "";
            inputArr = [];
            fn = "";
            break;
          case "sign":
            input *= -1;
            break;
          case "equal":
            runCalc();
            break;

          default:
            runMath(btn.id);
            break;
        }
      } else {
        input += btn.innerText;
      }

      printInput();
    })
);

const runMath = (value) => {
  input !== "" && inputArr.push(parseInt(input));
  if (inputArr.length > 1) {
    inputArr = [
      inputArr.reduce((a, b) => {
        switch (fn) {
          case "divide":
            return a / b;

          case "add":
            return a + b;

          case "minus":
            return a - b;

          case "multiply":
            return a * b;

          default:
            break;
        }
      }),
    ];
  }
  input = "";
  fn = value;

  // printResult(inputArr[0]);
  console.log(inputArr);
};

const printInput = () => (display.innerHTML = input);
const printResult = (value) => (result.innerHTML = value);
