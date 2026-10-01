function getHillMatrix() {
  const values = ["hillA", "hillB", "hillC", "hillD"].map(getKeyValue);
  if (values.some(value => value === "" || Number.isNaN(Number(value)))) throw new Error("Ma trận Hill cần đủ 4 số nguyên.");
  return values.map(value => Math.trunc(Number(value)));
}
function hillMatrixForMode(decrypt) {
  const modulus = getAlphabet().length;
  const [a, b, c, d] = getHillMatrix();
  const determinant = mod(a * d - b * c, modulus);
  if (gcd(determinant, modulus) !== 1) throw new Error(`Định thức ma trận phải khả nghịch trên Z${modulus}.`);
  if (!decrypt) return [mod(a, modulus), mod(b, modulus), mod(c, modulus), mod(d, modulus)];
  const inv = modularInverse(determinant, modulus);
  return [mod(inv * d, modulus), mod(inv * -b, modulus), mod(inv * -c, modulus), mod(inv * a, modulus)];
}
function hill(text, decrypt = false) {
  const alphabet = getAlphabet();
  const modulus = alphabet.length;
  const matrix = hillMatrixForMode(decrypt);
  const chars = Array.from(text);
  const entries = [];
  chars.forEach((char, position) => {
    const canonical = canonicalChar(char);
    if (canonical) entries.push({ position, index: alphabet.indexOf(canonical), original: char });
  });
  if (!entries.length) return text;
  const values = entries.map(entry => entry.index);
  const padded = values.length % 2 !== 0;
  if (padded) values.push(alphabet.indexOf("X"));
  const output = [];
  for (let i = 0; i < values.length; i += 2) {
    const x = values[i], y = values[i + 1];
    output.push(mod(matrix[0] * x + matrix[1] * y, modulus));
    output.push(mod(matrix[2] * x + matrix[3] * y, modulus));
  }
  entries.forEach((entry, index) => { chars[entry.position] = preserveCase(entry.original, alphabet[output[index]]); });
  if (padded) chars.push(alphabet[output[output.length - 1]]);
  return chars.join("");
}