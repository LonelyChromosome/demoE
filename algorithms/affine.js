function affine(text, decrypt = false) {
  const alphabet = getAlphabet();
  const modulus = alphabet.length;
  const rawA = getKeyValue("affineA");
  const rawB = getKeyValue("affineB");
  if (rawA === "" || rawB === "" || Number.isNaN(Number(rawA)) || Number.isNaN(Number(rawB))) {
    throw new Error("Khóa Affine cần đủ hai giá trị a và b.");
  }
  const a = Math.trunc(Number(rawA));
  const b = Math.trunc(Number(rawB));
  if (gcd(a, modulus) !== 1) throw new Error(`Giá trị a phải nguyên tố cùng nhau với ${modulus}.`);
  if (!decrypt) return transformCharacters(text, index => a * index + b);
  const inverseA = modularInverse(a, modulus);
  return transformCharacters(text, index => inverseA * (index - b));
}