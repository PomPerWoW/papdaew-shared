const logger = require('./logger');
const errors = require('./errors');
const middlewares = require('./middleware');
const utils = require('./utils');

module.exports = {
  ...logger,
  ...errors,
  ...middlewares,
  ...utils,
};
