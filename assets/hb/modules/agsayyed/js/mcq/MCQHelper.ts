import { MCQStateManager } from './MCQState';
import log from '../utils/mcqlogger';  // Import the logger

export class MCQHelper {
  private stateManager: MCQStateManager;

  constructor(stateManager: MCQStateManager) {
    this.stateManager = stateManager;
  }

  showCompletionCard() {
    log.debug('MCQHelper: Showing completion card');
    const container = document.getElementById('mcq-container');
    if (container) {
      const totalQuestions = this.stateManager.getState().totalQuestions;
      const correctAnswers = this.stateManager.getState().correctAnswers;
      const percentageCorrect = (correctAnswers / totalQuestions) * 100;

      let completionCard = container.querySelector('.completion-card') as HTMLElement;
      if (!completionCard) {
        completionCard = document.createElement('div');
        completionCard.className = 'card mcq-card completion-card';
      }

      completionCard.innerHTML = `
          <div class="card-body">
              <h5 class="card-title mb-4">Quiz Complete! 🎉</h5>
              <div class="alert ${percentageCorrect >= 70 ? 'alert-success' : 'alert-info'}">
                  <h4 class="alert-heading mb-3">Your Results</h4>
                  <p class="mb-2">You got ${correctAnswers} out of ${totalQuestions} questions correct.</p>
                  <p class="mb-0">Final Score: ${percentageCorrect.toFixed(1)}%</p>
              </div>
              <hr>
              <p class="text-muted mt-3">
                  Click "Start Over" to try again, or scroll down to review your answers.
              </p>
          </div>
      `;

      this.hideAllCards();
      container.insertBefore(completionCard, container.firstChild);
      completionCard.style.display = 'block';
    }
  }

  showDetailedSummary() {
    log.debug('MCQHelper: Showing detailed summary');
    const summaryContainer = document.getElementById('summary-container');
    if (summaryContainer) {
      const answers = this.stateManager.getState().answers;
      const detailedSummary = answers.map((answer, index) => `
          <div class="card mb-2">
              <div class="card-body">
                  <h6>Question ${index + 1}</h6>
                  <p>${answer.question}</p>
                  <p class="text-${answer.isCorrect ? 'success' : 'danger'}">
                      Your answer: ${answer.userAnswer}<br>
                      Correct answer: ${answer.correctAnswer}
                  </p>
                  ${answer.feedback ? `<p class="text-muted">${answer.feedback}</p>` : ''}
              </div>
          </div>
      `).join('');

      summaryContainer.innerHTML = detailedSummary;
    }
  }

  private hideAllCards() {
    const cards = document.querySelectorAll('.mcq-card');
    cards.forEach(card => (card as HTMLElement).style.display = 'none');
  }
}
