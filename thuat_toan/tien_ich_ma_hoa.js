window.tien_ich_ma_hoa = (() => {
  const chuoi_sang_byte_utf8 = van_ban => new TextEncoder().encode(van_ban);

  const byte_sang_hex = cac_byte =>
    Array.from(cac_byte, byte => byte.toString(16).padStart(2, "0")).join("").toUpperCase();

  const hex_sang_byte = chuoi_hex => {
    const chuoi_sach = chuoi_hex.replace(/\s+/g, "");
    if (!chuoi_sach || chuoi_sach.length % 2 || !/^[0-9A-Fa-f]+$/.test(chuoi_sach)) {
      throw new Error("Chuỗi hex không hợp lệ.");
    }
    return new Uint8Array(chuoi_sach.match(/.{2}/g).map(gia_tri => parseInt(gia_tri, 16)));
  };

  const byte_sang_base64 = cac_byte => {
    let chuoi = "";
    cac_byte.forEach(byte => { chuoi += String.fromCharCode(byte); });
    return btoa(chuoi);
  };

  const base64_sang_byte = gia_tri =>
    Uint8Array.from(atob(gia_tri.trim()), ky_tu => ky_tu.charCodeAt(0));

  const noi_byte = (mang_a, mang_b) => {
    const ket_qua = new Uint8Array(mang_a.length + mang_b.length);
    ket_qua.set(mang_a, 0);
    ket_qua.set(mang_b, mang_a.length);
    return ket_qua;
  };

  const kiem_tra_khoa_chu = (gia_tri, nhan = "Khóa") => {
    const khoa = gia_tri.trim();
    if (!khoa) throw new Error(\`\${nhan} không được để trống.\`);
    if (!/^[\p{L}\s]+$/u.test(khoa)) throw new Error(\`\${nhan} chỉ nhập bằng chữ cái.\`);
    return khoa;
  };

  return {
    chuoi_sang_byte_utf8,
    byte_sang_hex,
    hex_sang_byte,
    byte_sang_base64,
    base64_sang_byte,
    noi_byte,
    kiem_tra_khoa_chu
  };
})();