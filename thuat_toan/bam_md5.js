window.thuat_toan_md5 = (() => {
  const { chuoi_sang_byte_utf8 } = window.tien_ich_ma_hoa;
  function bam(van_ban) {
    const cong_32_bit=(x,y)=>((((x>>>0)+(y>>>0))&0xffffffff)|0);
    const xoay_trai=(x,c)=>(x<<c)|(x>>>(32-c));
    const cac_byte=Array.from(chuoi_sang_byte_utf8(van_ban)), do_dai_bit=cac_byte.length*8;
    cac_byte.push(0x80); while(cac_byte.length%64!==56) cac_byte.push(0);
    for(let i=0;i<8;i++) cac_byte.push((do_dai_bit/Math.pow(256,i))&0xff);
    let a0=0x67452301|0,b0=0xefcdab89|0,c0=0x98badcfe|0,d0=0x10325476|0;
    const s=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
    const hang_so_k=Array.from({length:64},(_,i)=>Math.floor(Math.abs(Math.sin(i+1))*2**32)|0);
    for(let do_lech=0;do_lech<cac_byte.length;do_lech+=64){
      const khoi_m=new Array(16).fill(0).map((_,i)=>cac_byte[do_lech+i*4]|(cac_byte[do_lech+i*4+1]<<8)|(cac_byte[do_lech+i*4+2]<<16)|(cac_byte[do_lech+i*4+3]<<24));
      let a=a0,b=b0,c=c0,d=d0;
      for(let i=0;i<64;i++){
        let f,chi_so_g;
        if(i<16){f=(b&c)|((~b)&d);chi_so_g=i;} else if(i<32){f=(d&b)|((~d)&c);chi_so_g=(5*i+1)%16;}
        else if(i<48){f=b^c^d;chi_so_g=(3*i+5)%16;} else {f=c^(b|(~d));chi_so_g=(7*i)%16;}
        const tam=d;d=c;c=b;b=cong_32_bit(b,xoay_trai(cong_32_bit(cong_32_bit(cong_32_bit(a,f),hang_so_k[i]),khoi_m[chi_so_g]),s[i]));a=tam;
      }
      a0=cong_32_bit(a0,a);b0=cong_32_bit(b0,b);c0=cong_32_bit(c0,c);d0=cong_32_bit(d0,d);
    }
    const dau_ra=[]; for(const tu_32_bit of [a0,b0,c0,d0]) for(let i=0;i<4;i++) dau_ra.push((tu_32_bit>>>(8*i))&0xff);
    return dau_ra.map(b=>b.toString(16).padStart(2,"0")).join("");
  }
  return { bam };
})();