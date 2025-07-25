const MAX_CARDS = 12;
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;

const cards = document.querySelectorAll(".memoryCard");

(function suffleCards() {
  cards.forEach((card) => {
    const randomPosition = Math.floor(Math.random() * MAX_CARDS);
    card.style.order = randomPosition;
  });
})();

cards.forEach((card) => {
  card.addEventListener("click", handleCardFlip);
});

function handleCardFlip() {
  if (lockBoard || firstCard === this) {
    return;
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.card === secondCard.dataset.card;

  isMatch ? disableMatchedCards() : unflipCards();
}

function disableMatchedCards() {
  firstCard.removeEventListener("click", handleCardFlip);
  secondCard.removeEventListener("click", handleCardFlip);
  resetTurn();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetTurn();
  }, 1500);
}

function resetTurn() {
  [hasFlippedCard, lockBoard, firstCard, secondCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
