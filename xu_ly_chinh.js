const bang_chu_cai = {
  z26: Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
  z29: Array.from("AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY")
};

const nhom_chu_tieng_viet = {
  A: "AÀÁẢÃẠaàáảãạ", Ă: "ĂẰẮẲẴẶăằắẳẵặ", Â: "ÂẦẤẨẪẬâầấẩẫậ",
  B: "Bb", C: "Cc", D: "Dd", Đ: "Đđ",
  E: "EÈÉẺẼẸeèéẻẽẹ", Ê: "ÊỀẾỂỄỆêềếểễệ",
  G: "Gg", H: "Hh", I: "IÌÍỈĨỊiìíỉĩị", K: "Kk", L: "Ll", M: "Mm", N: "Nn",
  O: "OÒÓỎÕỌoòóỏõọ", Ô: "ÔỒỐỔỖỘôồốổỗộ", Ơ: "ƠỜỚỞỠỢơờớởỡợ",
  P: "Pp", Q: "Qq", R: "Rr", S: "Ss", T: "Tt",
  U: "UÙÚỦŨỤuùúủũụ", Ư: "ƯỪỨỬỮỰưừứửữự", V: "Vv", X: "Xx",
  Y: "YỲÝỶỸỴyỳýỷỹỵ"
};

const anh_xa_tieng_viet = new Map();
Object.entries(nhom_chu_tieng_viet).forEach(([chu_goc, cac_ky_tu]) => {
  Array.from(cac_ky_tu).forEach(ky_tu => anh_xa_tieng_viet.set(ky_tu, chu_goc));
});

const ten_thuat_toan = {
  caesar: "Dịch vòng",
  substitution: "Mã thay thế",
  vigenere: "Mã Vigenere",
  affine: "Mã Affine",
  hill: "Mã Hill",
  des: "Mã DES"
};

const chon_thuat_toan = document.getElementById("cipherSelect");
const chon_bang_chu_cai = document.getElementById("alphabetSelect");
const vung_nhap_khoa = document.getElementById("keyControls");
const xem_truoc_bang_chu_cai = document.getElementById("alphabetPreview");
const ban_ro = document.getElementById("plainText");
const ban_ma = document.getElementById("cipherText");
const dem_ban_ro = document.getElementById("plainCount");
const dem_ban_ma = document.getElementById("cipherCount");
const ten_thuat_toan_hien_tai = document.getElementById("algorithmName");
const che_do_thuat_toan = document.getElementById("algorithmMode");
const thong_bao = document.getElementById("message");
const thanh_ben = document.querySelector(".sidebar");
const nut_menu = document.getElementById("menuButton");

function modulo(gia_tri, modulo_so) {
  return ((gia_tri % modulo_so) + modulo_so) % modulo_so;
}

function ucln(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const tam = y;
    y = x % y;
    x = tam;
  }
  return x;
}

function nghich_dao_modulo(gia_tri, modulo_so) {
  const gia_tri_chuan = modulo(gia_tri, modulo_so);
  for (let i = 1; i < modulo_so; i += 1) {
    if (modulo(gia_tri_chuan * i, modulo_so) === 1) return i;
  }
  return null;
}

function lay_bang_chu_cai() {
  return bang_chu_cai[chon_bang_chu_cai.value];
}

function chuan_hoa_ky_tu(ky_tu) {
  if (chon_bang_chu_cai.value === "z29") {
    return anh_xa_tieng_viet.get(ky_tu) || null;
  }
  const chu_hoa = ky_tu.toUpperCase();
  return /^[A-Z]$/.test(chu_hoa) ? chu_hoa : null;
}

function giu_kieu_chu(ban_dau, da_bien_doi) {
  if (ban_dau === ban_dau.toLowerCase() && ban_dau !== ban_dau.toUpperCase()) {
    return da_bien_doi.toLowerCase();
  }
  return da_bien_doi;
}

function bien_doi_ky_tu(van_ban, ham_bien_doi_chi_so) {
  const bang_chu = lay_bang_chu_cai();
  return Array.from(van_ban).map(ky_tu => {
    const ky_tu_chuan = chuan_hoa_ky_tu(ky_tu);
    if (!ky_tu_chuan) return ky_tu;
    const chi_so = bang_chu.indexOf(ky_tu_chuan);
    const chi_so_moi = modulo(ham_bien_doi_chi_so(chi_so), bang_chu.length);
    return giu_kieu_chu(ky_tu, bang_chu[chi_so_moi]);
  }).join("");
}

function lay_gia_tri_khoa(ma_dinh_danh) {
  const phan_tu = document.getElementById(ma_dinh_danh);
  return phan_tu ? phan_tu.value.trim() : "";
}

function chi_so_khoa(gia_tri) {
  const bang_chu = lay_bang_chu_cai();
  const ket_qua = [];
  Array.from(gia_tri).forEach(ky_tu => {
    const ky_tu_chuan = chuan_hoa_ky_tu(ky_tu);
    if (ky_tu_chuan) ket_qua.push(bang_chu.indexOf(ky_tu_chuan));
  });
  return ket_qua;
}

