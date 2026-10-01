(() => {
  const chon_thuat_toan = document.getElementById('cipherSelect');
  const chon_bang_chu_cai = document.getElementById('alphabetSelect');
  const vung_nhap_khoa = document.getElementById('keyControls');
  const ban_ro = document.getElementById('plainText');
  const ban_ma = document.getElementById('cipherText');
  const thong_bao = document.getElementById('message');
  const ten_thuat_toan_hien_tai = document.getElementById('algorithmName');
  const che_do_thuat_toan = document.getElementById('algorithmMode');
  const xem_truoc_bang_chu_cai = document.getElementById('alphabetPreview');
  const nut_ma_hoa = document.getElementById('encryptButton');
  const nut_giai_ma = document.getElementById('decryptButton');
  const luoi_dieu_khien = document.querySelector('.control-grid');
  const dai_bang_chu_cai = document.querySelector('.alphabet-strip');
  const tieu_de_thanh_tren = document.querySelector('.topbar-title');
  const nhan_thanh_tren = document.querySelector('.topbar-badge');
  const nhan_so_luong_thuat_toan = document.querySelector('.heading-chip');

  if (!chon_thuat_toan || !luoi_dieu_khien) return;

  const cac_thuat_toan = {
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
    bam: [
      ['md5', 'MD5'],
      ['sha256', 'SHA-256']
    ]
  };

  const ten_hien_thi = Object.fromEntries(Object.values(cac_thuat_toan).flat());
  const thuat_toan_nang_cao = new Set(['des', 'aes', 'rsa', 'md5', 'sha256']);
  const thuat_toan_bam = new Set(['md5', 'sha256']);

  const truong_nhom = document.createElement('label');
  truong_nhom.className = 'field crypto-category-field';
  truong_nhom.innerHTML = `
    <span>Nhóm thuật toán</span>
    <select id="categorySelect" aria-label="Nhóm thuật toán">
      <option value="classical">Mã hóa cổ điển</option>
      <option value="modern">Mã hóa hiện đại</option>
      <option value="public">Mã hóa công khai</option>
      <option value="hash">Hàm băm</option>
    </select>`;
  luoi_dieu_khien.insertBefore(truong_nhom, luoi_dieu_khien.firstElementChild);
  const chon_nhom = document.getElementById('categorySelect');

  const khung_bit = document.createElement('section');
  khung_bit.className = 'bit-panel';
  khung_bit.innerHTML = `
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
  dai_bang_chu_cai.insertAdjacentElement('afterend', khung_bit);

  const nut_an_hien_bit = document.getElementById('toggleBitsButton');
  const noi_dung_khung_bit = document.getElementById('bitPanelBody');
  const bit_ban_ro = document.getElementById('plainBits');
  const bit_khoa = document.getElementById('keyBits');

  tieu_de_thanh_tren.textContent = 'Công cụ mật mã';
  nhan_thanh_tren.textContent = 'Z26 / Z29 / DES / AES / RSA / HASH';
  if (nhan_so_luong_thuat_toan) nhan_so_luong_thuat_toan.textContent = '10 thuật toán';
  document.title = 'Công Cụ Mật Mã - Z26 / Z29 / DES / AES / RSA';

  const nhom_tieng_viet = {
    A:'AÀÁẢÃẠaàáảãạ', Ă:'ĂẰẮẲẴẶăằắẳẵặ', Â:'ÂẦẤẨẪẬâầấẩẫậ', B:'Bb', C:'Cc', D:'Dd', Đ:'Đđ',
    E:'EÈÉẺẼẸeèéẻẽẹ', Ê:'ÊỀẾỂỄỆêềếểễệ', G:'Gg', H:'Hh', I:'IÌÍỈĨỊiìíỉĩị', K:'Kk', L:'Ll', M:'Mm', N:'Nn',
    O:'OÒÓỎÕỌoòóỏõọ', Ô:'ÔỒỐỔỖỘôồốổỗộ', Ơ:'ƠỜỚỞỠỢơờớởỡợ', P:'Pp', Q:'Qq', R:'Rr', S:'Ss', T:'Tt',
    U:'UÙÚỦŨỤuùúủũụ', Ư:'ƯỪỨỬỮỰưừứửữự', V:'Vv', X:'Xx', Y:'YỲÝỶỸỴyỳýỷỹỵ'
  };
  const anh_xa_viet = new Map();
  Object.entries(nhom_tieng_viet).forEach(([base, chars]) => Array.from(chars).forEach(ch => anh_xa_viet.set(ch, base)));
  const bang_chu_cai = {
    z26: Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    z29: Array.from('AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY')
  };

  function dat_thong_bao(van_ban, loai = '') {
    thong_bao.textContent = van_ban;
    thong_bao.className = loai ? `message ${type}` : 'message';
  }

  function chuoi_sang_byte_utf8(van_ban) {
    return new TextEncoder().encode(van_ban);
  }

  function byte_sang_hex(bytes) {
    return Array.from(bytes, b => b.function toString() { [native code] }(16).padStart(2, '0')).join('').toUpperCase();
  }

  function hex_sang_byte(hex) {
    const clean = hex.replace(/\s+/g, '');
    if (clean.length % 2) throw new Error('Chuỗi hex không hợp lệ.');
    return new Uint8Array(clean.match(/.{2}/g).map(v => parseInt(v, 16)));
  }

  function byte_sang_base64(bytes) {
    let s = '';
    bytes.forEach(b => { s += String.fromCharCode(b); });
    return btoa(s);
  }

  function base64_sang_byte(gia_tri) {
    const s = atob(gia_tri.trim());
    return Uint8Array.from(s, c => c.charCodeAt(0));
  }

  function noi_byte(a, b) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a, 0); out.set(b, a.length);
    return out;
  }

  function chuan_hoa_theo_bang_chu_cai(ch) {
    if (chon_bang_chu_cai.gia_tri === 'z29') return anh_xa_viet.get(ch) || null;
    const upper = ch.toUpperCase();
    return /^[A-Z]$/.test(upper) ? upper : null;
  }

  function bit_theo_bang_chu_cai(van_ban) {
    const alphabet = bang_chu_cai[chon_bang_chu_cai.gia_tri];
    const parts = [];
    for (const ch of Array.from(van_ban)) {
      const canonical = chuan_hoa_theo_bang_chu_cai(ch);
      if (!canonical) continue;
      const index = alphabet.indexOf(canonical);
      if (index >= 0) parts.push(`${canonical}:${index.toString(2).padStart(5, '0')}`);
    }
    return parts.length ? parts.join('  ') : '—';
  }

  function chuoi_bit_utf8(van_ban) {
    const bytes = chuoi_sang_byte_utf8(van_ban);
    if (!bytes.length) return '—';
    return Array.from(bytes, b => b.function toString() { [native code] }(2).padStart(8, '0')).join(' ');
  }

  function lay_khoa_hien_tai() {
    const khoa = document.getElementById('advancedKey');
    return khoa ? khoa.gia_tri : '';
  }

  function lam_moi_bit() {
    bit_ban_ro.textContent = `Z${alphabetSelect.value.slice(1)}: ${alphabetBits(plainText.value)}\nUTF-8: ${utf8BitString(plainText.value)}`;
    const khoa = lay_khoa_hien_tai();
    bit_khoa.textContent = khoa ? `Z${alphabetSelect.value.slice(1)}: ${alphabetBits(key)}\nUTF-8: ${utf8BitString(key)}` : '—';
  }

  function kiem_tra_khoa_chu(gia_tri, nhan = 'Khóa') {
    const khoa = gia_tri.trim();
    if (!khoa) throw new Error(`${label} không được để trống.`);
    if (!/^[\p{L}\s]+$/u.test(khoa)) throw new Error(`${label} chỉ nhập bằng chữ cái.`);
    return khoa;
  }

  function hien_thi_khoa_nang_cao(thuat_toan) {
    if (thuat_toan === 'des') {
      vung_nhap_khoa.innerHTML = '<input id="advancedKey" type="text" value="MATKHAU" spellcheck="false" placeholder="Khóa chữ (tối đa 8 byte UTF-8)">';
    } else if (thuat_toan === 'aes') {
      vung_nhap_khoa.innerHTML = '<input id="advancedKey" type="text" value="PHENIKAA" spellcheck="false" placeholder="Khóa AES bằng chữ cái">';
    } else if (thuat_toan === 'rsa') {
      vung_nhap_khoa.innerHTML = '<input id="advancedKey" type="text" value="CONGKHAI" spellcheck="false" placeholder="Khóa chữ dùng để sinh cặp khóa RSA">';
    } else if (thuat_toan_bam.has(thuat_toan)) {
      vung_nhap_khoa.innerHTML = '<div class="key-note">Hàm băm không sử dụng khóa bí mật.</div>';
    }
    const khoa_nang_cao = document.getElementById('advancedKey');
    if (khoa_nang_cao) khoa_nang_cao.addEventListener('input', lam_moi_bit);
  }

  function lam_moi_giao_dien_nang_cao() {
    const thuat_toan = chon_thuat_toan.gia_tri;
    if (!thuat_toan_nang_cao.has(thuat_toan)) {
      nut_giai_ma.disabled = false;
      nut_giai_ma.title = '';
      lam_moi_bit();
      return;
    }
    hien_thi_khoa_nang_cao(thuat_toan);
    chon_bang_chu_cai.disabled = false;
    ten_thuat_toan_hien_tai.textContent = ten_hien_thi[thuat_toan];
    che_do_thuat_toan.textContent = thuat_toan === 'des' ? '64-BIT' : thuat_toan === 'aes' ? 'AES-128-GCM' : thuat_toan === 'rsa' ? 'RSA EDU' : 'HASH';
    xem_truoc_bang_chu_cai.innerHTML = bang_chu_cai[chon_bang_chu_cai.gia_tri].map(ch => `<span>${ch}</span>`).join('');
    ban_ro.placeholder = 'Nhập bản rõ bằng chữ cái tại đây...';
    if (thuat_toan === 'des') ban_ma.placeholder = 'Bản mã DES dạng hexadecimal';
    if (thuat_toan === 'aes') ban_ma.placeholder = 'Bản mã AES dạng Base64 (IV + ciphertext)';
    if (thuat_toan === 'rsa') ban_ma.placeholder = 'Bản mã RSA dạng dãy số, ngăn cách bằng dấu chấm';
    if (thuat_toan_bam.has(thuat_toan)) ban_ma.placeholder = 'Giá trị băm hexadecimal';
    nut_giai_ma.disabled = thuat_toan_bam.has(thuat_toan);
    nut_giai_ma.title = thuat_toan_bam.has(thuat_toan) ? 'Hàm băm là một chiều, không thể giải mã.' : '';
    dat_thong_bao(thuat_toan_bam.has(thuat_toan) ? 'Hàm băm là một chiều: chỉ tính digest, không giải mã.' : 'Nhập khóa và bản rõ bằng chữ; có thể xem biểu diễn bit bên dưới.');
    lam_moi_bit();
  }

  function dat_nhom(nhom) {
    const danh_sach = cac_thuat_toan[nhom];
    chon_thuat_toan.innerHTML = danh_sach.map(([gia_tri, nhan]) => `<option value="${value}">${label}</option>`).join('');
    chon_thuat_toan.dispatchEvent(new Event('change'));
  }

  chon_nhom.addEventListener('change', () => dat_nhom(chon_nhom.gia_tri));
  chon_thuat_toan.addEventListener('change', () => setTimeout(lam_moi_giao_dien_nang_cao, 0));
  chon_bang_chu_cai.addEventListener('change', () => setTimeout(lam_moi_giao_dien_nang_cao, 0));
  ban_ro.addEventListener('input', lam_moi_bit);
  nut_an_hien_bit.addEventListener('click', () => {
    const mo = noi_dung_khung_bit.hidden;
    noi_dung_khung_bit.hidden = !mo;
    nut_an_hien_bit.textContent = mo ? 'Ẩn bit' : 'Hiện bit';
    if (mo) lam_moi_bit();
  });

  // Phần thuật toán nằm trong thư mục algorithms/. File này chỉ điều phối giao diện.

  async function xu_ly_nang_cao(che_do) {
    const thuat_toan = chon_thuat_toan.gia_tri;
    if (!thuat_toan_nang_cao.has(thuat_toan)) return;
    const giai_ma = che_do === 'decrypt';
    try {
      const khoa = lay_khoa_hien_tai();
      if (thuat_toan === 'des') {
        if (giai_ma) ban_ro.gia_tri = window.thuat_toan_des.giai_ma_chu(ban_ma.gia_tri, khoa);
        else ban_ma.gia_tri = window.thuat_toan_des.ma_hoa_chu(ban_ro.gia_tri, khoa);
      } else if (thuat_toan === 'aes') {
        if (giai_ma) ban_ro.gia_tri = await window.thuat_toan_aes.giai_ma(ban_ma.gia_tri, khoa);
        else ban_ma.gia_tri = await window.thuat_toan_aes.ma_hoa(ban_ro.gia_tri, khoa);
      } else if (thuat_toan === 'rsa') {
        const ket_qua = giai_ma
          ? window.thuat_toan_rsa.giai_ma(ban_ma.gia_tri, khoa)
          : window.thuat_toan_rsa.ma_hoa(ban_ro.gia_tri, khoa);
        if (giai_ma) ban_ro.gia_tri = ket_qua.ban_ro_ket_qua;
        else ban_ma.gia_tri = ket_qua.ban_ma_ket_qua;
        che_do_thuat_toan.textContent = `RSA n=${result.n.toString()}`;
      } else if (thuat_toan === 'md5') {
        if (!ban_ro.gia_tri) throw new Error('Nhập dữ liệu trước khi băm.');
        ban_ma.gia_tri = window.thuat_toan_md5.bam(ban_ro.gia_tri);
      } else if (thuat_toan === 'sha256') {
        if (!ban_ro.gia_tri) throw new Error('Nhập dữ liệu trước khi băm.');
        ban_ma.gia_tri = await window.thuat_toan_sha_256.bam(ban_ro.gia_tri);
      }
      document.getElementById('plainCount').textContent = `${Array.from(plainText.value).length} ký tự`;
      document.getElementById('cipherCount').textContent = `${Array.from(cipherText.value).length} ký tự`;
      lam_moi_bit();
      dat_thong_bao(thuat_toan_bam.has(thuat_toan) ? 'Tạo giá trị băm thành công.' : (giai_ma ? 'Giải mã thành công.' : 'Mã hóa thành công.'), 'success');
    } catch (loi) {
      dat_thong_bao(loi.thong_bao || 'Có lỗi khi xử lý dữ liệu.', 'error');
    }
  }

  nut_ma_hoa.addEventListener('click', su_kien => {
    if (!thuat_toan_nang_cao.has(chon_thuat_toan.gia_tri)) return;
    su_kien.stopImmediatePropagation();
    su_kien.preventDefault();
    xu_ly_nang_cao('encrypt');
  }, true);

  nut_giai_ma.addEventListener('click', su_kien => {
    if (!thuat_toan_nang_cao.has(chon_thuat_toan.gia_tri)) return;
    su_kien.stopImmediatePropagation();
    su_kien.preventDefault();
    if (!thuat_toan_bam.has(chon_thuat_toan.gia_tri)) xu_ly_nang_cao('decrypt');
  }, true);

  dat_nhom('classical');
  lam_moi_bit();
})();
