import React, { useState } from "react";
import { THEORY_RESOURCES, TheorySection } from "../data";
import { QuestionPart } from "../types";
import { formatChemicalFormula } from "../utils";
import { Award, BookOpen, Layers, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

interface TheoryCardProps {
  onStartQuiz: (part: QuestionPart) => void;
}

interface ParsedElement {
  type: "heading" | "paragraph" | "list" | "table";
  content?: string;
  items?: string[];
  tableHeader?: string[];
  tableRows?: string[][];
}

// Extract bracket content { ... } by walking & maintaining balanced count
function extractBraceContent(str: string, startIndex: number): { content: string; endIndex: number } | null {
  let depth = 0;
  let content = "";
  for (let i = startIndex; i < str.length; i++) {
    const char = str[i];
    if (char === "{") {
      if (depth > 0) content += char;
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0) {
        return { content, endIndex: i };
      }
      content += char;
    } else {
      if (depth > 0) content += char;
    }
  }
  return null;
}

// Walks the string looking for \frac and builds fraction components
function parseFractions(expr: string): React.ReactNode[] | null {
  let index = expr.indexOf("\\frac");
  if (index === -1) return null;
  
  const parts: React.ReactNode[] = [];
  let currentIdx = 0;
  
  while (index !== -1) {
    if (index > currentIdx) {
      parts.push(
        <span key={`text-${currentIdx}`}>
          {renderFormulaSubtreeWithoutFrac(expr.substring(currentIdx, index))}
        </span>
      );
    }
    
    const numOpenIdx = expr.indexOf("{", index + 5);
    if (numOpenIdx === -1) break;
    const numRes = extractBraceContent(expr, numOpenIdx);
    if (!numRes) break;
    
    const denOpenIdx = expr.indexOf("{", numRes.endIndex + 1);
    if (denOpenIdx === -1) break;
    const denRes = extractBraceContent(expr, denOpenIdx);
    if (!denRes) break;
    
    const numerator = numRes.content;
    const denominator = denRes.content;
    
    parts.push(
      <span key={`frac-${index}`} className="inline-flex flex-col items-center justify-center align-middle mx-1.5 leading-none translate-y-[2px]">
        <span className="text-[12px] border-b border-indigo-300 pb-1 px-1.5 font-mono italic text-indigo-950 leading-none block text-center">
          {renderFormulaSubtree(numerator)}
        </span>
        <span className="text-[11px] pt-1 px-1.5 font-mono italic text-indigo-950 leading-none block text-center">
          {renderFormulaSubtree(denominator)}
        </span>
      </span>
    );
    
    currentIdx = denRes.endIndex + 1;
    index = expr.indexOf("\\frac", currentIdx);
  }
  
  if (currentIdx < expr.length) {
    parts.push(
      <span key={`text-end`}>
        {renderFormulaSubtreeWithoutFrac(expr.substring(currentIdx))}
      </span>
    );
  }
  
  return parts;
}

function renderFormulaSubtree(formula: string): React.ReactNode {
  const expr = formula.trim();
  const fracParts = parseFractions(expr);
  if (fracParts) {
    return <span className="inline-flex items-center gap-0.5">{fracParts}</span>;
  }
  return renderFormulaSubtreeWithoutFrac(expr);
}

