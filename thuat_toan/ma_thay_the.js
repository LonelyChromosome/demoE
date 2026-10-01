function tao_bang_thay_the() {
  const alphabet = lay_bang_chu_cai();
  const khoa = lay_gia_tri_khoa("substitutionKey");
  const khong_trung = [];
  chi_so_khoa(khoa).forEach(chi_so => {
    const ky_tu = alphabet[chi_so];
    if (!khong_trung.includes(ky_tu)) khong_trung.push(ky_tu);
  });
  if (khong_trung.length === 0) throw new Error("Nhập khóa cho mã thay thế.");
  alphabet.forEach(ky_tu => { if (!khong_trung.includes(ky_tu)) khong_trung.push(ky_tu); });
  return khong_trung;
}
function ma_thay_the(van_ban, giai_ma = false) {
  const alphabet = lay_bang_chu_cai();
  const bang_dich = tao_bang_thay_the();
  if (!giai_ma) return bien_doi_ky_tu(van_ban, chi_so => alphabet.indexOf(bang_dich[chi_so]));
  return bien_doi_ky_tu(van_ban, chi_so => bang_dich.indexOf(alphabet[chi_so]));
}