window.tien_ich_ma_hoa = (() => {
  const chuoi_sang_byte_utf8 = van_ban => new TextEncoder().encode(van_ban);
  const byte_sang_hex = bytes => Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  const hex_sang_byte = hex => {
    const chuoi_sach = hex.replace(/\s+/g, "");
    if (!chuoi_sach || chuoi_sach.length % 2 || !/^[0-9A-Fa-f]+$/.test(chuoi_sach)) throw new Error("Chuỗi hex không hợp lệ.");
    return new Uint8Array(chuoi_sach.match(/.{2}/g).map(v => parseInt(v, 16)));
  };
  const byte_sang_base64 = bytes => {
    let gia_tri = "";
    bytes.forEach(b => { gia_tri += String.fromCharCode(b); });
    return btoa(gia_tri);
  };
  const base64_sang_byte = gia_tri => Uint8Array.from(atob(gia_tri.trim()), c => c.charCodeAt(0));
  const noi_byte = (a, b) => {
    const dau_ra = new Uint8Array(a.length + b.length);
    dau_ra.set(a); dau_ra.set(b, a.length);
    return dau_ra;
  };
  const kiem_tra_khoa_chu = (gia_tri, nhan = "Khóa") => {
    const khoa = gia_tri.trim();
    if (!khoa) throw new Error(`${label} không được để trống.`);
    if (!/^[\p{L}\s]+$/u.test(khoa)) throw new Error(`${label} chỉ nhập bằng chữ cái.`);
    return khoa;
  };
  return { chuoi_sang_byte_utf8, byte_sang_hex, hex_sang_byte, byte_sang_base64, base64_sang_byte, noi_byte, kiem_tra_khoa_chu };
})();