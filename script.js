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

// Thuật toán được tách riêng trong thư mục algorithms/.\n\nfunction processText(mode) {
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