export function hasBlackjack(cards) {
  if (cards.length !== 3) {
    return false;
  }

  const sortedCards = cards.sort((cardA, cardB) => {
    const valueA = getCardValue(cardA);
    const valueB = getCardValue(cardB);
    return valueA - valueB;
  });

  const firstCardValue = getCardValue(sortedCards[0]);
  const secondCardValue = getCardValue(sortedCards[1]);
  const thirdCardValue = getCardValue(sortedCards[2]);

  return (
    (firstCardValue === 1 && isTenPointCard(secondCardValue) && !isTenPointCard(thirdCardValue)) ||
    (secondCardValue === 1 && isTenPointCard(thirdCardValue) && !isTenPointCard(firstCardValue)) ||
    (thirdCardValue === 1 && isTenPointCard(firstCardValue) && !isTenPointCard(secondCardValue))
  );
}

function getCardValue(card) {
  const numericValue = parseInt(card.value);

  if (isNaN(numericValue)) {
    const faceCardMap = { 'JACK': 10, 'QUEEN': 10, 'KING': 10 };
    return faceCardMap[card.value];
  }
  return numericValue;
}

function isTenPointCard(value) {
  return value === 10 || value === 'JACK' || value === 'QUEEN' || value === 'KING';
}
