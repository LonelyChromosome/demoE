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

  // Phần thuật toán nằm trong thư mục algorithms/. File này chỉ điều phối giao diện.

  async function handleAdvanced(mode) {
    const algo = cipherSelect.value;
    if (!advancedAlgorithms.has(algo)) return;
    const decrypt = mode === 'decrypt';
    try {
      const key = currentKeyText();
      if (algo === 'des') {
        if (decrypt) plainText.value = window.DESAlgorithm.decryptText(cipherText.value, key);
        else cipherText.value = window.DESAlgorithm.encryptText(plainText.value, key);
      } else if (algo === 'aes') {
        if (decrypt) plainText.value = await window.AESAlgorithm.decrypt(cipherText.value, key);
        else cipherText.value = await window.AESAlgorithm.encrypt(plainText.value, key);
      } else if (algo === 'rsa') {
        const result = decrypt
          ? window.RSAAlgorithm.decrypt(cipherText.value, key)
          : window.RSAAlgorithm.encrypt(plainText.value, key);
        if (decrypt) plainText.value = result.plain;
        else cipherText.value = result.cipher;
        algorithmMode.textContent = `RSA n=${result.n.toString()}`;
      } else if (algo === 'md5') {
        if (!plainText.value) throw new Error('Nhập dữ liệu trước khi băm.');
        cipherText.value = window.MD5Algorithm.hash(plainText.value);
      } else if (algo === 'sha256') {
        if (!plainText.value) throw new Error('Nhập dữ liệu trước khi băm.');
        cipherText.value = await window.SHA256Algorithm.hash(plainText.value);
      }
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
