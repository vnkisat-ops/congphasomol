import { QuestionPart, Question, GuidedProblem } from "./types";

export interface TheorySection {
  title: string;
  summary: string;
  content: string;
}

export const THEORY_RESOURCES: Record<QuestionPart, TheorySection> = {
  [QuestionPart.PART1]: {
    title: "PHẦN 1: TÍNH SỐ OXI HÓA (Nền tảng)",
    summary: "Học sinh nắm vững 4 quy tắc xác định số oxi hóa (SOX) để làm cơ sở cho phần cân bằng.",
    content: `
### 💡 4 Quy Tắc Xác Định Số Oxi Hóa (SOX)

1. **Đơn chất:** Số oxi hóa của nguyên tố trong các đơn chất bằng **0**. 
   * *Ví dụ:* $Fe^0$, $H_2^0$, $O_2^0$, $Na^0$.
2. **Trong hợp chất:** 
   * $H = +1$ (trừ một số hydride kim loại như $NaH$, $CaH_2$,... thì $H = -1$).
   * $O = -2$ (trừ một số peroxide như $H_2O_2$, $Na_2O_2$ và hợp chất $OF_2$).
   * Kim loại kiềm (Nhóm IA như $Li, Na, K...$) luôn là **+1**.
   * Kim loại kiềm thổ (Nhóm IIA như $Be, Mg, Ca...$) luôn là **+2**.
   * Nhôm ($Al$) luôn là **+3**.
3. **Tổng số oxi hóa:** Tổng số oxi hóa của các nguyên tố trong hợp chất trung hòa điện luôn bằng **0**.
4. **Trong ion:** Tổng số oxi hóa của các nguyên tố trong một ion đa nguyên tử bằng đúng **điện tích của ion đó**. Đối với ion đơn nguyên tử, số oxi hóa bằng chính điện tích của ion.
   * *Ví dụ:* Trong $NH_4^+$, tổng SOX là $+1$. Trong $SO_4^{2-}$, tổng SOX là $-2$.
    `
  },
  [QuestionPart.PART2]: {
    title: "PHẦN 2: CÂN BẰNG PHƯƠNG TRÌNH PHẢN ỨNG OXI HÓA - KHỬ",
    summary: "Thành thạo phương pháp thăng bằng electron với 4 bước thần thánh.",
    content: `
### ⚡ Phương Pháp Thăng Bằng Electron với 4 Bước Thần Thánh

1. **Bước 1: Xác định Số Oxi Hóa thay đổi**
   * Xác định số oxi hóa của tất cả các nguyên tố trước và sau phản ứng.
   * Tìm ra nguyên tố có số oxi hóa tăng (Chất khử) và nguyên tố có số oxi hóa giảm (Chất oxi hóa).
   * *Ghi nhớ:* **"Khử cho - O nhận"** (Chất khử nhường e, chất oxi hóa nhận e).
2. **Bước 2: Viết các quá trình khử và oxi hóa**
   * Quá trình oxi hóa (quá trình chất khử nhường e): $R^0 \rightarrow R^{+n} + ne$
   * Quá trình khử (quá trình chất oxi hóa nhận e): $X^0 + me \rightarrow X^{-m}$
3. **Bước 3: Tìm hệ số thăng bằng**
   * Tìm bội chung nhỏ nhất (BCNN) số electron nhường và nhận nhằm đảm bảo nguyên tắc: **Tổng electron nhường = Tổng electron nhận**.
   * Nhân hệ số tương ứng vào từng nửa phản ứng.
4. **Bước 4: Đưa hệ số vào phương trình và kiểm tra**
   * Đưa hệ số từ quá trình thăng bằng vào phương trình phản ứng theo thứ tự ưu tiên:
   * **Kim loại** $\rightarrow$ **Phi kim** $\rightarrow$ **Hydrogen** $\rightarrow$ **Oxygen** (dùng O để kiểm tra sự cân bằng).
    `
  },
  [QuestionPart.PART3]: {
    title: "PHẦN 3: TÍNH SỐ MOL CƠ BẢN",
    summary: "Thuộc lòng và áp dụng đúng công thức tính số mol cho 3 trạng thái chất.",
    content: `
### 📊 Bảng Tổng Hợp Công Thức Tính Số Mol ($n$)

| Trạng thái | Công thức áp dụng | Chú thích đại lượng |
| :--- | :--- | :--- |
| **Chất rắn / lỏng nguyên chất** (hoặc tính theo khối lượng) | $$n = \\frac{m}{M}$$ | <ul><li>$m$: khối lượng chất (g)</li><li>$M$: khối lượng mol (g/mol)</li></ul> |
| **Chất khí** (ở ĐKC: $25^\\circ\\text{C}, 1\\text{ bar}$) | $$n = \\frac{V}{24,79}$$ | <ul><li>$V$: thể tích khí ở điều kiện chuẩn (lít)</li><li>*Lưu ý:* Tránh nhầm lẫn với điều kiện cũ 22,4 lít.</li></ul> |
| **Chất lỏng / Dung dịch** | $$n = C_M \\cdot V_{dd}$$ <br>hoặc<br> $$n = \\frac{m_{dd} \\cdot C\\%}{100 \\cdot M}$$ | <ul><li>$C_M$: nồng độ mol (M)</li><li>$V_{dd}$: thể tích dung dịch (lít)</li><li>$C\%$: nồng độ phần trăm (%)</li><li>$m_{dd}$: khối lượng dung dịch (g)</li></ul> |
    `
  },
  [QuestionPart.PART4]: {
    title: "PHẦN 4: BÀI TOÁN TỔNG HỢP",
    summary: "Kết nối tính số mol, cân bằng phương trình phản ứng và lập luận lượng chất dư/hết.",
    content: `
### 📝 Quy Trình Giải Bài Toán Hóa Học 4 Bước

Để giải bài toán hóa học tổng hợp một cách khoa học:

1. **Bước 1: Đổi số liệu đầu bài ra số mol**
   * Chuyển đổi khối lượng ($g$), thể tích khí ở đkc ($l$), nồng độ dung dịch,... về số mol ứng dụng công thức ở phần 3.
2. **Bước 2: Viết & Cân bằng phương trình hóa học**
   * Viết phản ứng hóa học chính xác và cân bằng phương trình bằng thăng bằng electron (ở phần 2) để tìm hệ số tối giản.
3. **Bước 3: Đặt số mol vào phương trình**
   * Đặt số mol chất đã biết vào phương trình hóa học.
   * Sử dụng quy tắc tam suất **"Nhân chéo chia ngang"** để suy ra số mol các chất cần tìm theo yêu cầu đề bài.
4. **Bước 4: Tính toán đáp án yêu cầu**
   * Đổi số mol chất tìm được ngược lại khối lượng, thể tích khí, nồng độ,... theo yêu cầu của câu hỏi.
    `
  }
};

