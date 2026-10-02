(() => {
  const NGON_NGU = new Map([
    ["Trang chủ", "Đạo Tràng"],
    ["Mã hóa", "Mật Pháp"],
    ["Bảng chữ cái", "Linh Văn"],
    ["So sánh", "Đối Ấn"],
    ["Cài đặt", "Thiết Lập"],
    ["Sẵn sàng", "Pháp trận an định"],
    ["Mã Hóa Cổ Điển", "Mật Pháp Cổ Trận"],
    ["Công cụ mật mã", "Mật Pháp Các"],
    ["Công cụ mã hóa", "Pháp Đàn Mật Văn"],
    ["CRYPTOGRAPHY TOOL", "MẬT PHÁP ĐÀN"],
    ["Mã hóa và giải mã", "Phong Ấn & Giải Ấn"],
    ["12 thuật toán", "12 pháp môn"],
    ["12 THUẬT TOÁN", "12 PHÁP MÔN"],
    ["Loại mã hóa", "Chọn pháp môn"],
    ["Hệ chữ cái", "Linh tự trận"],
    ["Khóa / Tham số", "Pháp khóa / Tham số"],
    ["Bản rõ", "Chân văn"],
    ["Bản mã", "Mật văn"],
    ["Mã hóa", "Phong ấn"],
    ["Giải mã", "Giải ấn"],
    ["Đổi chỗ", "Đảo vị"],
    ["Xóa", "Tán trận"],
    ["Thuật toán đang chọn", "Pháp môn đang vận"],
    ["Trạng thái", "Thiên cơ"],

    ["ALGORITHM LIBRARY", "TÀNG KINH CÁC"],
    ["Các thuật toán có trong web", "Các pháp môn đang lưu tại Mật Pháp Các"],
    ["Thư viện kiến thức mật mã", "Tàng Kinh Các / Mật Pháp"],
    ["12 bài giảng", "12 pháp quyển"],
    ["Chi tiết", "Khai quyển"],
    ["Khóa / đầu vào", "Pháp khóa / đầu vào"],
    ["Đặc điểm", "Đạo tính"],
    ["CỔ ĐIỂN", "CỔ PHÁP"],
    ["Mã hóa cổ điển", "Cổ pháp mật văn"],
    ["HIỆN ĐẠI", "TÂN PHÁP"],
    ["Mã hóa hiện đại", "Mật pháp hiện đại"],
    ["Mã hóa công khai", "Công khai pháp"],
    ["HASH", "ẤN KÝ"],
    ["Hàm băm", "Ấn ký một chiều"],

    ["ALPHABET MAP", "LINH TỰ ĐỒ"],
    ["Toàn bộ bảng chữ cái", "Linh Tự Trận Đồ"],
    ["Z26 · Tiếng Anh", "Z26 / Anh tự"],
    ["Z29 · Tiếng Việt", "Z29 / Việt tự"],

    ["INTEGRITY LAB", "ĐỐI ẤN ĐÀN"],
    ["So sánh & kiểm tra", "Đối Ấn & Nghiệm Chứng"],
    ["Kiểm tra mật khẩu bằng MD5", "Nghiệm mật khẩu bằng MD5"],
    ["MD5 cần đối chiếu", "MD5 cần đối ấn"],
    ["Mật khẩu cần kiểm tra", "Mật khẩu cần nghiệm"],
    ["Kiểm tra MD5", "Nghiệm MD5"],
    ["Chưa có dữ liệu kiểm tra.", "Chưa có ấn ký để nghiệm."],
    ["Đối chiếu hai file bằng SHA-256", "Đối ấn song tệp bằng SHA-256"],
    ["FILE A", "QUYỂN A"],
    ["FILE B", "QUYỂN B"],
    ["Nhấn để chọn hoặc kéo thả file", "Chạm để chọn hoặc thả tệp vào pháp đàn"],
    ["Chưa chọn file", "Chưa nhập tệp"],
    ["VS", "ĐỐI"],

    ["HASH COUNTER", "LUYỆN ẤN"],
    ["Bộ đếm & tạo hash trực tiếp", "Luyện Ấn / Đếm Hex"],
    ["ký tự đầu vào", "linh tự nhập vào"],

    ["SEARCH RESULTS", "THIÊN THƯ TRUY DẤU"],
    ["Kết quả tìm kiếm", "Dấu vết Thiên Thư"],
    ["Tìm kiếm thuật toán", "Truy tìm pháp môn"],
    ["Thư viện mã hóa", "Tàng Kinh Các"],
    ["← Quay lại thư viện", "← Hồi Tàng Kinh Các"],
    ["BẢN CHẤT", "BẢN NGUYÊN"],
    ["KHÓA / ĐẦU VÀO", "PHÁP KHÓA / ĐẦU VÀO"],
    ["ĐIỂM CẦN NHỚ", "TÂM PHÁP"],
    ["Ghi nhớ:", "Tâm pháp:"],

    ["CÀI ĐẶT", "THIẾT LẬP"],
    ["Theme giao diện", "Giao Diện Phàm Giới"],
    ["TRỢ LÝ", "LINH THỨC"],
    ["Tính cách phản hồi", "Tính cách linh thức"],
    ["Bình thường", "Phàm ngôn"],
    ["Mỏ hỗn", "Mỏ hỗn"],
    ["Mập mờ", "Mập mờ"],
    ["Tu Tiên", "Tu Tiên"],

    ["Không dùng khóa", "Vô khóa"],
    ["Không dùng khóa bí mật.", "Không cần mật khóa bí truyền."]
  ]);

  const MO_TA = new Map([
    ["Mỗi nhóm bên dưới giải thích mục đích, cách dùng khóa và tính chất chính của đúng các thuật toán mà công cụ đang hỗ trợ.",
      "Tàng Kinh Các phân chia từng pháp môn, ghi rõ công dụng, pháp khóa và đạo tính để đạo hữu tra cứu."],
    ["Các thẻ dưới đây là bản tóm tắt. Bấm Chi tiết để mở bài giảng đầy đủ: nguồn gốc, cơ chế, công thức, cách dùng, tình huống áp dụng, giới hạn và ví dụ.",
      "Mỗi pháp giản dưới đây là một bản lược giải. Chọn Khai quyển để đọc căn nguyên, cơ chế, công thức, cách vận pháp, giới hạn và diễn pháp minh họa."],
    ["Hiển thị đầy đủ ký tự, chỉ số modulo và biểu diễn nhị phân 5 bit của hai hệ chữ đang dùng trong công cụ.",
      "Linh Tự Trận Đồ ghi đủ ký tự, vị trí modulo và nhị phân 5 bit của hai hệ chữ đang dùng trong pháp đàn."],
    ["A–Z, đánh số từ 0 đến 25. Đây là bảng chuẩn cho các ví dụ mật mã cổ điển tiếng Anh.",
      "Anh tự A đến Z, định vị từ 0 đến 25; đây là linh tự trận chuẩn cho các cổ pháp tiếng Anh."],
    ["29 chữ cái tiếng Việt dùng trong web; dấu thanh được chuẩn hóa về chữ gốc tương ứng khi xử lý.",
      "Hai mươi chín Việt tự dùng trong pháp đàn; dấu thanh được quy nguyên về chữ gốc tương ứng khi vận pháp."],
    ["Hai công cụ kiểm tra trực tiếp trong trình duyệt: xác minh mật khẩu bằng MD5 và đối chiếu fingerprint SHA-256 của hai file bất kỳ.",
      "Đối Ấn Đàn có hai phép nghiệm: đối mật khẩu bằng MD5 và so dấu SHA-256 của hai tệp ngay tại bản địa."],
    ["Dữ liệu không cần rời khỏi máy",
      "Dữ liệu bất xuất bản địa"],
    ["Mật khẩu và file được xử lý ngay trong trình duyệt. Công cụ chỉ tạo digest để đối chiếu, không cần upload file lên máy chủ.",
      "Mật khẩu và tệp được vận ngay trong trình duyệt. Pháp đàn chỉ kết ấn để đối chiếu, không truyền dữ liệu lên ngoại giới."],
    ["Dán một MD5 có sẵn, nhập mật khẩu cần thử. Web băm mật khẩu bằng MD5 rồi so sánh chính xác hai chuỗi hash.",
      "Đặt một MD5 đã có cùng mật khẩu cần nghiệm. Pháp đàn kết ấn MD5 rồi đối chiếu hai dấu một cách chính xác."],
    ["Kéo thả hoặc chọn hai file bất kỳ. Mỗi file được đọc dưới dạng byte, tạo fingerprint SHA-256 rồi đối chiếu 1:1.",
      "Đưa vào hai tệp bất kỳ. Mỗi tệp được đọc theo byte, kết dấu SHA-256 rồi đối ấn từng phần."],
    ["Nhập một đoạn bất kỳ. Web băm đồng thời MD5 và SHA-256, hiển thị digest và đếm chính xác số ký tự hexadecimal.",
      "Đặt một đoạn chân văn. Pháp đàn đồng thời kết ấn MD5 và SHA-256, hiện digest và đếm đủ số linh tự hexadecimal."],
    ["Ba công cụ: tạo và đếm hash MD5/SHA-256 từ văn bản, kiểm tra mật khẩu với MD5 có sẵn và đối chiếu hai file bằng fingerprint SHA-256.",
      "Ba phép nghiệm cùng quy về một đàn: luyện ấn MD5/SHA-256, nghiệm mật khẩu với MD5 sẵn có và đối ấn hai tệp bằng SHA-256."],
    ["Chỉ đổi cách nói, không đổi kết quả thuật toán.",
      "Chỉ đổi khẩu khí của linh thức; pháp môn và kết quả không bị can thiệp."]
  ]);

  const GOC_TEXT = new WeakMap();
  const GOC_ATTR = new WeakMap();
  let dang_xu_ly = false;

  function dang_tien_mon() {
    return document.body?.dataset.theme === "tienmon";
  }

  function bien_doi(van_ban) {
    const raw = String(van_ban);
    const trim = raw.trim();
    if (!trim) return raw;

    let moi = NGON_NGU.get(trim) || MO_TA.get(trim) || trim;

    if (/^INDEX \d+$/.test(trim)) {
      moi = trim.replace("INDEX ", "VỊ ");
    } else if (/^\d+ ký tự$/.test(trim)) {
      moi = trim.replace(" ký tự", " linh tự");
    } else if (/^Kết quả cho “(.+)”$/.test(trim)) {
      moi = trim.replace(/^Kết quả cho /, "Thiên thư hiện dấu cho ");
    } else if (/^\d+ kết quả$/.test(trim)) {
      moi = trim.replace(" kết quả", " dấu vết");
    } else if (/^DEEP DIVE/.test(trim)) {
      moi = trim.replace(/^DEEP DIVE\s*[·/]?\s*/, "KHAI QUYỂN / ");
    } else if (/^\d+\. .+ là gì\?$/.test(trim)) {
      moi = trim.replace(/^\d+\. /, "").replace(/ là gì\?$/, " / Bản nguyên");
    } else if (/^\d+\. Nguồn gốc/.test(trim)) {
      moi = trim.replace(/^\d+\. .*/, "Căn nguyên & truyền thừa");
    } else if (/^\d+\. (Vì sao|Tư duy toán học|Cơ chế|Cấu trúc)/.test(trim)) {
      moi = trim.replace(/^\d+\. .*/, "Đạo lý vận hành");
    } else if (/^\d+\. (Dùng|Cách dùng|Cách sử dụng|Quy trình)/.test(trim)) {
      moi = trim.replace(/^\d+\. .*/, "Cách vận pháp");
    } else if (/^\d+\. Khi nào/.test(trim)) {
      moi = trim.replace(/^\d+\. .*/, "Khi nào nên vận pháp?");
    } else if (/^\d+\. Ví dụ/.test(trim)) {
      moi = trim.replace(/^\d+\. .*/, "Diễn pháp minh họa");
    }

    const dau = raw.match(/^\s*/)?.[0] || "";
    const cuoi = raw.match(/\s*$/)?.[0] || "";
    return dau + moi + cuoi;
  }

  function nen_bo_qua(node) {
    const el = node.parentElement;
    if (!el) return true;
    if (el.closest("script, style, .tm-safe-glyph")) return true;
    if (el.closest("#message, .compare-result, .file-final-result")) return true;
    if (el.closest(".tienmon-overlay, .premium-entry-block")) return true;
    return false;
  }

  function xu_ly_text_node(node) {
    if (nen_bo_qua(node)) return;
    if (!GOC_TEXT.has(node)) GOC_TEXT.set(node, node.nodeValue);
    const goc = GOC_TEXT.get(node);
    const dich = dang_tien_mon() ? bien_doi(goc) : goc;
    if (node.nodeValue !== dich) node.nodeValue = dich;
  }

  function xu_ly_thuoc_tinh(el) {
    if (!(el instanceof HTMLElement)) return;
    const attrs = ["placeholder", "aria-label", "title"];
    if (!GOC_ATTR.has(el)) GOC_ATTR.set(el, {});

    const kho = GOC_ATTR.get(el);
    attrs.forEach(attr => {
      if (!el.hasAttribute(attr) && !(attr in kho)) return;
      if (!(attr in kho)) kho[attr] = el.getAttribute(attr);
      const goc = kho[attr];
      if (goc == null) return;
      const dich = dang_tien_mon() ? bien_doi(goc) : goc;
      if (el.getAttribute(attr) !== dich) el.setAttribute(attr, dich);
    });
  }

  function boc_glyph_loi(root = document.body) {
    if (!dang_tien_mon() || !root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const can_boc = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement || node.parentElement.closest(".tm-safe-glyph, script, style")) continue;
      if (/[•·–—]/.test(node.nodeValue || "")) can_boc.push(node);
    }

    can_boc.forEach(node => {
      const parts = String(node.nodeValue).split(/([•·–—])/);
      const frag = document.createDocumentFragment();
      parts.forEach(part => {
        if (!part) return;
        if (/^[•·–—]$/.test(part)) {
          const span = document.createElement("span");
          span.className = "tm-safe-glyph";
          span.textContent = part;
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.replaceWith(frag);
    });
  }

  function danh_dau_kinh_giai() {
    document.querySelectorAll(".lesson-section p").forEach((p, i) => {
      p.classList.add("tm-kinh-giai");
      if (i % 2 === 0) p.dataset.tmSeal = "Kinh giải";
      else p.dataset.tmSeal = "Chú giải";
    });

    document.querySelectorAll(".crypto-info-card > p").forEach(p => {
      p.classList.add("tm-phap-gian");
    });
  }

  function cap_nhat(root = document.body) {
    if (!root || dang_xu_ly) return;
    dang_xu_ly = true;
    try {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(xu_ly_text_node);

      if (root instanceof HTMLElement) xu_ly_thuoc_tinh(root);
      root.querySelectorAll?.("[placeholder], [aria-label], [title]").forEach(xu_ly_thuoc_tinh);

      danh_dau_kinh_giai();
      boc_glyph_loi(root);
    } finally {
      dang_xu_ly = false;
    }
  }

  const observer = new MutationObserver(mutations => {
    if (dang_xu_ly) return;
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) cap_nhat(node);
        else if (node.nodeType === Node.TEXT_NODE) xu_ly_text_node(node);
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const themeObserver = new MutationObserver(() => cap_nhat(document.body));
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

  document.addEventListener("tienmon:theme-change", () => cap_nhat(document.body));
  cap_nhat(document.body);

  window.tien_mon_ngon_ngu = { refresh: () => cap_nhat(document.body), translate: bien_doi };
})();
