import { words } from "./words";

const fiveLetterWords = words.filter((word) => word.length === 5);

const letterFrequencies = fiveLetterWords
  .map(normalizeWord)
  .map((word) => word.split(""))
  .map(deduplicate)
  .flat()
  .reduce<Record<string, number>>(
    (frequencies, letter) => ({
      ...frequencies,
      [letter]: (frequencies[letter] ?? 0) + 1,
    }),
    {}
  );

const sortedLetterFrequencies = sortObject(
  letterFrequencies,
  ([, aFrequency], [, bFrequency]) => bFrequency - aFrequency
);

const sortedLetterFrequenciesWithRatio = Object.fromEntries(
  Object.entries(sortedLetterFrequencies).map(([letter, frequency]) => [
    letter,
    {
      frequency,
      frequencyRatio: toPercentage(frequency / fiveLetterWords.length),
    },
  ])
);

console.log(sortedLetterFrequenciesWithRatio);

function normalizeWord(word: string) {
  return word
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function deduplicate<T>(array: T[]) {
  return Array.from(new Set(array));
}

function sortObject<T>(
  object: { [k: string]: T },
  compare: (a: [string, T], b: [string, T]) => number
) {
  return Object.fromEntries(Object.entries(object).sort(compare));
}

function toPercentage(ratio: number) {
  return `${(ratio * 100).toFixed(2)}%`;
}
