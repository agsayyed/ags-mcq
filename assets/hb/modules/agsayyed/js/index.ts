import './types/mcq.types';
import './config/mcq.config';
import './components/FeedbackManager';
import './mcq/MCQState';
import { MCQController } from './mcq/MCQController';

declare global {
  interface Window {
    selectOption: (element: HTMLElement) => void;
    nextQuestion: () => void;
    startOver: () => void;
  }
}

// Remove the event listener from here as it's now in MCQController
console.log('MCQ Module loaded');
