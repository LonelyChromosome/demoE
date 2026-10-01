function ma_dich_vong(van_ban, giai_ma = false) {
  const khoa_tho = lay_gia_tri_khoa("shiftKey");
  if (khoa_tho === "" || Number.isNaN(Number(khoa_tho))) throw new Error("Khóa dịch vòng phải là một số nguyên.");
  const do_dich = Math.trunc(Number(khoa_tho)) * (giai_ma ? -1 : 1);
  return bien_doi_ky_tu(van_ban, chi_so => chi_so + do_dich);
}