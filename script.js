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
  hill: "Mã Hill"
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
}

function renderAlphabet() {
  alphabetPreview.innerHTML = getAlphabet().map(char => `<span>${char}</span>`).join("");
}

function updateHeading() {
  algorithmName.textContent = cipherNames[cipherSelect.value];
  algorithmMode.textContent = alphabetSelect.value.toUpperCase();
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
  renderKeyControls();
  renderAlphabet();
  updateHeading();
  setMessage("Sẵn sàng xử lý dữ liệu.");
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