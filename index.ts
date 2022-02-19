import { words } from "./words";

const letterFrequencies = words.reduce<Record<string, number>>(
  (frequencies, word) => {
    // TODO Use only 5-letter words
    // TODO Remove duplicate letters
    normalizeWord(word)
      .split("")
      .forEach((letter) => {
        frequencies[letter] = (frequencies[letter] ?? 0) + 1;
      });
    return frequencies;
  },
  {}
);

const sortedLetterFrequencies = Object.fromEntries(
  Object.entries(letterFrequencies).sort(
    ([, aFrequency], [, bFrequency]) => bFrequency - aFrequency
  )
);

console.log(`🍅`, sortedLetterFrequencies);

function normalizeWord(word: string) {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
