import { MCQQuestion } from '../types/mcq.types';

export class Question implements MCQQuestion {
  constructor(
    public question: string,
    public options: string[],
    public answer: string,
    public weight: number = 1,
    public show: boolean = true,
    public feedback?: string
  ) { }

  isCorrectAnswer(selectedOption: string): boolean {
    return selectedOption.trim() === this.answer.trim();
  }
}



