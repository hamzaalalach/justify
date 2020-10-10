const store = require('../data/store');

module.exports = (entry, email) => {
  const MAX_LENGTH = 80;
  const WORDS_QOTA = 80000;
  let i = 0; //Used to iterate over the entry
  let result = '';
  let currentLineLength = 0;
  let remainingCars = MAX_LENGTH;
  let line = '';
  const currentQota = store.getCount(email);
  let usedWords = 0;

  if (currentQota + usedWords >= WORDS_QOTA) {
    throw new Error('Qota limit reached');
  }

  while (i < entry.length && currentQota + usedWords < WORDS_QOTA) {
    let currentWord = '';

    while (i < entry.length && entry[i].match(/[a-zéèàâê:.’«»,-]/i)) {
      currentWord += entry[i];
      i++;
    }

    usedWords++;

    if (remainingCars >= currentWord.length) {
      //Add current word to the line if not limit reached
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
      //Space previously filled line
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
      //Add current word to a new line if limit is reached
      line = currentWord;
      remainingCars = MAX_LENGTH - currentWord.length;
      currentLineLength = currentWord.length;
    }
  }

  store.setCount(email, usedWords + currentQota);

  //We make sure to add the last line
  return result + line + '\n';
};
