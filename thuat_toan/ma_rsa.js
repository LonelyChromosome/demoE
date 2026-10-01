window.thuat_toan_rsa = (() => {
  const { chuoi_sang_byte_utf8, kiem_tra_khoa_chu } = window.tien_ich_ma_hoa;
  const ucln_lon = (a, b) => { let x=a<0n?-a:a, y=b<0n?-b:b; while(y)[x,y]=[y,x%y]; return x; };
  const luy_thua_modulo = (chu_goc, so_mu, modulo) => {
    let ket_qua=1n, b=chu_goc%modulo, e=so_mu;
    while(e>0n){ if(e&1n) ket_qua=(ket_qua*b)%modulo; b=(b*b)%modulo; e>>=1n; }
    return ket_qua;
  };
  function ucln_mo_rong(a,b){ if(b===0n) return [a,1n,0n]; const [g,x1,y1]=ucln_mo_rong(b,a%b); return [g,y1,x1-(a/b)*y1]; }
  function nghich_dao_modulo(a,m){ const [g,x]=ucln_mo_rong(a,m); if(g!==1n) throw new Error("Không tìm được nghịch đảo mô-đun RSA."); return (x%m+m)%m; }
  function la_so_nguyen_to(n){ if(n<2)return false; if(n%2===0)return n===2; for(let i=3;i*i<=n;i+=2) if(n%i===0)return false; return true; }
  function so_nguyen_to_tiep_theo(n){ let v=Math.max(257,Math.floor(n)); if(v%2===0)v++; while(!la_so_nguyen_to(v))v+=2; return v; }
  function bam_lam_hat(van_ban){ let h=2166136261>>>0; for(const b of chuoi_sang_byte_utf8(van_ban)){ h^=b; h=Math.imul(h,16777619)>>>0; } return h>>>0; }
  function tao_khoa_tu_chu(chuoi_khoa){
    const khoa=kiem_tra_khoa_chu(chuoi_khoa), hat=bam_lam_hat(khoa);
    const p=BigInt(so_nguyen_to_tiep_theo(2000+(hat%5000)));
    let q_so=so_nguyen_to_tiep_theo(8000+((hat>>>8)%7000)); if(BigInt(q_so)===p) q_so=so_nguyen_to_tiep_theo(q_so+2);
    const q=BigInt(q_so), n=p*q, phi=(p-1n)*(q-1n);
    let e=65537n; if(ucln_lon(e,phi)!==1n)e=257n; if(ucln_lon(e,phi)!==1n)e=17n;
    return { n, e, d: nghich_dao_modulo(e,phi) };
  }
  function ma_hoa(ban_ro,chuoi_khoa){
    if(!ban_ro) throw new Error("Nhập bản rõ trước khi mã hóa.");
    const {n,e}=tao_khoa_tu_chu(chuoi_khoa);
    return { thuat_toan:Array.from(chuoi_sang_byte_utf8(ban_ro),b=>luy_thua_modulo(BigInt(b),e,n).toString()).join("."), n };
  }
  function giai_ma(ban_ma,chuoi_khoa){
    const {n,d}=tao_khoa_tu_chu(chuoi_khoa);
    const cac_khoi=ban_ma.trim().split(".").filter(Boolean);
    if(!cac_khoi.length||cac_khoi.some(v=>!/^\d+$/.test(v))) throw new Error("Bản mã RSA không hợp lệ.");
    return { ban_ro_ket_qua:new TextDecoder().decode(Uint8Array.from(cac_khoi.map(v=>Number(luy_thua_modulo(BigInt(v),d,n))))), n };
  }
  return { ma_hoa, giai_ma };
})();