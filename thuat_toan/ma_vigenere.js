function ma_vigenere(van_ban, giai_ma = false) {
  const alphabet = lay_bang_chu_cai();
  const khoa = chi_so_khoa(lay_gia_tri_khoa("vigenereKey"));
  if (khoa.length === 0) throw new Error("Khóa Vigenere phải chứa ít nhất một chữ cái hợp lệ.");
  let vi_tri = 0;
  return Array.from(van_ban).map(ky_tu => {
    const canonical = chuan_hoa_ky_tu(ky_tu);
    if (!canonical) return ky_tu;
    const chi_so = alphabet.indexOf(canonical);
    const do_dich = khoa[vi_tri % khoa.length] * (giai_ma ? -1 : 1);
    vi_tri += 1;
    return giu_kieu_chu(ky_tu, alphabet[mod(chi_so + do_dich, alphabet.length)]);
  }).join("");
}