(() => {
  const DU_LIEU = {
    caesar: {
      id: "caesar",
      ten: "Dịch vòng (Caesar)",
      nhom: "Mã hóa cổ điển",
      nhan: "Z26 / Z29",
      aliases: ["caesar", "cesar", "dich vong", "shift cipher", "ma dich vong", "rot", "rot13"],
      ngan: "Dịch mỗi ký tự đi k vị trí trong bảng chữ cái và quay vòng khi vượt cuối bảng.",
      khoa: "Số nguyên k",
      dac_diem: "Đơn giản, trực quan, rất phù hợp để học modulo nhưng không an toàn cho dữ liệu thật.",
      sections: [
        {
          title: "1. Caesar là gì?",
          paragraphs: [
            "Caesar cipher là một phép thay thế đơn bảng cực kỳ đơn giản: mỗi chữ cái trong bản rõ được thay bằng chữ cái cách nó một số vị trí cố định trong bảng chữ cái. Nếu đi quá cuối bảng, phép dịch quay vòng về đầu. Vì toàn bộ văn bản dùng cùng một độ dịch nên cùng một chữ luôn biến thành cùng một chữ.",
            "Điểm quan trọng khi học Caesar không nằm ở sức mạnh bảo mật mà ở tư duy biểu diễn chữ thành số. Khi A=0, B=1, ..., Z=25, mã hóa trở thành phép cộng modulo. Đây là cầu nối rất tốt từ mật mã cổ điển sang các thuật toán đại số như Affine, Vigenere và Hill."
          ]
        },
        {
          title: "2. Nguồn gốc và bối cảnh",
          paragraphs: [
            "Tên Caesar gắn với Julius Caesar vì các ghi chép cổ mô tả việc ông dùng phép thay thế dịch chữ trong thư từ quân sự. Trong cách trình bày hiện đại, người ta thường lấy độ dịch 3 làm ví dụ kinh điển. Tuy nhiên ý tưởng thay thế chữ cái đã xuất hiện dưới nhiều hình thức từ rất sớm và Caesar chỉ là một trường hợp đặc biệt nổi tiếng.",
            "Ngày nay Caesar gần như chỉ còn vai trò giáo dục, câu đố hoặc che mắt rất nhẹ. ROT13 trên Internet chính là một biến thể cố định k=13 của bảng chữ cái Latin 26 ký tự."
          ]
        },
        {
          title: "3. Vì sao nó hoạt động?",
          paragraphs: [
            "Gọi x là chỉ số của ký tự, k là khóa và m là kích thước bảng chữ cái. Công thức mã hóa là E(x)=(x+k) mod m. Giải mã là D(y)=(y-k) mod m. Phép modulo đảm bảo kết quả luôn nằm trong khoảng 0 đến m-1.",
            "Ví dụ Z26, A=0 và khóa k=3: A→D, B→E, X→A. Với Z29 của web, m=29 nên phép toán tương tự nhưng thực hiện trên 29 chữ cái tiếng Việt mà ứng dụng định nghĩa."
          ]
        },
        {
          title: "4. Dùng nó như thế nào?",
          paragraphs: [
            "Chọn hệ chữ Z26 hoặc Z29, nhập số dịch k, nhập bản rõ rồi mã hóa. Bên nhận phải biết đúng k để dịch ngược. Khóa có thể chuẩn hóa bằng modulo m, nên k=29 trong Z29 tương đương k=0; k=32 tương đương k=3.",
            "Trong bài tập, hãy luôn ghi rõ bảng chữ cái và quy ước đánh số. Nếu không thống nhất A bắt đầu từ 0 hay 1, hai người có thể cùng dùng công thức nhưng cho kết quả khác nhau."
          ]
        },
        {
          title: "5. Khi nào nên dùng?",
          paragraphs: [
            "Nên dùng khi học modulo, minh họa khái niệm khóa, luyện mã hóa/giải mã bằng tay, làm trò chơi mật mã hoặc câu đố. Không nên dùng để bảo vệ mật khẩu, tin nhắn riêng tư, file hay dữ liệu mạng.",
            "Lý do là không gian khóa quá nhỏ. Với Z26 chỉ có 26 khả năng; kẻ tấn công có thể thử toàn bộ trong vài giây, thậm chí bằng mắt."
          ]
        },
        {
          title: "6. Ví dụ đầy đủ",
          paragraphs: [
            "Z26, bản rõ HELLO, k=3. H=7→10=K, E=4→7=H, L=11→14=O, L→O, O=14→17=R. Bản mã là KHOOR. Giải mã KHOOR với k=3 thu lại HELLO.",
            "Điều cần nhớ: Caesar thay đổi vị trí ký tự nhưng không làm mất cấu trúc tần suất. Chữ xuất hiện nhiều nhất ở bản rõ vẫn tạo ra một chữ xuất hiện nhiều nhất ở bản mã."
          ]
        }
      ]
    },

    substitution: {
      id: "substitution",
      ten: "Mã thay thế",
      nhom: "Mã hóa cổ điển",
      nhan: "Z26 / Z29",
      aliases: ["substitution", "thay the", "ma thay the", "monoalphabetic", "don bang"],
      ngan: "Mỗi ký tự được ánh xạ sang một ký tự khác theo một bảng hoán vị cố định.",
      khoa: "Bảng thay thế hoặc từ khóa sinh bảng",
      dac_diem: "Không gian khóa lớn hơn Caesar nhưng vẫn lộ cấu trúc tần suất của ngôn ngữ.",
      sections: [
        {
          title: "1. Mã thay thế là gì?",
          paragraphs: [
            "Mã thay thế đơn bảng xây dựng một ánh xạ một-một giữa bảng chữ cái gốc và một bảng chữ cái đã hoán vị. Ví dụ A→Q, B→W, C→E... Toàn bộ văn bản dùng cùng bảng này. Muốn giải mã, ta dùng ánh xạ ngược.",
            "Caesar thực chất là một trường hợp rất nhỏ của substitution: bảng mã chỉ là bảng gốc bị dịch vòng. Với substitution tổng quát, thứ tự có thể là bất kỳ hoán vị hợp lệ nào."
          ]
        },
        {
          title: "2. Nguồn gốc và vai trò lịch sử",
          paragraphs: [
            "Các dạng thay thế ký tự đã tồn tại trong mật mã thủ công hàng thế kỷ. Chúng từng hữu ích khi việc phân tích tự động chưa tồn tại và khi đối phương không có đủ bản mã để thống kê.",
            "Sự phát triển của phân tích tần suất, thường được gắn với các học giả mật mã Ả Rập thời trung đại như al-Kindi, cho thấy điểm yếu nền tảng của substitution đơn bảng: nó giữ lại phân bố thống kê của ngôn ngữ."
          ]
        },
        {
          title: "3. Nó làm việc bằng cách nào?",
          paragraphs: [
            "Giả sử bảng rõ P gồm m ký tự và bảng mã C là một hoán vị của P. Mã hóa lấy ký tự ở vị trí i của P rồi thay bằng ký tự vị trí i của C. Giải mã tìm ký tự trong C rồi quay về vị trí tương ứng trong P.",
            "Một cách sinh bảng thực hành là dùng từ khóa: loại bỏ ký tự lặp trong từ khóa, đặt phần còn lại lên đầu rồi nối các chữ chưa xuất hiện. Cách này dễ nhớ hơn một hoán vị hoàn toàn ngẫu nhiên nhưng cũng có thể làm giảm entropy của khóa nếu từ khóa yếu."
          ]
        },
        {
          title: "4. Cách sử dụng đúng",
          paragraphs: [
            "Bước 1 chọn bảng Z26 hoặc Z29. Bước 2 tạo bảng thay thế chứa mỗi ký tự đúng một lần. Bước 3 ánh xạ từng chữ bản rõ sang bảng mã. Khoảng trắng và dấu câu thường được giữ nguyên để dễ đọc, nhưng điều này cũng làm lộ cấu trúc câu.",
            "Nếu ứng dụng cho nhập từ khóa thay vì cả bảng, hãy hiểu rằng từ khóa chỉ là cách sinh ra bảng. Hai bên phải dùng cùng quy tắc sinh bảng mới giải mã được."
          ]
        },
        {
          title: "5. Khi nào dùng?",
          paragraphs: [
            "Phù hợp với bài tập về hoán vị, ánh xạ hai chiều, phân tích tần suất và lịch sử mật mã. Nó cũng hợp với puzzle vì người chơi có thể suy luận dần.",
            "Không dùng cho bảo mật thực tế. Dù số hoán vị 26! rất lớn, cấu trúc ngôn ngữ làm giảm đáng kể độ khó phân tích. Các cặp chữ, từ ngắn, mẫu lặp và tần suất chữ đều cung cấp manh mối."
          ]
        },
        {
          title: "6. Ví dụ",
          paragraphs: [
            "Giả sử bảng rõ ABCDE... và bảng mã QWERT... Khi A xuất hiện nó luôn thành Q; B luôn thành W. Nếu từ HELLO có hai chữ L giống nhau, bản mã cũng chứa hai ký tự giống nhau ở hai vị trí tương ứng. Đây chính là dấu vết mà phân tích tần suất khai thác.",
            "Khi giải bài bằng tay, nên lập bảng hai hàng rõ ràng: hàng trên là bảng gốc, hàng dưới là bảng thay thế. Đừng cố nhớ ánh xạ trong đầu."
          ]
        }
      ]
    },

    vigenere: {
      id: "vigenere",
      ten: "Vigenere",
      nhom: "Mã hóa cổ điển",
      nhan: "Z26 / Z29",
      aliases: ["vigenere", "vigener", "polyalphabetic", "da bang", "ma vigenere"],
      ngan: "Dùng một chuỗi khóa để thay đổi độ dịch tại từng vị trí, tạo mã thay thế đa bảng.",
      khoa: "Chuỗi khóa chữ",
      dac_diem: "Che tần suất tốt hơn substitution đơn bảng nhưng vẫn có thể bị phá nếu khóa lặp ngắn.",
      sections: [
        {
          title: "1. Vigenere là gì?",
          paragraphs: [
            "Vigenere là mã đa bảng: thay vì dùng một phép dịch cố định như Caesar, mỗi vị trí trong bản rõ có thể dùng một độ dịch khác nhau. Các độ dịch này lấy từ chuỗi khóa. Nếu khóa ngắn hơn văn bản, khóa thường được lặp lại.",
            "Về mặt toán học, nếu P_i là chỉ số ký tự bản rõ và K_i là chỉ số ký tự khóa tại vị trí i, ta có C_i=(P_i+K_i) mod m. Giải mã P_i=(C_i-K_i) mod m."
          ]
        },
        {
          title: "2. Nguồn gốc lịch sử",
          paragraphs: [
            "Lịch sử Vigenere thú vị hơn tên gọi. Johannes Trithemius công bố tabula recta đầu thế kỷ XVI; Giovan Battista Bellaso mô tả một hệ đa bảng dùng khóa vào năm 1553; Blaise de Vigenère sau đó mô tả các hệ mạnh hơn, trong đó có autokey. Theo thời gian, tên Vigenere trở thành tên phổ biến cho dạng lặp khóa được dạy ngày nay.",
            "Thuật toán từng được gọi là rất khó phá vì nó làm phẳng tần suất ký tự tốt hơn substitution đơn bảng. Tuy nhiên khi khóa ngắn lặp lại, chu kỳ của khóa tạo ra cấu trúc có thể phân tích."
          ]
        },
        {
          title: "3. Vì sao nó mạnh hơn Caesar?",
          paragraphs: [
            "Cùng chữ A trong bản rõ có thể biến thành nhiều chữ khác nhau tùy ký tự khóa tại vị trí đó. Vì thế tần suất của A bị phân tán và không còn ánh xạ một-một đơn giản.",
            "Nhưng nếu khóa có độ dài r, các vị trí cách nhau r ký tự lại dùng cùng một phép dịch. Khi đoán được chu kỳ, kẻ phân tích có thể tách bản mã thành r chuỗi Caesar và xử lý từng chuỗi. Các kỹ thuật lịch sử gồm kiểm tra Kasiski và chỉ số trùng hợp."
          ]
        },
        {
          title: "4. Cách dùng từng bước",
          paragraphs: [
            "Chuẩn hóa bản rõ theo bảng chữ. Chuẩn hóa khóa và đổi từng chữ khóa thành chỉ số. Lặp khóa cho đủ chiều dài phần ký tự cần mã hóa. Cộng chỉ số bản rõ và khóa theo modulo m. Cuối cùng đổi số về chữ.",
            "Trong bài tập, phải thống nhất cách xử lý khoảng trắng, dấu câu và dấu tiếng Việt. Web này giữ các ký tự không thuộc bảng và chỉ áp dụng phép toán lên các ký tự được nhận diện."
          ]
        },
        {
          title: "5. Khi nào dùng?",
          paragraphs: [
            "Rất tốt để học khái niệm keystream, chu kỳ khóa và lý do một khóa dài/ngẫu nhiên có giá trị. Nó cũng là bước đệm để hiểu one-time pad và stream cipher hiện đại.",
            "Không dùng Vigenere lặp khóa để bảo mật dữ liệu thật. Nếu khóa ngẫu nhiên, dài đúng bằng thông điệp và chỉ dùng một lần thì ta tiến gần khái niệm one-time pad; đó là một mô hình khác với Vigenere thông thường."
          ]
        },
        {
          title: "6. Ví dụ",
          paragraphs: [
            "Z26 với bản rõ ATTACKATDAWN và khóa LEMON. Khóa lặp thành LEMONLEMONLE. Cộng chỉ số từng cặp chữ cho bản mã LXFOPVEFRNHR, ví dụ A(0)+L(11)=L(11), T(19)+E(4)=X(23).",
            "Ví dụ này minh họa điểm cốt lõi: chữ T đầu tiên và chữ T tiếp theo không nhất thiết thành cùng một chữ vì chúng gặp các ký tự khóa khác nhau."
          ]
        }
      ]
    },

    affine: {
      id: "affine",
      ten: "Affine",
      nhom: "Mã hóa cổ điển",
      nhan: "Z26 / Z29",
      aliases: ["affine", "ma affine", "ax+b", "modulo"],
      ngan: "Biến đổi chỉ số bằng hàm tuyến tính E(x)=(a·x+b) mod m.",
      khoa: "Hai số a và b",
      dac_diem: "a phải nguyên tố cùng nhau với m để tồn tại nghịch đảo modulo và giải mã được.",
      sections: [
        {
          title: "1. Affine cipher là gì?",
          paragraphs: [
            "Affine cipher biến mỗi ký tự thành số rồi áp dụng một hàm tuyến tính theo modulo. Nếu bảng có m ký tự, công thức mã hóa là E(x)=(a·x+b) mod m. Đây là mở rộng tự nhiên của Caesar: khi a=1, Affine trở thành Caesar với độ dịch b.",
            "Giải mã cần công thức D(y)=a^{-1}(y-b) mod m, trong đó a^{-1} là nghịch đảo nhân của a modulo m."
          ]
        },
        {
          title: "2. Tư duy toán học phía sau",
          paragraphs: [
            "Điều kiện quan trọng nhất là gcd(a,m)=1. Nếu a và m có ước chung lớn hơn 1, phép nhân a·x sẽ làm nhiều giá trị x rơi vào cùng kết quả và ánh xạ không còn một-một. Khi đó không thể giải mã duy nhất.",
            "Ví dụ Z26, a=5 hợp lệ vì gcd(5,26)=1 và nghịch đảo của 5 modulo 26 là 21 do 5·21=105≡1 mod 26."
          ]
        },
        {
          title: "3. Nguồn gốc và vị trí trong môn học",
          paragraphs: [
            "Affine không thường gắn với một nhà phát minh duy nhất; nó được dùng như một mô hình algebraic tiêu chuẩn của substitution cipher. Giá trị lớn nhất của nó trong giảng dạy là giúp sinh viên làm quen với số học modulo, điều kiện khả nghịch và nghịch đảo modulo.",
            "Những khái niệm này tiếp tục xuất hiện trong RSA, ECC và nhiều cấu trúc đại số khác, dù cơ chế cụ thể khác hoàn toàn."
          ]
        },
        {
          title: "4. Cách dùng",
          paragraphs: [
            "Chọn m theo bảng chữ. Chọn a sao cho gcd(a,m)=1. Chọn b bất kỳ trong 0..m-1. Đổi từng chữ thành x, tính y=(a·x+b) mod m rồi đổi y về chữ. Khi giải mã, tính a^{-1} trước rồi áp dụng công thức ngược.",
            "Với Z29, vì 29 là số nguyên tố nên mọi a từ 1 đến 28 đều có nghịch đảo modulo 29. Với Z26, không phải mọi a đều hợp lệ."
          ]
        },
        {
          title: "5. Khi nào dùng?",
          paragraphs: [
            "Dùng trong bài học về modulo, nghịch đảo, UCLN mở rộng, ánh xạ khả nghịch và phân biệt giữa phép cộng/nhân trong không gian hữu hạn.",
            "Không dùng cho bảo mật thực tế. Đây vẫn là substitution đơn bảng nên tần suất ngôn ngữ được bảo toàn dưới một hoán vị cố định."
          ]
        },
        {
          title: "6. Ví dụ",
          paragraphs: [
            "Z26, chọn a=5, b=8. A=0 → 8=I. B=1 → 13=N. C=2 → 18=S. Muốn giải mã I=8: a^{-1}=21, x=21·(8-8)=0→A.",
            "Khi làm bài, nếu hệ thống báo khóa a không hợp lệ, hãy kiểm tra gcd(a,m) trước thay vì nghi ngờ công thức."
          ]
        }
      ]
    },

    hill: {
      id: "hill",
      ten: "Hill",
      nhom: "Mã hóa cổ điển",
      nhan: "MATRIX",
      aliases: ["hill", "ma hill", "matrix cipher", "ma tran", "lester hill"],
      ngan: "Mã hóa từng khối ký tự bằng phép nhân vector với ma trận khóa theo modulo.",
      khoa: "Ma trận khả nghịch modulo m",
      dac_diem: "Cho thấy cách đại số tuyến tính có thể trộn nhiều ký tự cùng lúc.",
      sections: [
        {
          title: "1. Hill cipher là gì?",
          paragraphs: [
            "Hill cipher là mã khối cổ điển dùng đại số tuyến tính. Thay vì xử lý từng chữ độc lập, nó gom n ký tự thành một vector rồi nhân với ma trận khóa n×n theo modulo m. Vì các ký tự trong một khối ảnh hưởng lẫn nhau, Hill tạo hiệu ứng trộn tốt hơn các substitution đơn giản.",
            "Nếu P là vector bản rõ và K là ma trận khóa, C=K·P mod m. Giải mã P=K^{-1}·C mod m."
          ]
        },
        {
          title: "2. Nguồn gốc",
          paragraphs: [
            "Hill cipher được Lester S. Hill giới thiệu năm 1929. Đây là một trong những ví dụ lịch sử nổi bật về việc đưa đại số tuyến tính vào mật mã.",
            "Nó có giá trị sư phạm lớn vì buộc người học kết nối ma trận, định thức, nghịch đảo modulo và xử lý theo khối."
          ]
        },
        {
          title: "3. Điều kiện để giải mã được",
          paragraphs: [
            "Ma trận K phải khả nghịch modulo m. Với ma trận 2×2, điều này tương đương định thức det(K) phải có nghịch đảo modulo m, tức gcd(det(K),m)=1.",
            "Nếu điều kiện này không đúng, nhiều vector bản rõ có thể ánh xạ vào cùng vector bản mã. Khi đó giải mã duy nhất là bất khả thi."
          ]
        },
        {
          title: "4. Quy trình sử dụng",
          paragraphs: [
            "Chọn kích thước khối, ví dụ 2. Đổi hai chữ thành vector số. Nhân K với vector, lấy từng phần tử modulo m rồi đổi trở lại thành chữ. Nếu số ký tự không chia hết kích thước khối, thường phải padding.",
            "Khi giải mã, tính K^{-1} modulo m. Đây là phần dễ sai nhất: không dùng nghịch đảo số thực thông thường rồi làm tròn; phải tính nghịch đảo trong modulo."
          ]
        },
        {
          title: "5. Khi nào dùng?",
          paragraphs: [
            "Dùng để học mã khối, diffusion ở mức cơ bản, phép nhân ma trận và nghịch đảo modulo. Nó giúp sinh viên thấy vì sao mã hóa hiện đại thường cố gắng làm mỗi phần đầu ra phụ thuộc vào nhiều phần đầu vào.",
            "Không dùng Hill thuần túy cho dữ liệu thật. Với đủ cặp bản rõ-bản mã, ma trận khóa có thể được suy ra bằng đại số tuyến tính."
          ]
        },
        {
          title: "6. Ví dụ 2×2",
          paragraphs: [
            "Giả sử Z26 và K=[[3,3],[2,5]]. Với khối HI tương ứng vector [7,8]^T, K·P=[45,54]^T. Lấy mod 26 được [19,2], tương ứng TC.",
            "Để giải mã TC phải dùng ma trận nghịch đảo modulo 26 của K. Ví dụ này cho thấy một thay đổi ở H hoặc I có thể ảnh hưởng cả hai ký tự đầu ra."
          ]
        }
      ]
    },

    des: {
      id: "des",
      ten: "DES",
      nhom: "Mã hóa hiện đại",
      nhan: "64-BIT",
      aliases: ["des", "data encryption standard", "feistel", "lucifer"],
      ngan: "Mã khối 64 bit cấu trúc Feistel 16 vòng, từng là chuẩn mã hóa dữ liệu rất quan trọng.",
      khoa: "Khóa 64 bit biểu diễn, hiệu dụng 56 bit",
      dac_diem: "Có giá trị lịch sử và giáo dục; khóa 56 bit quá ngắn cho bảo mật hiện đại.",
      sections: [
        {
          title: "1. DES là gì?",
          paragraphs: [
            "DES là block cipher: nó xử lý dữ liệu theo khối 64 bit. Thiết kế dùng mạng Feistel 16 vòng. Mỗi vòng chia trạng thái thành nửa trái và phải, đưa nửa phải qua hàm F với một khóa con, XOR kết quả vào nửa trái rồi hoán đổi vai trò.",
            "Điểm hay của Feistel là cùng cấu trúc có thể dùng cho cả mã hóa và giải mã; giải mã chỉ cần dùng dãy khóa con theo thứ tự ngược."
          ]
        },
        {
          title: "2. Nguồn gốc",
          paragraphs: [
            "DES phát triển từ công trình tại IBM trong thập niên 1970, có liên hệ với họ thiết kế Lucifer và công trình của Horst Feistel. Thuật toán được chuẩn hóa tại Hoa Kỳ thành FIPS 46 năm 1977.",
            "DES có ảnh hưởng cực lớn đến lịch sử mật mã thương mại. Nó giúp phổ biến block cipher, S-box, key schedule và tiêu chuẩn hóa mật mã trong phần cứng lẫn phần mềm."
          ]
        },
        {
          title: "3. Cấu trúc hoạt động",
          paragraphs: [
            "Một khối 64 bit đi qua hoán vị đầu, chia thành L0 và R0 mỗi nửa 32 bit. Mỗi vòng tính L_i=R_{i-1}; R_i=L_{i-1} XOR F(R_{i-1},K_i). Hàm F mở rộng 32 bit thành 48 bit, XOR khóa con 48 bit, đi qua 8 S-box để về 32 bit rồi qua hoán vị P.",
            "Khóa đầu vào thường biểu diễn 64 bit nhưng 8 bit từng dùng làm parity, nên độ mạnh khóa hiệu dụng là 56 bit. Key schedule tạo 16 khóa con từ các phép chọn bit và dịch vòng."
          ]
        },
        {
          title: "4. DES trong web này",
          paragraphs: [
            "Code của web hiện thực các bảng IP, FP, E, P, PC-1, PC-2, lịch dịch và 8 S-box. Chế độ hex xử lý đúng một khối 64 bit. Chế độ chữ chuyển tối đa 8 byte UTF-8 thành một khối, đệm byte 0 nếu ngắn hơn.",
            "Điều này rất phù hợp để học từng bước DES, nhưng không phải một giao thức lưu file hoàn chỉnh vì không có mode xử lý nhiều block như CBC/CTR và cũng không có cơ chế xác thực."
          ]
        },
        {
          title: "5. Khi nào dùng?",
          paragraphs: [
            "Hiện nay nên dùng DES để học lịch sử block cipher, mạng Feistel, S-box và key schedule. Không nên dùng DES để bảo vệ dữ liệu mới.",
            "Không gian khóa 56 bit đã quá nhỏ trước brute force hiện đại. 3DES từng kéo dài tuổi thọ họ DES bằng cách áp dụng DES nhiều lần, nhưng các hệ thống mới nên ưu tiên AES."
          ]
        },
        {
          title: "6. Ví dụ tư duy",
          paragraphs: [
            "Với input hex 123456ABCD132536 và key AABB09182736CCDD, web có thể đưa từng chuỗi 64 bit qua đúng 16 vòng. Thay một bit đầu vào có thể làm thay đổi nhiều bit đầu ra sau các vòng, minh họa hiệu ứng avalanche.",
            "Khi học DES, đừng cố nhớ toàn bộ bảng bằng thuộc lòng. Hãy hiểu vai trò: permutation sắp xếp bit, expansion tạo 48 bit, XOR trộn khóa, S-box tạo phi tuyến, P khuếch tán kết quả."
          ]
        }
      ]
    },

    aes: {
      id: "aes",
      ten: "AES-128-GCM",
      nhom: "Mã hóa hiện đại",
      nhan: "WEB CRYPTO",
      aliases: ["aes", "aes gcm", "aes-128-gcm", "rijndael", "advanced encryption standard"],
      ngan: "Chuẩn mã hóa đối xứng hiện đại; web dùng AES-128 ở chế độ GCM có xác thực.",
      khoa: "Khóa đối xứng; web dẫn xuất 128 bit từ chuỗi khóa",
      dac_diem: "Nhanh, phổ biến và phù hợp bảo vệ dữ liệu thực khi quản lý khóa/nonce đúng cách.",
      sections: [
        {
          title: "1. AES là gì?",
          paragraphs: [
            "AES là Advanced Encryption Standard, một block cipher hiện đại xử lý khối 128 bit. AES hỗ trợ khóa 128, 192 hoặc 256 bit. Khác DES, AES không dùng Feistel mà dùng mạng substitution-permutation với các bước biến đổi byte và cột.",
            "AES là primitive; để mã hóa dữ liệu dài ta cần mode vận hành. Web dùng GCM, một mode AEAD vừa bảo mật nội dung vừa tạo tag xác thực để phát hiện dữ liệu bị sửa."
          ]
        },
        {
          title: "2. Nguồn gốc",
          paragraphs: [
            "NIST mở cuộc thi công khai tìm chuẩn thay thế DES vào cuối thập niên 1990. Rijndael, thiết kế của Joan Daemen và Vincent Rijmen, được chọn năm 2000 và chuẩn hóa thành AES trong FIPS 197 năm 2001.",
            "Quá trình tuyển chọn công khai và phân tích rộng rãi là một dấu mốc lớn trong mật mã hiện đại: thuật toán không cần bí mật để an toàn; điều cần bí mật là khóa."
          ]
        },
        {
          title: "3. AES hoạt động ra sao?",
          paragraphs: [
            "Trạng thái AES là ma trận 4×4 byte. Các vòng gồm SubBytes dùng S-box phi tuyến, ShiftRows dịch hàng, MixColumns trộn cột trong trường hữu hạn và AddRoundKey XOR với khóa vòng. AES-128 có 10 vòng.",
            "Mục tiêu là confusion và diffusion: mối liên hệ giữa khóa, bản rõ và bản mã trở nên phức tạp; thay một bit đầu vào sẽ lan rộng qua trạng thái sau nhiều vòng."
          ]
        },
        {
          title: "4. GCM thêm gì?",
          paragraphs: [
            "GCM kết hợp mã hóa kiểu counter với xác thực GHASH. Kết quả không chỉ che nội dung mà còn có authentication tag. Nếu bản mã, IV hoặc dữ liệu xác thực bị chỉnh sửa, giải mã sẽ thất bại thay vì trả ra rác mà ứng dụng tưởng là dữ liệu hợp lệ.",
            "Nonce/IV trong GCM phải duy nhất cho mỗi lần mã hóa dưới cùng khóa. Web tạo IV ngẫu nhiên 12 byte bằng crypto.getRandomValues, đây là kích thước được dùng phổ biến cho GCM."
          ]
        },
        {
          title: "5. AES trong web này",
          paragraphs: [
            "Chuỗi khóa người dùng được băm SHA-256, sau đó code lấy 16 byte đầu làm khóa AES-128. Bản rõ UTF-8 được mã hóa bởi Web Crypto API. Web ghép IV 12 byte ở đầu ciphertext rồi Base64 hóa để hiển thị.",
            "Cách này tốt cho demo luồng AES-GCM, nhưng hệ thống mật khẩu thực tế nên dùng KDF dành cho mật khẩu như Argon2id, scrypt hoặc PBKDF2 với salt thay vì biến chuỗi mật khẩu thành khóa bằng một lần SHA-256."
          ]
        },
        {
          title: "6. Khi nào cần AES?",
          paragraphs: [
            "AES phù hợp khi bạn cần giữ bí mật dữ liệu và hai phía có thể chia sẻ/quản lý một khóa đối xứng: mã hóa file, dữ liệu ứng dụng, session, backup hoặc payload nội bộ. GCM đặc biệt phù hợp vì có xác thực.",
            "Không hard-code khóa trong frontend nếu mục tiêu là bảo mật trước chính người dùng/client. Việc quản lý và phân phối khóa quan trọng không kém việc chọn thuật toán."
          ]
        },
        {
          title: "7. Ví dụ",
          paragraphs: [
            "Nhập bản rõ HELLO và khóa PHENIKAA. Mỗi lần bấm mã hóa, IV ngẫu nhiên khác nhau nên Base64 đầu ra có thể khác dù bản rõ và khóa giống nhau. Tuy vậy tất cả bản mã hợp lệ đều giải mã về HELLO với đúng khóa.",
            "Đây là điều mong muốn: mã hóa hiện đại không nên tạo cùng ciphertext cho cùng plaintext một cách tất định trong bối cảnh như GCM."
          ]
        }
      ]
    },

    rsa: {
      id: "rsa",
      ten: "RSA",
      nhom: "Mã hóa công khai",
      nhan: "PUBLIC KEY",
      aliases: ["rsa", "rivest shamir adleman", "public key", "khoa cong khai", "bat doi xung"],
      ngan: "Mật mã bất đối xứng dựa trên số học modulo và độ khó liên quan tới phân tích thừa số.",
      khoa: "Cặp khóa công khai (n,e) và riêng (n,d)",
      dac_diem: "Phù hợp trao đổi khóa/chữ ký khi triển khai đúng; không dùng RSA thô như demo cho bảo mật thật.",
      sections: [
        {
          title: "1. RSA là gì?",
          paragraphs: [
            "RSA là hệ mật mã khóa công khai. Khóa mã hóa và khóa giải mã khác nhau: khóa công khai có thể chia sẻ rộng rãi, còn khóa riêng phải giữ bí mật. Với mô hình textbook, mã hóa c=m^e mod n và giải mã m=c^d mod n.",
            "Điểm thay đổi tư duy rất lớn so với AES là hai bên không cần chia sẻ sẵn cùng một khóa bí mật chỉ để bắt đầu giao tiếp."
          ]
        },
        {
          title: "2. Nguồn gốc",
          paragraphs: [
            "RSA được Ron Rivest, Adi Shamir và Leonard Adleman công bố năm 1977. Một hệ tương tự đã được Clifford Cocks phát triển bí mật tại GCHQ trước đó nhưng không công khai vào thời điểm ấy.",
            "RSA trở thành một biểu tượng của public-key cryptography và được dùng rộng rãi trong giao thức, chữ ký số và phân phối khóa."
          ]
        },
        {
          title: "3. Sinh khóa hoạt động thế nào?",
          paragraphs: [
            "Chọn hai số nguyên tố lớn p và q, tính n=pq. Tính phi(n)=(p-1)(q-1) trong mô hình cơ bản. Chọn e nguyên tố cùng nhau với phi(n), thường e=65537. Tính d là nghịch đảo của e modulo phi(n).",
            "Khóa công khai là (n,e); khóa riêng chứa d và thường cả p,q để tối ưu. Độ an toàn thực tế phụ thuộc kích thước modulus lớn và quy trình sinh số nguyên tố ngẫu nhiên mạnh."
          ]
        },
        {
          title: "4. Vì sao giải mã trả lại dữ liệu?",
          paragraphs: [
            "e và d được chọn sao cho e·d≡1 theo modulo thích hợp. Các định lý số học đảm bảo lũy thừa với e rồi d đưa thông điệp về giá trị ban đầu trong miền hợp lệ.",
            "Đây là ví dụ rất đẹp về nghịch đảo modulo và lũy thừa nhanh. Tuy nhiên phần chứng minh đầy đủ liên quan Euler/Fermat và các chi tiết về miền giá trị."
          ]
        },
        {
          title: "5. RSA trong web này",
          paragraphs: [
            "Demo hiện tại không tạo RSA chuẩn production. Nó băm chuỗi khóa thành một seed nhỏ, tìm hai số nguyên tố tương đối nhỏ, tính n, phi, e và d bằng BigInt, rồi mã hóa từng byte UTF-8 độc lập bằng textbook RSA.",
            "Thiết kế này cực kỳ hữu ích để nhìn thấy toán học RSA nhưng không an toàn cho dữ liệu thật: prime nhỏ, sinh khóa tất định từ chuỗi chữ, không padding OAEP, và mã hóa từng byte độc lập làm lộ cấu trúc."
          ]
        },
        {
          title: "6. RSA thực tế dùng thế nào?",
          paragraphs: [
            "Trong hệ thống hiện đại, RSA thường không mã hóa cả file lớn. Thay vào đó, nó có thể bảo vệ một khóa phiên đối xứng; dữ liệu khối lượng lớn sau đó dùng AES. Với chữ ký số, private key ký và public key xác minh.",
            "Mã hóa RSA thực tế cần padding an toàn như OAEP. Chữ ký RSA cần schema như PSS. Textbook RSA không được dùng trực tiếp."
          ]
        },
        {
          title: "7. Khi nào cần?",
          paragraphs: [
            "Học RSA khi cần hiểu public/private key, modular exponentiation, modular inverse và nền tảng PKI. Trong ứng dụng thực, dùng thư viện/primitive chuẩn thay vì tự viết RSA.",
            "Nếu chỉ cần mã hóa file cục bộ bằng một khóa đã có, AES thường phù hợp và hiệu quả hơn. RSA giải quyết bài toán khác: phân phối niềm tin và khóa."
          ]
        }
      ]
    },

    md5: {
      id: "md5",
      ten: "MD5",
      nhom: "Hàm băm",
      nhan: "128-BIT",
      aliases: ["md5", "message digest 5", "message digest", "hash md5"],
      ngan: "Hàm băm tạo digest 128 bit, thường biểu diễn bằng 32 ký tự hexadecimal.",
      khoa: "Không dùng khóa",
      dac_diem: "Nhanh và tiện để học/đối chiếu cũ, nhưng đã hỏng về chống va chạm và không phù hợp lưu mật khẩu.",
      sections: [
        {
          title: "1. Hàm băm khác mã hóa ở đâu?",
          paragraphs: [
            "MD5 là hash function, không phải encryption. Nó nhận input dài tùy ý và tạo digest cố định 128 bit. Không tồn tại khóa giải mã để phục hồi bản rõ từ digest.",
            "Mục tiêu của hash là tạo dấu vân tay dữ liệu. Với input giống hệt, output phải giống hệt. Chỉ thay một bit input thường làm digest thay đổi mạnh."
          ]
        },
        {
          title: "2. Nguồn gốc",
          paragraphs: [
            "MD5 do Ronald Rivest thiết kế năm 1991 và được mô tả trong RFC 1321 năm 1992 như thành viên tiếp theo của họ Message Digest.",
            "Nó từng cực kỳ phổ biến cho checksum và nhiều hệ thống xác thực cũ. Tuy nhiên các tiến bộ cryptanalysis, đặc biệt các tấn công va chạm thực tế từ thập niên 2000, khiến MD5 không còn đạt yêu cầu chống collision."
          ]
        },
        {
          title: "3. Nó hoạt động ra sao?",
          paragraphs: [
            "MD5 padding thông điệp để độ dài phù hợp block 512 bit, thêm độ dài gốc, rồi xử lý từng block qua 64 bước với bốn thanh ghi trạng thái 32 bit, các hàm logic, hằng số và phép rotate.",
            "Digest cuối gồm 128 bit. Khi viết dạng hex, mỗi ký tự hex biểu diễn 4 bit nên 128/4=32 ký tự hex."
          ]
        },
        {
          title: "4. Dùng vào việc gì?",
          paragraphs: [
            "MD5 vẫn có thể xuất hiện trong checksum không mang yêu cầu chống kẻ tấn công, hệ thống legacy hoặc bài học. Nhưng nếu đối thủ có thể cố tình tạo dữ liệu, collision làm MD5 không phù hợp làm bằng chứng toàn vẹn mật mã.",
            "Không dùng raw MD5 để lưu mật khẩu. Vì nó quá nhanh, attacker có thể thử số lượng mật khẩu cực lớn. Password storage cần salt và password hashing chậm/memory-hard như Argon2id, scrypt, bcrypt hoặc PBKDF2 theo bối cảnh."
          ]
        },
        {
          title: "5. Công cụ kiểm tra mật khẩu trong tab So sánh",
          paragraphs: [
            "Công cụ của web nhận một dòng MD5 có sẵn, băm mật khẩu người dùng nhập bằng MD5 rồi so sánh hai chuỗi. Đây là phép kiểm tra equality của digest, không phải giải mã MD5.",
            "Nếu trùng, kết luận duy nhất là mật khẩu thử tạo ra đúng digest đó. Do collision về lý thuyết/thực tế, hash equality không biến MD5 thành hệ xác thực hiện đại."
          ]
        },
        {
          title: "6. Ví dụ",
          paragraphs: [
            "Chuỗi password có MD5 là 5f4dcc3b5aa765d61d8327deb882cf99. Digest dài đúng 32 ký tự hex.",
            "Nếu đổi input thành Password hoặc thêm một khoảng trắng, digest thay đổi hoàn toàn. Hash cực kỳ nhạy với byte đầu vào."
          ]
        }
      ]
    },

    sha1: {
      id: "sha1",
      ten: "SHA-1",
      nhom: "Hàm băm",
      nhan: "160-BIT",
      aliases: ["sha1", "sha-1", "secure hash algorithm 1", "hash sha1"],
      ngan: "Hàm băm 160 bit từng được dùng rộng rãi trong chữ ký, chứng thư và hệ thống phiên bản.",
      khoa: "Không dùng khóa",
      dac_diem: "Không còn an toàn cho chống va chạm; nên dùng SHA-256/SHA-512 cho thiết kế mới.",
      sections: [
        {
          title: "1. SHA-1 là gì?",
          paragraphs: [
            "SHA-1 là hash function tạo digest 160 bit, tương đương 40 ký tự hex. Nó thuộc dòng Secure Hash Algorithm và có cấu trúc xử lý block 512 bit.",
            "Giống MD5, SHA-1 là một chiều theo mục đích thiết kế và không có thao tác giải mã."
          ]
        },
        {
          title: "2. Nguồn gốc",
          paragraphs: [
            "SHA-1 được phát triển trong hệ tiêu chuẩn Hoa Kỳ và công bố bởi NIST trong FIPS 180-1 năm 1995, thay cho phiên bản SHA trước đó.",
            "Nó từng được dùng rất rộng trong TLS cũ, chữ ký số, chứng thư, Git và nhiều hệ thống checksum."
          ]
        },
        {
          title: "3. Cơ chế tổng quát",
          paragraphs: [
            "Thông điệp được padding, chia block 512 bit, mở rộng thành schedule và đi qua 80 vòng cập nhật năm từ trạng thái 32 bit bằng rotate, phép logic và hằng số vòng.",
            "Digest 160 bit cuối cùng được ghép từ năm từ 32 bit. Vì 160/4=40 nên dạng hexadecimal luôn có 40 ký tự."
          ]
        },
        {
          title: "4. Vì sao SHA-1 không còn đủ mạnh?",
          paragraphs: [
            "Yêu cầu collision resistance mong rằng cực khó tìm hai thông điệp khác nhau có cùng digest. Cryptanalysis làm chi phí tấn công SHA-1 giảm đáng kể và collision thực tế công khai đã được trình diễn.",
            "Do đó thiết kế mới không nên dựa vào SHA-1 cho chữ ký số, chứng thư hoặc kiểm tra toàn vẹn trước đối thủ chủ động."
          ]
        },
        {
          title: "5. Khi nào còn gặp SHA-1?",
          paragraphs: [
            "Bạn sẽ gặp SHA-1 khi học lịch sử hash, đọc hệ thống legacy hoặc một số định danh tương thích cũ. Khi chỉ đọc dữ liệu cũ, có thể cần tính SHA-1 để đối chiếu.",
            "Khi chủ động thiết kế mới, hãy ưu tiên SHA-256 hoặc SHA-512 trong họ SHA-2, hoặc primitive phù hợp hơn theo giao thức."
          ]
        },
        {
          title: "6. Ví dụ",
          paragraphs: [
            "Một digest SHA-1 luôn có 40 ký tự hex. Bộ đếm độ dài hex là cách nhanh để nhận diện định dạng: MD5=32, SHA-1=40, SHA-256=64, SHA-512=128 ký tự hex.",
            "Độ dài chỉ giúp đoán loại hash, không chứng minh chắc chắn thuật toán vì một chuỗi bất kỳ cũng có thể được định dạng cùng độ dài."
          ]
        }
      ]
    },

    sha256: {
      id: "sha256",
      ten: "SHA-256",
      nhom: "Hàm băm",
      nhan: "256-BIT",
      aliases: ["sha256", "sha-256", "sha2", "sha-2", "secure hash 256", "hash sha256"],
      ngan: "Thành viên SHA-2 tạo digest 256 bit, rất phổ biến cho fingerprint và kiểm tra toàn vẹn.",
      khoa: "Không dùng khóa",
      dac_diem: "Digest 64 hex; phù hợp nhiều nhu cầu integrity hiện đại khi dùng đúng bối cảnh.",
      sections: [
        {
          title: "1. SHA-256 là gì?",
          paragraphs: [
            "SHA-256 là hash function thuộc họ SHA-2. Nó nhận dữ liệu dài tùy ý và tạo digest 256 bit. Dạng hex dài 64 ký tự vì mỗi ký tự hex đại diện 4 bit.",
            "SHA-256 không mã hóa dữ liệu và không có khóa giải mã. Nó tạo fingerprint để so sánh, đưa vào chữ ký, HMAC, Merkle tree và nhiều cấu trúc khác."
          ]
        },
        {
          title: "2. Nguồn gốc",
          paragraphs: [
            "Họ SHA-2 được chuẩn hóa đầu những năm 2000 sau SHA-1. SHA-256 và SHA-512 là hai biến thể chính với kích thước từ/trạng thái khác nhau.",
            "SHA-2 hiện vẫn là nền tảng phổ biến trong rất nhiều giao thức và công cụ kiểm tra file."
          ]
        },
        {
          title: "3. Cơ chế hoạt động tổng quát",
          paragraphs: [
            "SHA-256 xử lý block 512 bit. Mỗi block được mở rộng thành message schedule 64 từ, sau đó chạy 64 vòng cập nhật tám thanh ghi 32 bit bằng các hàm lựa chọn, majority, rotate và hằng số.",
            "Sau mỗi block, trạng thái được cộng vào chaining state. Cuối cùng tám từ 32 bit ghép thành 256 bit digest."
          ]
        },
        {
          title: "4. Vì sao dùng cho file comparison?",
          paragraphs: [
            "Nếu hai file có byte giống hệt, SHA-256 của chúng chắc chắn giống hệt. Nếu digest khác, file chắc chắn khác. Nếu digest giống, xác suất va chạm ngẫu nhiên là cực nhỏ trong bối cảnh thông thường.",
            "Tab So sánh của web đọc toàn bộ byte của mỗi file, băm bằng Web Crypto SHA-256 rồi so sánh chuỗi 64 hex. Vì băm byte trực tiếp nên tên file không ảnh hưởng kết quả."
          ]
        },
        {
          title: "5. Khi nào cần SHA-256?",
          paragraphs: [
            "Dùng khi kiểm tra file tải về, fingerprint artifact, thành phần của chữ ký số, HMAC-SHA-256, Merkle tree và nhiều giao thức integrity.",
            "Không dùng raw SHA-256 một mình để lưu mật khẩu. Nó vẫn quá nhanh cho password hashing. Nếu cần chứng minh tính toàn vẹn có khóa, dùng HMAC thay vì hash trần."
          ]
        },
        {
          title: "6. Ví dụ",
          paragraphs: [
            "File A và file B dù khác tên nhưng byte giống hoàn toàn sẽ có cùng SHA-256. Chỉ cần sửa một byte trong B, digest gần như chắc chắn đổi hoàn toàn.",
            "Đây là lý do fingerprint hữu ích cho kiểm tra bản sao, build artifact và xác minh file trước/sau truyền tải."
          ]
        }
      ]
    },

    sha512: {
      id: "sha512",
      ten: "SHA-512",
      nhom: "Hàm băm",
      nhan: "512-BIT",
      aliases: ["sha512", "sha-512", "sha2 512", "sha-2 512", "secure hash 512", "hash sha512"],
      ngan: "Thành viên SHA-2 tạo digest 512 bit, thường biểu diễn bằng 128 ký tự hexadecimal.",
      khoa: "Không dùng khóa",
      dac_diem: "Digest dài, thiết kế SHA-2 64-bit; phù hợp nhiều hệ thống hiện đại.",
      sections: [
        {
          title: "1. SHA-512 là gì?",
          paragraphs: [
            "SHA-512 là thành viên SHA-2 với output 512 bit, tức 128 ký tự hex. Nó có cùng triết lý thiết kế với SHA-256 nhưng dùng từ 64 bit, block 1024 bit và 80 vòng.",
            "Nó là hash một chiều, không phải encryption. Không có thao tác giải mã digest về dữ liệu gốc."
          ]
        },
        {
          title: "2. Cơ chế chính",
          paragraphs: [
            "Thông điệp được padding và chia thành block 1024 bit. Mỗi block tạo schedule 80 từ 64 bit. Tám biến trạng thái 64 bit được cập nhật qua 80 vòng bằng các phép rotate, XOR, choice, majority và hằng số.",
            "Cuối cùng tám từ 64 bit ghép thành digest 512 bit."
          ]
        },
        {
          title: "3. SHA-512 khác SHA-256 thế nào?",
          paragraphs: [
            "Khác biệt không chỉ ở việc output dài gấp đôi. SHA-512 dùng word 64 bit và block 1024 bit, trong khi SHA-256 dùng word 32 bit và block 512 bit.",
            "Trên một số CPU 64-bit, SHA-512 có thể có hiệu năng cạnh tranh tốt dù output dài hơn. Chọn thuật toán còn phụ thuộc giao thức, chuẩn tương thích và kích thước digest mong muốn."
          ]
        },
        {
          title: "4. Khi nào dùng?",
          paragraphs: [
            "SHA-512 phù hợp với fingerprint, HMAC, chữ ký và các giao thức yêu cầu SHA-2 512 bit. Nó cũng là nền cho các biến thể như SHA-512/256.",
            "Không mặc định thay SHA-256 chỉ vì số bit lớn hơn; nếu giao thức quy định SHA-256 thì cần tuân chuẩn. Cả hai đều là lựa chọn SHA-2 phổ biến."
          ]
        },
        {
          title: "5. Lưu ý về mật khẩu",
          paragraphs: [
            "Giống SHA-256, raw SHA-512 không phải password hashing scheme. Tốc độ cao là ưu điểm với checksum nhưng lại là nhược điểm khi chống brute-force mật khẩu.",
            "Password storage cần thuật toán có salt và cost như Argon2id, scrypt, bcrypt hoặc PBKDF2 tùy hệ sinh thái."
          ]
        },
        {
          title: "6. Ví dụ nhận diện",
          paragraphs: [
            "SHA-512 dạng hex có đúng 128 ký tự. Nếu một đoạn digest có 128 hex, đó là dấu hiệu có thể là SHA-512 nhưng vẫn cần metadata để xác nhận chắc chắn.",
            "Trong web, SHA-512 được tính bằng Web Crypto API trên byte UTF-8 của chuỗi đầu vào."
          ]
        }
      ]
    }
  };

  const THU_TU = ["caesar", "substitution", "vigenere", "affine", "hill", "des", "aes", "rsa", "md5", "sha1", "sha256", "sha512"];
  const NHOM = {
    "Mã hóa cổ điển": ["caesar", "substitution", "vigenere", "affine", "hill"],
    "Mã hóa hiện đại": ["des", "aes"],
    "Mã hóa công khai": ["rsa"],
    "Hàm băm": ["md5", "sha1", "sha256", "sha512"]
  };

  const content = document.querySelector(".content");
  const topbarTitle = document.querySelector(".topbar-title");
  const topbarBadge = document.querySelector(".topbar-badge");
  const searchWrap = document.querySelector(".topbar-search");
  const searchInput = searchWrap && searchWrap.querySelector("input");
  if (!content || !searchWrap || !searchInput) return;

  function chuan_hoa(van_ban) {
    return String(van_ban || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function khoang_cach(a, b) {
    const x = chuan_hoa(a);
    const y = chuan_hoa(b);
    const hang = Array.from({ length: y.length + 1 }, (_, i) => i);
    for (let i = 1; i <= x.length; i += 1) {
      let truoc = hang[0];
      hang[0] = i;
      for (let j = 1; j <= y.length; j += 1) {
        const tam = hang[j];
        const gia = x[i - 1] === y[j - 1] ? 0 : 1;
        hang[j] = Math.min(hang[j] + 1, hang[j - 1] + 1, truoc + gia);
        truoc = tam;
      }
    }
    return hang[y.length];
  }

  function la_day_con(q, s) {
    let i = 0;
    for (const ky_tu of s) {
      if (ky_tu === q[i]) i += 1;
      if (i === q.length) return true;
    }
    return false;
  }

  function diem_tim(data, query) {
    const q = chuan_hoa(query);
    if (!q) return 0;
    const cac_gia_tri = [data.ten, data.id, data.nhom, data.nhan, data.ngan].concat(data.aliases || []).map(chuan_hoa);
    let diem = 0;

    cac_gia_tri.forEach(gia_tri => {
      if (!gia_tri) return;
      if (gia_tri === q) diem = Math.max(diem, 1000);
      else if (gia_tri.startsWith(q)) diem = Math.max(diem, 900 - Math.max(0, gia_tri.length - q.length));
      else if (gia_tri.includes(q)) diem = Math.max(diem, 800 - gia_tri.indexOf(q));
      else if (q.length >= 2 && la_day_con(q, gia_tri)) diem = Math.max(diem, 550);
      if (q.length >= 3) {
        const mau = gia_tri.slice(0, Math.max(q.length, Math.min(gia_tri.length, q.length + 2)));
        const d = khoang_cach(q, mau);
        if (d <= 2) diem = Math.max(diem, 650 - d * 80);
      }
    });

    return diem;
  }

  function tim(query) {
    return THU_TU.map(id => ({ data: DU_LIEU[id], diem: diem_tim(DU_LIEU[id], query) }))
      .filter(muc => muc.diem > 0)
      .sort((a, b) => b.diem - a.diem)
      .map(muc => muc.data);
  }

  function tao_the_ngan(data) {
    return [
      "<article class='crypto-info-card knowledge-short-card' data-algorithm='", data.id, "'>",
      "<div class='crypto-card-top'><h3>", data.ten, "</h3><code>", data.nhan, "</code></div>",
      "<p>", data.ngan, "</p>",
      "<div class='crypto-facts'>",
      "<div class='crypto-fact'><strong>Khóa / đầu vào</strong><span>", data.khoa, "</span></div>",
      "<div class='crypto-fact'><strong>Đặc điểm</strong><span>", data.dac_diem, "</span></div>",
      "</div>",
      "<button class='detail-button' type='button' data-detail-id='", data.id, "'>Chi tiết <span>→</span></button>",
      "</article>"
    ].join("");
  }

  function tao_thu_vien() {
    const trang = document.querySelector(".app-view[data-view='crypto']");
    if (!trang) return;

    const cac_nhom = Object.entries(NHOM).map(([ten_nhom, ids]) => {
      const ma = ten_nhom === "Mã hóa cổ điển" ? "CỔ ĐIỂN" :
        ten_nhom === "Mã hóa hiện đại" ? "HIỆN ĐẠI" :
        ten_nhom === "Mã hóa công khai" ? "CÔNG KHAI" : "HASH";
      return [
        "<section class='crypto-group'>",
        "<h2 class='crypto-group-title'><span>", ma, "</span> ", ten_nhom, "</h2>",
        "<div class='crypto-info-grid'>",
        ids.map(id => tao_the_ngan(DU_LIEU[id])).join(""),
        "</div></section>"
      ].join("");
    }).join("");

    trang.innerHTML = [
      "<section class='breadcrumb'><span>Trang chủ</span><b>›</b><strong>Mã hóa</strong></section>",
      "<section class='page-heading extra-heading'><div>",
      "<p class='eyebrow'>ALGORITHM LIBRARY</p>",
      "<h1>Thư viện kiến thức mật mã</h1>",
      "<p>Các thẻ dưới đây là bản tóm tắt. Bấm Chi tiết để mở bài giảng đầy đủ: nguồn gốc, cơ chế, công thức, cách dùng, tình huống áp dụng, giới hạn và ví dụ.</p>",
      "</div><div class='heading-chip'>12 bài giảng</div></section>",
      cac_nhom
    ].join("");
  }

  const detailView = document.createElement("div");
  detailView.className = "app-view";
  detailView.dataset.view = "detail";
  detailView.hidden = true;
  content.appendChild(detailView);

  const searchView = document.createElement("div");
  searchView.className = "app-view";
  searchView.dataset.view = "search";
  searchView.hidden = true;
  content.appendChild(searchView);

  function an_tat_ca_trang() {
    document.querySelectorAll(".app-view").forEach(trang => {
      trang.hidden = true;
    });
  }

  function mo_chi_tiet(id) {
    const data = DU_LIEU[id];
    if (!data) return;

    const cac_muc = data.sections.map((muc, index) => [
      "<section class='lesson-section'>",
      "<div class='lesson-index'>", String(index + 1).padStart(2, "0"), "</div>",
      "<div><h2>", muc.title, "</h2>",
      muc.paragraphs.map(doan => "<p>" + doan + "</p>").join(""),
      "</div></section>"
    ].join("")).join("");

    detailView.innerHTML = [
      "<section class='breadcrumb'><button class='inline-back' type='button' data-back-library>Thư viện mã hóa</button><b>›</b><strong>", data.ten, "</strong></section>",
      "<section class='lesson-hero'>",
      "<div class='lesson-hero-copy'>",
      "<p class='eyebrow'>DEEP DIVE · ", data.nhom.toUpperCase(), "</p>",
      "<h1>", data.ten, "</h1>",
      "<p>", data.ngan, "</p>",
      "<div class='lesson-tags'><span>", data.nhan, "</span><span>", data.khoa, "</span></div>",
      "</div>",
      "<button class='action-button outline lesson-back-button' type='button' data-back-library>← Quay lại thư viện</button>",
      "</section>",
      "<section class='lesson-summary-grid'>",
      "<article><small>BẢN CHẤT</small><strong>", data.ngan, "</strong></article>",
      "<article><small>KHÓA / ĐẦU VÀO</small><strong>", data.khoa, "</strong></article>",
      "<article><small>ĐIỂM CẦN NHỚ</small><strong>", data.dac_diem, "</strong></article>",
      "</section>",
      "<div class='lesson-body'>", cac_muc, "</div>",
      "<section class='lesson-footer-note'><strong>Ghi nhớ:</strong> bài giảng giải thích nguyên lý để học và hiểu. Khi dùng mật mã cho dữ liệu thật, ưu tiên primitive/ thư viện chuẩn và cấu hình hiện đại thay vì tự triển khai.</section>"
    ].join("");

    an_tat_ca_trang();
    detailView.hidden = false;
    if (topbarTitle) topbarTitle.textContent = data.ten + " · Chi tiết";
    if (topbarBadge) topbarBadge.textContent = data.nhan;
    document.querySelectorAll(".side-nav .nav-item").forEach(nut => nut.classList.toggle("active", nut.dataset.view === "crypto"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function mo_thu_vien() {
    const nut = document.querySelector(".side-nav .nav-item[data-view='crypto']");
    if (nut) nut.click();
  }

  function mo_ket_qua(query) {
    const ket_qua = tim(query);
    const cards = ket_qua.length
      ? ket_qua.map(tao_the_ngan).join("")
      : "<div class='empty-search'><strong>Không tìm thấy thuật toán phù hợp.</strong><span>Thử: AES, RSA, Caesar, SHA, MD5, Hill, Vigenere...</span></div>";

    searchView.innerHTML = [
      "<section class='breadcrumb'><span>Trang chủ</span><b>›</b><strong>Kết quả tìm kiếm</strong></section>",
      "<section class='page-heading extra-heading'><div>",
      "<p class='eyebrow'>SEARCH RESULTS</p>",
      "<h1>Kết quả cho “", query.replace(/</g, "&lt;").replace(/>/g, "&gt;"), "”</h1>",
      "<p>", String(ket_qua.length), " thuật toán phù hợp. Đây là bản mô tả ngắn; bấm Chi tiết để mở bài giảng đầy đủ.</p>",
      "</div><div class='heading-chip'>", String(ket_qua.length), " kết quả</div></section>",
      "<div class='crypto-info-grid search-result-grid'>", cards, "</div>"
    ].join("");

    an_tat_ca_trang();
    searchView.hidden = false;
    if (topbarTitle) topbarTitle.textContent = "Tìm kiếm thuật toán";
    if (topbarBadge) topbarBadge.textContent = String(ket_qua.length) + " KẾT QUẢ";
    document.querySelectorAll(".side-nav .nav-item").forEach(nut => nut.classList.remove("active"));
    an_dropdown();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  content.addEventListener("click", su_kien => {
    const nut_chi_tiet = su_kien.target.closest("[data-detail-id]");
    if (nut_chi_tiet) {
      mo_chi_tiet(nut_chi_tiet.dataset.detailId);
      return;
    }

    if (su_kien.target.closest("[data-back-library]")) {
      mo_thu_vien();
    }
  });

  searchWrap.classList.add("search-enhanced");
  const dropdown = document.createElement("div");
  dropdown.className = "search-suggestions";
  dropdown.hidden = true;
  searchWrap.appendChild(dropdown);

  function an_dropdown() {
    dropdown.hidden = true;
    dropdown.innerHTML = "";
  }

  function hien_dropdown(query) {
    const ket_qua = tim(query).slice(0, 6);
    if (!query.trim() || !ket_qua.length) {
      an_dropdown();
      return;
    }

    dropdown.innerHTML = ket_qua.map(data => [
      "<button type='button' class='search-suggestion' data-suggestion-id='", data.id, "'>",
      "<span class='search-suggestion-main'><strong>", data.ten, "</strong><small>", data.ngan, "</small></span>",
      "<code>", data.nhan, "</code>",
      "</button>"
    ].join("")).join("");
    dropdown.hidden = false;
  }

  searchInput.placeholder = "Tìm thuật toán: AES, RSA, SHA, Caesar...";
  searchInput.setAttribute("autocomplete", "off");

  searchInput.addEventListener("input", () => {
    hien_dropdown(searchInput.value);
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim()) hien_dropdown(searchInput.value);
  });

  searchInput.addEventListener("keydown", su_kien => {
    if (su_kien.key === "Escape") {
      an_dropdown();
      return;
    }

    if (su_kien.key === "Enter") {
      const query = searchInput.value.trim();
      if (!query) return;
      su_kien.preventDefault();
      su_kien.stopImmediatePropagation();
      mo_ket_qua(query);
    }
  }, true);

  dropdown.addEventListener("click", su_kien => {
    const nut = su_kien.target.closest("[data-suggestion-id]");
    if (!nut) return;
    searchInput.value = DU_LIEU[nut.dataset.suggestionId].ten;
    an_dropdown();
    mo_chi_tiet(nut.dataset.suggestionId);
  });

  document.addEventListener("click", su_kien => {
    if (!searchWrap.contains(su_kien.target)) an_dropdown();
  });

  function nang_cap_so_sanh() {
    const trang = document.querySelector(".app-view[data-view='compare']");
    if (!trang) return;
    const hero = trang.querySelector(".compare-hero");
    if (!hero) return;

    hero.className = "hash-counter-card";
    hero.innerHTML = [
      "<div class='hash-counter-head'><div>",
      "<p class='eyebrow'>HASH COUNTER</p>",
      "<h2>Bộ đếm & tạo hash trực tiếp</h2>",
      "<p>Nhập một đoạn bất kỳ. Web băm đồng thời MD5 và SHA-256, hiển thị digest và đếm chính xác số ký tự hexadecimal.</p>",
      "</div><div class='hash-input-count'><strong id='hashInputCount'>0</strong><span>ký tự đầu vào</span></div></div>",
      "<textarea id='hashCounterInput' class='hash-counter-input' placeholder='Nhập văn bản để băm MD5 và SHA-256...'></textarea>",
      "<div class='hash-counter-results'>",
      "<article><div class='hash-result-title'><strong>MD5</strong><span><b id='md5HexCount'>32</b> HEX</span></div><code id='md5LiveValue'>—</code><small>128 bit = 32 ký tự hexadecimal</small></article>",
      "<article><div class='hash-result-title'><strong>SHA-256</strong><span><b id='sha256HexCount'>64</b> HEX</span></div><code id='sha256LiveValue'>—</code><small>256 bit = 64 ký tự hexadecimal</small></article>",
      "</div>"
    ].join("");

    const input = document.getElementById("hashCounterInput");
    const inputCount = document.getElementById("hashInputCount");
    const md5Value = document.getElementById("md5LiveValue");
    const shaValue = document.getElementById("sha256LiveValue");
    const md5Count = document.getElementById("md5HexCount");
    const shaCount = document.getElementById("sha256HexCount");
    let phien = 0;

    async function cap_nhat() {
      const hien_tai = ++phien;
      const van_ban = input.value;
      inputCount.textContent = String(Array.from(van_ban).length);

      if (!van_ban.length) {
        md5Value.textContent = "—";
        shaValue.textContent = "—";
        md5Count.textContent = "32";
        shaCount.textContent = "64";
        return;
      }

      const md5 = window.thuat_toan_md5.bam(van_ban);
      md5Value.textContent = md5;
      md5Count.textContent = String(md5.length);
      shaValue.textContent = "đang tính...";

      try {
        const sha = await window.thuat_toan_sha_256.bam(van_ban);
        if (hien_tai !== phien) return;
        shaValue.textContent = sha;
        shaCount.textContent = String(sha.length);
      } catch (loi) {
        if (hien_tai !== phien) return;
        shaValue.textContent = "Không thể tính SHA-256";
      }
    }

    input.addEventListener("input", cap_nhat);
    cap_nhat();
  }

  tao_thu_vien();
  nang_cap_so_sanh();
  window.du_lieu_kien_thuc_ma_hoa = DU_LIEU;
})();
