class MCQ {
  private currentQuestion: number = 0;
  private totalQuestions: number = 0;
  private correctAnswers: number = 0;
  private mcqCards: Element[];
  private originalOrder: Element[];
  private userAnswers: { question: string, userAnswer: string, correctAnswer: string }[] = [];

  constructor() {
    this.mcqCards = Array.from(document.querySelectorAll('.mcq-card'));
    this.originalOrder = [...this.mcqCards];
    this.totalQuestions = this.mcqCards.length;
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  private updateQuestionNumber() {
    const currentCard = this.mcqCards[this.currentQuestion] as HTMLElement;
    const numberSpan = currentCard.querySelector('.question-number');
    if (numberSpan) {
      numberSpan.textContent = `Question ${this.currentQuestion + 1}:`;
    }
  }

  private init() {
    if (this.totalQuestions > 0) {
      (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'block';
      this.updateQuestionNumber();
      this.updateProgressBar();
    }
  }

  public selectOption(element: HTMLElement) {
    const siblings = element.parentElement!.children;
    for (let i = 0; i < siblings.length; i++) {
      siblings[i].classList.remove('active');
    }
    element.classList.add('active');

    // Still track correct answers internally but don't show indicators
    const correctAnswer = element.parentElement!.parentElement!.parentElement!.getAttribute('data-answer');
    if (element.innerText.trim() === correctAnswer!.trim()) {
      this.correctAnswers++;
    }
    this.userAnswers[this.currentQuestion] = {
      question: element.closest('.card')?.querySelector('.card-title')?.textContent || '',
      userAnswer: element.innerText.trim(),
      correctAnswer: correctAnswer!.trim()
    };
    this.updateScore();
  }

  public nextQuestion() {
    if (this.currentQuestion === this.totalQuestions - 1) {
      // Last question - show Start Over button
      (document.getElementById('start-over-button') as HTMLElement).style.display = 'block';
      (document.getElementById('next-button') as HTMLElement).style.display = 'none';
      this.updateProgressBar();
      this.showSummary();
      return;
    }

    (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'none';
    this.currentQuestion++;
    (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'block';
    this.updateQuestionNumber();
    this.updateProgressBar();
    this.updateScore();
  }

  public startOver() {
    this.shuffleQuestions();
    this.currentQuestion = 0;
    this.correctAnswers = 0;

    this.mcqCards.forEach((card) => {
      (card as HTMLElement).style.display = 'none';
    });

    if (this.totalQuestions > 0) {
      (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'block';
      this.updateQuestionNumber();
      (document.getElementById('next-button') as HTMLElement).style.display = 'block';
      (document.getElementById('start-over-button') as HTMLElement).style.display = 'none';
      this.updateProgressBar();
      this.updateScore();
    }
    this.updateScore(); // Make sure score is reset properly
    const summaryContainer = document.getElementById('summary-container');
    if (summaryContainer) {
      summaryContainer.innerHTML = '';
    }
    this.userAnswers = [];
  }

  private shuffleQuestions() {
    for (let i = this.mcqCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.mcqCards[i], this.mcqCards[j]] = [this.mcqCards[j], this.mcqCards[i]];
    }
  }

  private resetQuestions() {
    this.mcqCards = [...this.originalOrder];
    this.startOver();
  }

  private updateProgressBar() {
    // Calculate progress for current question (add 1 to include current question)
    const progress = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
    const progressBar = document.getElementById('progress-bar')!;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress.toString());
  }

  private updateScore() {
    const scoreElement = document.getElementById('score')!;
    // Add 1 to currentQuestion to show correct question number
    scoreElement.innerText = `Questions Attempted: ${this.currentQuestion + 1} / ${this.totalQuestions}`;
  }

  private showSummary() {
    const summaryContainer = document.getElementById('summary-container');
    if (!summaryContainer) return;

    const summaryHTML = `
      <div class="summary-container">
        <h4 class="mb-3">Quiz Summary</h4>
        <p>Score: ${this.correctAnswers} out of ${this.totalQuestions} correct</p>
        <div class="answers-review">
          ${this.userAnswers.map((answer, index) => `
            <div class="answer-item">
              <p><strong>${answer.question}</strong></p>
              <p>Your answer: ${answer.userAnswer}</p>
              ${answer.userAnswer !== answer.correctAnswer ?
        `<p class="text-danger">Correct answer: ${answer.correctAnswer}</p>` :
        '<p class="text-success">✓ Correct!</p>'}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    summaryContainer.innerHTML = summaryHTML;
  }
}

// Initialize only if not already initialized
if (!(window as any).mcqInitialized) {
  const mcq = new MCQ();
  (window as any).selectOption = (element: HTMLElement) => mcq.selectOption(element);
  (window as any).nextQuestion = () => mcq.nextQuestion();
  (window as any).startOver = () => mcq.startOver();
  (window as any).mcqInitialized = true;
}

console.log('MCQ script loaded');