import { MCQController } from './mcq/MCQController';
import log from './utils/mcqlogger';  // Import the logger

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('mcqMain.ts: DOMContentLoaded event fired');

  // Set environment
  const environment = (document.querySelector('meta[name="environment"]')?.getAttribute('content') || 'development') as 'development' | 'production' | 'testing' | undefined;
  if (!environment) {
    console.warn('Environment meta tag not found, defaulting to development');
  } else {
    console.log(`mcqMain.ts: Environment set to ${environment}`);
  }
  window.HUGO_ENVIRONMENT = environment;
  console.log(`mcqMain.ts: window.HUGO_ENVIRONMENT set to ${window.HUGO_ENVIRONMENT}`);

  // Initialize MCQ Controller if .mcq-card elements are present
  if (document.querySelector('.mcq-card')) {
    log.separator('mcqMain.ts: Initializing MCQ Controller');  // Use separator method
    const totalQuestions = document.querySelectorAll('.mcq-card').length;
    new MCQController(totalQuestions);  // Initialize MCQController without using an identifier
  }
});