window.thuat_toan_aes = (() => {
  const {
    chuoi_sang_byte_utf8,
    byte_sang_base64,
    base64_sang_byte,
    noi_byte,
    kiem_tra_khoa_chu
  } = window.tien_ich_ma_hoa;

  async function tao_khoa_tu_chu(chuoi_khoa) {
    if (!crypto.subtle) throw new Error("Trình duyệt không hỗ trợ Web Crypto API.");
    const khoa = kiem_tra_khoa_chu(chuoi_khoa);
    const ban_bam = await crypto.subtle.digest("SHA-256", chuoi_sang_byte_utf8(khoa));
    const khoa_128_bit = new Uint8Array(ban_bam).slice(0, 16);

    return crypto.subtle.importKey(
      "raw",
      khoa_128_bit,
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
    );
  }

  async function ma_hoa(ban_ro, chuoi_khoa) {
    if (!ban_ro) throw new Error("Nhập bản rõ trước khi mã hóa.");

    const khoa = await tao_khoa_tu_chu(chuoi_khoa);
    const vector_khoi_tao = crypto.getRandomValues(new Uint8Array(12));
    const du_lieu_da_ma_hoa = new Uint8Array(
      await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: vector_khoi_tao },
        khoa,
        chuoi_sang_byte_utf8(ban_ro)
      )
    );

    return byte_sang_base64(noi_byte(vector_khoi_tao, du_lieu_da_ma_hoa));
  }

  async function giai_ma(ban_ma, chuoi_khoa) {
    const khoa = await tao_khoa_tu_chu(chuoi_khoa);
    const goi_du_lieu = base64_sang_byte(ban_ma);

    if (goi_du_lieu.length < 13) {
      throw new Error("Bản mã AES không hợp lệ.");
    }

    const vector_khoi_tao = goi_du_lieu.slice(0, 12);
    const du_lieu_ma = goi_du_lieu.slice(12);
    const du_lieu_da_giai_ma = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: vector_khoi_tao },
      khoa,
      du_lieu_ma
    );

    return new TextDecoder().decode(du_lieu_da_giai_ma);
  }

  return { ma_hoa, giai_ma };
})();