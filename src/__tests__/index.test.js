const sharedModule = require('../index');
const { StatusCodes } = require('http-status-codes');

describe('Shared Module Exports', () => {
  test('should export all required modules', () => {
    expect(sharedModule).toHaveProperty('Logger');
    expect(sharedModule).toHaveProperty('errors');
    expect(sharedModule).toHaveProperty('middleware');
    expect(sharedModule).toHaveProperty('utils');
  });

  test('should export middleware with requestId', () => {
    expect(sharedModule.middleware).toHaveProperty('requestId');
    expect(typeof sharedModule.middleware.requestId).toBe('function');
  });

  test('should export utils with asyncHandler', () => {
    expect(sharedModule.utils).toHaveProperty('asyncHandler');
    expect(typeof sharedModule.utils.asyncHandler).toBe('function');
  });

  test('should export logger as a function/class', () => {
    expect(sharedModule.Logger).toBeDefined();
    expect(typeof sharedModule.Logger).toBe('function');
  });

  test('should export errors object', () => {
    expect(sharedModule.errors).toBeDefined();
    expect(typeof sharedModule.errors).toBe('object');
  });

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
});
