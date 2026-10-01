const DES_IP = [58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7];
const DES_FP = [40,8,48,16,56,24,64,32,39,7,47,15,55,23,63,31,38,6,46,14,54,22,62,30,37,5,45,13,53,21,61,29,36,4,44,12,52,20,60,28,35,3,43,11,51,19,59,27,34,2,42,10,50,18,58,26,33,1,41,9,49,17,57,25];
const DES_E = [32,1,2,3,4,5,4,5,6,7,8,9,8,9,10,11,12,13,12,13,14,15,16,17,16,17,18,19,20,21,20,21,22,23,24,25,24,25,26,27,28,29,28,29,30,31,32,1];
const DES_P = [16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25];
const DES_PC1 = [57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4];
const DES_PC2 = [14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32];
const DES_SHIFTS = [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];
const DES_SBOXES = [
  [[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],[0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],[4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],[15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]],
  [[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],[3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],[0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],[13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]],
  [[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],[13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],[13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],[1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]],
  [[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],[13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],[10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],[3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]],
  [[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],[14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],[4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],[11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]],
  [[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],[10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],[9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],[4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]],
  [[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],[13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],[1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],[6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]],
  [[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],[1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],[7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],[2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]]
];

function desPermute(bits, table) {
  return table.map(position => bits[position - 1]);
}

function desHexToBits(hex) {
  return Array.from(hex.toUpperCase()).flatMap(char =>
    parseInt(char, 16).toString(2).padStart(4, "0").split("").map(Number)
  );
}

function desBitsToHex(bits) {
  let result = "";
  for (let i = 0; i < bits.length; i += 4) {
    result += parseInt(bits.slice(i, i + 4).join(""), 2).toString(16).toUpperCase();
  }
  return result;
}

function desXor(a, b) {
  return a.map((value, index) => value ^ b[index]);
}

function desRotateLeft(bits, count) {
  return bits.slice(count).concat(bits.slice(0, count));
}

function desCreateSubkeys(keyHex) {
  const permuted = desPermute(desHexToBits(keyHex), DES_PC1);
  let c = permuted.slice(0, 28);
  let d = permuted.slice(28);
  const subkeys = [];

  DES_SHIFTS.forEach(shift => {
    c = desRotateLeft(c, shift);
    d = desRotateLeft(d, shift);
    subkeys.push(desPermute(c.concat(d), DES_PC2));
  });

  return subkeys;
}

function desFeistel(right, subkey) {
  const expanded = desPermute(right, DES_E);
  const mixed = desXor(expanded, subkey);
  const substituted = [];

  for (let box = 0; box < 8; box += 1) {
    const chunk = mixed.slice(box * 6, box * 6 + 6);
    const row = chunk[0] * 2 + chunk[5];
    const column = chunk[1] * 8 + chunk[2] * 4 + chunk[3] * 2 + chunk[4];
    const value = DES_SBOXES[box][row][column];
    substituted.push(...value.toString(2).padStart(4, "0").split("").map(Number));
  }

  return desPermute(substituted, DES_P);
}

function normalizeDesHex(value, label) {
  const normalized = value.replace(/\s+/g, "").toUpperCase();
  if (!/^[0-9A-F]{16}$/.test(normalized)) {
    throw new Error(`${label} DES phải gồm đúng 16 ký tự hexadecimal (64 bit).`);
  }
  return normalized;
}

function desBlock(dataHex, keyHex, decrypt = false) {
  const data = normalizeDesHex(dataHex, decrypt ? "Bản mã" : "Bản rõ");
  const key = normalizeDesHex(keyHex, "Khóa");

  const initial = desPermute(desHexToBits(data), DES_IP);
  let left = initial.slice(0, 32);
  let right = initial.slice(32);
  const subkeys = desCreateSubkeys(key);

  if (decrypt) {
    subkeys.reverse();
  }

  subkeys.forEach(subkey => {
    const nextLeft = right;
    const nextRight = desXor(left, desFeistel(right, subkey));
    left = nextLeft;
    right = nextRight;
  });

  return desBitsToHex(desPermute(right.concat(left), DES_FP));
}

function des(text, decrypt = false) {
  const key = getKeyValue("desKey");
  return desBlock(text, key, decrypt);
}


window.DESAlgorithm = {
  encryptText(plainText, keyText) {
    const { utf8Bytes, bytesToHex, requireLetterKey } = window.CryptoUtils;
    const toHex = (value, label) => {
      const text = requireLetterKey(value, label);
      const bytes = utf8Bytes(text);
      if (bytes.length > 8) throw new Error(`${label} DES tối đa 8 byte UTF-8.`);
      const block = new Uint8Array(8); block.set(bytes);
      return bytesToHex(block);
    };
    return desBlock(toHex(plainText, "Bản rõ"), toHex(keyText, "Khóa"), false);
  },
  decryptText(cipherText, keyText) {
    const { utf8Bytes, bytesToHex, hexToBytes, requireLetterKey } = window.CryptoUtils;
    const key = requireLetterKey(keyText, "Khóa");
    const keyBytes = utf8Bytes(key);
    if (keyBytes.length > 8) throw new Error("Khóa DES tối đa 8 byte UTF-8.");
    const keyBlock = new Uint8Array(8); keyBlock.set(keyBytes);
    const clean = cipherText.replace(/\s+/g, "").toUpperCase();
    if (!/^[0-9A-F]{16}$/.test(clean)) throw new Error("Bản mã DES phải gồm đúng 16 ký tự hex.");
    const plainHex = desBlock(clean, bytesToHex(keyBlock), true);
    const bytes = hexToBytes(plainHex);
    let end = bytes.length; while(end>0 && bytes[end-1]===0) end--;
    return new TextDecoder().decode(bytes.slice(0,end));
  }
};
