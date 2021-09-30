function reversePolish(newExpr) {
  let expr = newExpr.split(" ");

  let stack = [];
  if (expr === '') {
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




function toPostfix (infix) {
  var s = [],
    p = {
      '+': 2, '-': 2,
      '/': 3, '*': 3,
      '^': 4
    }, t2;
  return infix.split(' ').reduce(function(o, t) {
    if (!isNaN(t)) o += t + ' ';
    else if (p[t]) {
      while ((t2 = s[s.length - 1]) && (t != '^' && p[t] <= p[t2] || p[t] < p[t2]))
        o += s.pop() + ' ';
      s.push(t);
    }
    else if (t == '(') s.push(t);
    else if (t == ')') {
      while (s[s.length - 1] != '(') o += s.pop() + ' ';
      s.pop();
    }
    return o ;
  }, '') + s.reverse().join(' ');
}

console.log('123')

input = document.querySelector('.main-input');

button = document.querySelector('.main-button').addEventListener('click',(ev)=>{
  ev.preventDefault();
  document.querySelector('.answer-field').innerHTML = `<a> ${reversePolish(toPostfix(input.value))}  </a>`;
  console.log(input.value)
  

});

// let inputString = '22 / 11 + ( 2 + 31 ) * 3';
// console.log(toPostfix(inputString))
// console.log(reversePolish(toPostfix(inputString)));




