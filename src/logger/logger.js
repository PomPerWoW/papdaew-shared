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

  error(error, message = 'An error occurred') {
    if (error instanceof Error) {
      this.logger.error({ err: error }, message);
    } else if (typeof error === 'object') {
      this.logger.error(error, message);
    } else if (typeof error === 'string' && !message) {
      this.logger.error(message);
    } else {
      this.logger.error({ err: { value: error } }, message);
    }
  }

  warn(message, data = {}) {
    this.logger.warn(data, message);
  }

  debug(message, data = {}) {
    this.logger.debug(data, message);
  }
}

module.exports = { PinoLogger };
