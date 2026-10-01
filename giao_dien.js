const lien_ket_giao_dien_facebook = document.createElement("link");
lien_ket_giao_dien_facebook.rel = "stylesheet";
lien_ket_giao_dien_facebook.href = "giao_dien_facebook.css?v=3";
document.head.appendChild(lien_ket_giao_dien_facebook);

const lien_ket_sua_nut_lol = document.createElement("link");
lien_ket_sua_nut_lol.rel = "stylesheet";
lien_ket_sua_nut_lol.href = "sua_nut_lol.css?v=3";
document.head.appendChild(lien_ket_sua_nut_lol);

const lien_ket_css_ma_hoa_nang_cao = document.createElement("link");
lien_ket_css_ma_hoa_nang_cao.rel = "stylesheet";
lien_ket_css_ma_hoa_nang_cao.href = "ma_hoa_nang_cao.css?v=3";
document.head.appendChild(lien_ket_css_ma_hoa_nang_cao);

const danh_sach_giao_dien = document.querySelector(".theme-list");

if (danh_sach_giao_dien && !danh_sach_giao_dien.querySelector('[data-theme-option="facebook"]')) {
  danh_sach_giao_dien.insertAdjacentHTML(
    "beforeend",
    '<button class="theme-option" type="button" data-theme-option="facebook"><span class="theme-preview theme-preview-facebook"></span><span class="theme-copy"><strong>Facebook</strong><small>Xanh Facebook · Trắng · Xám sáng</small></span><span class="theme-check">✓</span></button>'
  );
}

const nut_cai_dat = document.getElementById("settingsButton");
const lop_phu_cai_dat = document.getElementById("settingsOverlay");
const nut_dong_cai_dat = document.getElementById("settingsClose");

function lay_cac_lua_chon_giao_dien() {
  return Array.from(document.querySelectorAll("[data-theme-option]"));
}

function ap_dung_giao_dien(giao_dien) {
  document.body.setAttribute("data-theme", giao_dien);
  localStorage.setItem("cipher-theme", giao_dien);

  lay_cac_lua_chon_giao_dien().forEach(lua_chon => {
    const ten_giao_dien = lua_chon.getAttribute("data-theme-option");
    lua_chon.classList.toggle("active", ten_giao_dien === giao_dien);
  });
}

function mo_cai_dat() {
  lop_phu_cai_dat.classList.add("open");
  lop_phu_cai_dat.setAttribute("aria-hidden", "false");
}

function dong_cai_dat() {
  lop_phu_cai_dat.classList.remove("open");
  lop_phu_cai_dat.setAttribute("aria-hidden", "true");
}

if (nut_cai_dat && lop_phu_cai_dat && nut_dong_cai_dat) {
  nut_cai_dat.addEventListener("click", mo_cai_dat);
  nut_dong_cai_dat.addEventListener("click", dong_cai_dat);

  lop_phu_cai_dat.addEventListener("click", su_kien => {
    if (su_kien.target === lop_phu_cai_dat) dong_cai_dat();
  });
}

document.addEventListener("keydown", su_kien => {
  if (su_kien.key === "Escape" && lop_phu_cai_dat?.classList.contains("open")) dong_cai_dat();
});

document.addEventListener("click", su_kien => {
  const lua_chon = su_kien.target.closest("[data-theme-option]");
  if (!lua_chon) return;
  const giao_dien = lua_chon.getAttribute("data-theme-option");
  if (giao_dien) ap_dung_giao_dien(giao_dien);
});

const giao_dien_da_luu = localStorage.getItem("cipher-theme");
const giao_dien_cho_phep = [
  "phenikaa","youtube","shopee","tiktok","ben10","steam",
  "discord","valorant","lol","facebook","minecraft"
];

ap_dung_giao_dien(
  giao_dien_cho_phep.includes(giao_dien_da_luu) ? giao_dien_da_luu : "phenikaa"
);
