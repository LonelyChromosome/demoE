window.RSAAlgorithm = (() => {
  const { utf8Bytes, requireLetterKey } = window.CryptoUtils;
  const gcdBig = (a, b) => { let x=a<0n?-a:a, y=b<0n?-b:b; while(y)[x,y]=[y,x%y]; return x; };
  const modPow = (base, exponent, modulus) => {
    let result=1n, b=base%modulus, e=exponent;
    while(e>0n){ if(e&1n) result=(result*b)%modulus; b=(b*b)%modulus; e>>=1n; }
    return result;
  };
  function egcd(a,b){ if(b===0n) return [a,1n,0n]; const [g,x1,y1]=egcd(b,a%b); return [g,y1,x1-(a/b)*y1]; }
  function modInverse(a,m){ const [g,x]=egcd(a,m); if(g!==1n) throw new Error("Không tìm được nghịch đảo mô-đun RSA."); return (x%m+m)%m; }
  function isPrime(n){ if(n<2)return false; if(n%2===0)return n===2; for(let i=3;i*i<=n;i+=2) if(n%i===0)return false; return true; }
  function nextPrime(n){ let v=Math.max(257,Math.floor(n)); if(v%2===0)v++; while(!isPrime(v))v+=2; return v; }
  function hashSeed(text){ let h=2166136261>>>0; for(const b of utf8Bytes(text)){ h^=b; h=Math.imul(h,16777619)>>>0; } return h>>>0; }
  function keyFromText(keyText){
    const key=requireLetterKey(keyText), seed=hashSeed(key);
    const p=BigInt(nextPrime(2000+(seed%5000)));
    let qn=nextPrime(8000+((seed>>>8)%7000)); if(BigInt(qn)===p) qn=nextPrime(qn+2);
    const q=BigInt(qn), n=p*q, phi=(p-1n)*(q-1n);
    let e=65537n; if(gcdBig(e,phi)!==1n)e=257n; if(gcdBig(e,phi)!==1n)e=17n;
    return { n, e, d: modInverse(e,phi) };
  }
  function encrypt(plainText,keyText){
    if(!plainText) throw new Error("Nhập bản rõ trước khi mã hóa.");
    const {n,e}=keyFromText(keyText);
    return { cipher:Array.from(utf8Bytes(plainText),b=>modPow(BigInt(b),e,n).toString()).join("."), n };
  }
  function decrypt(cipherText,keyText){
    const {n,d}=keyFromText(keyText);
    const chunks=cipherText.trim().split(".").filter(Boolean);
    if(!chunks.length||chunks.some(v=>!/^\d+$/.test(v))) throw new Error("Bản mã RSA không hợp lệ.");
    return { plain:new TextDecoder().decode(Uint8Array.from(chunks.map(v=>Number(modPow(BigInt(v),d,n))))), n };
  }
  return { encrypt, decrypt };
})();