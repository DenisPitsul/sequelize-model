const { Router } = require('express');
const { brandsController } = require('../controllers');

const brandsRouter = Router();

brandsRouter
  .route('/:id/phones')
  .get(brandsController.getBrandPhones)
  .post(brandsController.createBrandPhone);

module.exports = brandsRouter;
