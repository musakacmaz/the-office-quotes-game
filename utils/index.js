export function buildChoices(quoteOwner, characters) {
  const choices = [];
  while (choices.length < 3) {
    const randomCharacter =
      characters[Math.floor(Math.random() * characters.length)];
    if (randomCharacter._id !== quoteOwner._id) {
      choices.push({
        id: randomCharacter._id,
        text: randomCharacter.firstname + " " + randomCharacter.lastname,
      });
    }
  }
  choices.push({
    id: quoteOwner._id,
    text: quoteOwner.firstname + " " + quoteOwner.lastname,
  });
  return shuffleArray(choices);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
