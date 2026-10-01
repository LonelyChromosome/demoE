function tao_bang_thay_the() {
  const bang_chu = lay_bang_chu_cai();
  const khoa = lay_gia_tri_khoa("substitutionKey");
  const cac_ky_tu_khong_trung = [];

  chi_so_khoa(khoa).forEach(chi_so => {
    const ky_tu = bang_chu[chi_so];
    if (!cac_ky_tu_khong_trung.includes(ky_tu)) cac_ky_tu_khong_trung.push(ky_tu);
  });

  if (cac_ky_tu_khong_trung.length === 0) {
    throw new Error("Nhập khóa cho mã thay thế.");
  }

  bang_chu.forEach(ky_tu => {
    if (!cac_ky_tu_khong_trung.includes(ky_tu)) cac_ky_tu_khong_trung.push(ky_tu);
  });

  return cac_ky_tu_khong_trung;
}

function ma_thay_the(van_ban, giai_ma = false) {
  const bang_chu = lay_bang_chu_cai();
  const bang_thay_the = tao_bang_thay_the();

  if (!giai_ma) {
    return bien_doi_ky_tu(van_ban, chi_so => bang_chu.indexOf(bang_thay_the[chi_so]));
  }

  return bien_doi_ky_tu(van_ban, chi_so => bang_thay_the.indexOf(bang_chu[chi_so]));
}