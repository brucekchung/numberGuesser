/*GLOBAL VARIABLES*/
var guessField = document.getElementById('guess-box');
var guessButton = document.getElementById('guess');
var clearButton = document.getElementById('clear');
var resetButton = document.getElementById('reset');
var lastGuess = document.getElementById('last-guess');
var feedback = document.getElementById('feedback');
var max = 100;
var min = 0;
var formulaMax = 100;
var formulaMin = 0;
var randomNumber = numberGenerator();
var minButton = document.getElementById('min-button');
var maxButton = document.getElementById('max-button');
var minField = document.getElementById('min-box');
var maxField = document.getElementById('max-box');


/*EVENT LISTENERS*/
guessButton.addEventListener('click', getFeedback);
clearButton.addEventListener('click', clearInput);
//two guessField event listeners in HTML
resetButton.addEventListener('click', resetGame);
minButton.addEventListener('click', setMin);
maxButton.addEventListener('click', setMax);

/*FUNCTIONS*/
function numberGenerator() {
  return Math.floor(Math.random() * formulaMax + formulaMin);
}

function getFeedback() {
  let input = guessField.value;
  if (isNaN(parseInt(input))) {
    feedback.innerText = 'Enter a NUMBER, Turd Burglar';
  }
  else if (input > max || input < min) {
    feedback.innerText = 'Enter a number between ' + min + ' and ' + max;
  }
  else if (input == randomNumber) {
    feedback.innerText = 'Winner Winner Chicken Dinner! Increased max and min by 10!';
    lastGuess.innerText = guessField.value;
    increaseRange();
    randomNumber = numberGenerator();
  }
  else if (input > randomNumber) {
    feedback.innerText = 'Too High';
    lastGuess.innerText = guessField.value;
  }
  else {
    feedback.innerText = 'Too Low';
    lastGuess.innerText = guessField.value;
  }
}

function clearInput() {
  guessField.value = '';
  clearButton.setAttribute('disabled', true);
  if (lastGuess.innerText == '?')
    resetButton.setAttribute('disabled', true);
}

function resetGame() {
  lastGuess.innerText = '?';
  guessField.value = '';
  feedback.innerText = '';
  minField.value = '';
  maxField.value = '';
  min = 0;
  max = 100;
  formulaMin = 0;
  formulaMax = 100;
  randomNumber = numberGenerator();
}

function disableButton() {
  clearButton.setAttribute('disabled', true);
  resetButton.setAttribute('disabled', true);
}

function enableButton() {
  clearButton.removeAttribute('disabled');
  resetButton.removeAttribute('disabled');
}

function disableOrEnable() {
  guessField.value.length > 0 ? enableButton() : disableButton();
}

function inputRange(value) {
  if (value.length == 1) {
    return value;
  }
  else if (parseInt(value) < min) {
    feedback.innerText = 'Enter a number between ' + min + ' and ' + max;
    return min;
  }
  else if (parseInt(value) > max) {
    feedback.innerText = 'Enter a number between ' + min + ' and ' + max;
    return max;
  }
  else return value; 
}

function setMin() {
  min = minField.value;
}

function setMax() {
  max = maxField.value;
}

function increaseRange() {
  max += 10;
  min -= 10;
  formulaMax += 20;
  formulaMin -= 10;
}

/*Quality of Life*/
guessField.focus