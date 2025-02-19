const { StatusCodes } = require('http-status-codes');

const globalErrorHandler = (err, req, res, _next) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  const errorResponse = {
    status: 'error',
    statusCode: status,
    message,
    timestamp: err.timestamp || new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
  };

  if (err.errors) {
    errorResponse.errors = err.errors;
  }

  if (req.id) {
    errorResponse.requestId = req.id;
  }

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(status).json(errorResponse);
};

module.exports = { globalErrorHandler };
