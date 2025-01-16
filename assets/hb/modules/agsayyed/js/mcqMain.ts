import { MCQController } from './mcq/MCQController';
import log from './utils/logger';  // Import the logger

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.mcq-card')) {
    log.separator('initialiase.ts: Initializing MCQ Controller');  // Use separator method
    const totalQuestions = document.querySelectorAll('.mcq-card').length;
    new MCQController(totalQuestions);  // Initialize MCQController without using an identifier
  }
});