const Logger = require('./logger/logger');
const errors = require('./errors/errors');
const requestId = require('./middleware/requestId');
const asyncHandler = require('./utils/asyncHandler');

module.exports = {
  Logger,
  ...errors,
  middleware: {
    requestId,
  },
  utils: {
    asyncHandler,
  },
  errors,
};
