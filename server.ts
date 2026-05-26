import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Shared Gemini Client Helper (Safe configuration)
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not configured or left as default.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Offline fallback backup questions in case API is not configured or fails
const LOCAL_BACKUP_QUESTIONS = [
  {
    id: "backup_re_1",
    part: 1,
    category: "Củng cố Tính số oxi hóa",
    question: "Xác định số oxi hóa của nguyên tố photpho (P) trong axit photphoric H₃PO₄.",
    options: ["+3", "+5", "-3", "+1"],
    correctOption: 1,
    explanation: "Trong H₃PO₄, H có số oxi hóa +1, O có số oxi hóa -2. Gọi x là số oxi hóa của P: 3*(+1) + x + 4*(-2) = 0 => 3 + x - 8 = 0 => x = +5. Do đó photpho có số oxi hóa là +5."
  },
  {
    id: "backup_re_2",
    part: 2,
    category: "Củng cố Cân bằng electron",
    question: "Cân bằng phương trình sau: Al + 4HNO₃ → Al(NO₃)₃ + NO + 2H₂O. Hãy chọn phát biểu chính xác nhất?",
    options: [
      "HNO₃ chỉ đóng vai trò chất oxi hóa.",
      "Tỉ lệ số phân tử HNO₃ bị khử là 1 trong tổng số 4 phân tử tham gia phản ứng.",
      "Al đóng vai trò là chất oxi hóa.",
      "Tỉ lệ muối Al(NO₃)₃ và NO tạo thành là 1 : 3."
    ],
    correctOption: 1,
    explanation: "Phản ứng thăng bằng electron: Al⁰ → Al⁺³ + 3e và N⁺⁵ + 3e → N⁺² (NO). Đưa hệ số: Al + 4HNO₃ → Al(NO₃)₃ + NO + 2H₂O. Trong 4 phân tử HNO₃ tham gia, có 1 phân tử bị khử thành NO (chất oxi hóa), còn 3 gốc NO₃- tạo muối (môi trường). Do đó tỉ lệ phân tử HNO₃ bị khử là 1/4."
  },
  {
    id: "backup_re_3",
    part: 3,
    category: "Củng cố Tính số mol",
    question: "Hòa tan hoàn toàn 2,4 gam magie (Mg) vào dung dịch axit clohiđric HCl dư. Tính số mol khí hiđro H₂ thoát ra thu được ở đkc? (Cho Mg = 24)",
    options: ["0,10 mol", "0,20 mol", "0,05 mol", "2,40 mol"],
    correctOption: 0,
    explanation: "Phản ứng xảy ra: Mg + 2HCl → MgCl₂ + H₂↑. Ta có n(Mg) = m/M = 2,4 / 24 = 0,10 mol. Theo phương trình: n(H₂) = n(Mg) = 0,10 mol."
  }
];

// Server-side Route: Generate Reinforcement Exercises
app.post("/api/generate-reinforce", async (req, res) => {
  const { wrongQuestions } = req.body;
  
  const formattedMistakes = wrongQuestions && wrongQuestions.length > 0 
    ? wrongQuestions.map((q: any) => `- Câu hỏi: "${q.question}" thuộc dạng "${q.category}" (đáp án người học chọn sai là option số ${q.userAnswerIndex}).`).join("\n")
    : "Học sinh muốn làm bài luyện tập thêm chung cho các mảng: tính số oxi hóa, thăng bằng electron và số mol.";

  try {
    const ai = getGeminiClient();
    
    const prompt = `Bạn là một Giáo viên Hóa học THPT chuyên nghiệp, vui tính và cực kỳ tận tâm.
Người học vừa trả lời sai các câu hỏi hóa học sau đây:
${formattedMistakes}

Hãy tạo ra đúng 3 câu hỏi luyện tập củng cố (reinforcement exercises) tương tự, bám sát các dạng bài tập học sinh làm sai này để giúp họ lấp đầy lỗ hổng kiến thức. Phân phối các câu hỏi này trải dài tương tự các mảng: tính số oxi hóa, thăng bằng electron và tính số mol.

LƯU Ý QUAN TRỌNG:
1. Sử dụng điều kiện chuẩn mới (đkc) khí ở 25°C, 1 bar là 24,79 L/mol cho các tính toán khí.
2. Viết công thức hóa học rõ ràng, dễ nhìn.
3. Giải thích đáp án chi tiết và mang tính sư phạm cao bằng tiếng Việt.

Hãy tạo ra một danh sách trả về dưới dạng JSON khớp hoàn hảo với cấu trúc yêu cầu.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Bạn chỉ được trả về một mảng JSON các câu hỏi củng cố hóa học theo đặc tả schema được yêu cầu để hiển thị trên web.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description: "Mảng gồm đúng 3 câu hỏi củng cố hóa học",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              part: { 
                type: Type.INTEGER, 
                description: "Mã phần hóa học tương ứng (1: Số oxi hóa, 2: Cân bằng, 3: Số mol, 4: Bài toán tổng hợp)"
              },
              category: { type: Type.STRING, description: "Tên dạng bài (VD: Củng cố Tính số oxi hóa)" },
              question: { type: Type.STRING, description: "Nội dung câu hỏi luyện tập bằng tiếng Việt" },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Danh sách 4 phương án lựa chọn A, B, C, D"
              },
              correctOption: { 
                type: Type.INTEGER, 
                description: "Chỉ số của tùy chọn đúng trong mảng options (bắt đầu từ 0 đến 3)" 
              },
              explanation: { type: Type.STRING, description: "Lời giải thích cặn kẽ và sư phạm từng bước bằng tiếng Việt" }
            },
            required: ["id", "part", "category", "question", "options", "correctOption", "explanation"]
          }
        }
      }
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("AI returned empty text");
    }

    const questions = JSON.parse(textResponse.trim());
    return res.json({ success: true, questions, isMocked: false });

  } catch (error: any) {
    console.warn("Using offline fallback mode due to:", error.message || error);
    // Graceful offline fallback
    return res.json({
      success: true,
      questions: LOCAL_BACKUP_QUESTIONS,
      isMocked: true,
      debugMessage: "Không tìm thấy hoặc lỗi kết nối GEMINI_API_KEY. Đã tự động kích hoạt tính năng câu hỏi củng cố ngoại tuyến chất lượng cao."
    });
  }
});

// Configure Vite integration for dev server or static serving for prod
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite dev server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production static built assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server loaded and running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Vite startup error:", err);
});
