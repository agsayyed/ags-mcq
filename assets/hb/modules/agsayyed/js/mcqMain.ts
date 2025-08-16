import { MCQController } from './mcq/MCQController';
import log from './utils/mcqlogger';  // Import the logger

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  log.debug('mcqMain.ts: DOMContentLoaded event fired');

  // Set environment only if window.HUGO_ENVIRONMENT is not already set


  // Initialize MCQ Controller if .mcq-card elements are present
  if (document.querySelector('.mcq-card')) {
    log.separator('mcqMain.ts: Initializing MCQ Controller');  // Use separator method
    const totalQuestions = document.querySelectorAll('.mcq-card').length;
    new MCQController(totalQuestions);  // Initialize MCQController without using an identifier
  }
});