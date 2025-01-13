// console.log('Custom script loaded from mcq.ts');

// // Function to initialize MCQ elements
// function initializeMCQ(mcqElement: HTMLElement) {
//   const mcqId = mcqElement.id;
//   const checkButton = mcqElement.querySelector('.check-button') as HTMLButtonElement;
//   const nextButton = mcqElement.querySelector('.next-button') as HTMLButtonElement;
//   const resultElement = mcqElement.querySelector('.result') as HTMLElement;
//   const options = mcqElement.querySelectorAll('.option');

//   // Function to check the selected answer
//   function checkAnswer() {
//     const selectedOption = mcqElement.querySelector('.option.selected') as HTMLElement;
//     if (selectedOption) {
//       const isCorrect = selectedOption.classList.contains('correct');
//       resultElement.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
//       resultElement.style.color = isCorrect ? 'green' : 'red';
//       checkButton.style.display = 'none';
//       nextButton.style.display = 'block';
//     } else {
//       resultElement.textContent = 'Please select an option.';
//       resultElement.style.color = 'orange';
//     }
//   }

//   // Function to move to the next question
//   function nextQuestion() {
//     // Reset classes and text content
//     options.forEach((option) => {
//       option.classList.remove('selected');
//     });
//     resultElement.textContent = '';

//     // Hide next button and show check button
//     nextButton.style.display = 'none';
//     checkButton.style.display = 'block';

//     // Move to the next question or end
//     const nextMCQ = mcqElement.nextElementSibling as HTMLElement;
//     if (nextMCQ) {
//       mcqElement.style.display = 'none';
//       nextMCQ.style.display = 'block';
//     } else {
//       // Handle the end of MCQs, e.g., display a message or reload
//       const endMessage = document.createElement('p');
//       endMessage.textContent = 'All questions completed!';
//       mcqElement.parentElement?.appendChild(endMessage);
//     }
//   }

//   // Add event listeners to options
//   options.forEach((option) => {
//     option.addEventListener('click', () => {
//       // Remove 'selected' class from other options
//       options.forEach((otherOption) => {
//         otherOption.classList.remove('selected');
//       });
//       // Add 'selected' class to the clicked option
//       option.classList.add('selected');
//     });
//   });

//   // Add event listeners to buttons
//   checkButton.addEventListener('click', checkAnswer);
//   nextButton.addEventListener('click', nextQuestion);
// }

// // Initialize all MCQ elements
// document.addEventListener('DOMContentLoaded', () => {
//   const mcqElements = document.querySelectorAll('.mcq');
//   mcqElements.forEach((mcqElement) => {
//     initializeMCQ(mcqElement as HTMLElement);
//   });
// });

// console.log('MCQ script executed');

//--------------------------
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