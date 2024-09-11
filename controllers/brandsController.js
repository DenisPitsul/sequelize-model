const _ = require('lodash');
const createHttpError = require('http-errors');
const { Phone, Brand } = require('../models');

module.exports.getBrandPhones = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundBrand = await Brand.findByPk(id);

    if (!foundBrand) {
      next(createHttpError(404, 'Brand Not Found'));
    }

    const foundBrandPhones = await foundBrand.getPhones({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundBrandPhones });
  } catch (err) {
    next(err);
  }
};

module.exports.createBrandPhone = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const createdPhone = await Phone.create({ ...body, brandId: id });

    if (!createdPhone) {
      return next(createHttpError(400, 'Something went wrong'));
    }

    const preparedPhone = _.omit(createdPhone.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};
