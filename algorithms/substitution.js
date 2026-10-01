function substitutionAlphabet() {
  const alphabet = getAlphabet();
  const key = getKeyValue("substitutionKey");
  const unique = [];
  keyIndices(key).forEach(index => {
    const char = alphabet[index];
    if (!unique.includes(char)) unique.push(char);
  });
  if (unique.length === 0) throw new Error("Nhập khóa cho mã thay thế.");
  alphabet.forEach(char => { if (!unique.includes(char)) unique.push(char); });
  return unique;
}
function substitution(text, decrypt = false) {
  const alphabet = getAlphabet();
  const target = substitutionAlphabet();
  if (!decrypt) return transformCharacters(text, index => alphabet.indexOf(target[index]));
  return transformCharacters(text, index => target.indexOf(alphabet[index]));
}