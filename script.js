const alphabets = {
  z26: Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
  z29: Array.from("AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY")
};

const vietnameseGroups = {
  A: "AÀÁẢÃẠaàáảãạ",
  Ă: "ĂẰẮẲẴẶăằắẳẵặ",
  Â: "ÂẦẤẨẪẬâầấẩẫậ",
  B: "Bb",
  C: "Cc",
  D: "Dd",
  Đ: "Đđ",
  E: "EÈÉẺẼẸeèéẻẽẹ",
  Ê: "ÊỀẾỂỄỆêềếểễệ",
  G: "Gg",
  H: "Hh",
  I: "IÌÍỈĨỊiìíỉĩị",
  K: "Kk",
  L: "Ll",
  M: "Mm",
  N: "Nn",
  O: "OÒÓỎÕỌoòóỏõọ",
  Ô: "ÔỒỐỔỖỘôồốổỗộ",
  Ơ: "ƠỜỚỞỠỢơờớởỡợ",
  P: "Pp",
  Q: "Qq",
  R: "Rr",
  S: "Ss",
  T: "Tt",
  U: "UÙÚỦŨỤuùúủũụ",
  Ư: "ƯỪỨỬỮỰưừứửữự",
  V: "Vv",
  X: "Xx",
  Y: "YỲÝỶỸỴyỳýỷỹỵ"
};

const vietnameseMap = new Map();
Object.entries(vietnameseGroups).forEach(([base, chars]) => {
  Array.from(chars).forEach(char => vietnameseMap.set(char, base));
});

const cipherNames = {
  caesar: "Dịch vòng",
  substitution: "Mã thay thế",
  vigenere: "Mã Vigenere",
  affine: "Mã Affine",
  hill: "Mã Hill",
  des: "Mã DES"
};

const cipherSelect = document.getElementById("cipherSelect");
const alphabetSelect = document.getElementById("alphabetSelect");
const keyControls = document.getElementById("keyControls");
const alphabetPreview = document.getElementById("alphabetPreview");
const plainText = document.getElementById("plainText");
const cipherText = document.getElementById("cipherText");
const plainCount = document.getElementById("plainCount");
const cipherCount = document.getElementById("cipherCount");
const algorithmName = document.getElementById("algorithmName");
const algorithmMode = document.getElementById("algorithmMode");
const message = document.getElementById("message");
const sidebar = document.querySelector(".sidebar");
const menuButton = document.getElementById("menuButton");

function mod(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

function modularInverse(value, modulus) {
  const normalized = mod(value, modulus);
  for (let i = 1; i < modulus; i += 1) {
    if (mod(normalized * i, modulus) === 1) {
      return i;
    }
  }
  return null;
}

function getAlphabet() {
  return alphabets[alphabetSelect.value];
}

function canonicalChar(char) {
  if (alphabetSelect.value === "z29") {
    return vietnameseMap.get(char) || null;
  }
  const upper = char.toUpperCase();
  return /^[A-Z]$/.test(upper) ? upper : null;
}

function preserveCase(original, transformed) {
  if (original === original.toLowerCase() && original !== original.toUpperCase()) {
    return transformed.toLowerCase();
  }
  return transformed;
}

function transformCharacters(text, transformIndex) {
  const alphabet = getAlphabet();
  return Array.from(text).map(char => {
    const canonical = canonicalChar(char);
    if (!canonical) {
      return char;
    }
    const index = alphabet.indexOf(canonical);
    const nextIndex = mod(transformIndex(index), alphabet.length);
    return preserveCase(char, alphabet[nextIndex]);
  }).join("");
}

function getKeyValue(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : "";
}

function keyIndices(value) {
  const alphabet = getAlphabet();
  const result = [];
  Array.from(value).forEach(char => {
    const canonical = canonicalChar(char);
    if (canonical) {
      result.push(alphabet.indexOf(canonical));
    }
  });
  return result;
}

function caesar(text, decrypt = false) {
  const rawKey = getKeyValue("shiftKey");
  if (rawKey === "" || Number.isNaN(Number(rawKey))) {
    throw new Error("Khóa dịch vòng phải là một số nguyên.");
  }
  const shift = Math.trunc(Number(rawKey)) * (decrypt ? -1 : 1);
  return transformCharacters(text, index => index + shift);
}

function substitutionAlphabet() {
  const alphabet = getAlphabet();
  const key = getKeyValue("substitutionKey");
  const unique = [];
  keyIndices(key).forEach(index => {
    const char = alphabet[index];
    if (!unique.includes(char)) {
      unique.push(char);
    }
  });
  if (unique.length === 0) {
    throw new Error("Nhập khóa cho mã thay thế.");
  }
  alphabet.forEach(char => {
    if (!unique.includes(char)) {
      unique.push(char);
    }
  });
  return unique;
}

function substitution(text, decrypt = false) {
  const alphabet = getAlphabet();
  const target = substitutionAlphabet();
  if (!decrypt) {
    return transformCharacters(text, index => alphabet.indexOf(target[index]));
  }
  return transformCharacters(text, index => target.indexOf(alphabet[index]));
}

function vigenere(text, decrypt = false) {
  const alphabet = getAlphabet();
  const key = keyIndices(getKeyValue("vigenereKey"));
  if (key.length === 0) {
    throw new Error("Khóa Vigenere phải chứa ít nhất một chữ cái hợp lệ.");
  }
  let position = 0;
  return Array.from(text).map(char => {
    const canonical = canonicalChar(char);
    if (!canonical) {
      return char;
    }
    const index = alphabet.indexOf(canonical);
    const shift = key[position % key.length] * (decrypt ? -1 : 1);
    position += 1;
    return preserveCase(char, alphabet[mod(index + shift, alphabet.length)]);
  }).join("");
}

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
  if (gcd(a, modulus) !== 1) {
    throw new Error(`Giá trị a phải nguyên tố cùng nhau với ${modulus}.`);
  }
  if (!decrypt) {
    return transformCharacters(text, index => a * index + b);
  }
  const inverseA = modularInverse(a, modulus);
  return transformCharacters(text, index => inverseA * (index - b));
}