export const PRELOADED_QUESTIONS: Question[] = [
  // --- PART 1 ---
  {
    id: "p1_1",
    part: QuestionPart.PART1,
    category: "Dạng 1: Số oxi hóa trong hợp chất phổ biến",
    question: "Xác định số oxi hóa của lưu huỳnh (S) trong phân tử axit sunfuric H₂SO₄.",
    options: ["-2", "+4", "+6", "+2"],
    correctOption: 2,
    explanation: "Trong hợp chất H₂SO₄, số oxi hóa của H là +1, O là -2. Gọi x là số oxi hóa của S. Ta có tổng số oxi hóa trong một hợp chất trung hòa bằng 0: 2*(+1) + x + 4*(-2) = 0 => 2 + x - 8 = 0 => x = +6."
  },
  {
    id: "p1_2",
    part: QuestionPart.PART1,
    category: "Dạng 1: Số oxi hóa trong hợp chất phổ biến",
    question: "Xác định số oxi hóa của lưu huỳnh (S) trong hợp chất khí sunfurơ SO₂.",
    options: ["+2", "+4", "+6", "-2"],
    correctOption: 1,
    explanation: "Trong SO₂, O có số oxi hóa là -2. Gọi x là số oxi hóa của S. Ta có: x + 2*(-2) = 0 => x - 4 = 0 => x = +4."
  },
  {
    id: "p1_3",
    part: QuestionPart.PART1,
    category: "Dạng 1: Số oxi hóa trong hợp chất phổ biến",
    question: "Xác định số oxi hóa của lưu huỳnh (S) trong khí hiđro sunfua H₂S.",
    options: ["-2", "+2", "+4", "+6"],
    correctOption: 0,
    explanation: "Trong H₂S, H có số oxi hóa là +1. Gọi x là số oxi hóa của S. Ta có: 2*(+1) + x = 0 => 2 + x = 0 => x = -2."
  },
  {
    id: "p1_4",
    part: QuestionPart.PART1,
    category: "Dạng 1: Số oxi hóa trong hợp chất phổ biến",
    question: "Xác định số oxi hóa của nitơ (N) trong phân tử HNO₃.",
    options: ["+3", "+5", "-3", "+1"],
    correctOption: 1,
    explanation: "Trong HNO₃, H có số oxi hóa là +1, O là -2. Gọi x là số oxi hóa của N. Ta có: (+1) + x + 3*(-2) = 0 => 1 + x - 6 = 0 => x = +5."
  },
  {
    id: "p1_5",
    part: QuestionPart.PART1,
    category: "Dạng 1: Số oxi hóa trong hợp chất phổ biến",
    question: "Xác định số oxi hóa của nitơ (N) trong hợp chất khí cười cười N₂O.",
    options: ["+1", "+2", "+3", "+4"],
    correctOption: 0,
    explanation: "Trong N₂O, O có số oxi hóa là -2. Gọi x là số oxi hóa của N. Ta có: 2*x + (-2) = 0 => 2x = 2 => x = +1."
  },
  {
    id: "p1_6",
    part: QuestionPart.PART1,
    category: "Dạng 1: Số oxi hóa trong hợp chất phổ biến",
    question: "Xác định số oxi hóa của nitơ (N) trong amoniac NH₃.",
    options: ["+3", "-3", "+5", "0"],
    correctOption: 1,
    explanation: "Trong NH₃, H có số oxi hóa là +1. Gọi x là số oxi hóa của N. Ta có: x + 3*(+1) = 0 => x = -3."
  },
  {
    id: "p1_7",
    part: QuestionPart.PART1,
    category: "Dạng 1: Số oxi hóa trong hợp chất phổ biến",
    question: "Xác định số oxi hóa của nitơ (N) trong hợp chất khí NO₂.",
    options: ["+2", "+3", "+4", "+5"],
    correctOption: 2,
    explanation: "Trong NO₂, O có số oxi hóa là -2. Gọi x là số oxi hóa của N. Ta có: x + 2*(-2) = 0 => x - 4 = 0 => x = +4."
  },
  {
    id: "p1_8",
    part: QuestionPart.PART1,
    category: "Dạng 1: Số oxi hóa trong hợp chất phổ biến",
    question: "Xác định số oxi hóa của mangan (Mn) trong hợp chất thuốc tím KMnO₄.",
    options: ["+2", "+4", "+6", "+7"],
    correctOption: 3,
    explanation: "Trong KMnO₄, K (nhóm IA) có số oxi hóa +1, O là -2. Gọi x là số oxi hóa của Mn. Ta có: (+1) + x + 4*(-2) = 0 => 1 + x - 8 = 0 => x = +7."
  },
  {
    id: "p1_9",
    part: QuestionPart.PART1,
    category: "Dạng 2: Số oxi hóa trong Ion",
    question: "Xác định số oxi hóa của nitơ (N) trong ion amoni NH₄⁺.",
    options: ["-3", "+3", "-5", "+5"],
    correctOption: 0,
    explanation: "Tổng số oxi hóa trong một ion bằng chính điện tích của ion đó. Gọi x là số oxi hóa của N. Ta có: x + 4*(+1) = +1 => x + 4 = 1 => x = -3."
  },
  {
    id: "p1_10",
    part: QuestionPart.PART1,
    category: "Dạng 2: Số oxi hóa trong Ion",
    question: "Xác định số oxi hóa của nitơ (N) trong ion nitrat NO₃⁻.",
    options: ["+3", "+5", "-3", "+4"],
    correctOption: 1,
    explanation: "Tổng số oxi hóa của các nguyên tố trong ion NO₃⁻ bằng -1. Gọi x là số oxi hóa của N. Ta có: x + 3*(-2) = -1 => x - 6 = -1 => x = +5."
  },
  {
    id: "p1_11",
    part: QuestionPart.PART1,
    category: "Dạng 2: Số oxi hóa trong Ion",
    question: "Xác định số oxi hóa của lưu huỳnh (S) trong ion sunfat SO₄²⁻.",
    options: ["+4", "+6", "-2", "+2"],
    correctOption: 1,
    explanation: "Tổng số oxi hóa trong ion SO₄²⁻ bằng -2. Gọi x là số oxi hóa của S. Ta có: x + 4*(-2) = -2 => x - 8 = -2 => x = +6."
  },
  {
    id: "p1_12",
    part: QuestionPart.PART1,
    category: "Dạng 2: Số oxi hóa trong Ion",
    question: "Xác định số oxi hóa của crom (Cr) trong ion đicromat Cr₂O₇²⁻.",
    options: ["+3", "+4", "+5", "+6"],
    correctOption: 3,
    explanation: "Tổng số oxi hóa trong ion Cr₂O₇²⁻ bằng -2. Gọi x là số oxi hóa của Cr. Ta có: 2*x + 7*(-2) = -2 => 2x - 14 = -2 => 2x = 12 => x = +6."
  },
  {
    id: "p1_13",
    part: QuestionPart.PART1,
    category: "Dạng 3: Số oxi hóa hữu cơ / phức tạp",
    question: "Xác định số oxi hóa của nguyên tố cacbon (C) trong khí metan CH₄.",
    options: ["-4", "+4", "-2", "0"],
    correctOption: 0,
    explanation: "Trong CH₄, H có số oxi hóa +1. Gọi x là số oxi hóa của C. Ta có: x + 4*(+1) = 0 => x = -4."
  },
  {
    id: "p1_14",
    part: QuestionPart.PART1,
    category: "Dạng 3: Số oxi hóa hữu cơ / phức tạp",
    question: "Xác định số oxi hóa trung bình của cacbon (C) trong hợp chất ancol etylic C₂H₅OH (C₂H₆O).",
    options: ["-4", "-2", "-3", "-1"],
    correctOption: 1,
    explanation: "Công thức phân tử C₂H₅OH viết lại là C₂H₆O. H có số oxi hóa +1, O có số oxi hóa -2. Gọi x là số oxi hóa trung bình của C. Ta có: 2*x + 6*(+1) + (-2) = 0 => 2x + 4 = 0 => x = -2."
  },
  {
    id: "p1_15",
    part: QuestionPart.PART1,
    category: "Dạng 3: Số oxi hóa hữu cơ / phức tạp",
    question: "Xác định số oxi hóa trung bình của sắt (Fe) trong quặng oxit sắt từ Fe₃O₄.",
    options: ["+2", "+3", "+8/3", "+4/3"],
    correctOption: 2,
    explanation: "Trong hợp chất Fe₃O₄, số oxi hóa của O là -2. Gọi x là số oxi hóa trung bình của Fe. Ta có: 3*x + 4*(-2) = 0 => 3x = 8 => x = +8/3 (thực chất Fe₃O₄ là hỗn hợp của FeO (Fe⁺²) và Fe₂O₃ (Fe⁺³))."
  },

  // --- PART 2 ---
  {
    id: "p2_1",
    part: QuestionPart.PART2,
    category: "Mức độ 1: Phản ứng cơ bản (Không tạo muối)",
    question: "Cân bằng phản ứng oxi hóa khử sau: H₂S + O₂ → SO₂ + H₂O. Tìm bộ hệ số tỉ lệ tối giản tương ứng của các chất lần lượt là:",
    options: ["1, 1, 1, 1", "2, 3, 2, 2", "2, 2, 2, 1", "2, 3, 2, 1"],
    correctOption: 1,
    explanation: "Đầu tiên, xác định sự thay đổi số oxi hóa: S⁻² → S⁺⁴ + 6e và O₂⁰ + 4e → 2O⁻². Hệ số thăng bằng electron: Nhân quá trình nhường với 2, quá trình nhận với 3 (Tổng e trao đổi = 12). Ta có hệ số: 2H₂S + 3O₂ → 2SO₂ + 2H₂O. Bộ hệ số tối giản là 2, 3, 2, 2."
  },
  {
    id: "p2_2",
    part: QuestionPart.PART2,
    category: "Mức độ 1: Phản ứng cơ bản (Không tạo muối)",
    question: "Cho phản ứng: NH₃ + O₂ ➔ NO + H₂O (xúc tác, t°). Tính tổng hệ số cân bằng (số nguyên tối giản) của tất cả các chất trong phương trình?",
    options: ["12", "15", "19", "21"],
    correctOption: 2,
    explanation: "Xác định sự thay đổi số oxi hóa: N⁻³ → N⁺² + 5e (quá trình oxi hóa) và O₂⁰ + 4e → 2O⁻² (quá trình khử). BCNN của 5 và 4 là 20. Nhân quá trình của N với 4, quá trình O₂ với 5. Phương trình cân bằng: 4NH₃ + 5O₂ → 4NO + 6H₂O. Tổng hệ số = 4 + 5 + 4 + 6 = 19."
  },
  {
    id: "p2_3",
    part: QuestionPart.PART2,
    category: "Mức độ 2: Phản ứng có môi trường (Tạo muối)",
    question: "Cho phản ứng: Cu + HNO₃ → Cu(NO₃)₂ + NO↑ + H₂O. Xác định tỉ lệ giữa số phân tử HNO₃ đóng vai trò chất oxi hóa và số phân tử HNO₃ đóng vai trò là môi trường tạo muối là bao nhiêu?",
    options: ["1 : 3", "2 : 3", "3 : 1", "1 : 2"],
    correctOption: 0,
    explanation: "Phương trình cân bằng electron: 3Cu⁰ → 3Cu⁺² + 6e ; 2N⁺⁵ + 6e → 2N⁺² (khí NO). Đưa hệ số vào phương trình: 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO + 4H₂O. Trong 8 phân tử HNO₃ tham gia, có 2 phân tử bị khử thành NO (đóng vai trò chất oxi hóa), còn lại 6 gốc NO₃⁻ đi vào muối Cu(NO₃)₂ (môi trường). Tỉ lệ là 2 : 6 = 1 : 3."
  },
  {
    id: "p2_4",
    part: QuestionPart.PART2,
    category: "Mức độ 2: Phản ứng có môi trường (Tạo muối)",
    question: "Cân bằng phương trình: Mg + H₂SO₄ (đặc, nóng) → MgSO₄ + H₂S + H₂O. Tìm hệ số của H₂SO₄ trong phản ứng đã thăng bằng?",
    options: ["4", "5", "10", "2"],
    correctOption: 1,
    explanation: "Xác định quá trình: Mg⁰ → Mg⁺² + 2e (x4) ; S⁺⁶ + 8e → S⁻² (x1). Hệ số tạm là: 4Mg + H₂SO₄ → 4MgSO₄ + H₂S. Để tạo 4 phân tử muối MgSO₄ và 1 phân tử khí H₂S cần tổng cộng 5 nguyên tử S ở vế sau, nghĩa là cần 5 phân tử H₂SO₄ tham gia phản ứng. Phương trình hoàn chỉnh: 4Mg + 5H₂SO₄ → 4MgSO₄ + H₂S + 4H₂O. Hệ số của H₂SO₄ là 5."
  },
  {
    id: "p2_5",
    part: QuestionPart.PART2,
    category: "Mức độ 3: Phản ứng tự oxi hóa - tự khử",
    question: "Trong phản ứng: Cl₂ + 2NaOH → NaCl + NaClO + H₂O. Phát biểu nào sau đây mô tả đúng nhất vai trò của khí Cl₂?",
    options: [
      "Chỉ đóng vai trò là chất khử.",
      "Chỉ đóng vai trò là chất oxi hóa.",
      "Vừa đóng vai trò là chất khử, vừa là chất oxi hóa.",
      "Không đóng vai trò khử hay oxi hóa."
    ],
    correctOption: 2,
    explanation: "Số oxi hóa ban đầu của clo là 0 (Cl₂⁰). Sau phản ứng, clo chuyển vào NaCl (có số oxi hóa -1, giảm nên Cl₂ đóng vai trò chất oxi hóa) và chuyển vào NaClO (có số oxi hóa +1, tăng nên Cl₂ đóng vai trò chất khử). Vậy Clo tự oxi hóa tự khử (vừa là chất khử vừa là chất oxi hóa)."
  },
  {
    id: "p2_6",
    part: QuestionPart.PART2,
    category: "Mức độ 3: Phản ứng tự oxi hóa - tự khử",
    question: "Cân bằng phương trình phản ứng nhiệt phân muối kali clorat: KClO₃ → KCl + O₂ (xúc tác MnO₂, t°). Hệ số tối giản trước O₂ sau khi cân bằng thu được là bao nhiêu?",
    options: ["1", "2", "3", "5"],
    correctOption: 2,
    explanation: "Sự thay đổi số oxi hóa: Cl⁺⁵ nhận 6e biến thành Cl⁻¹ (khử). Ở nhóm oxi: 3O⁻² nhường 6e tạo 3/2 O₂ (oxi hóa). Nhân đôi hệ số để toàn bộ là các số nguyên: 2KClO₃ → 2KCl + 3O₂. Vậy hệ số của khí oxi (O₂) là 3."
  },
  {
    id: "p2_7",
    part: QuestionPart.PART2,
    category: "Mức độ 4: Phản ứng có chữ (Ẩn số)",
    question: "Cho phản ứng: Fe + HNO₃ → Fe(NO₃)₃ + N_xO_y + H₂O. Tìm hệ số thăng bằng của sắt Fe để đưa vào phương trình?",
    options: ["3x - 2y", "5x - 2y", "x - y", "3x - y"],
    correctOption: 1,
    explanation: "Quá trình oxi hóa: Fe⁰ → Fe⁺³ + 3e (phải nhân với số e nhận của nitơ). Quá trình khử: xN⁺⁵ + (5x-2y)e → N_x_O_y. Nhân chéo hệ số: nhân quá trình Fe với (5x-2y), nhân quá trình N với 3. Như vậy hệ số ứng với sắt Fe trong phương trình là: (5x - 2y)."
  },
  {
    id: "p2_8",
    part: QuestionPart.PART2,
    category: "Mức độ 4: Phản ứng có chữ (Ẩn số)",
    question: "Cho phản ứng có ẩn số hóa trị kim loại: M + HNO₃ → M(NO₃)_n + NO + H₂O. Hãy xác định hệ số cân bằng đứng trước axit nitric HNO₃?",
    options: ["3n", "4n", "n + 3", "3n + 1"],
    correctOption: 1,
    explanation: "Ta có: M⁰ → M⁺ⁿ + ne (x3) và N⁺⁵ + 3e → N⁺² (NO) (xn). Nhân hệ số vào phương trình: 3M + (12n? Thử lại: Có 3 muối M(NO₃)_n nên cần 3n gốc axit, thêm n phân tử NO vế sau => Tổng số N vế sau là 3n + n = 4n). Vậy cần 4n HNO₃. Phản ứng: 3M + 4n HNO₃ → 3M(NO₃)_n + n NO + 2n H₂O. Do đó hệ số trước HNO₃ là 4n."
  },

  // --- PART 3 ---
  {
    id: "p3_1",
    part: QuestionPart.PART3,
    category: "Tính số mol cơ bản",
    question: "Tính số mol có trong 11,2 gam sắt (Fe). (Cho biết nguyên tử khối Fe = 56).",
    options: ["0,10 mol", "0,20 mol", "0,25 mol", "0,50 mol"],
    correctOption: 1,
    explanation: "Áp dụng công thức tính số mol theo khối lượng chất rắn: n = m / M. Số mol sắt Fe = 11,2 / 56 = 0,20 mol."
  },
  {
    id: "p3_2",
    part: QuestionPart.PART3,
    category: "Tính số mol cơ bản",
    question: "Ở điều kiện chuẩn mới (đkc: 25°C, 1 bar), tính số mol khí chứa trong 4,958 lít khí O₂?",
    options: ["0,20 mol", "0,22 mol", "0,25 mol", "0,15 mol"],
    correctOption: 0,
    explanation: "Áp dụng công thức tính số mol khí ở điều kiện chuẩn mới (đkc): n = V / 24,79 (không dùng 22,4 cũ). Số mol khí oxi là n = 4,958 / 24,79 = 0,20 mol."
  },
  {
    id: "p3_3",
    part: QuestionPart.PART3,
    category: "Tính số mol cơ bản",
    question: "Tìm số mol của axit clohiđric HCl có trong 200 ml dung dịch HCl có nồng độ là 1M?",
    options: ["0,10 mol", "0,15 mol", "0,20 mol", "0,30 mol"],
    correctOption: 2,
    explanation: "Đổi thể tích dung dịch ra đơn vị lít: V_dd = 200 ml = 0,2 lít. Áp dụng công thức tính theo nồng độ mol: n = C_M * V_dd = 1 * 0,2 = 0,20 mol."
  },
  {
    id: "p3_4",
    part: QuestionPart.PART3,
    category: "Tính số mol cơ bản",
    question: "Tính số mol muối nước NaCl hiện diện trong 150 gam dung dịch muối ăn nồng độ 5,85% (cho Na=23, Cl=35,5, NaCl = 58,5)?",
    options: ["0,10 mol", "0,15 mol", "0,20 mol", "0,30 mol"],
    correctOption: 1,
    explanation: "Khối lượng chất tan NaCl trong dung dịch là: m_NaCl = (m_dd * C%) / 100% = (150 * 5,85) / 100 = 8,775 gam. Khối lượng mol NaCl M = 58,5 g/mol. Số mol NaCl là n = 8,775 / 58,5 = 0,15 mol."
  },
  {
    id: "p3_5",
    part: QuestionPart.PART3,
    category: "Tính số mol cơ bản",
    question: "Tính số mol nước chất lỏng trong một cốc đong chứa 180 gam nước nguyên chất H₂O (cho H = 1, O = 16)?",
    options: ["5,0 mol", "10,0 mol", "15,0 mol", "18,0 mol"],
    correctOption: 1,
    explanation: "Khối lượng mol của nước H₂O là M = 2*1 + 16 = 18 g/mol. Số mol nước trong cốc là n = m / M = 180 / 18 = 10,0 mol."
  },
  {
    id: "p3_6",
    part: QuestionPart.PART3,
    category: "Tính số mol cơ bản",
    question: "Tính số khí cacbonic CO₂ sinh ra thu được trong bình thu khí dung tích 12,395 lít ở điều kiện chuẩn (đkc)?",
    options: ["0,45 mol", "0,50 mol", "0,55 mol", "0,60 mol"],
    correctOption: 1,
    explanation: "Áp dụng công thức khí ở ĐKC (25°C, 1 bar): n = V / 24,79. Ta có: n = 12,395 / 24,79 = 0,50 mol."
  }
];

