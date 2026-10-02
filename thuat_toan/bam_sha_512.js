window.thuat_toan_sha_512 = (() => {
  async function bam(van_ban) {
    const du_lieu = window.tien_ich_ma_hoa.chuoi_sang_byte_utf8(van_ban);
    const ban_bam = await crypto.subtle.digest("SHA-512", du_lieu);
    return window.tien_ich_ma_hoa.byte_sang_hex(new Uint8Array(ban_bam)).toLowerCase();
  }

  return { bam };
})();
