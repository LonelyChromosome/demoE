(() => {
  const cipherSelect = document.getElementById('cipherSelect');
  const alphabetSelect = document.getElementById('alphabetSelect');
  const keyControls = document.getElementById('keyControls');
  const plainText = document.getElementById('plainText');
  const cipherText = document.getElementById('cipherText');
  const message = document.getElementById('message');
  const algorithmName = document.getElementById('algorithmName');
  const algorithmMode = document.getElementById('algorithmMode');
  const alphabetPreview = document.getElementById('alphabetPreview');
  const encryptButton = document.getElementById('encryptButton');
  const decryptButton = document.getElementById('decryptButton');
  const controlGrid = document.querySelector('.control-grid');
  const alphabetStrip = document.querySelector('.alphabet-strip');
  const topbarTitle = document.querySelector('.topbar-title');
  const topbarBadge = document.querySelector('.topbar-badge');
  const headingChip = document.querySelector('.heading-chip');

  if (!cipherSelect || !controlGrid) return;

  const algorithms = {
    classical: [
      ['caesar', 'Dịch vòng'],
      ['substitution', 'Mã thay thế'],
      ['vigenere', 'Mã Vigenere'],
      ['affine', 'Mã Affine'],
      ['hill', 'Mã Hill']
    ],
    modern: [
      ['des', 'DES'],
      ['aes', 'AES-128-GCM']
    ],
    public: [['rsa', 'RSA']],
    hash: [
      ['md5', 'MD5'],
      ['sha256', 'SHA-256']
    ]
  };

  const displayNames = Object.fromEntries(Object.values(algorithms).flat());
  const advancedAlgorithms = new Set(['des', 'aes', 'rsa', 'md5', 'sha256']);
  const hashAlgorithms = new Set(['md5', 'sha256']);

  const categoryField = document.createElement('label');
  categoryField.className = 'field crypto-category-field';
  categoryField.innerHTML = `
    <span>Nhóm thuật toán</span>
    <select id="categorySelect" aria-label="Nhóm thuật toán">
      <option value="classical">Mã hóa cổ điển</option>
      <option value="modern">Mã hóa hiện đại</option>
      <option value="public">Mã hóa công khai</option>
      <option value="hash">Hàm băm</option>
    </select>`;
  controlGrid.insertBefore(categoryField, controlGrid.firstElementChild);
  const categorySelect = document.getElementById('categorySelect');

  const bitPanel = document.createElement('section');
  bitPanel.className = 'bit-panel';
  bitPanel.innerHTML = `
    <div class="bit-panel-head">
      <div>
        <strong>Chuyển chữ sang bit</strong>
        <small id="bitHint">Ánh xạ theo bảng chữ cái đang chọn và UTF-8</small>
      </div>
      <button type="button" id="toggleBitsButton" class="action-button outline bit-toggle">Hiện bit</button>
    </div>
    <div id="bitPanelBody" class="bit-panel-body" hidden>
      <div class="bit-box"><span>Bản rõ</span><pre id="plainBits">—</pre></div>
      <div class="bit-box"><span>Khóa</span><pre id="keyBits">—</pre></div>
    </div>`;
  alphabetStrip.insertAdjacentElement('afterend', bitPanel);

  const toggleBitsButton = document.getElementById('toggleBitsButton');
  const bitPanelBody = document.getElementById('bitPanelBody');
  const plainBits = document.getElementById('plainBits');
  const keyBits = document.getElementById('keyBits');

  topbarTitle.textContent = 'Công cụ mật mã';
  topbarBadge.textContent = 'Z26 / Z29 / DES / AES / RSA / HASH';
  if (headingChip) headingChip.textContent = '10 thuật toán';
  document.title = 'Công Cụ Mật Mã - Z26 / Z29 / DES / AES / RSA';

  const vnGroups = {
    A:'AÀÁẢÃẠaàáảãạ', Ă:'ĂẰẮẲẴẶăằắẳẵặ', Â:'ÂẦẤẨẪẬâầấẩẫậ', B:'Bb', C:'Cc', D:'Dd', Đ:'Đđ',
    E:'EÈÉẺẼẸeèéẻẽẹ', Ê:'ÊỀẾỂỄỆêềếểễệ', G:'Gg', H:'Hh', I:'IÌÍỈĨỊiìíỉĩị', K:'Kk', L:'Ll', M:'Mm', N:'Nn',
    O:'OÒÓỎÕỌoòóỏõọ', Ô:'ÔỒỐỔỖỘôồốổỗộ', Ơ:'ƠỜỚỞỠỢơờớởỡợ', P:'Pp', Q:'Qq', R:'Rr', S:'Ss', T:'Tt',
    U:'UÙÚỦŨỤuùúủũụ', Ư:'ƯỪỨỬỮỰưừứửữự', V:'Vv', X:'Xx', Y:'YỲÝỶỸỴyỳýỷỹỵ'
  };
  const vnMap = new Map();
  Object.entries(vnGroups).forEach(([base, chars]) => Array.from(chars).forEach(ch => vnMap.set(ch, base)));
  const alphabets = {
    z26: Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    z29: Array.from('AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY')
  };

  function setMessage(text, type = '') {
    message.textContent = text;
    message.className = type ? `message ${type}` : 'message';
  }

  function utf8Bytes(text) {
    return new TextEncoder().encode(text);
  }

  function bytesToHex(bytes) {
    return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  function hexToBytes(hex) {
    const clean = hex.replace(/\s+/g, '');
    if (clean.length % 2) throw new Error('Chuỗi hex không hợp lệ.');
    return new Uint8Array(clean.match(/.{2}/g).map(v => parseInt(v, 16)));
  }

  function bytesToBase64(bytes) {
    let s = '';
    bytes.forEach(b => { s += String.fromCharCode(b); });
    return btoa(s);
  }

  function base64ToBytes(value) {
    const s = atob(value.trim());
    return Uint8Array.from(s, c => c.charCodeAt(0));
  }

  function concatBytes(a, b) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a, 0); out.set(b, a.length);
    return out;
  }

  function canonicalForAlphabet(ch) {
    if (alphabetSelect.value === 'z29') return vnMap.get(ch) || null;
    const upper = ch.toUpperCase();
    return /^[A-Z]$/.test(upper) ? upper : null;
  }

  function alphabetBits(text) {
    const alphabet = alphabets[alphabetSelect.value];
    const parts = [];
    for (const ch of Array.from(text)) {
      const canonical = canonicalForAlphabet(ch);
      if (!canonical) continue;
      const index = alphabet.indexOf(canonical);
      if (index >= 0) parts.push(`${canonical}:${index.toString(2).padStart(5, '0')}`);
    }
    return parts.length ? parts.join('  ') : '—';
  }

  function utf8BitString(text) {
    const bytes = utf8Bytes(text);
    if (!bytes.length) return '—';
    return Array.from(bytes, b => b.toString(2).padStart(8, '0')).join(' ');
  }

  function currentKeyText() {
    const key = document.getElementById('advancedKey');
    return key ? key.value : '';
  }

  function refreshBits() {
    plainBits.textContent = `Z${alphabetSelect.value.slice(1)}: ${alphabetBits(plainText.value)}\nUTF-8: ${utf8BitString(plainText.value)}`;
    const key = currentKeyText();
    keyBits.textContent = key ? `Z${alphabetSelect.value.slice(1)}: ${alphabetBits(key)}\nUTF-8: ${utf8BitString(key)}` : '—';
  }

  function requireLetterKey(value, label = 'Khóa') {
    const key = value.trim();
    if (!key) throw new Error(`${label} không được để trống.`);
    if (!/^[\p{L}\s]+$/u.test(key)) throw new Error(`${label} chỉ nhập bằng chữ cái.`);
    return key;
  }

  function renderAdvancedKeyControls(algo) {
    if (algo === 'des') {
      keyControls.innerHTML = '<input id="advancedKey" type="text" value="MATKHAU" spellcheck="false" placeholder="Khóa chữ (tối đa 8 byte UTF-8)">';
    } else if (algo === 'aes') {
      keyControls.innerHTML = '<input id="advancedKey" type="text" value="PHENIKAA" spellcheck="false" placeholder="Khóa AES bằng chữ cái">';
    } else if (algo === 'rsa') {
      keyControls.innerHTML = '<input id="advancedKey" type="text" value="CONGKHAI" spellcheck="false" placeholder="Khóa chữ dùng để sinh cặp khóa RSA">';
    } else if (hashAlgorithms.has(algo)) {
      keyControls.innerHTML = '<div class="key-note">Hàm băm không sử dụng khóa bí mật.</div>';
    }
    const advancedKey = document.getElementById('advancedKey');
    if (advancedKey) advancedKey.addEventListener('input', refreshBits);
  }

  function refreshAdvancedUi() {
    const algo = cipherSelect.value;
    if (!advancedAlgorithms.has(algo)) {
      decryptButton.disabled = false;
      decryptButton.title = '';
      refreshBits();
      return;
    }
    renderAdvancedKeyControls(algo);
    alphabetSelect.disabled = false;
    algorithmName.textContent = displayNames[algo];
    algorithmMode.textContent = algo === 'des' ? '64-BIT' : algo === 'aes' ? 'AES-128-GCM' : algo === 'rsa' ? 'RSA EDU' : 'HASH';
    alphabetPreview.innerHTML = alphabets[alphabetSelect.value].map(ch => `<span>${ch}</span>`).join('');
    plainText.placeholder = 'Nhập bản rõ bằng chữ cái tại đây...';
    if (algo === 'des') cipherText.placeholder = 'Bản mã DES dạng hexadecimal';
    if (algo === 'aes') cipherText.placeholder = 'Bản mã AES dạng Base64 (IV + ciphertext)';
    if (algo === 'rsa') cipherText.placeholder = 'Bản mã RSA dạng dãy số, ngăn cách bằng dấu chấm';
    if (hashAlgorithms.has(algo)) cipherText.placeholder = 'Giá trị băm hexadecimal';
    decryptButton.disabled = hashAlgorithms.has(algo);
    decryptButton.title = hashAlgorithms.has(algo) ? 'Hàm băm là một chiều, không thể giải mã.' : '';
    setMessage(hashAlgorithms.has(algo) ? 'Hàm băm là một chiều: chỉ tính digest, không giải mã.' : 'Nhập khóa và bản rõ bằng chữ; có thể xem biểu diễn bit bên dưới.');
    refreshBits();
  }

  function setCategory(category) {
    const list = algorithms[category];
    cipherSelect.innerHTML = list.map(([value, label]) => `<option value="${value}">${label}</option>`).join('');
    cipherSelect.dispatchEvent(new Event('change'));
  }

  categorySelect.addEventListener('change', () => setCategory(categorySelect.value));
  cipherSelect.addEventListener('change', () => setTimeout(refreshAdvancedUi, 0));
  alphabetSelect.addEventListener('change', () => setTimeout(refreshAdvancedUi, 0));
  plainText.addEventListener('input', refreshBits);
  toggleBitsButton.addEventListener('click', () => {
    const open = bitPanelBody.hidden;
    bitPanelBody.hidden = !open;
    toggleBitsButton.textContent = open ? 'Ẩn bit' : 'Hiện bit';
    if (open) refreshBits();
  });

  function textToDesHex(text, label) {
    const value = text.trim();
    if (!value) throw new Error(`${label} không được để trống.`);
    if (!/^[\p{L}\s]+$/u.test(value)) throw new Error(`${label} DES chỉ nhập bằng chữ cái.`);
    const bytes = utf8Bytes(value);
    if (bytes.length > 8) throw new Error(`${label} DES tối đa 8 byte UTF-8.`);
    const block = new Uint8Array(8);
    block.set(bytes);
    return bytesToHex(block);
  }

  function desHexToText(hex) {
    const bytes = hexToBytes(hex);
    let end = bytes.length;
    while (end > 0 && bytes[end - 1] === 0) end -= 1;
    return new TextDecoder().decode(bytes.slice(0, end));
  }

  async function processDes(decrypt) {
    const keyHex = textToDesHex(requireLetterKey(currentKeyText()), 'Khóa');
    if (typeof window.desBlock !== 'function') throw new Error('Không tìm thấy lõi DES hiện tại.');
    if (!decrypt) {
      const dataHex = textToDesHex(plainText.value, 'Bản rõ');
      cipherText.value = window.desBlock(dataHex, keyHex, false);
    } else {
      const dataHex = cipherText.value.replace(/\s+/g, '').toUpperCase();
      if (!/^[0-9A-F]{16}$/.test(dataHex)) throw new Error('Bản mã DES phải gồm đúng 16 ký tự hex.');
      plainText.value = desHexToText(window.desBlock(dataHex, keyHex, true));
    }
  }

  async function aesKeyFromText(keyText) {
    requireLetterKey(keyText);
    const digest = await crypto.subtle.digest('SHA-256', utf8Bytes(keyText));
    return crypto.subtle.importKey('raw', new Uint8Array(digest).slice(0, 16), {name:'AES-GCM'}, false, ['encrypt', 'decrypt']);
  }

  async function processAes(decrypt) {
    if (!crypto.subtle) throw new Error('Trình duyệt không hỗ trợ Web Crypto API.');
    const key = await aesKeyFromText(currentKeyText());
    if (!decrypt) {
      if (!plainText.value) throw new Error('Nhập bản rõ trước khi mã hóa.');
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, utf8Bytes(plainText.value)));
      cipherText.value = bytesToBase64(concatBytes(iv, encrypted));
    } else {
      const packed = base64ToBytes(cipherText.value);
      if (packed.length < 13) throw new Error('Bản mã AES không hợp lệ.');
      const iv = packed.slice(0, 12);
      const data = packed.slice(12);
      const decrypted = await crypto.subtle.decrypt({name:'AES-GCM', iv}, key, data);
      plainText.value = new TextDecoder().decode(decrypted);
    }
  }

  function gcdBig(a, b) {
    let x = a < 0n ? -a : a;
    let y = b < 0n ? -b : b;
    while (y) [x, y] = [y, x % y];
    return x;
  }

  function modPow(base, exponent, modulus) {
    let result = 1n;
    let b = base % modulus;
    let e = exponent;
    while (e > 0n) {
      if (e & 1n) result = (result * b) % modulus;
      b = (b * b) % modulus;
      e >>= 1n;
    }
    return result;
  }

  function egcd(a, b) {
    if (b === 0n) return [a, 1n, 0n];
    const [g, x1, y1] = egcd(b, a % b);
    return [g, y1, x1 - (a / b) * y1];
  }

  function modInverseBig(a, m) {
    const [g, x] = egcd(a, m);
    if (g !== 1n) throw new Error('Không tìm được nghịch đảo mô-đun RSA.');
    return (x % m + m) % m;
  }

  function isPrime(n) {
    if (n < 2) return false;
    if (n % 2 === 0) return n === 2;
    for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
    return true;
  }

  function nextPrime(n) {
    let value = Math.max(257, Math.floor(n));
    if (value % 2 === 0) value += 1;
    while (!isPrime(value)) value += 2;
    return value;
  }

  function hashSeed(text) {
    let h = 2166136261 >>> 0;
    for (const b of utf8Bytes(text)) {
      h ^= b;
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  function rsaKeyFromText(keyText) {
    const key = requireLetterKey(keyText);
    const seed = hashSeed(key);
    const p = BigInt(nextPrime(2000 + (seed % 5000)));
    let qNum = nextPrime(8000 + ((seed >>> 8) % 7000));
    if (BigInt(qNum) === p) qNum = nextPrime(qNum + 2);
    const q = BigInt(qNum);
    const n = p * q;
    const phi = (p - 1n) * (q - 1n);
    let e = 65537n;
    if (gcdBig(e, phi) !== 1n) e = 257n;
    if (gcdBig(e, phi) !== 1n) e = 17n;
    const d = modInverseBig(e, phi);
    return {p, q, n, e, d};
  }

  function processRsa(decrypt) {
    const {n, e, d} = rsaKeyFromText(currentKeyText());
    if (!decrypt) {
      if (!plainText.value) throw new Error('Nhập bản rõ trước khi mã hóa.');
      const encrypted = Array.from(utf8Bytes(plainText.value), b => modPow(BigInt(b), e, n).toString());
      cipherText.value = encrypted.join('.');
    } else {
      const chunks = cipherText.value.trim().split('.').filter(Boolean);
      if (!chunks.length || chunks.some(v => !/^\d+$/.test(v))) throw new Error('Bản mã RSA không hợp lệ.');
      const bytes = Uint8Array.from(chunks.map(v => Number(modPow(BigInt(v), d, n))));
      plainText.value = new TextDecoder().decode(bytes);
    }
    algorithmMode.textContent = `RSA n=${n.toString()}`;
  }

  function md5(text) {
    function add(x, y) { return (((x >>> 0) + (y >>> 0)) & 0xffffffff) | 0; }
    function rol(x, c) { return (x << c) | (x >>> (32 - c)); }
    const bytes = Array.from(utf8Bytes(text));
    const bitLen = bytes.length * 8;
    bytes.push(0x80);
    while ((bytes.length % 64) !== 56) bytes.push(0);
    for (let i = 0; i < 8; i++) bytes.push((bitLen / Math.pow(256, i)) & 0xff);
    let a0 = 0x67452301 | 0, b0 = 0xefcdab89 | 0, c0 = 0x98badcfe | 0, d0 = 0x10325476 | 0;
    const s = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
    const K = Array.from({length:64}, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) | 0);
    for (let offset = 0; offset < bytes.length; offset += 64) {
      const M = new Array(16).fill(0).map((_, i) =>
        (bytes[offset+i*4]) | (bytes[offset+i*4+1] << 8) | (bytes[offset+i*4+2] << 16) | (bytes[offset+i*4+3] << 24));
      let A=a0, B=b0, C=c0, D=d0;
      for (let i=0;i<64;i++) {
        let F, g;
        if (i<16) { F=(B&C)|((~B)&D); g=i; }
        else if (i<32) { F=(D&B)|((~D)&C); g=(5*i+1)%16; }
        else if (i<48) { F=B^C^D; g=(3*i+5)%16; }
        else { F=C^(B|(~D)); g=(7*i)%16; }
        const temp=D; D=C; C=B;
        B=add(B, rol(add(add(add(A,F),K[i]),M[g]), s[i]));
        A=temp;
      }
      a0=add(a0,A); b0=add(b0,B); c0=add(c0,C); d0=add(d0,D);
    }
    const out = [];
    for (const word of [a0,b0,c0,d0]) for (let i=0;i<4;i++) out.push((word >>> (8*i)) & 0xff);
    return out.map(b => b.toString(16).padStart(2,'0')).join('');
  }

  async function sha256(text) {
    const digest = await crypto.subtle.digest('SHA-256', utf8Bytes(text));
    return bytesToHex(new Uint8Array(digest)).toLowerCase();
  }

  async function processHash(algo) {
    if (!plainText.value) throw new Error('Nhập dữ liệu trước khi băm.');
    cipherText.value = algo === 'md5' ? md5(plainText.value) : await sha256(plainText.value);
  }

  async function handleAdvanced(mode) {
    const algo = cipherSelect.value;
    if (!advancedAlgorithms.has(algo)) return;
    const decrypt = mode === 'decrypt';
    try {
      if (algo === 'des') await processDes(decrypt);
      else if (algo === 'aes') await processAes(decrypt);
      else if (algo === 'rsa') processRsa(decrypt);
      else if (hashAlgorithms.has(algo)) await processHash(algo);
      document.getElementById('plainCount').textContent = `${Array.from(plainText.value).length} ký tự`;
      document.getElementById('cipherCount').textContent = `${Array.from(cipherText.value).length} ký tự`;
      refreshBits();
      setMessage(hashAlgorithms.has(algo) ? 'Tạo giá trị băm thành công.' : (decrypt ? 'Giải mã thành công.' : 'Mã hóa thành công.'), 'success');
    } catch (error) {
      setMessage(error.message || 'Có lỗi khi xử lý dữ liệu.', 'error');
    }
  }

  encryptButton.addEventListener('click', event => {
    if (!advancedAlgorithms.has(cipherSelect.value)) return;
    event.stopImmediatePropagation();
    event.preventDefault();
    handleAdvanced('encrypt');
  }, true);

  decryptButton.addEventListener('click', event => {
    if (!advancedAlgorithms.has(cipherSelect.value)) return;
    event.stopImmediatePropagation();
    event.preventDefault();
    if (!hashAlgorithms.has(cipherSelect.value)) handleAdvanced('decrypt');
  }, true);

  setCategory('classical');
  refreshBits();
})();
