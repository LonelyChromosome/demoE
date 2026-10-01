window.AESAlgorithm = (() => {
  const { utf8Bytes, bytesToBase64, base64ToBytes, concatBytes, requireLetterKey } = window.CryptoUtils;
  async function keyFromText(keyText) {
    requireLetterKey(keyText);
    const digest = await crypto.subtle.digest("SHA-256", utf8Bytes(keyText));
    return crypto.subtle.importKey("raw", new Uint8Array(digest).slice(0, 16), { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
  }
  async function encrypt(plainText, keyText) {
    if (!crypto.subtle) throw new Error("Trình duyệt không hỗ trợ Web Crypto API.");
    if (!plainText) throw new Error("Nhập bản rõ trước khi mã hóa.");
    const key = await keyFromText(keyText);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, utf8Bytes(plainText)));
    return bytesToBase64(concatBytes(iv, encrypted));
  }
  async function decrypt(cipherText, keyText) {
    const key = await keyFromText(keyText);
    const packed = base64ToBytes(cipherText);
    if (packed.length < 13) throw new Error("Bản mã AES không hợp lệ.");
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: packed.slice(0, 12) }, key, packed.slice(12));
    return new TextDecoder().decode(decrypted);
  }
  return { encrypt, decrypt };
})();