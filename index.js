const { Phone } = require('./models');
const { Op, where } = require('sequelize');

(async function () {
  // додавання нового телефону
  const phone = {
    brand: 'Apple',
    model: 'IPhone 13',
    manufacturedYear: 2015,
    ram: 4,
    cpu: 'A15 Bionic',
    screenSize: 6.1,
    hasNfc: true,
  };
  const createdPhone = await Phone.create(phone);
  console.log('createdPhone: ', createdPhone.get());

  // отримання списку телефонів (* 3-я сторінка при перегляді по 4 телефони на сторінці, упорядкованих за роком виробництва),
  const foundPhones = await Phone.findAll({
    raw: true,
    order: [['manufacturedYear']],
    limit: 4,
    offset: 8,
  });
  console.log('foundPhones:', foundPhones);

  // * отримання списку телефонів певного року видання,
  const foundPhones1 = await Phone.findAll({
    raw: true,
    where: {
      manufacturedYear: 2021,
    },
  });
  console.log('foundPhones1:', foundPhones1);

  // * отримання списку телефонів старше 2022 року випуску,
  const foundPhones2 = await Phone.findAll({
    raw: true,
    where: {
      manufacturedYear: {
        [Op.lt]: 2022,
      },
    },
  });
  console.log('foundPhones2:', foundPhones2);

  // оновлення: змінити розмір оперативної пам'яті телефону з id: 1,
  const updatedPhone = await Phone.update(
    {
      ram: 6,
    },
    {
      raw: true,
      where: {
        id: 1,
      },
      returning: true,
    }
  );
  console.log('updatedPhone:', updatedPhone[1][0]);

  // * оновлення: додати нфс всім телефонам 2023 року випуску,
  const updatedPhones = await Phone.update(
    {
      hasNfc: true,
    },
    {
      raw: true,
      where: {
        manufacturedYear: 2021,
      },
      returning: true,
    }
  );
  console.log('updatedPhones:', updatedPhones[1]);

  // видалення телефону з id: 2.
  const deletedPhoneCount = await Phone.destroy({
    where: {
      id: 2,
    },
  });
  console.log('deletedPhoneCount:', deletedPhoneCount);

  // * видалення телефонів 2015 року випуску.
  const deletedPhoneCount1 = await Phone.destroy({
    where: {
      manufacturedYear: 2015,
    },
  });
  console.log('deletedPhoneCount1:', deletedPhoneCount1);
})();
