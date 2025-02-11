var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


// use res.render to load up an ejs view file
app.get('/', (req, res) => {

  const a = 10, b = 5;
  const arithmetic = {
    addition: a + b,
    subtraction: a - b,
    multiplication: a * b,
    division: a / b,
    modulus: a % b
  };

  const logical = {
    and: a > 5 && b < 10,
    or: a > 5 || b > 10,
    not: !(a < b)
  };

  const relational = {
    greaterThan: a > b,
    lessThan: a < b,
    equalTo: a == b,
    strictEqualTo: a === b,
    notEqualTo: a != b
  };

  const isEven = (a % 2 === 0) ? 'Even' : 'Odd';

  res.render('index', {arithmetic, logical, relational, isEven, a, b});
  
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
})

app.get('/', function(req, res) {
  res.render('views/index');
});

app.get('/calculator', (req, res) => {
  res.render('pages/calculator', { result: null, num1: null, num2: null, operator: '+', isEvenOdd: null });
});

app.post('/calculator', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operator = req.body.operator;
  let result = null;
  let displayOperator = operator;
  let isEvenOdd = null;

  switch (operator) {
      case '+': 
        result = num1 + num2; 
        break;
      case '-': 
        result = num1 - num2; 
        break;
      case '*': 
        result = num1 * num2; 
        displayOperator = '×'; 
        break;
      case '/': 
        result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero'; 
        displayOperator = '÷'; 
        break;
      case '%': 
        result = num1 % num2; 
        break;
      case '&&': 
        result = Boolean(num1 && num2); 
        break;
      case '||': 
        result = Boolean(num1 || num2); 
        break;
      case '!': 
        result = Boolean(!(num1 < num2)); 
        break;
      case '>': 
        result = num1 > num2; 
        break;
      case '<': 
        result = num1 < num2; 
        break;
      case '==': 
        result = num1 == num2; 
        break;
      case '===': 
        result = num1 === num2; 
        break;
      case '!=': 
        result = num1 != num2; 
        break;
      case 'even/odd':
          isNum1EvenOdd = num1 % 2 === 0 ? 'Even' : 'Odd';
          isNum2EvenOdd = num2 % 2 === 0 ? 'Even' : 'Odd';
          result = `${num1} is an ${isNum1EvenOdd} Number. ${num2} is an ${isNum2EvenOdd} Number.`;
          break;
      default: result = 'Invalid operator';
  }

  if (operator === 'even/odd') {
    res.render('pages/calculator', { result: `${result}`, num1, num2, operator});
  } else {
    res.render('pages/calculator', { result: `${num1} ${displayOperator} ${num2} = ${result}`, num1, num2, operator});
  }

});