function xu_ly_van_ban(che_do) {
  const dang_giai_ma = che_do === "decrypt";
  const nguon = dang_giai_ma ? ban_ma.value : ban_ro.value;
  if (!nguon.length) {
    dat_thong_bao(dang_giai_ma ? "Nhập bản mã trước khi giải mã." : "Nhập bản rõ trước khi mã hóa.", "error");
    return;
  }

  try {
    let ket_qua = "";
    switch (chon_thuat_toan.value) {
      case "caesar": ket_qua = ma_dich_vong(nguon, dang_giai_ma); break;
      case "substitution": ket_qua = ma_thay_the(nguon, dang_giai_ma); break;
      case "vigenere": ket_qua = ma_vigenere(nguon, dang_giai_ma); break;
      case "affine": ket_qua = ma_affine(nguon, dang_giai_ma); break;
      case "hill": ket_qua = ma_hill(nguon, dang_giai_ma); break;
      case "des": ket_qua = ma_des(nguon, dang_giai_ma); break;
      default: throw new Error("Thuật toán không hợp lệ.");
    }

    if (dang_giai_ma) ban_ro.value = ket_qua;
    else ban_ma.value = ket_qua;

    cap_nhat_bo_dem();
    dat_thong_bao(dang_giai_ma ? "Giải mã thành công." : "Mã hóa thành công.", "success");
  } catch (loi) {
    dat_thong_bao(loi.message || "Có lỗi khi xử lý dữ liệu.", "error");
  }
}

function hien_thi_o_nhap_khoa() {
  const thuat_toan = chon_thuat_toan.value;
  if (thuat_toan === "caesar") {
    vung_nhap_khoa.innerHTML = '<input id="shiftKey" type="number" value="3" placeholder="Độ dịch">';
  } else if (thuat_toan === "substitution") {
    vung_nhap_khoa.innerHTML = '<input id="substitutionKey" type="text" value="KHOA" placeholder="Từ khóa hoặc chuỗi thay thế">';
  } else if (thuat_toan === "vigenere") {
    vung_nhap_khoa.innerHTML = '<input id="vigenereKey" type="text" value="KEY" placeholder="Khóa Vigenere">';
  } else if (thuat_toan === "affine") {
    vung_nhap_khoa.innerHTML = '<div class="key-inline"><input id="affineA" type="number" value="5" placeholder="a"><input id="affineB" type="number" value="8" placeholder="b"></div>';
  } else if (thuat_toan === "hill") {
    vung_nhap_khoa.innerHTML = '<div class="hill-grid"><input id="hillA" type="number" value="3" aria-label="a"><input id="hillB" type="number" value="3" aria-label="b"><input id="hillC" type="number" value="2" aria-label="c"><input id="hillD" type="number" value="5" aria-label="d"></div>';
  } else if (thuat_toan === "des") {
    vung_nhap_khoa.innerHTML = '<input id="desKey" type="text" value="AABB09182736CCDD" maxlength="16" spellcheck="false" placeholder="16 ký tự hex / 64 bit">';
  }
}

function hien_thi_bang_chu_cai() {
  if (chon_thuat_toan.value === "des") {
    xem_truoc_bang_chu_cai.innerHTML = "<span>HEX</span><span>64 BIT</span><span>1 BLOCK</span>";
    return;
  }
  xem_truoc_bang_chu_cai.innerHTML = lay_bang_chu_cai().map(ky_tu => `<span>${ky_tu}</span>`).join("");
}

function cap_nhat_tieu_de() {
  ten_thuat_toan_hien_tai.textContent = ten_thuat_toan[chon_thuat_toan.value] || "Thuật toán";
  che_do_thuat_toan.textContent = chon_thuat_toan.value === "des"
    ? "HEX 64-BIT"
    : chon_bang_chu_cai.value.toUpperCase();
}

function cap_nhat_bo_dem() {
  dem_ban_ro.textContent = `${Array.from(ban_ro.value).length} ký tự`;
  dem_ban_ma.textContent = `${Array.from(ban_ma.value).length} ký tự`;
}

function dat_thong_bao(van_ban, loai = "") {
  thong_bao.textContent = van_ban;
  thong_bao.className = loai ? `message ${loai}` : "message";
}

function lam_moi_giao_dien() {
  const la_des = chon_thuat_toan.value === "des";
  chon_bang_chu_cai.disabled = la_des;
  ban_ro.placeholder = la_des ? "Ví dụ: 123456ABCD132536" : "Nhập bản rõ tại đây...";
  ban_ma.placeholder = la_des ? "Bản mã DES gồm 16 ký tự hex" : "Nhập hoặc nhận bản mã tại đây...";
  hien_thi_o_nhap_khoa();
  hien_thi_bang_chu_cai();
  cap_nhat_tieu_de();
  dat_thong_bao(la_des ? "DES xử lý đúng 1 khối 64 bit ở dạng hexadecimal." : "Sẵn sàng xử lý dữ liệu.");
}

document.getElementById("encryptButton").addEventListener("click", () => xu_ly_van_ban("encrypt"));
document.getElementById("decryptButton").addEventListener("click", () => xu_ly_van_ban("decrypt"));
document.getElementById("clearButton").addEventListener("click", () => {
  ban_ro.value = "";
  ban_ma.value = "";
  cap_nhat_bo_dem();
  dat_thong_bao("Đã xóa nội dung.");
});
document.getElementById("swapButton").addEventListener("click", () => {
  const hien_tai = ban_ro.value;
  ban_ro.value = ban_ma.value;
  ban_ma.value = hien_tai;
  cap_nhat_bo_dem();
  dat_thong_bao("Đã đổi vị trí bản rõ và bản mã.");
});

chon_thuat_toan.addEventListener("change", lam_moi_giao_dien);
chon_bang_chu_cai.addEventListener("change", lam_moi_giao_dien);
ban_ro.addEventListener("input", cap_nhat_bo_dem);
ban_ma.addEventListener("input", cap_nhat_bo_dem);
nut_menu.addEventListener("click", () => thanh_ben.classList.toggle("open"));

document.addEventListener("click", su_kien => {
  if (
    window.innerWidth <= 760 &&
    thanh_ben.classList.contains("open") &&
    !thanh_ben.contains(su_kien.target) &&
    su_kien.target !== nut_menu
  ) {
    thanh_ben.classList.remove("open");
  }
});

lam_moi_giao_dien();
cap_nhat_bo_dem();