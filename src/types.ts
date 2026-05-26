export enum QuestionPart {
  PART1 = 1, // Tính số oxi hóa
  PART2 = 2, // Cân bằng electron
  PART3 = 3, // Tính số mol
  PART4 = 4  // Bài toán tổng hợp
}

export interface Question {
  id: string;
  part: QuestionPart;
  category: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface IncorrectQuestionLog {
  questionId: string;
  userAnswerIndex: number;
  timestamp: string;
  reinforcementCategory: string; // Used to help customize reinforcement exercises
  originalQuestion: Question;
}

export interface GuidedStep {
  id: number;
  title: string;
  description: string;
  questionText: string;
  hint: string;
  validate: (input: string) => { isValid: boolean; errorMsg?: string };
  placeholder: string;
  correctAnswerText: string;
}

export interface GuidedProblem {
  id: string;
  title: string;
  fullStatement: string;
  steps: GuidedStep[];
}
