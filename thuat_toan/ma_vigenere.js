function ma_vigenere(van_ban, giai_ma = false) {
  const bang_chu = lay_bang_chu_cai();
  const khoa = chi_so_khoa(lay_gia_tri_khoa("vigenereKey"));
  if (khoa.length === 0) {
    throw new Error("Khóa Vigenere phải chứa ít nhất một chữ cái hợp lệ.");
  }

  let vi_tri = 0;
  return Array.from(van_ban).map(ky_tu => {
    const ky_tu_chuan = chuan_hoa_ky_tu(ky_tu);
    if (!ky_tu_chuan) return ky_tu;

    const chi_so = bang_chu.indexOf(ky_tu_chuan);
    const do_dich = khoa[vi_tri % khoa.length] * (giai_ma ? -1 : 1);
    vi_tri += 1;
    return giu_kieu_chu(ky_tu, bang_chu[modulo(chi_so + do_dich, bang_chu.length)]);
  }).join("");
}