function getHillMatrix() {
  const values = ["hillA", "hillB", "hillC", "hillD"].map(getKeyValue);
  if (values.some(value => value === "" || Number.isNaN(Number(value)))) {
    throw new Error("Ma trận Hill cần đủ 4 số nguyên.");
  }
  return values.map(value => Math.trunc(Number(value)));
}

function hillMatrixForMode(decrypt) {
  const alphabet = getAlphabet();
  const modulus = alphabet.length;
  const [a, b, c, d] = getHillMatrix();
  if (!decrypt) {
    const determinant = mod(a * d - b * c, modulus);
    if (gcd(determinant, modulus) !== 1) {
      throw new Error(`Định thức ma trận phải khả nghịch trên Z${modulus}.`);
    }
    return [mod(a, modulus), mod(b, modulus), mod(c, modulus), mod(d, modulus)];
  }
  const determinant = mod(a * d - b * c, modulus);
  const inverseDeterminant = modularInverse(determinant, modulus);
  if (inverseDeterminant === null) {
    throw new Error(`Định thức ma trận phải khả nghịch trên Z${modulus}.`);
  }
  return [
    mod(inverseDeterminant * d, modulus),
    mod(inverseDeterminant * -b, modulus),
    mod(inverseDeterminant * -c, modulus),
    mod(inverseDeterminant * a, modulus)
  ];
}

function hill(text, decrypt = false) {
  const alphabet = getAlphabet();
  const modulus = alphabet.length;
  const matrix = hillMatrixForMode(decrypt);
  const entries = [];
  const chars = Array.from(text);
  chars.forEach((char, position) => {
    const canonical = canonicalChar(char);
    if (canonical) {
      entries.push({
        position,
        index: alphabet.indexOf(canonical),
        original: char
      });
    }
  });
  if (entries.length === 0) {
    return text;
  }
  const padIndex = alphabet.indexOf("X");
  const values = entries.map(entry => entry.index);
  const wasPadded = values.length % 2 !== 0;
  if (wasPadded) {
    values.push(padIndex);
  }
  const output = [];
  for (let i = 0; i < values.length; i += 2) {
    const x = values[i];
    const y = values[i + 1];
    output.push(mod(matrix[0] * x + matrix[1] * y, modulus));
    output.push(mod(matrix[2] * x + matrix[3] * y, modulus));
  }
  entries.forEach((entry, index) => {
    chars[entry.position] = preserveCase(entry.original, alphabet[output[index]]);
  });
  if (wasPadded) {
    chars.push(alphabet[output[output.length - 1]]);
  }
  return chars.join("");
}


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

