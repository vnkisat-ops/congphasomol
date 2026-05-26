import { useState } from "react";
import { IncorrectQuestionLog, Question } from "../types";
import { formatChemicalFormula } from "../utils";
import { 
  Trash2, Sparkles, Brain, CheckCircle2, XCircle, ChevronRight, 
  HelpCircle, AlertCircle, RefreshCw, Layers, Award, BookOpen 
} from "lucide-react";

interface IncorrectVaultProps {
  logs: IncorrectQuestionLog[];
  onClearLogs: () => void;
  onSelectTab: (tab: string) => void;
}

export default function IncorrectVault({ logs, onClearLogs, onSelectTab }: IncorrectVaultProps) {
  // AI Practice states
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [aiQuestions, setAiQuestions] = useState<Question[] | null>(null);
  const [aiWarning, setAiWarning] = useState<string | null>(null);
  const [aiAnswers, setAiAnswers] = useState<Record<string, number>>({});
  const [showAiExplains, setShowAiExplains] = useState<Record<string, boolean>>({});

  // Triggering the server-side API for custom reinforcement questions
  const generateAIReinforcement = async () => {
    setLoadingAI(true);
    setAiWarning(null);
    setAiQuestions(null);
    setAiAnswers({});
    setShowAiExplains({});

    try {
      const response = await fetch("/api/generate-reinforce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wrongQuestions: logs.map((log) => ({
            question: log.originalQuestion.question,
            category: log.originalQuestion.category,
            userAnswerIndex: log.userAnswerIndex,
          })),
        }),
      });

      const data = await response.json();
      if (data.success && data.questions) {
        setAiQuestions(data.questions);
        if (data.isMocked) {
          setAiWarning(data.debugMessage || "Đã tải bài tập củng cố ngoại tuyến.");
        }
      } else {
        throw new Error("Không thể phân tích dữ liệu trả về từ máy chủ.");
      }
    } catch (err: any) {
      console.error(err);
      setAiWarning("Lỗi kết nối máy chủ AI. Hệ thống sử dụng chế độ bài tập ngoại tuyến dự phòng.");
      // Render offline backup manually if fetch fails entirely
      setAiQuestions([
        {
          id: "local_re_1",
          part: 1,
          category: "Củng cố Tính số oxi hóa",
          question: "Xác định số oxi hóa của photpho (P) trong axit photphoric H₃PO₄.",
          options: ["+1", "+3", "+5", "-3"],
          correctOption: 2,
          explanation: "Trong H₃PO₄, số oxi hóa của H là +1, O là -2. Gọi x là số oxi hóa của P: 3*(+1) + x + 4*(-2) = 0 => 3 + x - 8 = 0 => x = +5."
        },
        {
          id: "local_re_2",
          part: 2,
          category: "Củng cố Thăng bằng electron",
          question: "Cân bằng phản ứng: Zn + HNO₃ → Zn(NO₃)₂ + NH₄NO₃ + H₂O. Tìm hệ số đứng trước HNO₃ tối giản?",
          options: ["4", "10", "12", "6"],
          correctOption: 1,
          explanation: "4Zn⁰ → 4Zn⁺² + 8e ; N⁺⁵ + 8e → N⁻³ (NH₄NO₃). Đưa hệ số: 4Zn + 10HNO₃ → 4Zn(NO₃)₂ + NH₄NO₃ + 3H₂O. Hệ số HNO₃ là 10."
        },
        {
          id: "local_re_3",
          part: 3,
          category: "Củng cố Tính số mol",
          question: "Tính thể tích khí H₂ (lít ở đkc) thoát ra khi hòa tan hết 5,4g nhôm (Al) bằng axit HCl dư? (Cho Al=27)",
          options: ["4,958", "7,437", "6,720", "2,479"],
          correctOption: 1,
          explanation: "n(Al) = 5.4/27 = 0.2 mol. Phản ứng: 2Al + 6HCl → 2AlCl₃ + 3H₂. n(H₂) = 1.5 * n(Al) = 0.3 mol. V(H₂) ở đkc = 0.3 * 24.79 = 7.437 L."
        }
      ]);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSelectAIOption = (qId: string, optIdx: number) => {
    if (aiAnswers[qId] !== undefined) return; // Answered already
    setAiAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setShowAiExplains((prev) => ({ ...prev, [qId]: true }));
  };

  const getPartIcon = (part: number) => {
    if (part === 1) return <Layers className="w-4 h-4 text-emerald-600" />;
    if (part === 2) return <Award className="w-4 h-4 text-amber-600" />;
    return <BookOpen className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Incorrect List View (Col span 2) */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 font-display">
              📝 Sổ Tay Lỗi Sai Của Bạn
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              Tự động lưu trữ những câu trả lời chưa đúng để giúp bạn ôn lại.
            </p>
          </div>
          {logs.length > 0 && (
            <button
              onClick={onClearLogs}
              id="btn-clear-mistake-logs"
              className="px-3.5 py-1.5 hover:bg-rose-50 text-rose-650 border border-slate-100 hover:border-rose-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa sổ tay
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-900 mb-1 font-display">Sổ tay hoàn hảo - Trống lỗi sai!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 font-sans">
              Ngưỡng mộ quá! Bạn chưa làm sai câu hỏi nào cả. Hãy tiếp tục duy trì thành tích tốt này!
            </p>
            <button
              onClick={() => onSelectTab("theory")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-500/10"
              id="btn-go-practice"
            >
              Vào Luyện đề ôn tập <ChevronRight className="w-3 h-3 inline ms-1" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {logs.map((log, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm border-l-4 border-l-rose-500 animate-fadeIn"
              >
                {/* Meta details */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded border border-rose-100">
                    LỖI SAI SỐ #{logs.length - idx}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    {getPartIcon(log.originalQuestion.part)}
                    <span className="font-mono">Phần {log.originalQuestion.part}</span>
                  </div>
                </div>

                {/* Question */}
                <h4 className="text-sm font-bold text-slate-950 leading-relaxed mb-4 font-display">
                  {formatChemicalFormula(log.originalQuestion.question)}
                </h4>

                {/* Choices summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-4">
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2 text-xs">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-rose-400 block font-semibold uppercase tracking-wider text-[9px]">Bạn đã trả lời:</span>
                      <span className="text-rose-950 font-bold font-sans">
                        {formatChemicalFormula(log.originalQuestion.options[log.userAnswerIndex])}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-250 rounded-xl flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-emerald-400 block font-semibold uppercase tracking-wider text-[9px]">Đáp án chuẩn là:</span>
                      <span className="text-emerald-950 font-extrabold font-sans">
                        {formatChemicalFormula(log.originalQuestion.options[log.originalQuestion.correctOption])}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Teacher hint explanation */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed shadow-inner">
                  <h5 className="font-bold text-[10px] text-emerald-950 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> Nguyên lý sư pháp giải thích:
                  </h5>
                  <p className="font-sans leading-relaxed text-emerald-950/90">
                    {formatChemicalFormula(log.originalQuestion.explanation)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Reinforcement Generator Column (Col span 1) */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-6 shadow-lg border border-slate-850 flex flex-col gap-4 relative overflow-hidden transition-all hover:shadow-indigo-500/5 hover:-translate-y-0.5">
          {/* Mesh decorative backdrops */}
          <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-6 -top-6 w-20 h-20 bg-indigo-500/15 rounded-full blur-xl pointer-events-none" />

          <div className="flex gap-3 relative z-10">
            <div className="p-2 border border-indigo-500/35 bg-indigo-500/15 text-indigo-400 rounded-xl shrink-0 shadow-inner">
              <Brain className="w-6 h-6 shrink-0 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold block uppercase">
                AI - Personalized
              </span>
              <h3 className="text-base font-bold mt-1 text-white font-display">Đề Củng Cố Qua AI</h3>
            </div>
          </div>

          <p className="text-xs text-indigo-100/90 leading-relaxed font-sans relative z-10">
            Chúng tôi sử dụng <strong>Google Gemini AI</strong> để phân tích những phản ứng bạn đã làm sai ở cột bên trái, từ đó biên soạn 3 câu hỏi hoàn toàn mới nhằm củng cố kịp thời lý thuyết đó độc quyền cho riêng bạn!
          </p>

          <button
            onClick={generateAIReinforcement}
            disabled={logs.length === 0 || loadingAI}
            id="btn-trigger-ai-reinforce"
            className="w-full mt-2 py-3 bg-indigo-600 disabled:bg-slate-850 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/10 transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer relative z-10"
          >
            {loadingAI ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Đang tổng hợp đề...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-300 shrink-0" /> Kích hoạt Đề củng cố AI
              </>
            )}
          </button>

          {logs.length === 0 && (
            <span className="text-[10px] text-indigo-300 italic text-center">
              (Hãy làm sai ít nhất 1 câu trắc nghiệm để mở khóa tính năng thông minh này!)
            </span>
          )}
        </div>

        {/* Dynamic AI Questions Render Area */}
        {loadingAI && (
          <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 animate-pulse">
            {/* Laboratory animation simulation */}
            <div className="w-14 h-14 relative flex items-center justify-center bg-indigo-50 rounded-full border border-indigo-100">
              <div className="absolute w-8 h-8 rounded-full border-2 border-indigo-650 border-dashed animate-spin"></div>
              <ActivityFlaskSim />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 font-display">Đang tổng hợp lớp học...</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs leading-normal font-sans">
                Giáo viên AI đang xem xét các phương án bị chọn lỗi và chuẩn bị 3 thử thách tương tự cùng hệ thống lời giải chi tiết.
              </p>
            </div>
          </div>
        )}

        {aiQuestions && aiQuestions.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-indigo-950 text-xs flex gap-2 items-start font-semibold">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-indigo-650 animate-pulse" />
              <div>
                <strong>3 Câu hỏi củng cố bằng AI đã sẵn sàng!</strong> 
                {aiWarning && <p className="text-[10px] opacity-80 mt-1 font-sans">{aiWarning}</p>}
              </div>
            </div>

            {aiQuestions.map((q, idx) => {
              const isAnswered = aiAnswers[q.id] !== undefined;
              const hasPicked = aiAnswers[q.id];
              const isCorrectAnswer = hasPicked === q.correctOption;

              return (
                <div key={q.id || idx} className="bg-white border border-slate-200 shadow-lg rounded-2xl p-5 flex flex-col gap-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded">
                      CÂU CỦNG CỐ #{idx + 1}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold font-mono">Phần {q.part}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-normal font-sans">
                    {formatChemicalFormula(q.question)}
                  </h4>

                  <div className="flex flex-col gap-2">
                    {q.options.map((opt, oIdx) => {
                      const optSelected = hasPicked === oIdx;
                      const optIsCorrect = oIdx === q.correctOption;

                      let optClass = "border border-slate-200 text-slate-850 bg-white hover:border-indigo-550 hover:bg-indigo-50/50 shadow-sm cursor-pointer";
                      if (isAnswered) {
                        if (optIsCorrect) {
                          optClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-inner";
                        } else if (optSelected) {
                          optClass = "border-rose-300 bg-rose-50 text-rose-950 shadow-inner";
                        } else {
                          optClass = "opacity-40 border-slate-100 text-slate-400 cursor-not-allowed";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectAIOption(q.id, oIdx)}
                          className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center gap-2 transition-all ${optClass}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono font-bold border ${
                            isAnswered
                              ? optIsCorrect
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : optSelected
                                  ? "bg-rose-500 border-rose-500 text-white"
                                  : "text-slate-405 bg-slate-100"
                              : "text-slate-500 bg-slate-50"
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1 font-sans">{formatChemicalFormula(opt)}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showAiExplains[q.id] && (
                    <div className="p-3 bg-emerald-50 border border-emerald-250 rounded-xl text-emerald-900 text-[11px] leading-relaxed animate-fadeIn shadow-inner">
                      <h5 className="font-bold text-[9px] text-emerald-950 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Brain className="w-3.5 h-3.5" /> Lời giải sư phạm AI:
                      </h5>
                      <p className="font-sans leading-relaxed text-emerald-950/90 font-sans">
                        {formatChemicalFormula(q.explanation)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Visual Scientific beaker/flask simulation in pure SVG
function ActivityFlaskSim() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-600" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12" />
      <path d="M10 3v5" />
      <path d="M14 3v5" />
      <path d="M8.5 8H15.5L20 18A2 2 0 0 1 18 21H6A2 2 0 0 1 4 18L8.5 8Z" />
      <path d="M6 18c0-1.5 2-1.5 2-1.5s2 1.5 2 1.5 2-1.5 2-1.5 2 1.5 2 1.5" className="animate-pulse" />
      <circle cx="12" cy="11" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="9" cy="14" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
