window.thuat_toan_aes = (() => {
  const { chuoi_sang_byte_utf8, byte_sang_base64, base64_sang_byte, noi_byte, kiem_tra_khoa_chu } = window.tien_ich_ma_hoa;
  async function tao_khoa_tu_chu(chuoi_khoa) {
    kiem_tra_khoa_chu(chuoi_khoa);
    const ban_bam = await crypto.subtle.ban_bam("SHA-256", chuoi_sang_byte_utf8(chuoi_khoa));
    return crypto.subtle.importKey("raw", new Uint8Array(ban_bam).slice(0, 16), { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
  }
  async function ma_hoa(ban_ro, chuoi_khoa) {
    if (!crypto.subtle) throw new Error("Trình duyệt không hỗ trợ Web Crypto API.");
    if (!ban_ro) throw new Error("Nhập bản rõ trước khi mã hóa.");
    const khoa = await tao_khoa_tu_chu(chuoi_khoa);
    const vector_khoi_tao = crypto.getRandomValues(new Uint8Array(12));
    const da_ma_hoa = new Uint8Array(await crypto.subtle.ma_hoa({ name: "AES-GCM", vector_khoi_tao }, khoa, chuoi_sang_byte_utf8(ban_ro)));
    return byte_sang_base64(noi_byte(vector_khoi_tao, da_ma_hoa));
  }
  async function giai_ma(ban_ma, chuoi_khoa) {
    const khoa = await tao_khoa_tu_chu(chuoi_khoa);
    const goi_du_lieu = base64_sang_byte(ban_ma);
    if (goi_du_lieu.length < 13) throw new Error("Bản mã AES không hợp lệ.");
    const da_giai_ma = await crypto.subtle.giai_ma({ name: "AES-GCM", vector_khoi_tao: goi_du_lieu.slice(0, 12) }, khoa, goi_du_lieu.slice(12));
    return new TextDecoder().decode(da_giai_ma);
  }
  return { ma_hoa, giai_ma };
})();