function renderFormulaSubtreeWithoutFrac(formula: string): React.ReactNode {
  const expr = formula.trim().replace(/\\\\/g, "\\");

  // Handle \cdot or dot multiplication
  if (expr.includes("\\cdot") || expr.includes("·")) {
    const dots = expr.split(/\\cdot|·/);
    return (
      <span className="inline-flex items-center gap-0.5">
        {dots.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-indigo-500 font-extrabold mx-1 text-[13px] select-none">·</span>}
            {renderFormulaSubtree(part)}
          </React.Fragment>
        ))}
      </span>
    );
  }

  // Handle subscripts like C_M, m_dd, m_{dd}
  const subRegex = /([A-Za-z]+)_\{?([A-Za-z0-9%]+)\}?/g;
  if (subRegex.test(expr)) {
    subRegex.lastIndex = 0;
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    let match;
    while ((match = subRegex.exec(expr)) !== null) {
      if (match.index > lastIdx) {
        parts.push(<span key={`text-${lastIdx}`}>{expr.substring(lastIdx, match.index)}</span>);
      }
      const base = match[1];
      const sub = match[2];
      parts.push(
        <span key={`sub-${match.index}`} className="inline-flex items-baseline md:-translate-y-[1px]">
          <span className="italic font-bold font-sans text-slate-900">{base}</span>
          <sub className="text-[9px] text-indigo-700 font-extrabold select-none ml-0.5 font-mono">{sub}</sub>
        </span>
      );
      lastIdx = subRegex.lastIndex;
    }
    if (lastIdx < expr.length) {
      parts.push(<span key={`text-end`}>{expr.substring(lastIdx)}</span>);
    }
    return <span className="inline-flex items-center">{parts}</span>;
  }

  // Handle degree signs like ^\circ or ^\circ\text{C} or ^\circC
  let processed = expr;
  processed = processed.replace(/\^\\circ\\text\{([A-Za-z0-9]+)\}/g, "°$1");
  processed = processed.replace(/\^\\circ([A-Za-z0-9]+)/g, "°$1");
  processed = processed.replace(/\^\\circ/g, "°");

  if (processed === "n") {
    return <span className="italic font-extrabold text-indigo-900 font-sans">n</span>;
  }
  if (processed === "m") {
    return <span className="italic font-semibold text-slate-800 font-mono text-[13px]">m</span>;
  }
  if (processed === "M") {
    return <span className="italic font-bold text-slate-800 font-sans text-[13px]">M</span>;
  }
  if (processed === "V") {
    return <span className="italic font-bold text-slate-800 font-mono text-[13px]">V</span>;
  }
  if (processed === "100") {
    return <span className="font-semibold text-slate-700 font-mono text-[12px]">100</span>;
  }
  if (processed === "24,79") {
    return <span className="font-extrabold text-indigo-650 font-mono text-[12px]">24,79</span>;
  }

  return <span className="font-sans text-slate-800">{formatChemicalFormula(processed)}</span>;
}

function parseMarkdownBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*/);
  if (parts.length > 1) {
    return (
      <>
        {parts.map((part, index) => {
          if (index % 2 === 1) {
            return <strong key={index} className="font-extrabold text-slate-950 font-sans">{part}</strong>;
          } else {
            return <span key={index}>{part}</span>;
          }
        })}
      </>
    );
  }
  return text;
}

function parseMathTextInline(text: string): React.ReactNode {
  const inlineParts = text.split(/\$/);
  if (inlineParts.length > 1) {
    return (
      <span className="font-sans">
        {inlineParts.map((part, index) => {
          if (index % 2 === 1) {
            return (
              <span key={index} className="inline-block bg-indigo-50/50 border border-indigo-100/30 rounded px-1 py-0.5 text-indigo-950 font-semibold mx-0.5 font-sans leading-none align-middle">
                {renderFormulaSubtree(part)}
              </span>
            );
          } else {
            return <span key={index}>{parseMarkdownBold(formatChemicalFormula(part))}</span>;
          }
        })}
      </span>
    );
  }
  return parseMarkdownBold(formatChemicalFormula(text));
}

function parseMathText(text: string): React.ReactNode {
  if (!text) return "";

  const displayParts = text.split(/\$\$/);
  if (displayParts.length > 1) {
    return (
      <span className="flex flex-wrap items-center gap-1.5 my-2 justify-center py-2 px-4 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl shadow-sm max-w-max mx-auto animate-fadeIn">
        {displayParts.map((part, index) => {
          if (index % 2 === 1) {
            if (part.includes("=")) {
              const [left, right] = part.split("=");
              return (
                <span key={index} className="inline-flex items-center gap-1.5 font-sans leading-none">
                  {renderFormulaSubtree(left)}
                  <span className="text-indigo-600 font-extrabold font-mono text-sm select-none mx-0.5">=</span>
                  {renderFormulaSubtree(right)}
                </span>
              );
            }
            return <React.Fragment key={index}>{renderFormulaSubtree(part)}</React.Fragment>;
          } else {
            return <React.Fragment key={index}>{parseMathTextInline(part)}</React.Fragment>;
          }
        })}
      </span>
    );
  }

  return parseMathTextInline(text);
}

