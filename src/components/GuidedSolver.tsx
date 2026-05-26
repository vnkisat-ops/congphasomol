import { useState, FormEvent } from "react";
import { GUIDED_PROBLEMS } from "../data";
import { GuidedProblem, GuidedStep } from "../types";
import { formatChemicalFormula } from "../utils";
import { CheckCircle2, ChevronRight, HelpCircle, Trophy, RefreshCw, Sparkles, BookOpen } from "lucide-react";

export default function GuidedSolver() {
  const [activeProblemId, setActiveProblemId] = useState<string>("gp_1");
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [problemCompleted, setProblemCompleted] = useState<boolean>(false);

  const activeProblem: GuidedProblem | undefined = GUIDED_PROBLEMS.find((p) => p.id === activeProblemId);

  const handleProblemChange = (id: string) => {
    setActiveProblemId(id);
    setCurrentStepIdx(0);
    setUserInput("");
    setShowHint(false);
    setStepError(null);
    setCompletedSteps([]);
    setProblemCompleted(false);
  };

  const activeStep: GuidedStep | undefined = activeProblem?.steps[currentStepIdx];

  const handleVerifyStep = (e: FormEvent) => {
    e.preventDefault();
    if (!activeStep) return;

    if (!userInput.trim()) {
      setStepError("Vui lòng điền đáp án trước khi nhấn Kiểm tra.");
      return;
    }

    const valResult = activeStep.validate(userInput);

    if (valResult.isValid) {
      setStepError(null);
      setUserInput("");
      setShowHint(false);
      
      const newCompleted = [...completedSteps, activeStep.id];
      setCompletedSteps(newCompleted);

      if (activeProblem && currentStepIdx + 1 < activeProblem.steps.length) {
        setCurrentStepIdx(currentStepIdx + 1);
      } else {
        setProblemCompleted(true);
      }
    } else {
      setStepError(valResult.errorMsg || "Kết quả chưa đúng, hãy thử kiểm tra lại hoặc xem gợi ý nhé!");
    }
  };

  const handleResetProblem = () => {
    setCurrentStepIdx(0);
    setUserInput("");
    setShowHint(false);
    setStepError(null);
    setCompletedSteps([]);
    setProblemCompleted(false);
  };

  if (!activeProblem) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar selection & progress */}
      <div className="lg:col-span-1 flex flex-col gap-3">
        <h4 className="text-xs font-semibold text-slate-400 tracking-wider uppercase px-3">Danh sách bài toán</h4>
        {GUIDED_PROBLEMS.map((prob) => {
          const isSelected = activeProblemId === prob.id;
          return (
            <button
              key={prob.id}
              onClick={() => handleProblemChange(prob.id)}
              id={`btn-guided-prob-${prob.id}`}
              className={`p-3 text-left rounded-xl border transition-all text-sm flex flex-col gap-1.5 ${
                isSelected 
                  ? "bg-indigo-50 text-indigo-950 border-indigo-200 ring-2 ring-indigo-500/10 shadow-sm"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-650 hover:text-slate-950"
              }`}
            >
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-800">
                {prob.id === "gp_1" && "Dạng 1: Kim loại + Axit đặc"}
                {prob.id === "gp_2" && "Dạng 2: Hỗn hợp 2 kim loại"}
                {prob.id === "gp_3" && "Dạng 3: Bài toán chất dư hết"}
              </span>
              <span className="font-bold text-slate-900 line-clamp-2 leading-snug font-display">{formatChemicalFormula(prob.title)}</span>
            </button>
          );
        })}

        {/* Process Map */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mt-2 shadow-sm">
          <h5 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider font-mono">Tiến trình giải bài</h5>
          <div className="flex flex-col gap-3">
            {activeProblem.steps.map((step, idx) => {
              const isPast = completedSteps.includes(step.id);
              const isActive = currentStepIdx === idx && !problemCompleted;
              
              return (
                <div key={step.id} className="flex items-start gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-sans text-[10px] font-bold border transition-colors ${
                    isPast 
                      ? "bg-indigo-600 border-indigo-600 text-white" 
                      : isActive 
                        ? "bg-white border-indigo-600 text-indigo-600 ring-4 ring-indigo-500/10 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}>
                    {step.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs block line-clamp-1 font-sans ${
                      isPast 
                        ? "text-slate-450 line-through" 
                        : isActive 
                          ? "text-indigo-950 font-bold" 
                          : "text-slate-500"
                    }`}>
                      {step.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main solver desk */}
      <div className="lg:col-span-2 bg-white border border-slate-200 shadow-md rounded-2xl overflow-hidden flex flex-col">
        {/* Desk Header */}
        <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 font-sans">
          <span className="text-[10px] font-mono uppercase bg-indigo-100 text-indigo-900 border border-indigo-200 px-2.5 py-0.5 rounded-md font-bold">
            BÀI TOÁN TỰ LUẬN TỰ CHỌN
          </span>
          <h3 className="text-base font-bold text-slate-950 mt-2 font-display">{formatChemicalFormula(activeProblem.title)}</h3>
          
          <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-line">
              {formatChemicalFormula(activeProblem.fullStatement)}
            </p>
          </div>
        </div>

        {/* Solver Steps Panel */}
        <div className="p-6 flex-1 bg-white">
          {problemCompleted ? (
            <div className="p-6 text-center max-w-md mx-auto animate-fadeIn">
              <div className="relative w-20 h-20 bg-amber-50 text-amber-500 border border-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Trophy className="w-10 h-10 animate-bounce" />
                <Sparkles className="absolute top-1 right-2 w-4 h-4 text-emerald-500 animate-pulse" />
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1 font-display">Xuất sắc hoàn thành!</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 font-sans">
                Bạn vừa giải quyết thuần thục tất cả 4 bước hóa học cốt lõi: Tính số mol, Cân bằng, Lập luận phản ứng và Tính khối lượng/Khí thực tiễn thành công.
              </p>

              <button
                onClick={handleResetProblem}
                id="btn-restart-solving"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all mx-auto shadow-md shadow-indigo-500/10"
              >
                <RefreshCw className="w-4 h-4" /> Giải lại bài này
              </button>
            </div>
          ) : (
            activeStep && (
              <div className="animate-fadeIn">
                {/* Active step progress */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-mono text-indigo-700 font-bold uppercase bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded font-sans">
                    Bước {currentStepIdx + 1} / {activeProblem.steps.length}
                  </span>
                  <span className="text-xs text-slate-500 font-bold font-sans">{activeStep.title}</span>
                </div>

                {/* Question explanation */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4 font-sans">
                  {formatChemicalFormula(activeStep.description)}
                </p>

                {/* Form area */}
                <form onSubmit={handleVerifyStep} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-705 font-sans">
                      {formatChemicalFormula(activeStep.questionText)}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => {
                          setUserInput(e.target.value);
                          if (stepError) setStepError(null);
                        }}
                        placeholder={activeStep.placeholder}
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        id="guided-step-input"
                      />
                      <button
                        type="submit"
                        id="btn-verify-guided-step"
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-500/10 shrink-0 whitespace-nowrap animate-pulse"
                      >
                        Kiểm tra
                      </button>
                    </div>
                  </div>

                  {stepError && (
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-900 text-xs leading-relaxed animate-fadeIn">
                      {formatChemicalFormula(stepError)}
                    </div>
                  )}

                  {/* Hint and help togglers */}
                  <div className="flex gap-4 border-t border-slate-200/50 pt-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      id="btn-toggle-hint"
                      className="text-indigo-707 font-bold hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 shrink-0" /> {showHint ? "Ẩn gợi ý" : "Cần Thầy Cô gợi ý?"}
                    </button>
                  </div>

                  {showHint && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-955 text-xs leading-relaxed animate-fadeIn italic">
                      💡 <strong>Gợi ý:</strong> {formatChemicalFormula(activeStep.hint)}
                    </div>
                  )}
                </form>
              </div>
            )
          )}
        </div>

        {/* Desk Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Chế độ giải toán tự luận trực quan
          </span>
          <span className="font-mono text-[10px]">Chuẩn số mol hóa học</span>
        </div>
      </div>
    </div>
  );
}
