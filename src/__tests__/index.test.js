const sharedModule = require('../index');

describe('Shared Module Exports', () => {
  test('should export all required modules', () => {
    expect(sharedModule).toHaveProperty('logger');
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
    expect(sharedModule.logger).toBeDefined();
    // Assuming Logger is a class or function
    expect(typeof sharedModule.logger).toBe('function');
  });

  test('should export errors object', () => {
    expect(sharedModule.errors).toBeDefined();
    expect(typeof sharedModule.errors).toBe('object');
  });
});
