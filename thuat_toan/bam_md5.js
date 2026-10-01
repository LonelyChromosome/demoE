window.thuat_toan_md5 = (() => {
  const { chuoi_sang_byte_utf8 } = window.tien_ich_ma_hoa;
  function bam(van_ban) {
    const cong_32_bit=(x,y)=>((((x>>>0)+(y>>>0))&0xffffffff)|0);
    const xoay_trai=(x,c)=>(x<<c)|(x>>>(32-c));
    const bytes=Array.from(chuoi_sang_byte_utf8(van_ban)), do_dai_bit=bytes.length*8;
    bytes.push(0x80); while(bytes.length%64!==56) bytes.push(0);
    for(let i=0;i<8;i++) bytes.push((do_dai_bit/Math.pow(256,i))&0xff);
    let a0=0x67452301|0,b0=0xefcdab89|0,c0=0x98badcfe|0,d0=0x10325476|0;
    const s=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
    const K=Array.from({length:64},(_,i)=>Math.floor(Math.abs(Math.sin(i+1))*2**32)|0);
    for(let do_lech=0;do_lech<bytes.length;do_lech+=64){
      const M=new Array(16).fill(0).map((_,i)=>bytes[do_lech+i*4]|(bytes[do_lech+i*4+1]<<8)|(bytes[do_lech+i*4+2]<<16)|(bytes[do_lech+i*4+3]<<24));
      let A=a0,B=b0,C=c0,D=d0;
      for(let i=0;i<64;i++){
        let F,g;
        if(i<16){F=(B&C)|((~B)&D);g=i;} else if(i<32){F=(D&B)|((~D)&C);g=(5*i+1)%16;}
        else if(i<48){F=B^C^D;g=(3*i+5)%16;} else {F=C^(B|(~D));g=(7*i)%16;}
        const tam=D;D=C;C=B;B=cong_32_bit(B,xoay_trai(cong_32_bit(cong_32_bit(cong_32_bit(A,F),K[i]),M[g]),s[i]));A=tam;
      }
      a0=cong_32_bit(a0,A);b0=cong_32_bit(b0,B);c0=cong_32_bit(c0,C);d0=cong_32_bit(d0,D);
    }
    const dau_ra=[]; for(const tu_32_bit of [a0,b0,c0,d0]) for(let i=0;i<4;i++) dau_ra.push((tu_32_bit>>>(8*i))&0xff);
    return dau_ra.map(b=>b.function toString() { [native code] }(16).padStart(2,"0")).join("");
  }
  return { bam };
})();