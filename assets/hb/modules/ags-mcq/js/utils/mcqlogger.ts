import { Logger as ILogger } from '../types/mcq.types';

export class Logger implements ILogger {
  private environment: string;
  private level: 'debug' | 'warn';

  constructor(environment: string) {
    this.environment = environment;
    this.level = 'debug';
  }

  debug(message: string) {
    if (this.environment === 'development' && this.level === 'debug') {
      console.debug(message);
    }
  }

  warn(message: string) {
    if (this.environment !== 'production') {
      console.warn(message);
    }
  }

  error(message: string, error?: unknown) {
    if (this.environment !== 'production') {
      console.error(message, error);
    }
  }

  separator(message: string) {
    if (this.environment === 'development') {
      console.log('--- ' + message + ' ---');
    }
  }

  setLevel(level: 'debug' | 'warn') {
    this.level = level;
  }
}

// Get environment from Hugo or default to production. If the embedder
// forgets to set window.HUGO_ENVIRONMENT we stay silent in prod and only
// log a hint when actively developing.
const environment: string = window.HUGO_ENVIRONMENT || 'production';
if (environment === 'development') {
  console.debug(
    `mcqlogger.ts: creating new Logger instance with environment "${environment}"`,
  );
}
const log = new Logger(environment);
export default log;
