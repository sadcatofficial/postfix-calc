function reversePolish(newExpr) {
  let expr = newExpr.split(" ");

  if (expr.length == 2) {
    if (expr[0][0] === ".") expr[0] = `0${expr[0]}`;

    return expr[0];
  }

  let stack = [];
  if (expr === "") {
    return 0;
  }

  for (let i = 0; i < expr.length; i++) {
    if (!isNaN(expr[i]) && isFinite(expr[i])) {
      stack.push(parseFloat(expr[i]));
    } else {
      let a = stack.pop();
      let b = stack.pop();
      if (expr[i] === "+") {
        stack.push(parseFloat(a) + parseFloat(b));
      } else if (expr[i] === "-") {
        stack.push(parseFloat(b) - parseFloat(a));
      } else if (expr[i] === "*") {
        stack.push(parseFloat(a) * parseFloat(b));
      } else if (expr[i] === "/") {
        stack.push(parseFloat(b) / parseFloat(a));
      } else if (expr[i] === "^") {
        stack.push(Math.pow(parseFloat(b), parseFloat(a)));
      }
    }
  }

  if (stack.length > 1) {
    return "ERROR";
  } else {
    return stack[0];
  }
}

function toPostfix(infix) {
  var s = [],
    p = {
      "+": 2,
      "-": 2,
      "/": 3,
      "*": 3,
      "^": 4
    },
    t2;
  return (
    infix.split(" ").reduce(function (o, t) {
      if (!isNaN(t)) o += t + " ";
      else if (p[t]) {
        while (
          (t2 = s[s.length - 1]) &&
          ((t != "^" && p[t] <= p[t2]) || p[t] < p[t2])
        )
          o += s.pop() + " ";
        s.push(t);
      } else if (t == "(") s.push(t);
      else if (t == ")") {
        while (s[s.length - 1] != "(") o += s.pop() + " ";
        s.pop();
      }
      return o;
    }, "") + s.reverse().join(" ")
  );
}

function even(value) {
  if (value % 2 === 0) return true;
  else return false;
}
let formatString = (str) => {
  str = str.split("");
  let isEven = even(str.filter((el) => el === "(" || el === ")").length);
  str = str.map((element) => {
    if (element === "+") return " + ";
    if (element === "-") return " - ";
    if (element === "/") return " / ";
    if (element === "*") return " * ";
    if (element === "^") return " ^ ";
    if (element === "(") return "( ";
    if (element === ")") return " )";
    if (true) return element;
  });

  return {
    even: isEven,
    str: str.join("")
  };
};

let input = document.querySelector(".main-input");
let boardToggleButton = document.querySelector(".toggle-board");
let boardBody = document.querySelector(".board-body");

document.querySelector(".main-button").addEventListener("click", (ev) => {
  ev.preventDefault();
  if (!formatString(input.value)["even"])
    document.querySelector(".answer-field").innerHTML = "Missing bracket";
  else {
    let temp =
      reversePolish(toPostfix(formatString(input.value)["str"])) ||
      "Input error";
    if (temp === Infinity) temp = "input error";
    document.querySelector(".answer-field").innerHTML = `<a> ${temp}  </a>`;
    console.log(toPostfix(formatString(input.value)["str"]));
  }

  // document.querySelector('.answer-field').innerHTML = `<a> ${reversePolish(toPostfix(input.value))}  </a>`;
  console.log(formatString(input.value));
});

boardToggleButton.addEventListener("click", (ev) => {
  ev.preventDefault();
  boardBody.classList.toggle("d-none");
});

boardBody.addEventListener("click", (ev) => {
  if (ev.target.id !== "clear-button" && ev.target.id !== "erase-button")
    input.value += ev.target.innerText;
  else if (ev.target.id === "clear-button") input.value = "";
  else input.value = input.value.substring(0, input.value.length - 1);
});
// let inputString = '22 / 11 + ( 2 + 31 ) * 3';
// console.log(toPostfix(inputString))
// console.log(reversePolish(toPostfix(inputString)));
