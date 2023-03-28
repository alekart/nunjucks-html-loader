/**
 * Transforms a string into a camelCase
 * @param string {string}
 * @returns {string}
 */
export default function camelCase(string) {
  let formatted = string.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  formatted = formatted.toLowerCase().replace(/\W+|[_-]+/gi, ' ').trim();
  const words = formatted.split(' ');
  return words.map((word, index) => {
    if(index > 0) {
      word[0] = word[0].toUpperCase();
    }
    return word;
  }).join('-');
}
