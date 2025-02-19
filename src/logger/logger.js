const pino = require('pino');

class PinoLogger {
  constructor(options = {}) {
    const {
      name = 'app',
      level = process.env.LOG_LEVEL || 'info',
      serviceVersion = process.env.SERVICE_VERSION || '1.0.0',
      environment = process.env.NODE_ENV || 'development',
    } = options;

    if (environment === 'test') {
      this.logger = this.#createTestLogger();
      return;
    }

    this.logger = pino({
      name,
      level,
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

  error(message, error = null) {
    this.logger.error(
      {
        err: error || message,
        stack: error?.stack,
      },
      message
    );
  }

  warn(message, data = {}) {
    this.logger.warn(data, message);
  }

  debug(message, data = {}) {
    this.logger.debug(data, message);
  }
}

module.exports = { PinoLogger };
