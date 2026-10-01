function caesar(text, decrypt = false) {
  const rawKey = getKeyValue("shiftKey");
  if (rawKey === "" || Number.isNaN(Number(rawKey))) throw new Error("Khóa dịch vòng phải là một số nguyên.");
  const shift = Math.trunc(Number(rawKey)) * (decrypt ? -1 : 1);
  return transformCharacters(text, index => index + shift);
}