const createHttpError = require('http-errors');
const {
  ValidationError: SequelizeValidationError,
  BaseError,
} = require('sequelize');
const { ValidationError: YupValidationError } = require('yup');

module.exports.validationErrorHandler = (err, req, res, next) => {
  if (err instanceof YupValidationError) {
    console.log(err);
    const errors = err.errors.map(e => ({ status: 422, massage: e }));
    return res.status(422).send(errors);
  }
  next(err);
};

module.exports.dbErrorHandler = (err, req, res, next) => {
  if (err instanceof SequelizeValidationError) {
    const errors = err.errors.map(e => ({ status: 422, massage: e.message }));
    return res.status(422).send(errors);
  }
  if (err instanceof BaseError) {
    console.log('err:', err);
    next(createHttpError(500, 'Database Error'));
  }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status ?? 500;
  const message = err.message ?? 'Server Error';

  res.status(status).send([{ status, message }]);
};
