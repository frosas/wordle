import { words } from "./words";

const letterFrequencies = words
  .filter((word) => word.length === 5)
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

console.log(sortedLetterFrequencies);

function normalizeWord(word: string) {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function deduplicate<T>(array: T[]) {
  return array.filter((value, index) => array.indexOf(value) === index);
}

function sortObject<T>(
  object: { [k: string]: T },
  compare: (a: [string, T], b: [string, T]) => number
) {
  return Object.fromEntries(Object.entries(object).sort(compare));
}
