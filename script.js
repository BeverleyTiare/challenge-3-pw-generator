// Assignment code here

// DOM elements 

const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};


// Generator Functions - https://owasp.org/www-community/password-special-characters

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// generateBtn event listener
// generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {

  const length =  +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  console.log(hasLower, hasUpper, hasNumber, hasSymbol);

  var password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// This function returns the password
function generatePassword(lower, upper, number, symbol, length) {

  //1. Init pw var
  //2. Filter out unchecked typs
  //3. Loop over length call generator function for each type
  //4. Add final pw to pw var and return

  let generatedPassword = '';

  const typesCount =  lower + upper + number + symbol;
  // false + T + T + T
  console.log('typesCount: ', typesCount);

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  console.log(typesArr)

  if (typesCount === 0){
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      console.log(funcName);

      var myFunc = randomFunc[funcName];

      generatedPassword += myFunc();
    });
  }

  return generatedPassword.slice(0, length);
}

