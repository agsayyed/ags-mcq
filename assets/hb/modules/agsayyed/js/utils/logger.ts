import log from 'loglevel';

interface ExtendedLogger extends log.RootLogger {
  separator: (message: string) => void;
}

const extendedLog: ExtendedLogger = log as ExtendedLogger;

console.log('From looger.ts: Environment:', process.env.NODE_ENV);

// Add a method to log a separator line
extendedLog.separator = (message: string) => {
  log.debug(`\n--- ${message} ---\n`);
};

export default extendedLog;