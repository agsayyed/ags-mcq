export class UIManager {
  private container: HTMLElement | null;

  constructor() {
    this.container = document.getElementById('mcq-container');
    this.hideAllCards();
    this.initializeEventHandlers();
  }

  private hideAllCards() {
    const cards = document.querySelectorAll('.mcq-card');
    cards.forEach(card => (card as HTMLElement).style.display = 'none');
  }

  private initializeEventHandlers() {
    // Remove inline onclick handlers from HTML
    document.querySelectorAll('.list-group-item').forEach(item => {
      item.removeAttribute('onclick');
    });
  }

  public showCard(index: number) {
    this.hideAllCards();
    const cards = document.querySelectorAll('.mcq-card');
    if (cards[index]) {
      (cards[index] as HTMLElement).style.display = 'block';
    }
  }

  public updateProgress(current: number, total: number) {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const progress = (current / total) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }

  public updateScore(score: string) {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
      scoreElement.textContent = score;
    }
  }

  public handleOptionSelection(element: HTMLElement, isCorrect: boolean) {
    const siblings = element.parentElement!.children;
    Array.from(siblings).forEach(sibling => {
      sibling.classList.remove('active', 'correct', 'incorrect');
    });
    element.classList.add('active', isCorrect ? 'correct' : 'incorrect');
  }
}