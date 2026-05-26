import { useState, useEffect } from "react";
import { QuestionPart, IncorrectQuestionLog } from "./types";
import TheoryCard from "./components/TheoryCard";
import QuizEngine from "./components/QuizEngine";
import GuidedSolver from "./components/GuidedSolver";
import IncorrectVault from "./components/IncorrectVault";
import { 
  Award, BookOpen, Layers, CheckCircle2, ChevronRight, 
  HelpCircle, Trash2, Brain, Sparkles, AlertCircle, Bookmark, Compass
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("theory");
  const [quizPart, setQuizPart] = useState<QuestionPart>(QuestionPart.PART1);
  const [incorrectLogs, setIncorrectLogs] = useState<IncorrectQuestionLog[]>([]);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  // Load incorrect questions logs from localStorage on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem("learned_chem_mistakes_v1");
      if (stored) {
        setIncorrectLogs(JSON.parse(stored));
      }
      
      const count = localStorage.getItem("learned_chem_attempts_count_v1");
      if (count) {
        setTotalAttempts(parseInt(count, 10));
      }
    } catch (err) {
      console.error("Error reading from localstorage:", err);
    }
  }, []);

  // Save logs to localStorage upon changes
  const saveLogs = (newLogs: IncorrectQuestionLog[]) => {
    setIncorrectLogs(newLogs);
    try {
      localStorage.setItem("learned_chem_mistakes_v1", JSON.stringify(newLogs));
    } catch (err) {
      console.error("Error saving to localstorage:", err);
    }
  };

  const handleLogMistake = (log: IncorrectQuestionLog) => {
    // Avoid logging duplicates of the same question ID to avoid cluttering the vault
    const exists = incorrectLogs.some((item) => item.questionId === log.questionId);
    if (!exists) {
      const updated = [log, ...incorrectLogs];
      saveLogs(updated);
    }
    
    const newCount = totalAttempts + 1;
    setTotalAttempts(newCount);
    localStorage.setItem("learned_chem_attempts_count_v1", newCount.toString());
  };

  const handleClearLogs = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách câu sai trong sổ tay không?")) {
      saveLogs([]);
    }
  };

  const handleStartQuiz = (part: QuestionPart) => {
    setQuizPart(part);
    setActiveTab("quiz");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col">
      {/* Visual Top Decorative Accent Banner */}
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-slate-950 shrink-0"></div>

      {/* Main Top Header Navigation */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 sticky top-0 z-50 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-bold text-xl">
              H₂
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-950 tracking-tight flex items-center gap-2 font-display">
                Luyện Tập Tính Toán Hóa Học
                <span className="text-[9px] bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-100 font-bold tracking-wider uppercase font-mono">
                  ChemLogic v2.5
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Nền tảng ôn luyện Số oxi hóa, Cân bằng electron và Giải bài toán tổng hợp Hóa học THPT
              </p>
            </div>
          </div>

          {/* Quick client dashboard progress */}
          <div className="flex items-center gap-4 text-xs divide-x divide-slate-200">
            <div className="flex flex-col items-end px-3">
              <span className="text-slate-400 block font-mono text-[9px] uppercase tracking-wider">Tổng lỗi sai đã ghi lại</span>
              <span className="font-bold text-rose-600 text-sm font-mono">{incorrectLogs.length} câu</span>
            </div>
            <div className="flex flex-col items-end px-3">
              <span className="text-slate-400 block font-mono text-[9px] uppercase tracking-wider">Sổ tay ôn luyện</span>
              <span className="font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded text-[11px]">
                {incorrectLogs.length > 0 ? "⚠️ Cần củng cố" : "✨ Sạch lỗi sai"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Primary tab switcher */}
      <nav className="bg-slate-900 border-b border-slate-800 py-1.5 px-4 sticky top-[68px] z-40 shadow-md shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto scroller-hidden">
          <button
            onClick={() => setActiveTab("theory")}
            id="tabmenu-theory"
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "theory"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" /> 1. Lý Thuyết & Tóm Tắt
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            id="tabmenu-quiz"
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "quiz"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" /> 2. Trắc Nghiệm Từng Phần
          </button>

          <button
            onClick={() => setActiveTab("guided")}
            id="tabmenu-guided"
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "guided"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Award className="w-4 h-4" /> 3. Giải Bài Toán Tự Luận
          </button>

          <button
            onClick={() => setActiveTab("vault")}
            id="tabmenu-vault"
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === "vault"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Bookmark className="w-4 h-4" /> 4. Sổ Lỗi Sai & AI Củng Cố
            {incorrectLogs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-amber-950 text-[9px] font-bold rounded-full flex items-center justify-center font-mono animate-bounce">
                {incorrectLogs.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Main Workspace Body area */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
        {activeTab === "theory" && (
          <div className="animate-fadeIn">
            <div className="mb-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-xl">
                <h2 className="text-base font-bold text-slate-950 flex items-center gap-2 font-display">
                  <Sparkles className="w-5 h-5 text-indigo-600" /> Hệ thống Giáo trình Hóa học Thông minh
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">
                  Chọn các thẻ chủ đề hóa học ở cột bên trái dưới đây để ôn tập nhanh quy tắc thăng bằng e, xác định số oxi hóa hay công thức tính số mol, rồi bứt phá điểm số với các bộ trắc nghiệm!
                </p>
              </div>
              <div className="flex gap-2.5 shrink-0">
                <button
                  onClick={() => handleStartQuiz(QuestionPart.PART1)}
                  className="px-4 py-1.5 border border-slate-200 text-slate-700 bg-white hover:border-indigo-500 hover:bg-indigo-50/50 font-semibold text-xs rounded-xl shadow-sm transition-all"
                  id="header-btn-quick-quiz-1"
                >
                  Luyện phần 1
                </button>
                <button
                  onClick={() => handleStartQuiz(QuestionPart.PART2)}
                  className="px-4 py-1.5 border border-slate-200 text-slate-700 bg-white hover:border-indigo-500 hover:bg-indigo-50/50 font-semibold text-xs rounded-xl shadow-sm transition-all"
                  id="header-btn-quick-quiz-2"
                >
                  Luyện phần 2
                </button>
              </div>
            </div>

            <TheoryCard onStartQuiz={handleStartQuiz} />
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="animate-fadeIn flex flex-col gap-5">
            {/* Subject selector for quiz context */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Bảng Đề Trắc Nghiệm</h4>
                <div className="text-sm font-bold text-slate-950 mt-0.5 font-display">
                  Đang ôn tập: {quizPart === QuestionPart.PART1 && "Phần 1 - Xác định số oxi hóa"}
                  {quizPart === QuestionPart.PART2 && "Phần 2 - Thăng bằng Electron"}
                  {quizPart === QuestionPart.PART3 && "Phần 3 - Tính số mol cơ bản"}
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto overflow-x-auto">
                <button
                  onClick={() => setQuizPart(QuestionPart.PART1)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    quizPart === QuestionPart.PART1 ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500 hover:text-indigo-600"
                  }`}
                  id="quiz-selector-p1"
                >
                  Số Oxi Hóa
                </button>
                <button
                  onClick={() => setQuizPart(QuestionPart.PART2)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    quizPart === QuestionPart.PART2 ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500 hover:text-indigo-600"
                  }`}
                  id="quiz-selector-p2"
                >
                  Cân bằng log
                </button>
                <button
                  onClick={() => setQuizPart(QuestionPart.PART3)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    quizPart === QuestionPart.PART3 ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500 hover:text-indigo-600"
                  }`}
                  id="quiz-selector-p3"
                >
                  Số mol
                </button>
              </div>
            </div>

            <QuizEngine 
              part={quizPart} 
              onLogMistake={handleLogMistake} 
              onViewMistakes={() => setActiveTab("vault")} 
            />
          </div>
        )}

        {activeTab === "guided" && (
          <div className="animate-fadeIn">
            <GuidedSolver />
          </div>
        )}

        {activeTab === "vault" && (
          <div className="animate-fadeIn">
            <IncorrectVault 
              logs={incorrectLogs} 
              onClearLogs={handleClearLogs} 
              onSelectTab={(tab) => setActiveTab(tab)} 
            />
          </div>
        )}
      </main>

      {/* App Footer */}
      <footer className="bg-white border-t border-gray-150 py-6 text-center text-xs text-gray-400 mt-12 shrink-0 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p>© 2026 Học Tập Hóa Học THPT - Ứng dụng Giải bài toán & Củng cố câu sai thông minh.</p>
          <div className="flex items-center gap-4 justify-center md:justify-end font-mono">
            <span>Tiêu chuẩn: đkc (25°C, 1 bar)</span>
            <span>Tích hợp Google Gemini AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
