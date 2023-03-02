const LETTERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

function generateRandomString() {
  var string = "";
  for (let i = 0; i < 20; i++) {
    const element = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    string += element;
  }
  return string;
}

function generateTimestamp() {
  var date = new Date();
  return date.toLocaleTimeString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function generateTime() {
  var date = new Date();
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function codeValid(codeString) {
  if (codeString.slice(0, 27) === "https://stampitsolutions.de") {
    return true;
  } else {
    return false;
  }
}

function generateDatestamp() {
  var date = new Date();
  return date.toLocaleTimeString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export {
  generateRandomString,
  generateTimestamp,
  generateDatestamp,
  codeValid,
  generateTime,
};
