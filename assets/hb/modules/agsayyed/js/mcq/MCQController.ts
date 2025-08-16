import { MCQConfig } from '../config/mcq.config';
import log from '../utils/mcqlogger';  // Import the logger
import { FeedbackManager } from '../components/FeedbackManager';
import { UIManager } from '../managers/UIManager';
import { MCQState } from '../types/mcq.types';  // Add this import
import { MCQStateManager } from './MCQState';
import { MCQHelper } from './MCQHelper';  // Import the helper class
import { SoundManager } from './SoundManager';  // Import the SoundManager

export class MCQController {
  private stateManager: MCQStateManager;
  private feedbackManager: FeedbackManager;
  private uiManager: UIManager;
  private helper: MCQHelper;  // Add helper instance
  private soundManager: SoundManager;  // Add sound manager instance

  constructor(totalQuestions: number) {
    log.debug('MCQController: Initializing');  // Use separator method
    this.soundManager = new SoundManager();  // Initialize sound manager
    this.stateManager = new MCQStateManager(totalQuestions);
    this.feedbackManager = new FeedbackManager();
    this.uiManager = new UIManager();
    this.helper = new MCQHelper(this.stateManager);  // Initialize helper
    this.setupEventListeners();
    this.initializeUI();

    // Subscribe to state changes
    this.stateManager.subscribe((state) => {
      this.updateUI(state);  // Update UI when state changes
    });
  }

  private getTotalQuestions(): number {
    const cards = document.querySelectorAll('.mcq-card');
    return cards.length;
  }

  private initializeUI() {
    log.debug('Controller: Initializing UI');
    this.hideAllCards();
    this.showFirstCard();
  }

  private updateQuestionNumber(index: number) {
    const cards = document.querySelectorAll('.mcq-card');
    const currentCard = cards[index] as HTMLElement;
    const questionNumber = currentCard.querySelector('.question-number');
    if (questionNumber) {
      questionNumber.textContent = `Question ${index + 1}: `;
    }
  }

  private showFirstCard() {
    const cards = document.querySelectorAll('.mcq-card');
    if (cards.length > 0) {
      (cards[0] as HTMLElement).style.display = 'block';
    }
  }

  private checkAnswer(element: HTMLElement): boolean {
    log.debug('Controller: Checking answer');
    // Remove previous selection styling
    const siblings = element.parentElement!.children;
    Array.from(siblings).forEach(sibling => {
      sibling.classList.remove('active', 'correct', 'incorrect');
    });

    // Add active class to selected element
    element.classList.add('active');

    // Get correct answer from data attribute
    const card = element.closest('.mcq-card');
    const correctAnswer = card?.getAttribute('data-answer');
    const isCorrect = element.innerText.trim() === correctAnswer?.trim();
    log.debug(`Controller: Answer is ${isCorrect ? 'correct' : 'incorrect'}`);

    // Add appropriate styling
    element.classList.add(isCorrect ? 'correct' : 'incorrect');

    // Update state
    this.stateManager.updateAnswer({
      question: card?.querySelector('.card-title')?.textContent || '',
      userAnswer: element.innerText.trim(),
      correctAnswer: correctAnswer || '',
      isCorrect,
      feedback: card?.getAttribute('data-feedback') || ''
    });

    return isCorrect;
  }

  private handleAnswer(element: HTMLElement) {
    this.soundManager.playClickSound(); // Play the click sound using SoundManager
    const isCorrect = this.checkAnswer(element);
    const feedback = element.closest('.mcq-card')?.getAttribute('data-feedback');

    if (MCQConfig.showInstantFeedback) {
      this.feedbackManager.showFeedback(isCorrect, feedback ?? undefined);
    }

    // Enable next button after answering
    const nextButton = document.getElementById('next-button');
    if (nextButton) {
      nextButton.removeAttribute('disabled');
    }
  }

  private setupEventListeners() {
    // Remove onclick from HTML and handle here only 
    const nextButton = document.getElementById('next-button');
    if (nextButton) {
      // Remove any existing listeners first
      nextButton.replaceWith(nextButton.cloneNode(true));
      const newNextButton = document.getElementById('next-button');
      newNextButton?.addEventListener('click', () => this.handleNextQuestion());
    }

    // Handle start over button clicks
    const startOverButton = document.getElementById('start-over-button');
    if (startOverButton) {
      startOverButton.replaceWith(startOverButton.cloneNode(true));
      const newStartOverButton = document.getElementById('start-over-button');
      newStartOverButton?.addEventListener('click', () => this.handleStartOver());
    }

    // Handle option selection
    const options = document.querySelectorAll('.list-group-item');
    options.forEach(option => {
      // Remove onclick attribute
      option.removeAttribute('onclick');
      option.addEventListener('click', (e) => {
        const element = e.currentTarget as HTMLElement;
        this.handleAnswer(element);
      });
    });
  }

  private handleNextQuestion() {
    log.debug('Controller: Handling next question');
    const currentIndex = this.stateManager.getCurrentQuestion();
    log.debug(`Controller: Current index: ${currentIndex}`);

    // Check if we're at the last question
    if (currentIndex >= this.getTotalQuestions()) {
      log.debug('Controller: Quiz complete');
      this.hideAllCards();
      this.handleQuizComplete();
      return;
    }

    // Move to next question in state
    if (this.stateManager.moveToNextQuestion()) {
      const nextIndex = this.stateManager.getCurrentQuestion();
      log.debug(`Controller: Moving to next card: ${nextIndex}`);
      this.showCard(nextIndex - 1); // Adjust for 0-based array index
    }
  }

  private handleQuizComplete() {
    log.debug('Controller: Quiz completed');
    const startOverButton = document.getElementById('start-over-button');
    const nextButton = document.getElementById('next-button');
    if (startOverButton) startOverButton.style.display = 'block';
    if (nextButton) nextButton.style.display = 'none';

    // First show the completion card in the card area
    this.helper.showCompletionCard();
    // Then show detailed summary below
    this.helper.showDetailedSummary();
  }

  private handleStartOver() {
    // Clear all cards and reset state
    this.hideAllCards();
    this.stateManager.reset();

    // Reset UI elements
    const startOverButton = document.getElementById('start-over-button');
    const nextButton = document.getElementById('next-button');
    const summaryContainer = document.getElementById('summary-container');

    if (startOverButton) startOverButton.style.display = 'none';
    if (nextButton) nextButton.style.display = 'block';
    if (summaryContainer) summaryContainer.innerHTML = '';

    // Remove completion card
    const completionCard = document.querySelector('.completion-card');
    if (completionCard) {
      completionCard.remove();
    }

    // Reset all list-group-item elements
    const options = document.querySelectorAll('.list-group-item');
    options.forEach(option => {
      option.classList.remove('active', 'correct', 'incorrect');
    });

    // Show first question
    this.showCard(0);
  }

  private updateUI(state: MCQState) {
    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const progress = (state.currentQuestion / state.totalQuestions) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Update score with "Attempted Questions" label
    const score = document.getElementById('score');
    if (score) {
      score.textContent = `Attempted Questions: ${state.currentQuestion} / ${state.totalQuestions}`;
    }
  }

  private hideAllCards() {
    const cards = document.querySelectorAll('.mcq-card');
    cards.forEach(card => (card as HTMLElement).style.display = 'none');
  }

  private showCard(index: number) {
    log.debug(`Controller: Showing card at index: ${index}`);
    this.hideAllCards();
    const cards = document.querySelectorAll('.mcq-card');
    if (cards[index]) {
      (cards[index] as HTMLElement).style.display = 'block';
      this.updateQuestionNumber(index);
    }
  }
}


