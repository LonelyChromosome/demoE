(() => {
  const GOC = "https://raw.githubusercontent.com/LonelyChromosome/DemoF3/13749a45b6adef3cfaed3978663668cda0323911/assets/tien_mon_premium/app_backgrounds/";
  const CANH = [
    { id: 1, start: 270, end: 420, file: "tienmon_1_1440x2560.png", fallback: "dark" },
    { id: 2, start: 420, end: 600, file: "tienmon_2_1440x2560.png", fallback: "dark" },
    { id: 3, start: 600, end: 960, file: "tienmon_3_1440x2560.png", fallback: "dark" },
    { id: 4, start: 960, end: 1020, file: "tienmon_4_1440x2560.png", fallback: "dark" },
    { id: 5, start: 1020, end: 1110, file: "tienmon_5_1440x2560.png", fallback: "light" },
    { id: 6, start: 1110, end: 1260, file: "tienmon_6_1440x2560.png", fallback: "light" },
    { id: 7, start: 1260, end: 150, file: "tienmon_7_1440x2560.png", fallback: "light" },
    { id: 8, start: 150, end: 270, file: "tienmon_8_1440x2560.png", fallback: "light" }
  ];

  let dang_hien = 0;
  let canh_hien_tai = null;

  function phut_hien_tai() {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }

  function trong_khoang(phut, start, end) {
    return start <= end
      ? phut >= start && phut < end
      : phut >= start || phut < end;
  }

  function tim_canh(phut = phut_hien_tai()) {
    return CANH.find(c => trong_khoang(phut, c.start, c.end)) || CANH[2];
  }

  function tao_the_gioi() {
    let world = document.querySelector(".tm-world");
    if (world) return world;

    world = document.createElement("div");
    world.className = "tm-world";
    world.setAttribute("aria-hidden", "true");
    world.innerHTML = [
      "<img class='tm-world-image active' alt=''>",
      "<img class='tm-world-image' alt=''>",
      "<div class='tm-world-ambient'></div>"
    ].join("");
    document.body.prepend(world);
    return world;
  }

  function danh_gia_tuong_phan(img, fallback) {
    document.body.dataset.tmTone = fallback;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 24;
      canvas.height = 24;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 24, 24);
      const px = ctx.getImageData(0, 0, 24, 24).data;
      let tong = 0;
      let dem = 0;

      for (let i = 0; i < px.length; i += 16) {
        const a = px[i + 3] / 255;
        if (a < .2) continue;
        const r = px[i] / 255;
        const g = px[i + 1] / 255;
        const b = px[i + 2] / 255;
        const lum = .2126 * r + .7152 * g + .0722 * b;
        tong += lum;
        dem += 1;
      }

      if (dem) {
        const trung_binh = tong / dem;
        document.body.dataset.tmTone = trung_binh < .48 ? "light" : "dark";
      }
    } catch (_) {
      document.body.dataset.tmTone = fallback;
    }
  }

  function nap_truoc(canh) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = GOC + canh.file;
  }

  function canh_ke_tiep(canh) {
    const i = CANH.findIndex(x => x.id === canh.id);
    return CANH[(i + 1) % CANH.length];
  }

  function chuyen_canh(canh, tuc_thi = false) {
    if (!canh || canh_hien_tai === canh.id) return;
    const world = tao_the_gioi();
    const layers = Array.from(world.querySelectorAll(".tm-world-image"));
    const moi = dang_hien === 0 ? 1 : 0;
    const img = layers[moi];

    img.crossOrigin = "anonymous";
    img.onload = () => {
      danh_gia_tuong_phan(img, canh.fallback);
      if (tuc_thi) {
        layers[dang_hien].classList.remove("active");
        img.style.transitionDuration = "0ms";
        img.classList.add("active");
        requestAnimationFrame(() => { img.style.transitionDuration = ""; });
      } else {
        img.classList.add("active");
        layers[dang_hien].classList.remove("active");
      }
      dang_hien = moi;
      canh_hien_tai = canh.id;
      document.body.dataset.tmScene = String(canh.id);
      nap_truoc(canh_ke_tiep(canh));
    };
    img.src = GOC + canh.file;
  }

  function cap_nhat_theme() {
    if (document.body.dataset.theme !== "tienmon") return;
    chuyen_canh(tim_canh(), canh_hien_tai == null);
  }

  tao_the_gioi();

  const observer = new MutationObserver(cap_nhat_theme);
  observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

  cap_nhat_theme();
  setInterval(() => {
    if (document.body.dataset.theme === "tienmon") chuyen_canh(tim_canh());
  }, 30000);

  window.tien_mon_premium = {
    resolveScene: tim_canh,
    refresh: cap_nhat_theme
  };
})();
