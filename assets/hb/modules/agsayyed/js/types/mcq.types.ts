export interface MCQQuestion {
  question: string;
  options: string[];
  answer: string;
  weight?: number;
  show?: boolean;
  feedback?: string;  // Optional feedback for each question
}

export interface UserAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface MCQState {
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: UserAnswer[];
  isComplete: boolean;
}

export interface Logger {
  debug: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string, error?: any) => void;  // Add error method
  separator: (message: string) => void;
  setLevel: (level: 'debug' | 'warn') => void;
}

declare global {
  interface Window {
    HUGO_ENVIRONMENT?: 'development' | 'production' | 'testing';
  }
}