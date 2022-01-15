// this prompts user for input on their desired length of the generated password.
var lengthPrompt = function () {
  passwordLength = window.prompt(
    "Choose the length of your password. It must be between 8 and 128 characters long"
  );

  if (passwordLength < 8 || passwordLength > 128) {
    window.alert("Incorrect input, please select another number");
    return lengthPrompt();
  }
  passwordLength = parseInt(passwordLength);
  return passwordLength;
};
//////////////////////////////////////////////////////////////////////////////

// this allows uer to select the character type for the generated password.
var characterPrompt = function (passwordLength) {
  var characterType = window.prompt(
    "Select one or more character types: uppercase, lowercase, number, special."
  );

  if (!characterType) {
    window.alert("Incorrect entry. Try again.");
    characterPrompt(passwordLength);
  } else {
    characterCheck(characterType, passwordLength);
    return characterType;
  }

  characterType = characterType.toLowerCase();
};
////////////////////////////////////////////////////////////////////////////

// this is a confirmation prompt of the user's selections.
var promptConfirm = function (characterType, passwordLength) {
  var promptConfirm = window.confirm(
    "Your password is " +
      passwordLength +
      " characters long, with " +
      characterType +
      " as the character type(s)"
  );
  if (promptConfirm) {
    window.alert("Thank you. You password will now be generated.");
  } else {
    window.alert("Sorry, please re-enter.");
    generatePassword();
  }
};
//////////////////////////////////////////////////////////////////////////

// confirms characters are in the array
var characterCheck = function (characterType, passwordLength) {
  if (characterType.search(",") >= 0) {
    characterArr = characterType.split(", ");
  } else {
    characterArr = characterType.split(" ");
  }

  var x = 0;
  for (var i = 0; i < characterArr.length; i++) {
    if (
      characterArr[i] === "uppercase" ||
      characterArr[i] === "lowercase" ||
      characterArr[i] === "number" ||
      characterArr[i] === "special"
    ) {
      x = x + 0;
    } else {
      window.alert(
        '"' + characterArr[i] + '"' + " is invalid. Please try again."
      );
      x = x + 1;
    }
  }

  if (x == 0) {
    promptConfirm(characterType, passwordLength);
  } else if (x > 0) {
    characterPrompt(passwordLength);
  }
};
//////////////////////////////////////////////////////////////////////////////

// this calls the global functions to generate the password
var generatePassword = function () {
  var passwordLength = lengthPrompt();
  characterPrompt(passwordLength);

  var characterObj = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numeric: "0123456789",
    special: '!"#$%&()*+,-./:;<=>?@[]^_`{}|~',
  };

  var randomize = "";
  for (var i = 0; i < passwordLength; i++) {
    var x = Math.floor(Math.random() * characterArr.length);
    var value = characterArr[x];
    var y = "";

    switch (value) {
      case "uppercase":
        y = Math.floor(Math.random() * characterObj.uppercase.length);
        randomize = randomize.concat(characterObj.uppercase[y]);
        break;
      case "lowercase":
        y = Math.floor(Math.random() * characterObj.lowercase.length);
        randomize = randomize.concat(characterObj.lowercase[y]);
        break;
      case "number":
        y = Math.floor(Math.random() * characterObj.numeric.length);
        randomize = randomize.concat(characterObj.numeric[y]);
        break;
      case "special":
        y = Math.floor(Math.random() * characterObj.special.length);
        randomize = randomize.concat(characterObj.special[y]);
        break;
    }
  }
  return randomize;
};

// Get references to the #generate element.
var generateBtn = document.querySelector("#generate");

// Write password to the #password input.
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button.
generateBtn.addEventListener("click", writePassword);
