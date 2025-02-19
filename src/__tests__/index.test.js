const sharedModule = require('../index');
const { StatusCodes } = require('http-status-codes');

describe('Shared Module Exports', () => {
  describe('Error Classes', () => {
    test('should export NotFoundError', () => {
      const error = new sharedModule.NotFoundError('Test not found');
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('NotFoundError');
      expect(error.status).toBe(StatusCodes.NOT_FOUND);
      expect(error.message).toBe('Test not found');
      expect(error.timestamp).toBeDefined();
    });

    test('should export globalErrorHandler function', () => {
      expect(typeof sharedModule.globalErrorHandler).toBe('function');
    });
  });

  describe('Logger', () => {
    test('should export PinoLogger class', () => {
      expect(sharedModule.PinoLogger).toBeDefined();
      const logger = new sharedModule.PinoLogger({ name: 'test' });
      expect(logger).toBeInstanceOf(sharedModule.PinoLogger);
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.error).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.debug).toBe('function');
    });
  });

  describe('Middleware', () => {
    test('should export requestId middleware', () => {
      expect(typeof sharedModule.requestId).toBe('function');
    });

    test('requestId middleware should set request ID', () => {
      const req = { headers: {} };
      const res = { setHeader: jest.fn() };
      const next = jest.fn();

      sharedModule.requestId(req, res, next);

      expect(req.id).toBeDefined();
      expect(res.setHeader).toHaveBeenCalledWith('x-request-id', req.id);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('Utils', () => {
    test('should export asyncHandler utility', () => {
      expect(typeof sharedModule.asyncHandler).toBe('function');
    });

    test('asyncHandler should wrap async function', async () => {
      const mockHandler = jest.fn().mockResolvedValue('success');
      const wrappedHandler = sharedModule.asyncHandler(mockHandler);

      expect(typeof wrappedHandler).toBe('function');

      const req = {};
      const res = {};
      const next = jest.fn();

      await wrappedHandler(req, res, next);

      expect(mockHandler).toHaveBeenCalledWith(req, res, next);
      expect(next).not.toHaveBeenCalled();
    });

    test('asyncHandler should catch errors and pass to next', async () => {
      const error = new Error('Test error');
      const mockHandler = jest.fn().mockRejectedValue(error);
      const wrappedHandler = sharedModule.asyncHandler(mockHandler);

      const req = {};
      const res = {};
      const next = jest.fn();

      await wrappedHandler(req, res, next);

      expect(mockHandler).toHaveBeenCalledWith(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
