const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const notification = document.getElementById("notification-container");
const keyboard = document.getElementById("keyboard");

const figureParts = document.querySelectorAll(".figure-part");
const words = ["programming", "application", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
      </span>
    `
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won :)";
    popup.style.display = "flex";
  }
}

function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong letters:</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`).join("")}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You lost! :(";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function handleKeyboardClick(event) {
  if (event.target.tagName === "BUTTON") {
    const letter = event.target.textContent;
    makeGuess(letter);
  }
}

function handleKeyPress(event) {
  const letter = event.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) {
    makeGuess(letter);
  }
}

function makeGuess(letter) {
  letter = letter.toLowerCase(); // Convert the letter to lowercase
}
if (selectedWord.includes(letter)) {
  if (!correctLetters.includes(letter)) {
    correctLetters.push(letter);
    displayWord();
  } else {
    showNotification();
  }
} else {
  if (!wrongLetters.includes(letter)) {
    wrongLetters.push(letter);
    updateWrongLetters();
  } else {
    showNotification();
  }
}

function createVirtualKeyboard() {
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const button = document.createElement("button");
    button.textContent = letter;
    keyboard.appendChild(button);
  }
}

playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
  popup.style.display = "none";
});

displayWord();
updateWrongLetters();
createVirtualKeyboard();
keyboard.addEventListener("click", handleKeyboardClick);
window.addEventListener("keydown", handleKeyPress);
