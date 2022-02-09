export function buildChoices(quoteOwner, characters) {
  const choices = [];

  while (choices.length < 3) {
    let randomCharacter =
      characters[Math.floor(Math.random() * characters.length)];
    if (
      randomCharacter._id !== quoteOwner._id &&
      !choices.some((choice) => choice.id === randomCharacter._id)
    ) {
      choices.push({
        id: randomCharacter._id,
        text:
          (randomCharacter.firstname !== "null"
            ? randomCharacter.firstname
            : "") +
          " " +
          (randomCharacter.lastname !== "null" ? randomCharacter.lastname : ""),
        isOwner: false,
      });
    }
  }

  choices.push({
    id: quoteOwner._id,
    text:
      (quoteOwner.firstname !== "null" ? quoteOwner.firstname : "") +
      " " +
      (quoteOwner.lastname !== "null" ? quoteOwner.lastname : ""),
    isOwner: true,
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
