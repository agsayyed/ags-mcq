import log from '../utils/mcqlogger';  // Import the logger

export class SoundManager {
  private clickSound: HTMLAudioElement;

  constructor() {
    this.clickSound = new Audio('/sounds/click.mp3');
    this.initializeSound();
  }

  private initializeSound() {
    try {
      this.clickSound.addEventListener('canplaythrough', () => {
        log.debug('SoundManager: Click sound loaded successfully');
      });
      this.clickSound.addEventListener('error', (e) => {
        log.warn('SoundManager: Error loading click sound', e);
      });
    } catch (error) {
      log.error('SoundManager: Failed to initialize sound', error);
    }
  }

  public playClickSound() {
    try {
      log.debug('SoundManager: Playing click sound');
      this.clickSound.play();
    } catch (error) {
      log.error('SoundManager: Failed to play click sound', error);
    }
  }

  public getClickSound(): HTMLAudioElement {
    return this.clickSound;
  }
}
