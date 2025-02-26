const pino = require('pino');

class PinoLogger {
  static #instance;

  constructor(options = {}) {
    if (PinoLogger.#instance) {
      return PinoLogger.#instance;
    }

    const { name, level, serviceVersion, environment } = options;

    if (environment === 'test') {
      this.logger = this.#createTestLogger();
      return;
    }

    this.logger = pino({
      name,
      level: level || 'info',
      base: {
        env: environment,
        version: serviceVersion,
        service: name,
      },
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
      formatters: {
        level: label => ({ level: label }),
      },
      timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
      redact: ['password', 'token', 'authorization', 'cookie'],
    });

    PinoLogger.#instance = this;
  }

  #createTestLogger() {
    return {
      info: () => {},
      error: () => {},
      warn: () => {},
      debug: () => {},
      child: () => this.#createTestLogger(),
    };
  }

  child(bindings) {
    return this.logger.child(bindings);
  }

  info(message, data = {}) {
    this.logger.info(data, message);
  }

  error(messageOrError, errorOrMessage = null) {
    let message;
    let error;

    if (typeof messageOrError === 'string') {
      message = messageOrError;
      error = errorOrMessage;
    } else {
      error = messageOrError;
      message =
        typeof errorOrMessage === 'string'
          ? errorOrMessage
          : 'An error occurred';
    }

    const errorData = {};

    if (error) {
      if (error instanceof Error) {
        errorData.err = {
          name: error.name,
          message: error.message,
          stack: error.stack,
        };
      } else if (typeof error === 'object') {
        errorData.err = error;

        if (error.stack) {
          errorData.stack = error.stack;
        }
      } else {
        errorData.err = { message: String(error) };
      }
    } else {
      errorData.err = { message: 'Unknown error' };
    }

    this.logger.error(errorData, message);
  }

  warn(message, data = {}) {
    this.logger.warn(data, message);
  }

  debug(message, data = {}) {
    this.logger.debug(data, message);
  }
}

module.exports = { PinoLogger };
