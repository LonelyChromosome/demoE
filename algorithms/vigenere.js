function vigenere(text, decrypt = false) {
  const alphabet = getAlphabet();
  const key = keyIndices(getKeyValue("vigenereKey"));
  if (key.length === 0) throw new Error("Khóa Vigenere phải chứa ít nhất một chữ cái hợp lệ.");
  let position = 0;
  return Array.from(text).map(char => {
    const canonical = canonicalChar(char);
    if (!canonical) return char;
    const index = alphabet.indexOf(canonical);
    const shift = key[position % key.length] * (decrypt ? -1 : 1);
    position += 1;
    return preserveCase(char, alphabet[mod(index + shift, alphabet.length)]);
  }).join("");
}