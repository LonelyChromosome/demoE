(() => {
  const KHOA_LUU = "cipher-personality-v1";

  const NHAN = {
    normal: { ten: "Bình thường", bieu_tuong: "•", mo_ta: "Rõ ràng, trung tính." },
    cultivation: { ten: "Tu Tiên", bieu_tuong: "☯", mo_ta: "Pháp trận, mật văn, thiên cơ." },
    blunt: { ten: "Mỏ hỗn", bieu_tuong: "!", mo_ta: "Láo, châm biếm, chửi thẳng." },
    flirtatious: { ten: "Mập mờ", bieu_tuong: "♡", mo_ta: "Ngọt, đưa đẩy, không chịu nói rõ." }
  };

  const PACK = {
    normal: {
      ready: "Sẵn sàng xử lý dữ liệu.",
      encryptSuccess: "Mã hóa thành công.",
      decryptSuccess: "Giải mã thành công.",
      hashSuccess: "Tạo giá trị băm thành công.",
      missingPlain: "Nhập bản rõ trước khi mã hóa.",
      missingCipher: "Nhập bản mã trước khi giải mã.",
      missingHash: "Nhập dữ liệu trước khi băm.",
      error: "{error}",
      swap: "Đã đổi vị trí bản rõ và bản mã.",
      clear: "Đã xóa nội dung.",
      md5Invalid: "MD5 cần đối chiếu phải có đúng 32 ký tự hexadecimal.",
      md5Match: "Trùng khớp. Mật khẩu tạo ra đúng MD5 đã nhập.",
      md5Mismatch: "Không trùng khớp. Mật khẩu này tạo ra MD5 khác.",
      fileNeedTwo: "Chọn đủ hai file để bắt đầu đối chiếu.",
      fileSame: "Hai file có SHA-256 trùng khớp hoàn toàn.",
      fileDifferent: "Hai file có SHA-256 khác nhau.",
      fileReadError: "Không thể đọc file. Hãy chọn lại.",
      searchEmpty: "Không tìm thấy thuật toán phù hợp với “{query}”."
    },

    cultivation: {
      ready: "Pháp trận đã dựng. Đạo hữu cứ nhập chân văn, phần còn lại để ta vận trận.",
      encryptSuccess: "Mật văn đã thành. Pháp trận vận hành thuận lợi.",
      decryptSuccess: "Mật văn đã giải, chân văn hiện lại.",
      hashSuccess: "Ấn ký đã kết thành. Chân văn nay lưu lại dưới một dấu băm.",
      missingPlain: "Chưa có chân văn, pháp trận không thể khởi.",
      missingCipher: "Chưa thấy mật văn. Không có gì để giải trận.",
      missingHash: "Không có chân văn, ấn ký chẳng thể kết.",
      error: "Pháp trận nghịch hành: {error}",
      swap: "Âm dương đảo vị. Bản rõ và mật văn đã đổi chỗ.",
      clear: "Dấu vết đã tán. Pháp bàn trở về tĩnh.",
      md5Invalid: "Ấn MD5 không hợp lệ. Phải đủ 32 ký tự hexadecimal.",
      md5Match: "Ấn ký tương hợp. Mật khẩu này khớp hoàn toàn.",
      md5Mismatch: "Ấn ký bất đồng. Mật khẩu này không tương hợp.",
      fileNeedTwo: "Cần đủ song quyển mới có thể đối chiếu ấn ký.",
      fileSame: "Song quyển đồng ấn. SHA-256 hoàn toàn tương hợp.",
      fileDifferent: "Hai ấn ký phân ly. Hai file không đồng nhất.",
      fileReadError: "Không thể khai quyển. Đạo hữu hãy chọn lại tệp khác.",
      searchEmpty: "Thiên thư không ghi nhận pháp môn phù hợp với “{query}”."
    },

    blunt: {
      ready: "Rồi, ném dữ liệu vào đây. Đứng nhìn nữa thì nó cũng đéo tự mã hóa đâu.",
      encryptSuccess: "Xong. Có mỗi thế cũng phải để tao làm hộ.",
      decryptSuccess: "Giải ra rồi đấy. Giờ đọc đi, đừng ngu đến mức hỏi bản rõ ở đâu nữa.",
      hashSuccess: "Băm xong. Và không, đéo có nút “giải mã hash”, đừng hỏi ngu.",
      missingPlain: "Ô trống trơn thế kia mà cũng bấm mã hóa. Mày định mã hóa hư vô à?",
      missingCipher: "Bản mã đéo có mà đòi giải. Tao bói cho mày chắc?",
      missingHash: "Không nhập cái mẹ gì mà bấm băm. Hash không tự đẻ ra đâu thiên tài.",
      error: "Mày làm sai rồi: {error} Đọc đi rồi sửa, đừng bấm loạn như thằng ngu.",
      swap: "Đổi cho rồi đấy. Có cái Ctrl+C Ctrl+V cũng lười nữa.",
      clear: "Dọn sạch bãi chiến trường rồi. Làm lại, lần này bớt ngu đi.",
      md5Invalid: "MD5 32 ký tự hex. Ba mươi hai. Đếm còn sai thì check cái đéo gì?",
      md5Match: "Ơ địt, đúng thật. Mật khẩu khớp. Mãi mới làm được một việc ra hồn.",
      md5Mismatch: "Sai bét. Mật khẩu này đéo khớp, đừng cố cãi với hash.",
      fileNeedTwo: "So sánh hai file mà mày đưa có một file. Toán lớp mấy thế?",
      fileSame: "Giống y chang. SHA-256 trùng sạch, khỏi soi nữa ông nội.",
      fileDifferent: "Khác nhau rõ như ban ngày. Hash lệch rồi mà còn nghi cái gì nữa?",
      fileReadError: "File này đọc đéo nổi. Nó hỏng hay mày ném cái quái gì vào thế?",
      searchEmpty: "Không có cái thuật toán nào khớp “{query}”. Gõ cho tử tế hộ tao cái."
    },

    flirtatious: {
      ready: "Ngoan, đưa mình xem cậu đang giữ gì nào... mình chỉ nhìn một chút thôi ♡",
      encryptSuccess: "Mình giấu giúp cậu rồi. Bí mật này cứ để giữa hai đứa thêm một lúc nhé 🔐",
      decryptSuccess: "Mở ra rồi này... cậu tin mình thế, làm mình vui đấy ✦",
      hashSuccess: "Mình để lại dấu rồi. Của cậu đấy... hay của chúng ta nhỉ? Thôi, coi như mình chưa nói ♡",
      missingPlain: "Cậu đến gặp mình mà chẳng mang gì theo à? Mình còn mong một thứ đặc biệt hơn cơ 😉",
      missingCipher: "Chưa đưa bí mật mà đã muốn mình mở lòng rồi sao? Cậu tham thật đấy ♡",
      missingHash: "Đưa mình một chút gì đó đi... mình mới để lại dấu cho cậu được chứ ✦",
      error: "Ơ... cậu làm mình vướng rồi này: {error} Sửa giúp mình nhé, ngoan ♡",
      swap: "Đổi chỗ nhé. Lần này để mình dẫn cậu... đừng buông tay sớm quá ✦",
      clear: "Xóa rồi. Nhưng mình nhớ thì có tính là chưa xóa không? ☾",
      md5Invalid: "32 ký tự hex cơ... thiếu một chút là mình cũng không nhận đâu 😉",
      md5Match: "Khớp rồi này... cậu cứ làm mình thấy hai đứa hợp nhau mãi thế này thì nguy hiểm lắm ♡",
      md5Mismatch: "Chưa khớp thôi. “Chưa” với “không” khác nhau mà... cậu biết chứ? 😉",
      fileNeedTwo: "Thiếu một cái nữa rồi. Đừng để mình chờ lâu nhé... mình không giỏi chờ đâu ✦",
      fileSame: "Giống nhau đến thế à... nhìn mà mình thấy hơi ghen đấy ♡",
      fileDifferent: "Khác nhau rồi. Nhưng khác nhau mới làm người ta cứ muốn nhìn thêm, đúng không? 😉",
      fileReadError: "File này làm khó mình rồi... cậu đổi cái khác cho mình nhé, ngoan ✨",
      searchEmpty: "Không thấy “{query}” rồi. Hay ở lại với mình thêm chút... biết đâu lại quên mất đang tìm gì ♡"
    }
  };

  function lay_pack() {
    const da_luu = localStorage.getItem(KHOA_LUU);
    return Object.prototype.hasOwnProperty.call(PACK, da_luu) ? da_luu : "normal";
  }

  function thay_bien(mau, bien = {}) {
    return String(mau || "")
      .replaceAll("{error}", String(bien.error || "Có lỗi khi xử lý dữ liệu."))
      .replaceAll("{query}", String(bien.query || ""));
  }

  function resolve(su_kien, bien = {}) {
    const pack = lay_pack();
    const mau = PACK[pack]?.[su_kien] ?? PACK.normal[su_kien] ?? "";
    return thay_bien(mau, bien);
  }

  function cap_nhat_ui() {
    const pack = lay_pack();
    document.body.dataset.personality = pack;
    document.querySelectorAll("[data-personality-option]").forEach(nut => {
      nut.classList.toggle("active", nut.dataset.personalityOption === pack);
    });
  }

  function chon_pack(pack) {
    if (!PACK[pack]) return;
    localStorage.setItem(KHOA_LUU, pack);
    cap_nhat_ui();

    const thong_bao = document.getElementById("message");
    if (thong_bao) {
      thong_bao.textContent = resolve("ready");
      thong_bao.className = "message";
    }

    document.dispatchEvent(new CustomEvent("cipher:personality-change", { detail: { pack } }));
  }

  function tao_cai_dat() {
    const danh_sach_theme = document.querySelector(".theme-list");
    if (!danh_sach_theme || document.querySelector(".assistant-settings-block")) return;

    const khoi = document.createElement("section");
    khoi.className = "assistant-settings-block";
    khoi.innerHTML = [
      "<div class='settings-subhead'>",
      "<div><span class='settings-kicker'>TRỢ LÝ</span><h3>Tính cách phản hồi</h3></div>",
      "<small>Chỉ đổi cách nói, không đổi kết quả thuật toán.</small>",
      "</div>",
      "<div class='assistant-list'>",
      Object.entries(NHAN).map(([id, data]) => [
        "<button class='assistant-option' type='button' data-personality-option='", id, "'>",
        "<span class='assistant-avatar'>", data.bieu_tuong, "</span>",
        "<span class='assistant-copy'><strong>", data.ten, "</strong><small>", data.mo_ta, "</small></span>",
        "<span class='assistant-check'>✓</span>",
        "</button>"
      ].join("")).join(""),
      "</div>"
    ].join("");

    danh_sach_theme.insertAdjacentElement("afterend", khoi);

    khoi.addEventListener("click", su_kien => {
      const nut = su_kien.target.closest("[data-personality-option]");
      if (nut) chon_pack(nut.dataset.personalityOption);
    });

    cap_nhat_ui();
  }

  window.tro_li_ma_hoa = {
    resolve,
    getPack: lay_pack,
    setPack: chon_pack,
    packs: NHAN
  };

  tao_cai_dat();
  cap_nhat_ui();
})();
