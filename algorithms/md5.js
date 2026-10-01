window.MD5Algorithm = (() => {
  const { utf8Bytes } = window.CryptoUtils;
  function hash(text) {
    const add=(x,y)=>((((x>>>0)+(y>>>0))&0xffffffff)|0);
    const rol=(x,c)=>(x<<c)|(x>>>(32-c));
    const bytes=Array.from(utf8Bytes(text)), bitLen=bytes.length*8;
    bytes.push(0x80); while(bytes.length%64!==56) bytes.push(0);
    for(let i=0;i<8;i++) bytes.push((bitLen/Math.pow(256,i))&0xff);
    let a0=0x67452301|0,b0=0xefcdab89|0,c0=0x98badcfe|0,d0=0x10325476|0;
    const s=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
    const K=Array.from({length:64},(_,i)=>Math.floor(Math.abs(Math.sin(i+1))*2**32)|0);
    for(let offset=0;offset<bytes.length;offset+=64){
      const M=new Array(16).fill(0).map((_,i)=>bytes[offset+i*4]|(bytes[offset+i*4+1]<<8)|(bytes[offset+i*4+2]<<16)|(bytes[offset+i*4+3]<<24));
      let A=a0,B=b0,C=c0,D=d0;
      for(let i=0;i<64;i++){
        let F,g;
        if(i<16){F=(B&C)|((~B)&D);g=i;} else if(i<32){F=(D&B)|((~D)&C);g=(5*i+1)%16;}
        else if(i<48){F=B^C^D;g=(3*i+5)%16;} else {F=C^(B|(~D));g=(7*i)%16;}
        const temp=D;D=C;C=B;B=add(B,rol(add(add(add(A,F),K[i]),M[g]),s[i]));A=temp;
      }
      a0=add(a0,A);b0=add(b0,B);c0=add(c0,C);d0=add(d0,D);
    }
    const out=[]; for(const word of [a0,b0,c0,d0]) for(let i=0;i<4;i++) out.push((word>>>(8*i))&0xff);
    return out.map(b=>b.toString(16).padStart(2,"0")).join("");
  }
  return { hash };
})();