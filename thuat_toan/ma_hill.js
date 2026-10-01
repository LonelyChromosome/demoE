function lay_ma_tran_hill() {
  const cac_gia_tri = ["hillA", "hillB", "hillC", "hillD"].map(lay_gia_tri_khoa);
  if (cac_gia_tri.some(gia_tri => gia_tri === "" || Number.isNaN(Number(gia_tri)))) {
    throw new Error("Ma trận Hill cần đủ 4 số nguyên.");
  }
  return cac_gia_tri.map(gia_tri => Math.trunc(Number(gia_tri)));
}

function lay_ma_tran_hill_theo_che_do(giai_ma) {
  const modulo_so = lay_bang_chu_cai().length;
  const [a, b, c, d] = lay_ma_tran_hill();
  const dinh_thuc = modulo(a * d - b * c, modulo_so);

  if (ucln(dinh_thuc, modulo_so) !== 1) {
    throw new Error(\`Định thức ma trận phải khả nghịch trên Z\${modulo_so}.\`);
  }

  if (!giai_ma) {
    return [modulo(a, modulo_so), modulo(b, modulo_so), modulo(c, modulo_so), modulo(d, modulo_so)];
  }

  const nghich_dao = nghich_dao_modulo(dinh_thuc, modulo_so);
  return [
    modulo(nghich_dao * d, modulo_so),
    modulo(nghich_dao * -b, modulo_so),
    modulo(nghich_dao * -c, modulo_so),
    modulo(nghich_dao * a, modulo_so)
  ];
}

function ma_hill(van_ban, giai_ma = false) {
  const bang_chu = lay_bang_chu_cai();
  const modulo_so = bang_chu.length;
  const ma_tran = lay_ma_tran_hill_theo_che_do(giai_ma);
  const cac_ky_tu = Array.from(van_ban);
  const cac_phan_tu = [];

  cac_ky_tu.forEach((ky_tu, vi_tri) => {
    const ky_tu_chuan = chuan_hoa_ky_tu(ky_tu);
    if (ky_tu_chuan) {
      cac_phan_tu.push({
        vi_tri,
        chi_so: bang_chu.indexOf(ky_tu_chuan),
        ban_dau: ky_tu
      });
    }
  });

  if (!cac_phan_tu.length) return van_ban;

  const cac_gia_tri = cac_phan_tu.map(phan_tu => phan_tu.chi_so);
  const can_dem = cac_gia_tri.length % 2 !== 0;
  if (can_dem) cac_gia_tri.push(bang_chu.indexOf("X"));

  const dau_ra = [];
  for (let i = 0; i < cac_gia_tri.length; i += 2) {
    const x = cac_gia_tri[i];
    const y = cac_gia_tri[i + 1];
    dau_ra.push(modulo(ma_tran[0] * x + ma_tran[1] * y, modulo_so));
    dau_ra.push(modulo(ma_tran[2] * x + ma_tran[3] * y, modulo_so));
  }

  cac_phan_tu.forEach((phan_tu, chi_so) => {
    cac_ky_tu[phan_tu.vi_tri] = giu_kieu_chu(phan_tu.ban_dau, bang_chu[dau_ra[chi_so]]);
  });

  if (can_dem) cac_ky_tu.push(bang_chu[dau_ra[dau_ra.length - 1]]);
  return cac_ky_tu.join("");
}