function parseCellContent(text: string): React.ReactNode {
  if (!text) return "";

  const lines = text.split(/<br\s*\/?>/i);
  if (lines.length > 1) {
    return (
      <div className="flex flex-col gap-2 py-0.5">
        {lines.map((line, idx) => (
          <div key={idx} className="leading-normal">
            {parseCellContent(line)}
          </div>
        ))}
      </div>
    );
  }

  if (text.includes("<li>")) {
    const matches: string[] = [];
    const liRegex = /<li>(.*?)<\/li>/g;
    let match;
    while ((match = liRegex.exec(text)) !== null) {
      matches.push(match[1]);
    }

    if (matches.length > 0) {
      return (
        <ul className="flex flex-col gap-1.5 list-none my-1 pl-1">
          {matches.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-650 leading-relaxed">
              <span className="w-1.5 h-1.5 bg-indigo-505 bg-indigo-500 rounded-full mt-1.5 shrink-0" />
              <div className="flex-1 font-sans">{parseMathText(item)}</div>
            </li>
          ))}
        </ul>
      );
    }
  }

  return parseMathText(text);
}

function parseMarkdownTheory(markdown: string): ParsedElement[] {
  const lines = markdown.split("\n");
  const elements: ParsedElement[] = [];
  
  let currentTableRows: string[][] = [];
  let currentTableHeader: string[] = [];
  let inTable = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith("|")) {
      if (line.includes("---")) {
        inTable = true;
        continue;
      }
      
      const cells = line
        .split("|")
        .map(c => c.trim())
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        
      if (!inTable) {
        currentTableHeader = cells;
        inTable = true;
      } else {
        currentTableRows.push(cells);
      }
      continue;
    } else {
      if (inTable && currentTableHeader.length > 0) {
        elements.push({
          type: "table",
          tableHeader: currentTableHeader,
          tableRows: currentTableRows
        });
        currentTableHeader = [];
        currentTableRows = [];
        inTable = false;
      }
    }
    
    if (!line) continue;
    
    if (line.startsWith("###")) {
      elements.push({
        type: "heading",
        content: line.replace("###", "").trim()
      });
      continue;
    }
    
    if (line.startsWith("*") || line.startsWith("-")) {
      const cleanItem = line.substring(1).trim();
      if (elements.length > 0 && elements[elements.length - 1].type === "list") {
        elements[elements.length - 1].items?.push(cleanItem);
      } else {
        elements.push({
          type: "list",
          items: [cleanItem]
        });
      }
      continue;
    }
    
    elements.push({
      type: "paragraph",
      content: line
    });
  }
  
  if (inTable && currentTableHeader.length > 0) {
    elements.push({
      type: "table",
      tableHeader: currentTableHeader,
      tableRows: currentTableRows
    });
  }
  
  return elements;
}

