import { useState } from "react";
import { PRELOADED_QUESTIONS } from "../data";
import { QuestionPart, Question, IncorrectQuestionLog } from "../types";
import { formatChemicalFormula } from "../utils";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, AlertCircle, BookOpen } from "lucide-react";

interface QuizEngineProps {
  part: QuestionPart;
  onLogMistake: (log: IncorrectQuestionLog) => void;
  onViewMistakes: () => void;
}

export default function QuizEngine({ part, onLogMistake, onViewMistakes }: QuizEngineProps) {
  // Filter questions for the active part
  const questionsList = PRELOADED_QUESTIONS.filter((q) => q.part === part);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeQuestion: Question | undefined = questionsList[currentIndex];

  const handleOptionClick = (idx: number) => {
    if (isAnswered || !activeQuestion) return;
    
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === activeQuestion.correctOption;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      // Log failure to vault
      const logEntry: IncorrectQuestionLog = {
        questionId: activeQuestion.id,
        userAnswerIndex: idx,
        timestamp: new Date().toISOString(),
        reinforcementCategory: activeQuestion.category,
        originalQuestion: activeQuestion
      };
      onLogMistake(logEntry);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIndex + 1 < questionsList.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (questionsList.length === 0) {
    return (
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 text-center max-w-md mx-auto">
        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h4 className="text-base font-semibold text-gray-900 mb-1">Không tìm thấy câu hỏi</h4>
        <p className="text-xs text-gray-500">Hệ thống đang cập nhật bộ đề trắc nghiệm cho phần này.</p>
      </div>
    );
  }

  if (quizFinished) {
    const pct = Math.round((score / questionsList.length) * 100);
    return (
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 max-w-lg mx-auto text-center">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100 shadow-inner">
          <BookOpen className="w-10 h-10 animate-pulse" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Hoàn thành Thử thách!</h3>
        <p className="text-sm text-slate-500 mb-4 font-sans">
          Bạn vừa hoàn thành chủ đề luyện tập phần {part} với tỉ lệ trả lời đúng.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 divide-x divide-slate-200">
            <div>
              <span className="text-xs text-slate-400 font-mono block">ĐÚNG / TỔNG</span>
              <span className="text-2xl font-bold text-slate-900 font-mono font-sans">
                {score} / {questionsList.length}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono block">TỈ LỆ ĐẠT</span>
              <span className={`text-2xl font-bold font-mono font-sans ${pct >= 70 ? "text-emerald-600" : "text-amber-500"}`}>
                {pct}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRestart}
            id="btn-quiz-retry"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Làm lại
          </button>
          
          <button
            onClick={onViewMistakes}
            id="btn-view-mistakes-redirect"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-500/10"
          >
            Sổ Câu Sai & AI <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const isCurrentCorrect = selectedOption !== null && selectedOption === activeQuestion.correctOption;

  return (
    <div className="max-w-2xl mx-auto flex flex-col bg-white border border-slate-200 shadow-lg rounded-2xl overflow-hidden">
      {/* Header bar */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 px-2.5 py-0.5 rounded-md font-mono">
            Câu {currentIndex + 1}/{questionsList.length}
          </span>
          <span className="text-xs text-slate-400 line-clamp-1 font-sans">-{activeQuestion.category}</span>
        </div>
        <div className="text-xs font-mono font-semibold text-slate-600 bg-slate-200/60 px-2.5 py-0.5 rounded-full">
          Đúng: {score}
        </div>
      </div>

      {/* Main question body */}
      <div className="p-6 flex-1">
        <h3 className="text-base font-bold text-slate-900 leading-relaxed mb-6 font-display">
          {formatChemicalFormula(activeQuestion.question)}
        </h3>

        {/* Options grid */}
        <div className="flex flex-col gap-3">
          {activeQuestion.options.map((opt, idx) => {
            const hasPickedThis = selectedOption === idx;
            const isCorrectAnswer = idx === activeQuestion.correctOption;
            
            let btnClasses = "border border-slate-200 bg-white hover:border-indigo-500 hover:bg-indigo-50/50 text-slate-800 font-sans shadow-sm";
            if (isAnswered) {
              if (isCorrectAnswer) {
                // Style correct answer green
                btnClasses = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold shadow-inner";
              } else if (hasPickedThis) {
                // Style picked wrong grey/red
                btnClasses = "border-rose-300 bg-rose-50 text-rose-950 shadow-inner";
              } else {
                // Rest of the options
                btnClasses = "opacity-40 border-slate-100 text-slate-400 cursor-not-allowed";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                id={`btn-option-${idx}`}
                className={`flex items-center gap-3 p-4 rounded-xl text-left text-sm transition-all cursor-pointer ${btnClasses}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border text-xs font-mono font-bold ${
                  isAnswered 
                    ? isCorrectAnswer 
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : hasPickedThis 
                        ? "bg-rose-500 border-rose-500 text-white"
                        : "bg-slate-100 border-slate-200 text-slate-400"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-1">{formatChemicalFormula(opt)}</div>
                
                {isAnswered && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && hasPickedThis && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed tutor explanation panels in beautiful emerald design as requested by template */}
        {isAnswered && (
          <div className="mt-6 p-5 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-800 shadow-inner animate-fadeIn">
            <h5 className="font-bold text-xs text-emerald-900 flex items-center gap-1.5 uppercase tracking-wider mb-1.5">
              💡 Giải Thích Chi Tiết Sư Phạm:
            </h5>
            <p className="text-xs leading-relaxed text-emerald-950/90 font-sans">
              {formatChemicalFormula(activeQuestion.explanation)}
            </p>
          </div>
        )}
      </div>

      {/* Footer step controls */}
      {isAnswered && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleNext}
            id="btn-quiz-next"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-500/10"
          >
            {currentIndex + 1 === questionsList.length ? "Hoàn thành" : "Câu tiếp theo"}{" "}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
