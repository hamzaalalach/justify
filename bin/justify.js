module.exports = entry => {
  const MAX_LENGTH = 80;
  let i = 0;
  let result = '';
  let currentLineLength = 0;
  let remainingCars = MAX_LENGTH;
  let line = '';

  while (i < entry.length) {
    let currentWord = '';

    while (i < entry.length && entry[i].match(/[a-zéèàâê:.’«»,-]/i)) {
      currentWord += entry[i];
      i++;
    }

    if (remainingCars >= currentWord.length) {
      if (currentLineLength !== 0) {
        line += ' ';
        currentLineLength++;
        remainingCars--;
      }

      line += currentWord;
      currentLineLength += currentWord.length;
      remainingCars -= currentWord.length;
      i++;
    } else {
      let spaces = MAX_LENGTH - currentLineLength;
      let currentSpacedWord = 0;
      let words = line.split(' ');

      while (spaces >= 0) {
        spaces--;
        words[currentSpacedWord] = words[currentSpacedWord] + ' ';
        currentSpacedWord++;

        if (currentSpacedWord == words.length) {
          currentSpacedWord = 0;
        }
      }

      line = words.join(' ') + '\n';
      result += line;
      line = currentWord;
      remainingCars = MAX_LENGTH - currentWord.length;
      currentLineLength = currentWord.length;
    }
  }

  return result + line + '\n';
};