export default function TheoryCard({ onStartQuiz }: TheoryCardProps) {
  const [activePart, setActivePart] = useState<QuestionPart>(QuestionPart.PART1);
  const selectedResource = THEORY_RESOURCES[activePart];

  const partIcons: Record<QuestionPart, any> = {
    [QuestionPart.PART1]: Layers,
    [QuestionPart.PART2]: Award,
    [QuestionPart.PART3]: BookOpen,
    [QuestionPart.PART4]: CheckCircle2,
  };

  const IconComponent = partIcons[activePart];

  const renderParsedTheory = (content: string) => {
    const elements = parseMarkdownTheory(content);
    return elements.map((el, idx) => {
      switch (el.type) {
        case "heading":
          return (
            <h3 key={idx} className="text-lg font-bold text-slate-900 mt-6 mb-3 flex items-center gap-2 font-display">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block shrink-0"></span>
              {parseMathText(el.content || "")}
            </h3>
          );
        case "paragraph":
          return (
            <p key={idx} className="text-sm text-slate-600 leading-relaxed mb-3">
              {parseMathText(el.content || "")}
            </p>
          );
        case "list":
          return (
            <ul key={idx} className="flex flex-col gap-2 my-3 pl-1">
              {el.items?.map((item, lIdx) => {
                const isExample = item.toLowerCase().includes("ví dụ:") || item.toLowerCase().includes("ví dụ");
                return (
                  <li 
                    key={lIdx} 
                    className={`ml-1 pl-4 relative text-sm text-slate-650 leading-relaxed ${
                      isExample ? "bg-amber-50 border border-amber-200/50 p-3 rounded-xl italic text-amber-950 font-sans my-1 shadow-xs" : ""
                    }`}
                  >
                    {!isExample && <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />}
                    {parseMathText(item)}
                  </li>
                );
              })}
            </ul>
          );
        case "table":
          return (
            <div key={idx} className="overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm bg-slate-50/10">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {el.tableHeader?.map((header, hIdx) => (
                      <th 
                        key={hIdx} 
                        className="px-4 py-3.5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider font-sans border-b border-slate-200"
                      >
                        {parseCellContent(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {el.tableRows?.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-indigo-50/10 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-4 text-slate-650 leading-relaxed text-xs border-r border-slate-50 last:border-r-0">
                          {parseCellContent(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar navigation */}
      <div className="lg:col-span-1 flex flex-col gap-2">
        <h4 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-3 px-3">Nội dung học tập</h4>
        {(Object.keys(THEORY_RESOURCES) as unknown as QuestionPart[]).map((partKey) => {
          const partNum = Number(partKey) as QuestionPart;
          const isSelected = activePart === partNum;
          const PartIcon = partIcons[partNum];
          
          return (
            <button
              key={partNum}
              onClick={() => setActivePart(partNum)}
              id={`tab-part-${partNum}`}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                isSelected 
                  ? "bg-indigo-50 text-indigo-950 font-bold shadow-sm border border-indigo-200 border-l-4 border-l-indigo-600" 
                  : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-950 border border-slate-200"
              }`}
            >
              <PartIcon className={`w-5 h-5 shrink-0 ${isSelected ? "text-indigo-600" : "text-slate-400"}`} />
              <div>
                <div className="text-xs text-slate-400 font-mono">PHẦN {partNum}</div>
                <div className="text-sm line-clamp-1 font-sans">
                  {partNum === 1 && "Tính số oxi hóa"}
                  {partNum === 2 && "Cân bằng electron"}
                  {partNum === 3 && "Tính số mol cơ bản"}
                  {partNum === 4 && "Bài toán tổng hợp"}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto shrink-0 opacity-50 text-slate-400" />
            </button>
          );
        })}

        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-905 text-white p-4 rounded-xl border border-indigo-805/30 shadow-sm mt-4">
          <h5 className="font-semibold text-sm mb-1 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-indigo-300" /> Ôn luyện hiệu quả
          </h5>
          <p className="text-xs text-indigo-200/90 leading-relaxed font-sans">
            Xem lý thuyết tóm tắt nhanh của từng phần trước khi bắt đầu giải các câu hỏi thử thách!
          </p>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="lg:col-span-3 flex flex-col bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        {/* Banner header */}
        <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200">
                PHẦN {activePart}
              </span>
              <h3 className="text-base font-bold text-slate-950 mt-1.5 font-display">{selectedResource.title}</h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">{selectedResource.summary}</p>
            </div>
          </div>
          
          <button
            onClick={() => onStartQuiz(activePart)}
            id={`btn-quiz-start-${activePart}`}
            className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-500 transition-all shadow-md shadow-indigo-500/10 shrink-0 uppercase tracking-widest"
          >
            Luyện tập Ngay
          </button>
        </div>

        {/* Theory notes container */}
        <div className="p-6 overflow-y-auto max-h-[500px]">
          <div className="prose max-w-none text-gray-700">
            {renderParsedTheory(selectedResource.content)}
          </div>
        </div>

        {/* Action bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Công thức chuẩn mới: đkc (25°C, 1 bar) là 24,79 L/mol.</span>
          <span className="font-mono">Đáp án có giải thích chi tiết</span>
        </div>
      </div>
    </div>
  );
}
