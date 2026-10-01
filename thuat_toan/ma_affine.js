function ma_affine(van_ban, giai_ma = false) {
  const bang_chu = lay_bang_chu_cai();
  const modulo_so = bang_chu.length;
  const a_tho = lay_gia_tri_khoa("affineA");
  const b_tho = lay_gia_tri_khoa("affineB");

  if (a_tho === "" || b_tho === "" || Number.isNaN(Number(a_tho)) || Number.isNaN(Number(b_tho))) {
    throw new Error("Khóa Affine cần đủ hai giá trị a và b.");
  }

  const a = Math.trunc(Number(a_tho));
  const b = Math.trunc(Number(b_tho));

  if (ucln(a, modulo_so) !== 1) {
    throw new Error(\`Giá trị a phải nguyên tố cùng nhau với \${modulo_so}.\`);
  }

  if (!giai_ma) {
    return bien_doi_ky_tu(van_ban, chi_so => a * chi_so + b);
  }

  const nghich_dao_a = nghich_dao_modulo(a, modulo_so);
  return bien_doi_ky_tu(van_ban, chi_so => nghich_dao_a * (chi_so - b));
}