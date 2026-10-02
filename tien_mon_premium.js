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
  let che_do_canh = localStorage.getItem("cipher-tienmon-scene-mode") || "auto";

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

  function canh_theo_che_do() {
    if (che_do_canh === "auto") return tim_canh();
    const id = Number(che_do_canh);
    return CANH.find(c => c.id === id) || tim_canh();
  }

  function cap_nhat_theme() {
    if (document.body.dataset.theme !== "tienmon") {
      cap_nhat_panel();
      return;
    }
    chuyen_canh(canh_theo_che_do(), canh_hien_tai == null);
    cap_nhat_panel();
  }

  function cap_nhat_panel() {
    const dang_bat = document.body.dataset.theme === "tienmon";
    const state = document.getElementById("tienMonPanelState");
    const sceneState = document.getElementById("tienMonSceneState");
    const activate = document.getElementById("tienMonActivate");
    const leave = document.getElementById("tienMonLeave");

    if (state) state.textContent = dang_bat ? "Tiên Môn đang khai mở" : "Chưa nhập Tiên Môn";
    if (sceneState) {
      sceneState.textContent = che_do_canh === "auto"
        ? "Thiên cảnh tự chuyển theo thời gian thực."
        : "Đang ép Thiên Cảnh " + che_do_canh + " để kiểm thử.";
    }
    if (activate) {
      activate.textContent = dang_bat ? "Tiên Môn đã khai mở" : "Nhập Tiên Môn";
      activate.disabled = dang_bat;
    }
    if (leave) leave.disabled = !dang_bat;

    document.querySelectorAll("[data-tm-scene]").forEach(nut => {
      nut.classList.toggle("active", nut.dataset.tmScene === che_do_canh);
    });
  }

  function mo_panel() {
    const overlay = document.getElementById("tienMonOverlay");
    const settings = document.getElementById("settingsOverlay");
    if (!overlay) return;

    settings?.classList.remove("open");
    settings?.setAttribute("aria-hidden", "true");

    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("tienmon-panel-open");
    cap_nhat_panel();
  }

  function dong_panel() {
    const overlay = document.getElementById("tienMonOverlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("tienmon-panel-open");
  }

  function kich_hoat_tien_mon() {
    window.giao_dien_ma_hoa?.apDung("tienmon");
    document.dispatchEvent(new CustomEvent("tienmon:theme-change"));
    cap_nhat_theme();
    setTimeout(dong_panel, 180);
  }

  function thoat_tien_mon() {
    window.giao_dien_ma_hoa?.thoatTienMon();
    document.dispatchEvent(new CustomEvent("tienmon:theme-change"));
    cap_nhat_panel();
    setTimeout(dong_panel, 180);
  }

  function dat_canh(mode) {
    const hop_le = mode === "auto" || CANH.some(c => String(c.id) === String(mode));
    if (!hop_le) return;
    che_do_canh = String(mode);
    localStorage.setItem("cipher-tienmon-scene-mode", che_do_canh);
    canh_hien_tai = null;

    if (document.body.dataset.theme === "tienmon") {
      chuyen_canh(canh_theo_che_do(), false);
    }
    cap_nhat_panel();
  }

  function gan_su_kien_panel() {
    document.getElementById("tienMonPremiumOpen")?.addEventListener("click", mo_panel);
    document.getElementById("tienMonPanelClose")?.addEventListener("click", dong_panel);
    document.getElementById("tienMonActivate")?.addEventListener("click", kich_hoat_tien_mon);
    document.getElementById("tienMonLeave")?.addEventListener("click", thoat_tien_mon);

    document.getElementById("tienMonSceneControls")?.addEventListener("click", su_kien => {
      const nut = su_kien.target.closest("[data-tm-scene]");
      if (nut) dat_canh(nut.dataset.tmScene);
    });

    const overlay = document.getElementById("tienMonOverlay");
    overlay?.addEventListener("click", su_kien => {
      if (su_kien.target === overlay) dong_panel();
    });

    document.addEventListener("keydown", su_kien => {
      if (su_kien.key === "Escape" && overlay?.classList.contains("open")) dong_panel();
    });

    cap_nhat_panel();
  }

  tao_the_gioi();

  const observer = new MutationObserver(cap_nhat_theme);
  observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

  gan_su_kien_panel();
  cap_nhat_theme();

  setInterval(() => {
    if (document.body.dataset.theme === "tienmon" && che_do_canh === "auto") {
      chuyen_canh(tim_canh());
    }
  }, 30000);

  window.tien_mon_premium = {
    resolveScene: tim_canh,
    refresh: cap_nhat_theme,
    openPanel: mo_panel,
    closePanel: dong_panel,
    activate: kich_hoat_tien_mon,
    leave: thoat_tien_mon,
    setScene: dat_canh
  };
})();
