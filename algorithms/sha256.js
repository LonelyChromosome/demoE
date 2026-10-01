window.SHA256Algorithm = (() => {
  async function hash(text) {
    const digest = await crypto.subtle.digest("SHA-256", window.CryptoUtils.utf8Bytes(text));
    return window.CryptoUtils.bytesToHex(new Uint8Array(digest)).toLowerCase();
  }
  return { hash };
})();