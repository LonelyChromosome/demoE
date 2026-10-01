window.thuat_toan_rsa = (() => {
  const { chuoi_sang_byte_utf8, kiem_tra_khoa_chu } = window.tien_ich_ma_hoa;

  const ucln_so_lon = (a, b) => {
    let x = a < 0n ? -a : a;
    let y = b < 0n ? -b : b;
    while (y) [x, y] = [y, x % y];
    return x;
  };

  const luy_thua_modulo = (co_so, so_mu, modulo_so) => {
    let ket_qua = 1n;
    let co_so_hien_tai = co_so % modulo_so;
    let so_mu_hien_tai = so_mu;

    while (so_mu_hien_tai > 0n) {
      if (so_mu_hien_tai & 1n) ket_qua = (ket_qua * co_so_hien_tai) % modulo_so;
      co_so_hien_tai = (co_so_hien_tai * co_so_hien_tai) % modulo_so;
      so_mu_hien_tai >>= 1n;
    }
    return ket_qua;
  };

  function ucln_mo_rong(a, b) {
    if (b === 0n) return [a, 1n, 0n];
    const [ucln_gia_tri, x_1, y_1] = ucln_mo_rong(b, a % b);
    return [ucln_gia_tri, y_1, x_1 - (a / b) * y_1];
  }

  function nghich_dao_modulo_rsa(a, modulo_so) {
    const [ucln_gia_tri, x] = ucln_mo_rong(a, modulo_so);
    if (ucln_gia_tri !== 1n) throw new Error("Không tìm được nghịch đảo mô-đun RSA.");
    return (x % modulo_so + modulo_so) % modulo_so;
  }

  function la_so_nguyen_to(gia_tri) {
    if (gia_tri < 2) return false;
    if (gia_tri % 2 === 0) return gia_tri === 2;
    for (let i = 3; i * i <= gia_tri; i += 2) {
      if (gia_tri % i === 0) return false;
    }
    return true;
  }

  function so_nguyen_to_tiep_theo(gia_tri) {
    let ung_vien = Math.max(257, Math.floor(gia_tri));
    if (ung_vien % 2 === 0) ung_vien += 1;
    while (!la_so_nguyen_to(ung_vien)) ung_vien += 2;
    return ung_vien;
  }

  function bam_lam_hat(van_ban) {
    let hat = 2166136261 >>> 0;
    for (const byte of chuoi_sang_byte_utf8(van_ban)) {
      hat ^= byte;
      hat = Math.imul(hat, 16777619) >>> 0;
    }
    return hat >>> 0;
  }

  function tao_khoa_tu_chu(chuoi_khoa) {
    const khoa = kiem_tra_khoa_chu(chuoi_khoa);
    const hat = bam_lam_hat(khoa);

    const p = BigInt(so_nguyen_to_tiep_theo(2000 + (hat % 5000)));
    let q_so = so_nguyen_to_tiep_theo(8000 + ((hat >>> 8) % 7000));
    if (BigInt(q_so) === p) q_so = so_nguyen_to_tiep_theo(q_so + 2);

    const q = BigInt(q_so);
    const n = p * q;
    const phi = (p - 1n) * (q - 1n);

    let e = 65537n;
    if (ucln_so_lon(e, phi) !== 1n) e = 257n;
    if (ucln_so_lon(e, phi) !== 1n) e = 17n;

    const d = nghich_dao_modulo_rsa(e, phi);
    return { n, e, d };
  }

  function ma_hoa(ban_ro, chuoi_khoa) {
    if (!ban_ro) throw new Error("Nhập bản rõ trước khi mã hóa.");

    const { n, e } = tao_khoa_tu_chu(chuoi_khoa);
    const ban_ma_ket_qua = Array.from(
      chuoi_sang_byte_utf8(ban_ro),
      byte => luy_thua_modulo(BigInt(byte), e, n).toString()
    ).join(".");

    return { ban_ma_ket_qua, n };
  }

  function giai_ma(ban_ma, chuoi_khoa) {
    const { n, d } = tao_khoa_tu_chu(chuoi_khoa);
    const cac_khoi = ban_ma.trim().split(".").filter(Boolean);

    if (!cac_khoi.length || cac_khoi.some(gia_tri => !/^\d+$/.test(gia_tri))) {
      throw new Error("Bản mã RSA không hợp lệ.");
    }

    const cac_byte = Uint8Array.from(
      cac_khoi.map(gia_tri => Number(luy_thua_modulo(BigInt(gia_tri), d, n)))
    );

    return {
      ban_ro_ket_qua: new TextDecoder().decode(cac_byte),
      n
    };
  }

  return { ma_hoa, giai_ma };
})();