import { Logger } from '../types/mcq.types';

class ExtendedLogger implements Logger {
  debug(message: string): void {
    if (window.HUGO_ENVIRONMENT !== 'production' && window.HUGO_ENVIRONMENT !== 'testing') {
      console.debug(message);
    }
  }

  warn(message: string): void {
    if (window.HUGO_ENVIRONMENT !== 'testing') {
      console.warn(message);
    }
  }

  separator(message: string): void {
    if (window.HUGO_ENVIRONMENT !== 'production' && window.HUGO_ENVIRONMENT !== 'testing') {
      console.debug(`\n--- ${message} ---\n`);
    }
  }

  setLevel(level: 'debug' | 'warn'): void {
    if (level === 'warn' || window.HUGO_ENVIRONMENT === 'testing') {
      this.debug = () => { };
    } else {
      this.debug = (message: string) => {
        if (window.HUGO_ENVIRONMENT !== 'production' && window.HUGO_ENVIRONMENT !== 'testing') {
          console.debug(message);
        }
      };
    }
  }
}

const extendedLog = new ExtendedLogger();

// Set the logging level based on the environment
if (window.HUGO_ENVIRONMENT === 'development') {
  console.log('Running in development environment');
  extendedLog.setLevel('debug');
} else if (window.HUGO_ENVIRONMENT === 'production') {
  console.log('Running in production environment');
  extendedLog.setLevel('warn');
} else if (window.HUGO_ENVIRONMENT === 'testing') {
  console.log('Running in testing environment');
  extendedLog.setLevel('warn');
} else {
  console.log('Unknown environment');
}

export default extendedLog;