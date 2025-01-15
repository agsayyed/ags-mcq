import { MCQConfig } from '../config/mcq.config';

export class FeedbackManager {
  private feedbackElement: HTMLElement;

  constructor() {
    this.feedbackElement = document.createElement('div');
    this.feedbackElement.className = 'feedback-overlay';
    document.body.appendChild(this.feedbackElement);
  }

  public showFeedback(isCorrect: boolean, feedback?: string) {
    if (!MCQConfig.showInstantFeedback) return;

    this.feedbackElement.innerHTML = `
      <div class="feedback-content ${isCorrect ? 'correct' : 'incorrect'}">
        <div class="feedback-icon">${isCorrect ? '✓' : '✗'}</div>
        <div class="feedback-text">
          ${isCorrect ? 'Correct!' : 'Incorrect'}
          ${feedback ? `<p>${feedback}</p>` : ''}
        </div>
      </div>
    `;

    this.feedbackElement.style.display = 'flex';
    setTimeout(() => {
      this.feedbackElement.style.display = 'none';
    }, MCQConfig.feedbackDuration);
  }
}