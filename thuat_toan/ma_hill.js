function lay_ma_tran_hill() {
  const cac_gia_tri = ["hillA", "hillB", "hillC", "hillD"].map(lay_gia_tri_khoa);
  if (cac_gia_tri.some(gia_tri => gia_tri === "" || Number.isNaN(Number(gia_tri)))) throw new Error("Ma trận Hill cần đủ 4 số nguyên.");
  return cac_gia_tri.map(gia_tri => Math.trunc(Number(gia_tri)));
}
function lay_ma_tran_hill_theo_che_do(giai_ma) {
  const modulo = lay_bang_chu_cai().length;
  const [a, b, c, d] = lay_ma_tran_hill();
  const dinh_thuc = mod(a * d - b * c, modulo);
  if (gcd(dinh_thuc, modulo) !== 1) throw new Error(`Định thức ma trận phải khả nghịch trên Z${modulus}.`);
  if (!giai_ma) return [mod(a, modulo), mod(b, modulo), mod(c, modulo), mod(d, modulo)];
  const nghich_dao = modularInverse(dinh_thuc, modulo);
  return [mod(nghich_dao * d, modulo), mod(nghich_dao * -b, modulo), mod(nghich_dao * -c, modulo), mod(nghich_dao * a, modulo)];
}
function ma_hill(van_ban, giai_ma = false) {
  const alphabet = lay_bang_chu_cai();
  const modulo = alphabet.length;
  const ma_tran = lay_ma_tran_hill_theo_che_do(giai_ma);
  const cac_ky_tu = Array.from(van_ban);
  const cac_phan_tu = [];
  cac_ky_tu.forEach((ky_tu, vi_tri) => {
    const canonical = chuan_hoa_ky_tu(ky_tu);
    if (canonical) cac_phan_tu.push({ vi_tri, chi_so: alphabet.indexOf(canonical), ban_dau: ky_tu });
  });
  if (!cac_phan_tu.length) return van_ban;
  const cac_gia_tri = cac_phan_tu.map(phan_tu => phan_tu.chi_so);
  const da_dem = cac_gia_tri.length % 2 !== 0;
  if (da_dem) cac_gia_tri.push(alphabet.indexOf("X"));
  const dau_ra = [];
  for (let i = 0; i < cac_gia_tri.length; i += 2) {
    const x = cac_gia_tri[i], y = cac_gia_tri[i + 1];
    dau_ra.push(mod(ma_tran[0] * x + ma_tran[1] * y, modulo));
    dau_ra.push(mod(ma_tran[2] * x + ma_tran[3] * y, modulo));
  }
  cac_phan_tu.forEach((phan_tu, chi_so) => { cac_ky_tu[phan_tu.vi_tri] = giu_kieu_chu(phan_tu.ban_dau, alphabet[dau_ra[chi_so]]); });
  if (da_dem) cac_ky_tu.push(alphabet[dau_ra[dau_ra.length - 1]]);
  return cac_ky_tu.join("");
}