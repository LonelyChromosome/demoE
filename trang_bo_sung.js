(() => {
  const noi_dung_chinh = document.querySelector(".content");
  const thanh_ben = document.querySelector(".sidebar");
  if (!noi_dung_chinh || !thanh_ben) return;

  const cac_nut_dieu_huong = Array.from(document.querySelectorAll(".side-nav .nav-item"))
    .filter(nut => nut.id !== "settingsButton");

  const thu_tu_trang = ["home", "crypto", "alphabet", "compare"];
  const thong_tin_trang = {
    home: { topbar: "Công cụ mật mã", badge: "12 THUẬT TOÁN" },
    crypto: { topbar: "Thư viện thuật toán", badge: "CLASSICAL / MODERN / PUBLIC / HASH" },
    alphabet: { topbar: "Bảng chữ cái", badge: "Z26 / Z29" },
    compare: { topbar: "So sánh & kiểm tra", badge: "MD5 / SHA-256 FILE" }
  };

  cac_nut_dieu_huong.forEach((nut, i) => {
    if (!nut.dataset.view) nut.dataset.view = thu_tu_trang[i] || "home";
  });

  const cac_phan_cu = Array.from(noi_dung_chinh.children);
  const trang_chu = document.createElement("div");
  trang_chu.className = "app-view";
  trang_chu.dataset.view = "home";
  cac_phan_cu.forEach(phan => trang_chu.appendChild(phan));
  noi_dung_chinh.appendChild(trang_chu);

  function tao_breadcrumb(ten) {
    return "<section class='breadcrumb'><span>Trang chủ</span><b>›</b><strong>" + ten + "</strong></section>";
  }

  function tao_the_thuat_toan(ten, nhom, mo_ta, khoa, dac_diem) {
    return [
      "<article class='crypto-info-card'>",
      "<div class='crypto-card-top'><h3>", ten, "</h3><code>", nhom, "</code></div>",
      "<p>", mo_ta, "</p>",
      "<div class='crypto-facts'>",
      "<div class='crypto-fact'><strong>Khóa / đầu vào</strong><span>", khoa, "</span></div>",
      "<div class='crypto-fact'><strong>Đặc điểm</strong><span>", dac_diem, "</span></div>",
      "</div></article>"
    ].join("");
  }

  const trang_ma_hoa = document.createElement("div");
  trang_ma_hoa.className = "app-view";
  trang_ma_hoa.dataset.view = "crypto";
  trang_ma_hoa.hidden = true;
  trang_ma_hoa.innerHTML = [
    tao_breadcrumb("Mã hóa"),
    "<section class='page-heading extra-heading'><div>",
    "<p class='eyebrow'>ALGORITHM LIBRARY</p>",
    "<h1>Các thuật toán có trong web</h1>",
    "<p>Mỗi nhóm bên dưới giải thích mục đích, cách dùng khóa và tính chất chính của đúng các thuật toán mà công cụ đang hỗ trợ.</p>",
    "</div><div class='heading-chip'>12 thuật toán</div></section>",

    "<section class='crypto-group'><h2 class='crypto-group-title'><span>CỔ ĐIỂN</span> Mã hóa cổ điển</h2><div class='crypto-info-grid'>",
    tao_the_thuat_toan("Dịch vòng (Caesar)", "Z26 / Z29", "Dịch mỗi ký tự đi một số vị trí cố định trong bảng chữ cái. Khi vượt cuối bảng sẽ quay vòng về đầu.", "Số nguyên k", "Nhanh, dễ quan sát quy luật; giải mã bằng cách dịch ngược k bước."),
    tao_the_thuat_toan("Mã thay thế", "Z26 / Z29", "Thay mỗi ký tự bằng một ký tự khác theo bảng thay thế được sinh từ khóa. Cùng một ký tự đầu vào luôn cho cùng một ký tự đầu ra.", "Từ khóa / bảng thay thế", "Đơn bảng, dễ minh họa ánh xạ ký tự nhưng vẫn để lộ tần suất."),
    tao_the_thuat_toan("Vigenere", "Z26 / Z29", "Dùng nhiều phép dịch vòng khác nhau. Khóa chữ được lặp lại trên bản rõ và mỗi ký tự khóa quyết định độ dịch của vị trí tương ứng.", "Chuỗi khóa chữ", "Đa bảng, che tần suất tốt hơn Caesar; giải mã dùng cùng khóa."),
    tao_the_thuat_toan("Affine", "Z26 / Z29", "Biến đổi chỉ số ký tự theo công thức E(x) = (a·x + b) mod m.", "Hai số a, b; a phải khả nghịch mod m", "Có công thức toán rõ ràng; giải mã cần nghịch đảo modulo của a."),
    tao_the_thuat_toan("Hill", "MA TRẬN", "Gom ký tự thành vector rồi nhân với ma trận khóa theo modulo của bảng chữ cái.", "Ma trận 2×2 khả nghịch", "Minh họa đại số tuyến tính trong mật mã; giải mã dùng ma trận nghịch đảo modulo."),
    "</div></section>",

    "<section class='crypto-group'><h2 class='crypto-group-title'><span>HIỆN ĐẠI</span> Mã hóa đối xứng</h2><div class='crypto-info-grid'>",
    tao_the_thuat_toan("DES", "64-BIT", "Mã khối cổ điển với khối dữ liệu 64 bit và cấu trúc Feistel 16 vòng. Web có chế độ minh họa DES cho dữ liệu và khóa phù hợp.", "Khóa DES", "Có thể mã hóa và giải mã bằng cùng khóa; hiện không còn phù hợp để bảo vệ dữ liệu thực tế vì khóa ngắn."),
    tao_the_thuat_toan("AES-128-GCM", "WEB CRYPTO", "AES là chuẩn mã khối hiện đại; chế độ GCM vừa mã hóa vừa kiểm tra toàn vẹn. Web sinh khóa 128 bit từ khóa chữ và dùng IV cho mỗi lần mã hóa.", "Khóa chữ → khóa AES", "Nhanh, hiện đại, có xác thực dữ liệu; bản mã chứa IV cùng ciphertext."),
    "</div></section>",

    "<section class='crypto-group'><h2 class='crypto-group-title'><span>CÔNG KHAI</span> Mã hóa bất đối xứng</h2><div class='crypto-info-grid'>",
    tao_the_thuat_toan("RSA", "PUBLIC KEY", "Sử dụng một cặp khóa: khóa công khai để mã hóa và khóa riêng để giải mã. Bản demo sinh tham số từ khóa chữ để minh họa nguyên lý.", "Khóa công khai / khóa riêng", "Hai khóa khác nhau; phù hợp để học cơ chế bất đối xứng, trao đổi khóa và chữ ký số."),
    "</div></section>",

    "<section class='crypto-group'><h2 class='crypto-group-title'><span>HASH</span> Hàm băm một chiều</h2><div class='crypto-info-grid'>",
    tao_the_thuat_toan("MD5", "128-BIT DIGEST", "Biến dữ liệu có độ dài bất kỳ thành chuỗi băm 128 bit, thường hiển thị bằng 32 ký tự hex.", "Không dùng khóa", "Một chiều; phù hợp để minh họa và kiểm tra dữ liệu, nhưng không nên dùng cho bảo mật mật khẩu hiện đại."),
    tao_the_thuat_toan("SHA-1", "160-BIT DIGEST", "Tạo digest 160 bit, hiển thị thành 40 ký tự hex.", "Không dùng khóa", "Một chiều; mạnh hơn MD5 về thiết kế lịch sử nhưng hiện cũng không được khuyến nghị cho chống va chạm."),
    tao_the_thuat_toan("SHA-256", "256-BIT DIGEST", "Thành viên SHA-2 tạo digest 256 bit, thường dùng để kiểm tra toàn vẹn file và fingerprint.", "Không dùng khóa", "Một chiều; phù hợp kiểm tra file và nhiều mục đích toàn vẹn hiện đại."),
    tao_the_thuat_toan("SHA-512", "512-BIT DIGEST", "Thành viên SHA-2 tạo digest 512 bit, hiển thị bằng 128 ký tự hex.", "Không dùng khóa", "Digest dài, khả năng chống va chạm cao trong họ SHA-2."),
    "</div></section>"
  ].join("");
  noi_dung_chinh.appendChild(trang_ma_hoa);

  const bang_z26 = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const bang_z29 = Array.from("AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY");

  function tao_bang_chu_cai(ten, mo_ta, bang) {
    const cac_o = bang.map((ky_tu, i) => {
      return [
        "<div class='alphabet-cell'>",
        "<strong>", ky_tu, "</strong>",
        "<span>INDEX ", String(i), "</span>",
        "<code>", i.toString(2).padStart(5, "0"), "</code>",
        "</div>"
      ].join("");
    }).join("");

    return [
      "<section class='alphabet-full-card'>",
      "<div class='alphabet-card-head'><div>",
      "<h2>", ten, "</h2><p>", mo_ta, "</p>",
      "</div><span class='alphabet-count'>", String(bang.length), " ký tự</span></div>",
      "<div class='alphabet-full-grid'>", cac_o, "</div>",
      "</section>"
    ].join("");
  }

  const trang_bang_chu_cai = document.createElement("div");
  trang_bang_chu_cai.className = "app-view";
  trang_bang_chu_cai.dataset.view = "alphabet";
  trang_bang_chu_cai.hidden = true;
  trang_bang_chu_cai.innerHTML = [
    tao_breadcrumb("Bảng chữ cái"),
    "<section class='page-heading extra-heading'><div>",
    "<p class='eyebrow'>ALPHABET MAP</p>",
    "<h1>Toàn bộ bảng chữ cái</h1>",
    "<p>Hiển thị đầy đủ ký tự, chỉ số modulo và biểu diễn nhị phân 5 bit của hai hệ chữ đang dùng trong công cụ.</p>",
    "</div><div class='heading-chip'>Z26 + Z29</div></section>",
    "<div class='alphabet-layout'>",
    tao_bang_chu_cai("Z26 · Tiếng Anh", "A–Z, đánh số từ 0 đến 25. Đây là bảng chuẩn cho các ví dụ mật mã cổ điển tiếng Anh.", bang_z26),
    tao_bang_chu_cai("Z29 · Tiếng Việt", "29 chữ cái tiếng Việt dùng trong web; dấu thanh được chuẩn hóa về chữ gốc tương ứng khi xử lý.", bang_z29),
    "</div>"
  ].join("");
  noi_dung_chinh.appendChild(trang_bang_chu_cai);

  const trang_so_sanh = document.createElement("div");
  trang_so_sanh.className = "app-view";
  trang_so_sanh.dataset.view = "compare";
  trang_so_sanh.hidden = true;
  trang_so_sanh.innerHTML = [
    tao_breadcrumb("So sánh"),
    "<section class='page-heading extra-heading'><div>",
    "<p class='eyebrow'>INTEGRITY LAB</p>",
    "<h1>So sánh & kiểm tra</h1>",
    "<p>Hai công cụ kiểm tra trực tiếp trong trình duyệt: xác minh mật khẩu bằng MD5 và đối chiếu fingerprint SHA-256 của hai file bất kỳ.</p>",
    "</div><div class='heading-chip'>LOCAL ONLY</div></section>",

    "<div class='compare-layout'>",
    "<section class='compare-hero'><div>",
    "<h2>Dữ liệu không cần rời khỏi máy</h2>",
    "<p>Mật khẩu và file được xử lý ngay trong trình duyệt. Công cụ chỉ tạo digest để đối chiếu, không cần upload file lên máy chủ.</p>",
    "</div><span class='local-badge'>● XỬ LÝ CỤC BỘ</span></section>",

    "<div class='compare-grid'>",
    "<section class='compare-card'>",
    "<h3>Kiểm tra mật khẩu bằng MD5</h3>",
    "<p>Dán một MD5 có sẵn, nhập mật khẩu cần thử. Web băm mật khẩu bằng MD5 rồi so sánh chính xác hai chuỗi hash.</p>",
    "<div class='compare-fields'>",
    "<label class='compare-field'><span>MD5 cần đối chiếu</span><input id='md5TargetInput' type='text' spellcheck='false' maxlength='32' placeholder='Ví dụ: 5f4dcc3b5aa765d61d8327deb882cf99'></label>",
    "<label class='compare-field'><span>Mật khẩu cần kiểm tra</span><input id='md5PasswordInput' type='password' autocomplete='off' placeholder='Nhập mật khẩu...'></label>",
    "</div>",
    "<button id='md5CheckButton' class='action-button primary compare-button' type='button'>Kiểm tra MD5</button>",
    "<div id='md5CheckResult' class='compare-result'>Chưa có dữ liệu kiểm tra.</div>",
    "</section>",

    "<section class='compare-card'>",
    "<h3>Đối chiếu hai file bằng SHA-256</h3>",
    "<p>Kéo thả hoặc chọn hai file bất kỳ. Mỗi file được đọc dưới dạng byte, tạo fingerprint SHA-256 rồi đối chiếu 1:1.</p>",
    "<div class='file-compare-stage'>",

    "<label class='file-drop' id='fileDropA'><input id='fileInputA' type='file'><div>",
    "<span class='file-drop-icon'>A</span><strong>FILE A</strong><small>Nhấn để chọn hoặc kéo thả file</small>",
    "<div class='file-meta' id='fileMetaA'><b>Chưa chọn file</b><span>—</span><code>SHA-256: —</code></div>",
    "</div></label>",

    "<div class='file-vs'>VS</div>",

    "<label class='file-drop' id='fileDropB'><input id='fileInputB' type='file'><div>",
    "<span class='file-drop-icon'>B</span><strong>FILE B</strong><small>Nhấn để chọn hoặc kéo thả file</small>",
    "<div class='file-meta' id='fileMetaB'><b>Chưa chọn file</b><span>—</span><code>SHA-256: —</code></div>",
    "</div></label>",

    "</div>",
    "<div id='fileCompareResult' class='file-final-result'>Chọn đủ hai file để bắt đầu đối chiếu.</div>",
    "</section></div></div>"
  ].join("");
  noi_dung_chinh.appendChild(trang_so_sanh);

  const tieu_de_thanh_tren = document.querySelector(".topbar-title");
  const nhan_thanh_tren = document.querySelector(".topbar-badge");

  function mo_trang(ten_trang) {
    if (!thong_tin_trang[ten_trang]) return;

    document.querySelectorAll(".app-view").forEach(trang => {
      trang.hidden = trang.dataset.view !== ten_trang;
    });

    cac_nut_dieu_huong.forEach(nut => {
      nut.classList.toggle("active", nut.dataset.view === ten_trang);
    });

    if (tieu_de_thanh_tren) tieu_de_thanh_tren.textContent = thong_tin_trang[ten_trang].topbar;
    if (nhan_thanh_tren) nhan_thanh_tren.textContent = thong_tin_trang[ten_trang].badge;

    if (window.innerWidth <= 760) thanh_ben.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  cac_nut_dieu_huong.forEach(nut => {
    nut.addEventListener("click", () => mo_trang(nut.dataset.view));
  });

  const o_tim_kiem = document.querySelector(".topbar-search input");
  if (o_tim_kiem) {
    o_tim_kiem.addEventListener("keydown", su_kien => {
      if (su_kien.key !== "Enter") return;
      const tu_khoa = o_tim_kiem.value.trim().toLowerCase();
      if (!tu_khoa) return;

      const tu_so_sanh = ["md5", "file", "sha-256", "sha256", "so sánh", "so sanh", "kiểm tra", "kiem tra"];
      const tu_bang = ["z26", "z29", "bảng chữ", "bang chu"];

      if (tu_so_sanh.some(x => tu_khoa.includes(x))) mo_trang("compare");
      else if (tu_bang.some(x => tu_khoa.includes(x))) mo_trang("alphabet");
      else mo_trang("crypto");
    });
  }

  const md5_dich = document.getElementById("md5TargetInput");
  const mat_khau = document.getElementById("md5PasswordInput");
  const nut_kiem_tra_md5 = document.getElementById("md5CheckButton");
  const ket_qua_md5 = document.getElementById("md5CheckResult");
  const tro_li = (su_kien, bien = {}, mac_dinh = "") =>
    window.tro_li_ma_hoa?.resolve(su_kien, bien) || mac_dinh;

  function dat_ket_qua_md5(noi_dung, loai) {
    ket_qua_md5.className = loai ? "compare-result " + loai : "compare-result";
    ket_qua_md5.innerHTML = noi_dung;
  }

  nut_kiem_tra_md5.addEventListener("click", () => {
    const hash_muc_tieu = md5_dich.value.trim().toLowerCase();
    const gia_tri_mat_khau = mat_khau.value;

    if (!/^[0-9a-f]{32}$/.test(hash_muc_tieu)) {
      dat_ket_qua_md5(tro_li("md5Invalid", {}, "MD5 cần đối chiếu phải có đúng 32 ký tự hexadecimal."), "error");
      return;
    }

    const hash_tinh_duoc = window.thuat_toan_md5.bam(gia_tri_mat_khau);
    const trung_khop = hash_tinh_duoc === hash_muc_tieu;

    dat_ket_qua_md5(
      "<strong>" + (trung_khop
        ? tro_li("md5Match", {}, "✓ TRÙNG KHỚP")
        : tro_li("md5Mismatch", {}, "✕ KHÔNG TRÙNG KHỚP")) + "</strong>" +
      "<span class='hash-line'>MD5(password) = " + hash_tinh_duoc + "</span>",
      trung_khop ? "success" : "error"
    );
  });

  mat_khau.addEventListener("keydown", su_kien => {
    if (su_kien.key === "Enter") nut_kiem_tra_md5.click();
  });

  const trang_thai_file = {
    A: { file: null, hash: "", error: false },
    B: { file: null, hash: "", error: false }
  };

  function thoat_html(van_ban) {
    return String(van_ban)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function dinh_dang_dung_luong(so_byte) {
    if (so_byte < 1024) return so_byte + " B";
    if (so_byte < 1024 * 1024) return (so_byte / 1024).toFixed(1) + " KB";
    if (so_byte < 1024 * 1024 * 1024) return (so_byte / 1024 / 1024).toFixed(2) + " MB";
    return (so_byte / 1024 / 1024 / 1024).toFixed(2) + " GB";
  }

  async function bam_file_sha_256(file) {
    const du_lieu = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", du_lieu);
    return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
  }

  function cap_nhat_ket_qua_file() {
    const ket_qua = document.getElementById("fileCompareResult");
    const a = trang_thai_file.A;
    const b = trang_thai_file.B;

    if (a.error || b.error) {
      ket_qua.className = "file-final-result different";
      ket_qua.innerHTML = tro_li("fileReadError", {}, "Không thể đọc file. Hãy chọn lại.") +
        "<br><small>SHA-256 chưa thể được tính cho file lỗi.</small>";
      return;
    }

    if (!a.hash || !b.hash) {
      ket_qua.className = "file-final-result";
      ket_qua.textContent = tro_li("fileNeedTwo", {}, "Chọn đủ hai file để bắt đầu đối chiếu.");
      return;
    }

    const giong_nhau = a.hash === b.hash;
    ket_qua.className = "file-final-result " + (giong_nhau ? "same" : "different");
    ket_qua.innerHTML = giong_nhau
      ? tro_li("fileSame", {}, "Hai file có SHA-256 trùng khớp hoàn toàn.") +
        "<br><small>SHA-256 fingerprint trùng khớp hoàn toàn</small>"
      : tro_li("fileDifferent", {}, "Hai file có SHA-256 khác nhau.") +
        "<br><small>SHA-256 fingerprint không trùng khớp</small>";
  }

  async function xu_ly_file(file, ben) {
    if (!file) return;

    const meta = document.getElementById("fileMeta" + ben);
    const ten_file = thoat_html(file.name);
    trang_thai_file[ben] = { file: file, hash: "", error: false };

    meta.innerHTML = [
      "<b title='", ten_file, "'>", ten_file, "</b>",
      "<span>", dinh_dang_dung_luong(file.size), " · đang tạo fingerprint...</span>",
      "<code>SHA-256: đang tính...</code>"
    ].join("");
    cap_nhat_ket_qua_file();

    try {
      const hash = await bam_file_sha_256(file);
      trang_thai_file[ben].hash = hash;
      meta.innerHTML = [
        "<b title='", ten_file, "'>", ten_file, "</b>",
        "<span>", dinh_dang_dung_luong(file.size), " · ", thoat_html(file.type || "không xác định MIME"), "</span>",
        "<code>SHA-256: ", hash, "</code>"
      ].join("");
      cap_nhat_ket_qua_file();
    } catch (loi) {
      trang_thai_file[ben].hash = "";
      trang_thai_file[ben].error = true;
      meta.innerHTML = [
        "<b>", ten_file, "</b>",
        "<span>Không thể đọc file</span>",
        "<code>SHA-256: lỗi</code>"
      ].join("");
      cap_nhat_ket_qua_file();
    }
  }

  ["A", "B"].forEach(ben => {
    const input = document.getElementById("fileInput" + ben);
    const drop = document.getElementById("fileDrop" + ben);

    input.addEventListener("change", () => xu_ly_file(input.files && input.files[0], ben));

    ["dragenter", "dragover"].forEach(ten_su_kien => {
      drop.addEventListener(ten_su_kien, su_kien => {
        su_kien.preventDefault();
        drop.classList.add("dragging");
      });
    });

    ["dragleave", "drop"].forEach(ten_su_kien => {
      drop.addEventListener(ten_su_kien, su_kien => {
        su_kien.preventDefault();
        drop.classList.remove("dragging");
      });
    });

    drop.addEventListener("drop", su_kien => {
      const file = su_kien.dataTransfer && su_kien.dataTransfer.files && su_kien.dataTransfer.files[0];
      if (file) xu_ly_file(file, ben);
    });
  });

  mo_trang("home");
})();
