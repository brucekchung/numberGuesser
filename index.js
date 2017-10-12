/*GLOBAL VARIABLES*/
var randomNumber = numberGenerator();
var guessField = document.getElementById('guess-box');
var guessButton = document.getElementById('guess');
var clearButton = document.getElementById('clear');
var resetButton = document.getElementById('reset');
var lastGuess = document.getElementById('last-guess');
var feedback = document.getElementById('feedback');
var max = 100;
var min = 0;
var formulaMax = 101;
var formulaMin = 0;
var rangeButton = document.getElementById('range-button');
var minField = document.getElementById('min-box');
var maxField = document.getElementById('max-box');
var wins = document.getElementById('win-streak');
var guesses = document.getElementById('guesses-remaining');
var winStreak = 0;
var guessesRemaining = 7;


/*EVENT LISTENERS*/
guessButton.addEventListener('click', getFeedback);
//just wanted to try an anonymous function!
guessButton.addEventListener('click', function() {
  guessesRemaining--; 
  guesses.innerText = guessesRemaining;
  if (guessesRemaining == 0 && guessField.value != randomNumber) {
    feedback.innerText = 'Game Over, ' + britishInsultGenerator();
    guessButton.setAttribute('disabled', true);
    clearButton.setAttribute('disabled', true);
    resetButton.removeAttribute('disabled');
  }
})
clearButton.addEventListener('click', clearInput);
//two guessField event listeners in HTML
resetButton.addEventListener('click', resetGame);
rangeButton.addEventListener('click', setRange);


/*FUNCTIONS*/
function numberGenerator() {
  return Math.floor(Math.random() * formulaMax + formulaMin);
}

function britishInsultGenerator() {
  let adj = ["mangy", "dodgy", "daft", "barmy", "pikey", "trollop", "chuffer", "berk", "plug-ugly", "sod", "gormless", "incompetent", "faffing", "eye-watering", "grotty little", "tinkling", "dozy", "manky", "skanky"];
  let noun = ["ninny", "nutter", "git", "wanker", "tosser", "slag", "cow", "twit", "ligger", "arsemonger", "mingebag", "cheese-eating surrender-monkey", "driggle-draggle", "twat", "codger", "muppet", "nancy", "piss-artist", "wally", "wazzack"];
  return adj[Math.floor(Math.random() * adj.length)] + ' ' + noun[Math.floor(Math.random() * noun.length)]
}

function getFeedback() {
  let input = guessField.value;
  if (isNaN(parseInt(input))) {
    feedback.innerText = 'Enter a NUMBER, you ' + britishInsultGenerator();
  }
  else if (input > max || input < min) {
    feedback.innerText = 'Enter a number between ' + min + ' and ' + max + ' you ' + britishInsultGenerator();
  }
  else if (input == randomNumber) {
    feedback.innerText = 'Winner Winner Chicken Dinner! Increased max and min by 10!';
    lastGuess.innerText = guessField.value;
    guessesRemaining = 8; 
    guesses.innerText = '8';
    winStreak++;
    wins.innerText = winStreak;
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
  feedback.innerText = 'Number guessing game';
  minField.value = '';
  maxField.value = '';
  min = 0;
  max = 100;
  formulaMin = 0;
  formulaMax = 101;
  winStreak = 0;
  wins.innerText = '0';
  guessesRemaining = 7;
  guesses.innerText = '7';
  randomNumber = numberGenerator();
  guessButton.removeAttribute('disabled');
  rangeButton.setAttribute('disabled', true);
  resetButton.setAttribute('disabled', true);
  disableButton();
}

function disableButton() {
  if (typeof(parseInt(lastGuess.innerText)) == 'number') {
    clearButton.setAttribute('disabled', true);
  }
  else {
    clearButton.setAttribute('disabled', true);
    resetButton.setAttribute('disabled', true);
  }
}

function enableButton() {
  clearButton.removeAttribute('disabled');
  resetButton.removeAttribute('disabled');
}

function disableOrEnable() {
  guessField.value.length > 0 ? enableButton() : disableButton();
}

function inputRange(value) {
  if (value.match(/[a-zA-Z]/g)) {
    return '';
  }
  else if (value.length == 1) {
    return value;
  }
  else if (parseInt(value) < min) {
    feedback.innerText = 'Enter a number between ' + min + ' and ' + max + ' you ' + britishInsultGenerator();    
    return min;
  }
  else if (parseInt(value) > max) {
    feedback.innerText = 'Enter a number between ' + min + ' and ' + max + ' you ' + britishInsultGenerator();
    return max;
  }
  else {
    return value; 
  }
}

function setRange() {
  min = minField.value;
  max = maxField.value;
  formulaMin = parseInt(minField.value);
  formulaMax = parseInt(maxField.value - minField.value);
  randomNumber = numberGenerator();
}

function increaseRange() {
  max += 10;
  min -= 10;
  formulaMax += 20;
  formulaMin -= 10;
}

function enableSubmit() {
  if (parseInt(maxField.value) > parseInt(minField.value)) {
    rangeButton.removeAttribute('disabled');
  }
  else {
    rangeButton.setAttribute('disabled', true);
  }
}

/*Quality of Life*/
guessField.focus();