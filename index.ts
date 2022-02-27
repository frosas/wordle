import { words } from "./words";

const fiveLetterWords = words.filter((word) => word.length === 5);

const letterOccurrences = fiveLetterWords
  .map(normalizeWord)
  .map((word) => word.split(""))
  .map(deduplicate)
  .flat()
  .reduce<Record<string, number>>(
    (occurrences, letter) => ({
      ...occurrences,
      [letter]: (occurrences[letter] ?? 0) + 1,
    }),
    {}
  );

const sortedLetterOccurrences = sortObject(
  letterOccurrences,
  ([, aFrequency], [, bFrequency]) => bFrequency - aFrequency
);

const sortedLetterOccurrencesWithFrequency = Object.fromEntries(
  Object.entries(sortedLetterOccurrences).map(([letter, occurrences]) => [
    letter,
    {
      occurrences,
      frequency: toPercentage(occurrences / fiveLetterWords.length),
    },
  ])
);

console.log(sortedLetterOccurrencesWithFrequency);

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
