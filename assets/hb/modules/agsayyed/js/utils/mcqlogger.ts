import { Logger as ILogger } from '../types/mcq.types';

export class Logger implements ILogger {
  private environment: string;
  private level: 'debug' | 'warn';

  constructor(environment: string) {
    this.environment = environment;
    this.level = 'debug'; // Default log level
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

  separator(message: string) {
    console.log('--- ' + message + ' ---');
  }

  setLevel(level: 'debug' | 'warn') {
    this.level = level;
  }
}

console.log(`mcqlogger.ts: creating new Logger instance with ${window.HUGO_ENVIRONMENT}`);
const log = new Logger(window.HUGO_ENVIRONMENT || 'unknown');
export default log;