function processText(mode) {
  const decrypt = mode === "decrypt";
  const source = decrypt ? cipherText.value : plainText.value;
  if (source.length === 0) {
    setMessage(decrypt ? "Nhập bản mã trước khi giải mã." : "Nhập bản rõ trước khi mã hóa.", "error");
    return;
  }
  try {
    let result = "";
    switch (cipherSelect.value) {
      case "caesar":
        result = caesar(source, decrypt);
        break;
      case "substitution":
        result = substitution(source, decrypt);
        break;
      case "vigenere":
        result = vigenere(source, decrypt);
        break;
      case "affine":
        result = affine(source, decrypt);
        break;
      case "hill":
        result = hill(source, decrypt);
        break;
      case "des":
        result = des(source, decrypt);
        break;
      default:
        throw new Error("Thuật toán không hợp lệ.");
    }
    if (decrypt) {
      plainText.value = result;
    } else {
      cipherText.value = result;
    }
    updateCounts();
    setMessage(decrypt ? "Giải mã thành công." : "Mã hóa thành công.", "success");
  } catch (error) {
    setMessage(error.message, "error");
  }
}

function renderKeyControls() {
  const cipher = cipherSelect.value;
  if (cipher === "caesar") {
    keyControls.innerHTML = '<input id="shiftKey" type="number" value="3" placeholder="Độ dịch">';
  }
  if (cipher === "substitution") {
    keyControls.innerHTML = '<input id="substitutionKey" type="text" value="KHOA" placeholder="Từ khóa hoặc chuỗi thay thế">';
  }
  if (cipher === "vigenere") {
    keyControls.innerHTML = '<input id="vigenereKey" type="text" value="KEY" placeholder="Khóa Vigenere">';
  }
  if (cipher === "affine") {
    keyControls.innerHTML = '<div class="key-inline"><input id="affineA" type="number" value="5" placeholder="a"><input id="affineB" type="number" value="8" placeholder="b"></div>';
  }
  if (cipher === "hill") {
    keyControls.innerHTML = '<div class="hill-grid"><input id="hillA" type="number" value="3" aria-label="a"><input id="hillB" type="number" value="3" aria-label="b"><input id="hillC" type="number" value="2" aria-label="c"><input id="hillD" type="number" value="5" aria-label="d"></div>';
  }
  if (cipher === "des") {
    keyControls.innerHTML = '<input id="desKey" type="text" value="AABB09182736CCDD" maxlength="16" spellcheck="false" placeholder="16 ký tự hex / 64 bit">';
  }
}

function renderAlphabet() {
  if (cipherSelect.value === "des") {
    alphabetPreview.innerHTML = "<span>HEX</span><span>64 BIT</span><span>1 BLOCK</span>";
    return;
  }
  alphabetPreview.innerHTML = getAlphabet().map(char => `<span>${char}</span>`).join("");
}

function updateHeading() {
  algorithmName.textContent = cipherNames[cipherSelect.value];
  algorithmMode.textContent = cipherSelect.value === "des" ? "HEX 64-BIT" : alphabetSelect.value.toUpperCase();
}

function updateCounts() {
  plainCount.textContent = `${Array.from(plainText.value).length} ký tự`;
  cipherCount.textContent = `${Array.from(cipherText.value).length} ký tự`;
}

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = type ? `message ${type}` : "message";
}

function refreshInterface() {
  const isDes = cipherSelect.value === "des";
  alphabetSelect.disabled = isDes;
  plainText.placeholder = isDes ? "Ví dụ: 123456ABCD132536" : "Nhập bản rõ tại đây...";
  cipherText.placeholder = isDes ? "Bản mã DES gồm 16 ký tự hex" : "Nhập hoặc nhận bản mã tại đây...";
  renderKeyControls();
  renderAlphabet();
  updateHeading();
  setMessage(isDes ? "DES xử lý đúng 1 khối 64 bit ở dạng hexadecimal." : "Sẵn sàng xử lý dữ liệu.");
}

document.getElementById("encryptButton").addEventListener("click", () => processText("encrypt"));
document.getElementById("decryptButton").addEventListener("click", () => processText("decrypt"));
document.getElementById("clearButton").addEventListener("click", () => {
  plainText.value = "";
  cipherText.value = "";
  updateCounts();
  setMessage("Đã xóa nội dung.");
});
document.getElementById("swapButton").addEventListener("click", () => {
  const current = plainText.value;
  plainText.value = cipherText.value;
  cipherText.value = current;
  updateCounts();
  setMessage("Đã đổi vị trí bản rõ và bản mã.");
});

cipherSelect.addEventListener("change", refreshInterface);
alphabetSelect.addEventListener("change", refreshInterface);
plainText.addEventListener("input", updateCounts);
cipherText.addEventListener("input", updateCounts);
menuButton.addEventListener("click", () => sidebar.classList.toggle("open"));

document.addEventListener("click", event => {
  if (window.innerWidth <= 760 && sidebar.classList.contains("open") && !sidebar.contains(event.target) && event.target !== menuButton) {
    sidebar.classList.remove("open");
  }
});

refreshInterface();
updateCounts();