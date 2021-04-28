class NumberString {
  constructor(textTop, textBottom){
    this.stringTop = textTop;
    this.stringBot = textBottom;
    this.number = null;
    this.operator = null;
    let storedOp = null;
    let storedNum = null;
    let hasDecimal = false;
    /*This variable is to check if the function needs to get rid of 
    the '0' after the mainString used the clear() function.  Purely 
    for asthetics*/
    this.isCleared = true;
    this.hasBeenCalculated = false;
  }
  
  addNumber(num){
    //If the = sign has been input, then before the next calculation starts,
    //the variables are reset for a fresh start
    if(this.hasBeenCalculated)
    {
      this.clear();
      this.updateTop();
      this.updateBot();
      this.hasBeenCalculated = false;
    }
    //Here we check to see if there is a decimal in the string already with a loop
    //and check to see if the num being passed is a decimal
    if(this.stringBot != null) {
      for(let i = 0; i < this.stringBot.length; i++) {
        if(this.stringBot[i] == '.') {
          this.hasDecimal = true;
        }
      }
    }

    if(this.isCleared) {
      this.stringBot = num;
      this.isCleared = false;
      this.updateBot();
    } else if ((num != '.') || (!this.hasDecimal)){
      this.stringBot = this.stringBot + num;
      this.updateBot();
    } else { return; }
    //After we add the number to the string and are done with the stringBot for that num input,
    //we set hasDecimal back to false so that it can be checked properly in the next for loop.
    this.hasDecimal = false;
  }

  addOperator(op){
    if (this.isCleared) {
      return;
    }
    if(this.hasBeenCalculated)
    {
      this.storedOp = op;
      this.storedNum = this.stringTop;
      this.stringTop = this.stringTop + op;
      this.updateTop();
      this.hasBeenCalculated = false;
      return;
    }
    if(this.storedNum == null) {
      //store input value before it moves to top for later calculation
      //if op is '=' do this
      if(op != '='){
        this.storedNum = this.stringBot;
        this.stringTop = this.storedNum + op;
        this.storedOp = op;
      } else {
        this.storedNum = this.stringBot;
        this.stringTop = this.storedNum;
        this.storedOp = null;
        this.hasBeenCalculated = true;
      }
      this.stringBot = '';
      this.updateTop();
      this.updateBot();
    } else if(this.storedOp != null && this.storedNum != null){
      //Do calculation with stored Op, storedNum and stringBot and
      //set that to stringTop and new storedNum
      this.storedNum = this.equal(parseFloat(this.storedNum), parseFloat(this.stringBot), this.storedOp);
      if(op != '='){
        this.stringTop = this.storedNum + op;
        this.storedOp = op;
      } else {
        this.stringTop = this.storedNum;
        this.storedOp = null;
        this.hasBeenCalculated = true;
      }
      this.stringBot = '';
      this.updateTop();
      this.updateBot();
    }    
  }

  clear(){
    this.stringBot = '0';
    this.stringTop = null;
    this.storedOp = null;
    this.storedNum = null;
    this.isCleared = true;
    this.updateTop();
    this.updateBot();
  }

  del(){
    this.stringBot = this.stringBot.slice(0, this.stringBot.length - 1);
    this.updateBot();
  }

  equal(first, second, op) {
    if (this.isCleared) {
      return;
    } else {
             if(op == '+') {
        return first + second;
      } else if(op == '-') {
        return first - second;
      } else if(op == '*') {
        return first * second;
      } else if(op == '/') {
        return first / second;
      } else if(op == '=') {
        return this.equal(first, second, op);
      }
    }
  }

  updateTop(){
    textTop.value = this.stringTop;
  }

  updateBot(){
    textBottom.value = this.stringBot;
  }
}

const textTop = document.getElementById('screenTop');
const textBottom = document.getElementById('screenBottom');
const number = document.getElementsByClassName('number');
const operator = document.getElementsByClassName('operator');
const clear = document.getElementById('clear');
const del = document.getElementById('del');
const equal = document.getElementById('equal');


/*instantiate a NumberString object with the values that correspond 
to the global variables: text, number, and operator.  This is so the 
new object has a reference to the HTML elements that they correspond 
to and can know what values are being passed/clicked.*/
let mainString = new NumberString(textBottom);

/*on a click event for any button, the corresponding object method
for that button is called upon the mainString object which appends
the corresponding number/operand.*/
for(let i = 0; i < number.length; i++){
  number[i].addEventListener('click', () => {
    mainString.addNumber(number[i].innerText);
  });
}

for(let i = 0; i < operator.length; i++){
  operator[i].addEventListener('click', () => {
    mainString.addOperator(operator[i].innerText);
  });
}

clear.addEventListener('click', () => {
  mainString.clear();
});
del.addEventListener('click', () => {
  mainString.del();
});
equal.addEventListener('click', () => {
  mainString.equal();
});