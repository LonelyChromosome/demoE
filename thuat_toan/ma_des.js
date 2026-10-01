const des_hoan_vi_dau = [58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7];
const des_hoan_vi_cuoi = [40,8,48,16,56,24,64,32,39,7,47,15,55,23,63,31,38,6,46,14,54,22,62,30,37,5,45,13,53,21,61,29,36,4,44,12,52,20,60,28,35,3,43,11,51,19,59,27,34,2,42,10,50,18,58,26,33,1,41,9,49,17,57,25];
const des_mo_rong = [32,1,2,3,4,5,4,5,6,7,8,9,8,9,10,11,12,13,12,13,14,15,16,17,16,17,18,19,20,21,20,21,22,23,24,25,24,25,26,27,28,29,28,29,30,31,32,1];
const des_hoan_vi_p = [16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25];
const des_pc_1 = [57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4];
const des_pc_2 = [14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32];
const des_so_lan_dich = [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];
const des_hop_s = [
  [[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],[0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],[4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],[15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]],
  [[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],[3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],[0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],[13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]],
  [[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],[13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],[13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],[1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]],
  [[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],[13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],[10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],[3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]],
  [[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],[14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],[4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],[11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]],
  [[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],[10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],[9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],[4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]],
  [[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],[13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],[1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],[6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]],
  [[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],[1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],[7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],[2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]]
];

function des_hoan_vi(cac_bit, bang) {
  return bang.map(vi_tri => cac_bit[vi_tri - 1]);
}

function des_hex_sang_bit(hex) {
  return Array.from(hex.toUpperCase()).flatMap(ky_tu =>
    parseInt(ky_tu, 16).toString(2).padStart(4, "0").split("").map(Number)
  );
}

function des_bit_sang_hex(cac_bit) {
  let ket_qua = "";
  for (let i = 0; i < cac_bit.length; i += 4) {
    ket_qua += parseInt(cac_bit.slice(i, i + 4).join(""), 2).toString(16).toUpperCase();
  }
  return ket_qua;
}

function des_xor(a, b) {
  return a.map((gia_tri, chi_so) => gia_tri ^ b[chi_so]);
}

function des_dich_trai(cac_bit, so_luong) {
  return cac_bit.slice(so_luong).concat(cac_bit.slice(0, so_luong));
}

function des_tao_khoa_con(khoa_hex) {
  const da_hoan_vi = des_hoan_vi(des_hex_sang_bit(khoa_hex), des_pc_1);
  let c = da_hoan_vi.slice(0, 28);
  let d = da_hoan_vi.slice(28);
  const cac_khoa_con = [];

  des_so_lan_dich.forEach(do_dich => {
    c = des_dich_trai(c, do_dich);
    d = des_dich_trai(d, do_dich);
    cac_khoa_con.push(des_hoan_vi(c.concat(d), des_pc_2));
  });

  return cac_khoa_con;
}

function des_feistel(phai, khoa_con) {
  const da_mo_rong = des_hoan_vi(phai, des_mo_rong);
  const da_tron = des_xor(da_mo_rong, khoa_con);
  const da_thay_the = [];

  for (let hop = 0; hop < 8; hop += 1) {
    const cum_bit = da_tron.slice(hop * 6, hop * 6 + 6);
    const hang = cum_bit[0] * 2 + cum_bit[5];
    const cot = cum_bit[1] * 8 + cum_bit[2] * 4 + cum_bit[3] * 2 + cum_bit[4];
    const gia_tri = des_hop_s[hop][hang][cot];
    da_thay_the.push(...gia_tri.toString(2).padStart(4, "0").split("").map(Number));
  }

  return des_hoan_vi(da_thay_the, des_hoan_vi_p);
}

function chuan_hoa_des_hex(gia_tri, nhan) {
  const gia_tri_chuan = gia_tri.replace(/\s+/g, "").toUpperCase();
  if (!/^[0-9A-F]{16}$/.test(gia_tri_chuan)) {
    throw new Error(`${nhan} DES phải gồm đúng 16 ký tự hexadecimal (64 bit).`);
  }
  return gia_tri_chuan;
}

function xu_ly_khoi_des(du_lieu_hex, khoa_hex, giai_ma = false) {
  const du_lieu = chuan_hoa_des_hex(du_lieu_hex, giai_ma ? "Bản mã" : "Bản rõ");
  const khoa = chuan_hoa_des_hex(khoa_hex, "Khóa");

  const ban_dau = des_hoan_vi(des_hex_sang_bit(du_lieu), des_hoan_vi_dau);
  let trai = ban_dau.slice(0, 32);
  let phai = ban_dau.slice(32);
  const cac_khoa_con = des_tao_khoa_con(khoa);

  if (giai_ma) {
    cac_khoa_con.reverse();
  }

  cac_khoa_con.forEach(khoa_con => {
    const trai_moi = phai;
    const phai_moi = des_xor(trai, des_feistel(phai, khoa_con));
    trai = trai_moi;
    phai = phai_moi;
  });

  return des_bit_sang_hex(des_hoan_vi(phai.concat(trai), des_hoan_vi_cuoi));
}

function ma_des(van_ban, giai_ma = false) {
  const khoa = lay_gia_tri_khoa("desKey");
  return xu_ly_khoi_des(van_ban, khoa, giai_ma);
}


window.thuat_toan_des = {
  ma_hoa_chu(ban_ro, chuoi_khoa) {
    const { chuoi_sang_byte_utf8, byte_sang_hex, kiem_tra_khoa_chu } = window.tien_ich_ma_hoa;
    const sang_hex = (gia_tri, nhan) => {
      const van_ban = kiem_tra_khoa_chu(gia_tri, nhan);
      const cac_byte = chuoi_sang_byte_utf8(van_ban);
      if (cac_byte.length > 8) throw new Error(`${nhan} DES tối đa 8 byte UTF-8.`);
      const khoi = new Uint8Array(8); khoi.set(cac_byte);
      return byte_sang_hex(khoi);
    };
    return xu_ly_khoi_des(sang_hex(ban_ro, "Bản rõ"), sang_hex(chuoi_khoa, "Khóa"), false);
  },
  giai_ma_chu(ban_ma, chuoi_khoa) {
    const { chuoi_sang_byte_utf8, byte_sang_hex, hex_sang_byte, kiem_tra_khoa_chu } = window.tien_ich_ma_hoa;
    const khoa = kiem_tra_khoa_chu(chuoi_khoa, "Khóa");
    const byte_khoa = chuoi_sang_byte_utf8(khoa);
    if (byte_khoa.length > 8) throw new Error("Khóa DES tối đa 8 byte UTF-8.");
    const khoi_khoa = new Uint8Array(8); khoi_khoa.set(byte_khoa);
    const chuoi_sach = ban_ma.replace(/\s+/g, "").toUpperCase();
    if (!/^[0-9A-F]{16}$/.test(chuoi_sach)) throw new Error("Bản mã DES phải gồm đúng 16 ký tự hex.");
    const ban_ro_hex = xu_ly_khoi_des(chuoi_sach, byte_sang_hex(khoi_khoa), true);
    const cac_byte = hex_sang_byte(ban_ro_hex);
    let ket_thuc = cac_byte.length; while (ket_thuc > 0 && cac_byte[ket_thuc - 1] === 0) ket_thuc--;
    return new TextDecoder().decode(cac_byte.slice(0, ket_thuc));
  }
};