export const GUIDED_PROBLEMS: GuidedProblem[] = [
  {
    id: "gp_1",
    title: "Dạng 1: Bài toán tính theo sản phẩm khí (Kim loại + Acid đặc/dư)",
    fullStatement: "Cho 6,4 gam đồng (Cu) tác dụng hoàn toàn với dung dịch HNO₃ đặc, dư, thu được muối Cu(NO₃)₂, nước và khí NO₂ (sản phẩm khử duy nhất ở đkc).\n1. Cân bằng phương trình phản ứng bằng phương pháp thăng bằng electron.\n2. Tính thể tích khí NO₂ thu được ở điều kiện chuẩn.\n3. Tính khối lượng muối Cu(NO₃)₂ tạo thành sau phản ứng. (Cho Cu=64, N=14, O=16, H=1)",
    steps: [
      {
        id: 1,
        title: "Bước 1: Tính số mol Cu phản ứng",
        description: "Dựa vào khối lượng m = 6.4 gam và khối lượng mol M = 64 g/mol của đồng (Cu). Hãy áp dụng công thức n = m / M để tìm số mol Cu.",
        questionText: "Nhập số mol của Cu (mol):",
        hint: "Lấy 6,4 chia cho 64 để tìm kết quả. Nhập dưới dạng số thập phân ví dụ: 0.1",
        placeholder: "Ví dụ: 0.1",
        correctAnswerText: "0.1",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (Math.abs(val - 0.1) < 0.005) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Kết quả chưa đúng. Hãy lấy 6,4g chia cho 64 g/mol của đồng." };
        }
      },
      {
        id: 2,
        title: "Bước 2: Cân bằng phương trình phản ứng",
        description: "Phản ứng của Cu tác dụng với HNO₃ đặc nóng: Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O. Hãy tìm hệ số thăng bằng đứng trước khí NO₂.",
        questionText: "Hệ số tối giản đứng trước khí NO₂ là bao nhiêu?",
        hint: "Nhớ lại quá trình: Cu⁰ → Cu⁺² + 2e (nhường 2e) và N⁺⁵ + 1e → N⁺⁴ (NO₂). Hệ số nhân thăng bằng vào NO₂ là 2.",
        placeholder: "Ví dụ: 2",
        correctAnswerText: "2",
        validate: (input) => {
          if (input.trim() === "2") {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Chưa đúng. Phương trình cân bằng là Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O." };
        }
      },
      {
        id: 3,
        title: "Bước 3: Suy ra số mol sản phẩm",
        description: "Theo phương trình: Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O. Hãy dùng quy tắc 'Nhân chéo chia ngang' để suy ra số mol khí NO₂ sinh ra từ 0.1 mol Cu.",
        questionText: "Suy ra số mol khí NO₂ (mol):",
        hint: "Tỉ lệ phản ứng giữa Cu : NO₂ là 1 : 2. Cho nên, số mol NO₂ bằng 2 lần số mol Cu.",
        placeholder: "Ví dụ: 0.2",
        correctAnswerText: "0.2",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (Math.abs(val - 0.2) < 0.005) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Nhân số mol Cu tìm được ở bước 1 (0.1) với hệ số NO₂ (2) để ra đáp số." };
        }
      },
      {
        id: 4,
        title: "Bước 4: Tính thể tích khí NO₂ thực tế",
        description: "Tính thể tích khí NO₂ (đơn vị: lít) thu được ở điều kiện chuẩn (đkc: 25°C, 1 bar) sử dụng n = 0.2 mol và số chuẩn mới là 24,79.",
        questionText: "Nhập thể tích NO₂ ở đkc (lít):",
        hint: "Áp dụng công thức V = n * 24.79. Tính thể tích cho 0.2 mol NO₂.",
        placeholder: "Ví dụ: 4.958",
        correctAnswerText: "4.958",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (Math.abs(val - 4.958) < 0.01) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Nhân số mol NO₂ là 0.2 với 24.79. Chú ý sử dụng 24.79 thay vì 22.4." };
        }
      },
      {
        id: 5,
        title: "Bước 5: Tính khối lượng muối Cu(NO₃)₂ thu được",
        description: "Theo phương trình hóa học, tỉ lệ số mol Cu và Cu(NO₃)₂ là 1 : 1, nghĩa là n(muối) = n(Cu) = 0.1 mol. Hãy tính khối lượng muối m (gam). (Biết nguyên tử khối Cu=64, N=14, O=16, do đó khối lượng mol muối M = 188 g/mol)",
        questionText: "Khối lượng muối đồng thu được (gam):",
        hint: "Sử dụng công thức m = n * M. Trong đó n = 0.1 mol muối, M = 188 g/mol.",
        placeholder: "Ví dụ: 18.8",
        correctAnswerText: "18.8",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (Math.abs(val - 18.8) < 0.05) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Kết quả đúng là 18.8 gam (0.1 mol nhân với 188 g/mol)." };
        }
      }
    ]
  },
  {
    id: "gp_2",
    title: "Dạng 2: Bài toán hỗn hợp kim loại (Giải hệ phương trình)",
    fullStatement: "Hòa tan hoàn toàn 11,0 gam hỗn hợp gồm bột sắt (Fe) và nhôm (Al) vào dung dịch H₂SO₄ loãng dư. Sau khi phản ứng kết thúc, thu được 11,1555 lít khí H₂ ở điều kiện chuẩn.\n1. Viết các phương trình hóa học xảy ra.\n2. Tính thành phần phần trăm theo khối lượng của mỗi kim loại trong hỗn hợp ban đầu. (Cho Fe=56, Al=27, H=1, S=32, O=16)",
    steps: [
      {
        id: 1,
        title: "Bước 1: Tính số mol khí H₂ tạo thành",
        description: "Đề bài cho biết thể tích khí H₂ thu được ở điều kiện chuẩn (đkc) là V = 11.1555 lít. Hãy tính số mol khí H₂ đã thoát ra bằng công thức n = V / 24,79.",
        questionText: "Nhập số mol H₂ (mol):",
        hint: "Thực hiện phép tính: 11,1555 chia cho 24,79.",
        placeholder: "Ví dụ: 0.45",
        correctAnswerText: "0.45",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (Math.abs(val - 0.45) < 0.005) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Kết quả đúng là 0.45 mol (11.1555 / 24.79)." };
        }
      },
      {
        id: 2,
        title: "Bước 2: Giải hệ phương trình - Tìm số mol x (Fe)",
        description: "Gọi x là số mol Fe, y là số mol Al trong 11g hỗn hợp ban đầu. Các phản ứng:\nFe + H₂SO₄ → FeSO₄ + H₂↑ (cho x mol H₂)\n2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂↑ (cho 1.5y mol H₂)\nTa lập hệ phương trình:\n(1) Khối lượng: 56x + 27y = 11.0\n(2) Số mol khí: x + 1.5y = 0.45\nHãy giải hệ trên để tìm ra số mol x của Sắt (Fe).",
        questionText: "Nhập số mol của Fe x (mol):",
        hint: "Gợi ý: Từ ptr (2) => x = 0.45 - 1.5y. Thay vào (1) giải được y ≈ 0.2491 mol, từ đó suy ra x ≈ 0.0763 mol.",
        placeholder: "Ví dụ: 0.076",
        correctAnswerText: "0.0763",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (val > 0.070 && val < 0.082) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Chưa đúng. Gợi ý giá trị x nằm trong khoảng 0.076 mol." };
        }
      },
      {
        id: 3,
        title: "Bước 3: Tìm số mol y (Al)",
        description: "Bằng cách giải hệ phương trình hai ẩn, hãy tìm số mol y của Nhôm (Al).",
        questionText: "Nhập số mol Al y (mol):",
        hint: "Mối tương quan y ≈ (11.0 - 56x) / 27. Kết quả gần bằng 0.249 mol.",
        placeholder: "Ví dụ: 0.25",
        correctAnswerText: "0.2491",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (val > 0.24 && val < 0.26) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Chưa đúng. Giá trị y xấp xỉ 0.249 mol." };
        }
      },
      {
        id: 4,
        title: "Bước 4: Tính phần trăm khối lượng Sắt (Fe)",
        description: "Với khối lượng Sắt m(Fe) = x * 56 ≈ 0.0763 * 56 ≈ 4.274 gam. Tính phần trăm sản lượng khối lượng Sắt (%) trong 11 gam hỗn hợp đầu.",
        questionText: "Nhập % khối lượng Fe (%):",
        hint: "Công thức: (m_Fe / 11.0) * 100%. Kết quả xấp xỉ 38.85%.",
        placeholder: "Ví dụ: 38.85",
        correctAnswerText: "38.85",
        validate: (input) => {
          const val = parseFloat(input.trim().replace("%", "").replace(",", "."));
          if (val > 38.0 && val < 39.5) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Hãy tính phần trăm khối lượng Fe: (4.274g / 11g) * 100% ≈ 38.85%." };
        }
      },
      {
        id: 5,
        title: "Bước 5: Tính phần trăm khối lượng Nhôm (Al)",
        description: "Phần trăm khối lượng của Nhôm bằng 100% trừ đi phần trăm sắt bạn đã tìm ở trên.",
        questionText: "Nhập % khối lượng Al (%):",
        hint: "Lấy 100% trừ đi %Fe ở bước 4. Kết quả xấp xỉ 61.15%.",
        placeholder: "Ví dụ: 61.15",
        correctAnswerText: "61.15",
        validate: (input) => {
          const val = parseFloat(input.trim().replace("%", "").replace(",", "."));
          if (val > 60.5 && val < 62.0) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Lấy 100% trừ đi tỉ lệ của Fe ở bước 4: 100% - 38.85% = 61.15%." };
        }
      }
    ]
  },
  {
    id: "gp_3",
    title: "Dạng 3: Bài toán chất dư - chất hết",
    fullStatement: "Cho 5,4 gam nhôm (Al) vào tác dụng hoàn toàn với 200 ml dung dịch H₂SO₄ nồng độ 1,5M.\n1. Tính thể tích khí H₂ sinh ra ở điều kiện chuẩn đkc.\n2. Chất nào còn dư sau phản ứng và dư bao nhiêu gam? (Cho Al=27, H=1, S=32, O=16)",
    steps: [
      {
        id: 1,
        title: "Bước 1: Tính số mol Al ban đầu",
        description: "Tính số mol Al phản ứng trước tiên, biết khối lượng m = 5,4g và Al = 27 g/mol.",
        questionText: "Nhập số mol Al (mol):",
        hint: "Lấy 5,4 chia cho 27 để tìm kết quả.",
        placeholder: "Ví dụ: 0.2",
        correctAnswerText: "0.2",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (Math.abs(val - 0.2) < 0.01) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Số mol Al = 5,4 / 27 = 0.2 mol." };
        }
      },
      {
        id: 2,
        title: "Bước 2: Tính số mol H₂SO₄ ban đầu",
        description: "Dung dịch H₂SO₄ có thể tích V = 200 ml = 0,2 lít, nồng độ C_M = 1,5 M. Áp dụng công thức n = C_M * V để tìm số mol axit.",
        questionText: "Nhập số mol H₂SO₄ (mol):",
        hint: "Nhân số lít (0,2) với nồng độ mol (1,5).",
        placeholder: "Ví dụ: 0.3",
        correctAnswerText: "0.3",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (Math.abs(val - 0.3) < 0.01) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Số mol H₂SO₄ = 1.5 * 0.2 = 0.3 mol." };
        }
      },
      {
        id: 3,
        title: "Bước 3: Nhận xét chất dư - chất hết",
        description: "Phương trình hóa học: 2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂↑.\nSo sánh tỉ lệ mol: n(Al)/2 so với n(H₂SO₄)/3.\nHãy tính khối lượng chất còn dư sau phản ứng. Nếu không có chất nào dư (phản ứng vừa đủ), hãy nhập số 0.",
        questionText: "Khối lượng chất dư sau phản ứng (gam):",
        hint: "Ta có n(Al)/2 = 0.2/2 = 0.1 và n(H₂SO₄)/3 = 0.3/3 = 0.1. Tỉ lệ hoàn toàn bằng nhau, chứng tỏ hai chất phản ứng vừa đủ. Nhập 0.",
        placeholder: "Ví dụ: 0",
        correctAnswerText: "0",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (val === 0) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Hãy suy nghĩ lại. Tỉ lệ mol bằng nhau, do đó cả Al và H₂SO₄ đều phản ứng hết! Đáp số là 0 gam chất dư." };
        }
      },
      {
        id: 4,
        title: "Bước 4: Tính thể tích H₂ sinh ra",
        description: "Dựa vào hệ số chất đẩy khí: 2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂. Với n(Al) = 0.2 mol và n(H₂SO₄) = 0.3 mol, ta suy ra số mol H₂ sinh ra là bao nhiêu? Sau đó hãy nhân với 24,79 để tìm thể tích ở điều kiện chuẩn đkc.",
        questionText: "Thể tích khí H₂ sinh ra ở đkc (lít):",
        hint: "Số mol của H₂ = n(H₂SO₄) = 1.5 * n(Al) = 0.3 mol. Thể tích v = 0.3 * 24.79 = 7.437 lít.",
        placeholder: "Ví dụ: 7.437",
        correctAnswerText: "7.437",
        validate: (input) => {
          const val = parseFloat(input.trim().replace(",", "."));
          if (Math.abs(val - 7.437) < 0.05) {
            return { isValid: true };
          }
          return { isValid: false, errorMsg: "Đáp án đúng là 7.437 lít (0.3 mol nhân với 24.79)." };
        }
      }
    ]
  }
];
