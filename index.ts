import { words } from "./words";

const letterFrequencies = words
  .filter((word) => word.length === 5)
  .reduce<Record<string, number>>((frequencies, word) => {
    const letters = normalizeWord(word).split("");
    deduplicate(letters).forEach((letter) => {
      frequencies[letter] = (frequencies[letter] ?? 0) + 1;
    });
    return frequencies;
  }, {});

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

function deduplicate<T>(array: T[]) {
  return array.filter((value, index) => array.indexOf(value) === index);
}
