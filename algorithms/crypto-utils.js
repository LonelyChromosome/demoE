window.CryptoUtils = (() => {
  const utf8Bytes = text => new TextEncoder().encode(text);
  const bytesToHex = bytes => Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  const hexToBytes = hex => {
    const clean = hex.replace(/\s+/g, "");
    if (!clean || clean.length % 2 || !/^[0-9A-Fa-f]+$/.test(clean)) throw new Error("Chuỗi hex không hợp lệ.");
    return new Uint8Array(clean.match(/.{2}/g).map(v => parseInt(v, 16)));
  };
  const bytesToBase64 = bytes => {
    let value = "";
    bytes.forEach(b => { value += String.fromCharCode(b); });
    return btoa(value);
  };
  const base64ToBytes = value => Uint8Array.from(atob(value.trim()), c => c.charCodeAt(0));
  const concatBytes = (a, b) => {
    const out = new Uint8Array(a.length + b.length);
    out.set(a); out.set(b, a.length);
    return out;
  };
  const requireLetterKey = (value, label = "Khóa") => {
    const key = value.trim();
    if (!key) throw new Error(`${label} không được để trống.`);
    if (!/^[\p{L}\s]+$/u.test(key)) throw new Error(`${label} chỉ nhập bằng chữ cái.`);
    return key;
  };
  return { utf8Bytes, bytesToHex, hexToBytes, bytesToBase64, base64ToBytes, concatBytes, requireLetterKey };
})();