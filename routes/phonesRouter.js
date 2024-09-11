const { Router } = require('express');
const { phonesController } = require('../controllers');
const { validate, paginate } = require('../middleware');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .post(validate.validatePhoneOnCreate, phonesController.createPhone)
  .get(paginate.paginatePhones, phonesController.getPhones);

phonesRouter
  .route('/:id')
  .get(phonesController.getPhoneById)
  .patch(validate.validatePhoneOnUpdate, phonesController.updatePhoneById)
  .delete(phonesController.deletePhoneById);

module.exports = phonesRouter;
