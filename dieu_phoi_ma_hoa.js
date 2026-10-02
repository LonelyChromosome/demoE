(() => {
  const chon_thuat_toan = document.getElementById("cipherSelect");
  const chon_bang_chu_cai = document.getElementById("alphabetSelect");
  const vung_nhap_khoa = document.getElementById("keyControls");
  const ban_ro = document.getElementById("plainText");
  const ban_ma = document.getElementById("cipherText");
  const thong_bao = document.getElementById("message");
  const ten_thuat_toan_hien_tai = document.getElementById("algorithmName");
  const che_do_thuat_toan = document.getElementById("algorithmMode");
  const xem_truoc_bang_chu_cai = document.getElementById("alphabetPreview");
  const nut_ma_hoa = document.getElementById("encryptButton");
  const nut_giai_ma = document.getElementById("decryptButton");
  const luoi_dieu_khien = document.querySelector(".control-grid");
  const dai_bang_chu_cai = document.querySelector(".alphabet-strip");
  const tieu_de_thanh_tren = document.querySelector(".topbar-title");
  const nhan_thanh_tren = document.querySelector(".topbar-badge");
  const nhan_so_luong_thuat_toan = document.querySelector(".heading-chip");

  if (!chon_thuat_toan || !luoi_dieu_khien) return;

  const cac_thuat_toan = {
    classical: [
      ["caesar", "Dịch vòng"],
      ["substitution", "Mã thay thế"],
      ["vigenere", "Mã Vigenere"],
      ["affine", "Mã Affine"],
      ["hill", "Mã Hill"]
    ],
    modern: [
      ["des", "DES"],
      ["aes", "AES-128-GCM"]
    ],
    public: [["rsa", "RSA"]],
    hash: [
      ["md5", "MD5"],
      ["sha1", "SHA-1"],
      ["sha256", "SHA-256"],
      ["sha512", "SHA-512"]
    ]
  };

  const ten_hien_thi = Object.fromEntries(Object.values(cac_thuat_toan).flat());
  const thuat_toan_nang_cao = new Set(["des", "aes", "rsa", "md5", "sha1", "sha256", "sha512"]);
  const thuat_toan_bam = new Set(["md5", "sha1", "sha256", "sha512"]);

  const truong_nhom = document.createElement("label");
  truong_nhom.className = "field crypto-category-field";
  truong_nhom.innerHTML = `
    <span>Nhóm thuật toán</span>
    <select id="categorySelect" aria-label="Nhóm thuật toán">
      <option value="classical">Mã hóa cổ điển</option>
      <option value="modern">Mã hóa hiện đại</option>
      <option value="public">Mã hóa công khai</option>
      <option value="hash">Hàm băm</option>
    </select>`;
  luoi_dieu_khien.insertBefore(truong_nhom, luoi_dieu_khien.firstElementChild);

  const chon_nhom = document.getElementById("categorySelect");

  const khung_bit = document.createElement("section");
  khung_bit.className = "bit-panel";
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
  dai_bang_chu_cai.insertAdjacentElement("afterend", khung_bit);

  const nut_an_hien_bit = document.getElementById("toggleBitsButton");
  const noi_dung_khung_bit = document.getElementById("bitPanelBody");
  const bit_ban_ro = document.getElementById("plainBits");
  const bit_khoa = document.getElementById("keyBits");

  tieu_de_thanh_tren.textContent = "Công cụ mật mã";
  nhan_thanh_tren.textContent = "Z26 / Z29 / DES / AES / RSA / HASH";
  if (nhan_so_luong_thuat_toan) nhan_so_luong_thuat_toan.textContent = "12 thuật toán";
  document.title = "Công Cụ Mật Mã - Z26 / Z29 / DES / AES / RSA";

  const nhom_tieng_viet = {
    A:"AÀÁẢÃẠaàáảãạ", Ă:"ĂẰẮẲẴẶăằắẳẵặ", Â:"ÂẦẤẨẪẬâầấẩẫậ",
    B:"Bb", C:"Cc", D:"Dd", Đ:"Đđ",
    E:"EÈÉẺẼẸeèéẻẽẹ", Ê:"ÊỀẾỂỄỆêềếểễệ",
    G:"Gg", H:"Hh", I:"IÌÍỈĨỊiìíỉĩị", K:"Kk", L:"Ll", M:"Mm", N:"Nn",
    O:"OÒÓỎÕỌoòóỏõọ", Ô:"ÔỒỐỔỖỘôồốổỗộ", Ơ:"ƠỜỚỞỠỢơờớởỡợ",
    P:"Pp", Q:"Qq", R:"Rr", S:"Ss", T:"Tt",
    U:"UÙÚỦŨỤuùúủũụ", Ư:"ƯỪỨỬỮỰưừứửữự", V:"Vv", X:"Xx",
    Y:"YỲÝỶỸỴyỳýỷỹỵ"
  };

  const anh_xa_viet = new Map();
  Object.entries(nhom_tieng_viet).forEach(([chu_goc, cac_ky_tu]) => {
    Array.from(cac_ky_tu).forEach(ky_tu => anh_xa_viet.set(ky_tu, chu_goc));
  });

  const bang_chu_cai_bit = {
    z26: Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    z29: Array.from("AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY")
  };

  function dat_thong_bao_nang_cao(van_ban, loai = "") {
    thong_bao.textContent = van_ban;
    thong_bao.className = loai ? `message ${loai}` : "message";
  }

  function chuan_hoa_theo_bang_chu_cai(ky_tu) {
    if (chon_bang_chu_cai.value === "z29") return anh_xa_viet.get(ky_tu) || null;
    const chu_hoa = ky_tu.toUpperCase();
    return /^[A-Z]$/.test(chu_hoa) ? chu_hoa : null;
  }

  function bit_theo_bang_chu_cai(van_ban) {
    const bang_chu = bang_chu_cai_bit[chon_bang_chu_cai.value];
    const cac_phan = [];

    for (const ky_tu of Array.from(van_ban)) {
      const ky_tu_chuan = chuan_hoa_theo_bang_chu_cai(ky_tu);
      if (!ky_tu_chuan) continue;
      const chi_so = bang_chu.indexOf(ky_tu_chuan);
      if (chi_so >= 0) cac_phan.push(`${ky_tu_chuan}:${chi_so.toString(2).padStart(5, "0")}`);
    }

    return cac_phan.length ? cac_phan.join("  ") : "—";
  }

  function chuoi_bit_utf8(van_ban) {
    const cac_byte = window.tien_ich_ma_hoa.chuoi_sang_byte_utf8(van_ban);
    if (!cac_byte.length) return "—";
    return Array.from(cac_byte, byte => byte.toString(2).padStart(8, "0")).join(" ");
  }

  function lay_khoa_hien_tai() {
    const o_khoa = document.getElementById("advancedKey");
    return o_khoa ? o_khoa.value : "";
  }

  function lam_moi_bit() {
    bit_ban_ro.textContent =
      `Z${chon_bang_chu_cai.value.slice(1)}: ${bit_theo_bang_chu_cai(ban_ro.value)}\nUTF-8: ${chuoi_bit_utf8(ban_ro.value)}`;

    const khoa = lay_khoa_hien_tai();
    bit_khoa.textContent = khoa
      ? `Z${chon_bang_chu_cai.value.slice(1)}: ${bit_theo_bang_chu_cai(khoa)}\nUTF-8: ${chuoi_bit_utf8(khoa)}`
      : "—";
  }

  function hien_thi_khoa_nang_cao(thuat_toan) {
    if (thuat_toan === "des") {
      vung_nhap_khoa.innerHTML = '<input id="advancedKey" type="text" value="MATKHAU" spellcheck="false" placeholder="Khóa chữ (tối đa 8 byte UTF-8)">';
    } else if (thuat_toan === "aes") {
      vung_nhap_khoa.innerHTML = '<input id="advancedKey" type="text" value="PHENIKAA" spellcheck="false" placeholder="Khóa AES bằng chữ cái">';
    } else if (thuat_toan === "rsa") {
      vung_nhap_khoa.innerHTML = '<input id="advancedKey" type="text" value="CONGKHAI" spellcheck="false" placeholder="Khóa chữ dùng để sinh cặp khóa RSA">';
    } else if (thuat_toan_bam.has(thuat_toan)) {
      vung_nhap_khoa.innerHTML = '<div class="key-note">Hàm băm không sử dụng khóa bí mật.</div>';
    }

    const khoa_nang_cao = document.getElementById("advancedKey");
    if (khoa_nang_cao) khoa_nang_cao.addEventListener("input", lam_moi_bit);
  }

  function lam_moi_giao_dien_nang_cao() {
    const thuat_toan = chon_thuat_toan.value;

    if (!thuat_toan_nang_cao.has(thuat_toan)) {
      nut_giai_ma.disabled = false;
      nut_giai_ma.title = "";
      lam_moi_bit();
      return;
    }

    hien_thi_khoa_nang_cao(thuat_toan);
    chon_bang_chu_cai.disabled = false;
    ten_thuat_toan_hien_tai.textContent = ten_hien_thi[thuat_toan];
    che_do_thuat_toan.textContent =
      thuat_toan === "des" ? "64-BIT" :
      thuat_toan === "aes" ? "AES-128-GCM" :
      thuat_toan === "rsa" ? "RSA EDU" : "HASH";

    xem_truoc_bang_chu_cai.innerHTML =
      bang_chu_cai_bit[chon_bang_chu_cai.value].map(ky_tu => `<span>${ky_tu}</span>`).join("");

    ban_ro.placeholder = "Nhập bản rõ bằng chữ cái tại đây...";
    if (thuat_toan === "des") ban_ma.placeholder = "Bản mã DES dạng hexadecimal";
    else if (thuat_toan === "aes") ban_ma.placeholder = "Bản mã AES dạng Base64 (IV + ciphertext)";
    else if (thuat_toan === "rsa") ban_ma.placeholder = "Bản mã RSA dạng dãy số, ngăn cách bằng dấu chấm";
    else ban_ma.placeholder = "Giá trị băm hexadecimal";

    nut_giai_ma.disabled = thuat_toan_bam.has(thuat_toan);
    nut_giai_ma.title = thuat_toan_bam.has(thuat_toan)
      ? "Hàm băm là một chiều, không thể giải mã."
      : "";

    dat_thong_bao_nang_cao(
      thuat_toan_bam.has(thuat_toan)
        ? "Hàm băm là một chiều: chỉ tính digest, không giải mã."
        : "Nhập khóa và bản rõ bằng chữ; có thể xem biểu diễn bit bên dưới."
    );

    lam_moi_bit();
  }

  function dat_nhom(nhom) {
    const danh_sach = cac_thuat_toan[nhom];
    if (!danh_sach) return;

    chon_thuat_toan.innerHTML = danh_sach
      .map(([gia_tri, nhan]) => `<option value="${gia_tri}">${nhan}</option>`)
      .join("");

    chon_thuat_toan.dispatchEvent(new Event("change"));
  }

  chon_nhom.addEventListener("change", () => dat_nhom(chon_nhom.value));
  chon_thuat_toan.addEventListener("change", () => setTimeout(lam_moi_giao_dien_nang_cao, 0));
  chon_bang_chu_cai.addEventListener("change", () => setTimeout(lam_moi_giao_dien_nang_cao, 0));
  ban_ro.addEventListener("input", lam_moi_bit);

  nut_an_hien_bit.addEventListener("click", () => {
    const dang_mo = noi_dung_khung_bit.hidden;
    noi_dung_khung_bit.hidden = !dang_mo;
    nut_an_hien_bit.textContent = dang_mo ? "Ẩn bit" : "Hiện bit";
    if (dang_mo) lam_moi_bit();
  });

  async function xu_ly_nang_cao(che_do) {
    const thuat_toan = chon_thuat_toan.value;
    if (!thuat_toan_nang_cao.has(thuat_toan)) return;

    const dang_giai_ma = che_do === "decrypt";

    try {
      const khoa = lay_khoa_hien_tai();

      if (thuat_toan === "des") {
        if (dang_giai_ma) {
          ban_ro.value = window.thuat_toan_des.giai_ma_chu(ban_ma.value, khoa);
        } else {
          ban_ma.value = window.thuat_toan_des.ma_hoa_chu(ban_ro.value, khoa);
        }
      } else if (thuat_toan === "aes") {
        if (dang_giai_ma) {
          ban_ro.value = await window.thuat_toan_aes.giai_ma(ban_ma.value, khoa);
        } else {
          ban_ma.value = await window.thuat_toan_aes.ma_hoa(ban_ro.value, khoa);
        }
      } else if (thuat_toan === "rsa") {
        const ket_qua = dang_giai_ma
          ? window.thuat_toan_rsa.giai_ma(ban_ma.value, khoa)
          : window.thuat_toan_rsa.ma_hoa(ban_ro.value, khoa);

        if (dang_giai_ma) ban_ro.value = ket_qua.ban_ro_ket_qua;
        else ban_ma.value = ket_qua.ban_ma_ket_qua;

        che_do_thuat_toan.textContent = `RSA n=${ket_qua.n.toString()}`;
      } else if (thuat_toan === "md5") {
        if (!ban_ro.value) throw new Error("Nhập dữ liệu trước khi băm.");
        ban_ma.value = window.thuat_toan_md5.bam(ban_ro.value);
      } else if (thuat_toan === "sha1") {
        if (!ban_ro.value) throw new Error("Nhập dữ liệu trước khi băm.");
        ban_ma.value = await window.thuat_toan_sha_1.bam(ban_ro.value);
      } else if (thuat_toan === "sha256") {
        if (!ban_ro.value) throw new Error("Nhập dữ liệu trước khi băm.");
        ban_ma.value = await window.thuat_toan_sha_256.bam(ban_ro.value);
      } else if (thuat_toan === "sha512") {
        if (!ban_ro.value) throw new Error("Nhập dữ liệu trước khi băm.");
        ban_ma.value = await window.thuat_toan_sha_512.bam(ban_ro.value);
      }

      dem_lai_ky_tu();
      lam_moi_bit();
      dat_thong_bao_nang_cao(
        thuat_toan_bam.has(thuat_toan)
          ? "Tạo giá trị băm thành công."
          : (dang_giai_ma ? "Giải mã thành công." : "Mã hóa thành công."),
        "success"
      );
    } catch (loi) {
      dat_thong_bao_nang_cao(loi.message || "Có lỗi khi xử lý dữ liệu.", "error");
    }
  }

  function dem_lai_ky_tu() {
    document.getElementById("plainCount").textContent = `${Array.from(ban_ro.value).length} ký tự`;
    document.getElementById("cipherCount").textContent = `${Array.from(ban_ma.value).length} ký tự`;
  }

  nut_ma_hoa.addEventListener("click", su_kien => {
    if (!thuat_toan_nang_cao.has(chon_thuat_toan.value)) return;
    su_kien.stopImmediatePropagation();
    su_kien.preventDefault();
    xu_ly_nang_cao("encrypt");
  }, true);

  nut_giai_ma.addEventListener("click", su_kien => {
    if (!thuat_toan_nang_cao.has(chon_thuat_toan.value)) return;
    su_kien.stopImmediatePropagation();
    su_kien.preventDefault();
    if (!thuat_toan_bam.has(chon_thuat_toan.value)) xu_ly_nang_cao("decrypt");
  }, true);

  dat_nhom("classical");
  lam_moi_bit();
})();