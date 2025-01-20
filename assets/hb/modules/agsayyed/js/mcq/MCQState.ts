import { MCQState, UserAnswer } from '../types/mcq.types';
import log from '../utils/mcqlogger';  // Import the logger

export class MCQStateManager {
  private state: MCQState;
  // Array to hold all listener functions
  private listeners: ((state: MCQState) => void)[] = [];

  constructor(totalQuestions: number) {
    this.state = {
      currentQuestion: 1, // Start from 1 instead of 0
      totalQuestions,
      correctAnswers: 0,
      answers: [],
      isComplete: false
    };
  }

  // Allows components to register for state updates
  public subscribe(listener: (state: MCQState) => void) {
    this.listeners.push(listener);
    // Returns function to unsubscribe if needed
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notifies all listeners when state changes
  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  public updateAnswer(answer: UserAnswer) {
    log.debug('State: Updating answer for question at index :', this.state.currentQuestion);
    this.state.answers[this.state.currentQuestion] = answer;
    if (answer.isCorrect) {
      this.state.correctAnswers++;
    }
    // Don't increment currentQuestion here anymore
    this.notify();
  }

  public getCurrentQuestion(): number {
    return this.state.currentQuestion;
  }

  public moveToNextQuestion(): boolean {
    if (this.state.currentQuestion >= this.state.totalQuestions) {
      this.state.isComplete = true;
      this.notify();
      return false;
    }

    this.state.currentQuestion++;
    log.debug('State: Moved to question', this.state.currentQuestion);

    // Mark as complete if we've reached the last question
    if (this.state.currentQuestion === this.state.totalQuestions) {
      this.state.isComplete = true;
    }

    this.notify();
    return true;
  }

  public getCorrectAnswers(): number {
    return this.state.correctAnswers;
  }

  public getState(): MCQState {
    return this.state;  // Fix: remove duplicate return statement
  }

  public reset(): void {
    this.state = {
      currentQuestion: 0,  // Start from 0 for "Attempted Questions" label
      totalQuestions: this.state.totalQuestions,
      correctAnswers: 0,
      answers: [],
      isComplete: false
    };
    this.notify();
  }
}
