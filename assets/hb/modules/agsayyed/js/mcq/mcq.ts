// // file mcq.ts
// console.log('Custom script loaded from mcq.ts');

// //--------------------------
// class MCQ {
//   private currentQuestion: number = 0;
//   private totalQuestions: number = 0;
//   private correctAnswers: number = 0;
//   private mcqCards: NodeListOf<Element>;

//   constructor() {
//     this.mcqCards = document.querySelectorAll('.mcq-card');
//     this.totalQuestions = this.mcqCards.length;
//     document.addEventListener('DOMContentLoaded', () => this.init());
//   }

//   private init() {
//     if (this.totalQuestions > 0) {
//       (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'block';
//       this.updateProgressBar();
//     }
//   }

//   public selectOption(element: HTMLElement) {
//     const siblings = element.parentElement!.children;
//     for (let i = 0; i < siblings.length; i++) {
//       siblings[i].classList.remove('active', 'correct', 'incorrect');
//     }
//     element.classList.add('active');

//     const card = element.closest('.mcq-card') as HTMLElement;
//     const correctAnswer = card.getAttribute('data-answer');
//     const isCorrect = element.innerText.trim() === correctAnswer?.trim();

//     // Only increment if this option hasn't been selected before
//     if (isCorrect && !card.classList.contains('answered')) {
//       this.correctAnswers++;
//       card.classList.add('answered');
//     }

//     element.classList.add(isCorrect ? 'correct' : 'incorrect');
//     this.updateScore();
//   }

//   public nextQuestion() {
//     (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'none';
//     this.currentQuestion++;
//     if (this.currentQuestion < this.totalQuestions) {
//       (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'block';
//       this.updateProgressBar();
//     } else {
//       this.resetQuestions();
//     }
//   }

//   private updateProgressBar() {
//     const progress = (this.currentQuestion / this.totalQuestions) * 100;
//     const progressBar = document.getElementById('progress-bar')!;
//     progressBar.style.width = progress + '%';
//     progressBar.setAttribute('aria-valuenow', progress.toString());
//   }

//   private updateScore() {
//     const scoreElement = document.getElementById('score')!;
//     scoreElement.innerText = `Correct Answers: ${this.correctAnswers} / ${this.totalQuestions}`;
//   }

//   private resetQuestions() {
//     this.currentQuestion = 0;
//     this.correctAnswers = 0;
//     this.mcqCards.forEach((card) => {
//       (card as HTMLElement).style.display = 'none';
//     });
//     if (this.totalQuestions > 0) {
//       (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'block';
//       (document.getElementById('next-button') as HTMLElement).style.display = 'block';
//       this.updateProgressBar();
//       this.updateScore();
//     }
//   }
// }

// // Initialize the MCQ class
// const mcq = new MCQ();

// // Expose methods to global scope for HTML event handlers
// (window as any).selectOption = (element: HTMLElement) => mcq.selectOption(element);
// (window as any).nextQuestion = () => mcq.nextQuestion();

// console.log('MCQ script loaded from mcq.ts');

class MCQ {
  private currentQuestion: number = 0;
  private totalQuestions: number = 0;
  private correctAnswers: number = 0;
  private mcqCards: NodeListOf<Element>;

  constructor() {
    this.mcqCards = document.querySelectorAll('.mcq-card');
    this.totalQuestions = this.mcqCards.length;
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  private init() {
    if (this.totalQuestions > 0) {
      (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'block';
      this.updateProgressBar();
    }
  }

  public selectOption(element: HTMLElement) {
    const siblings = element.parentElement!.children;
    for (let i = 0; i < siblings.length; i++) {
      siblings[i].classList.remove('active', 'correct', 'incorrect');
    }
    element.classList.add('active');

    const correctAnswer = element.parentElement!.parentElement!.parentElement!.getAttribute('data-answer');
    if (element.innerText.trim() === correctAnswer!.trim()) {
      element.classList.add('correct');
      this.correctAnswers++;
    } else {
      element.classList.add('incorrect');
    }
    this.updateScore();
  }

  public nextQuestion() {
    (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'none';
    this.currentQuestion++;
    if (this.currentQuestion < this.totalQuestions) {
      (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'block';
      this.updateProgressBar();
    } else {
      this.resetQuestions();
    }
  }

  private updateProgressBar() {
    const progress = (this.currentQuestion / this.totalQuestions) * 100;
    const progressBar = document.getElementById('progress-bar')!;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress.toString());
  }

  private updateScore() {
    const scoreElement = document.getElementById('score')!;
    scoreElement.innerText = 'Correct Answers: ' + this.correctAnswers + ' / ' + this.totalQuestions;
  }

  private resetQuestions() {
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.mcqCards.forEach((card) => {
      (card as HTMLElement).style.display = 'none';
    });
    if (this.totalQuestions > 0) {
      (this.mcqCards[this.currentQuestion] as HTMLElement).style.display = 'block';
      (document.getElementById('next-button') as HTMLElement).style.display = 'block';
      this.updateProgressBar();
      this.updateScore();
    }
  }
}

// Initialize the MCQ class
const mcq = new MCQ();

// Expose methods to global scope for HTML event handlers
(window as any).selectOption = (element: HTMLElement) => mcq.selectOption(element);
(window as any).nextQuestion = () => mcq.nextQuestion();

console.log('MCQ script loaded');