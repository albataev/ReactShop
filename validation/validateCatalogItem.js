const Validator = require('validator');
const isEmpty = require('./is-empty');
//     title: req.body.title,
//     company: req.body.company,
//     location: req.body.location,
//     from: req.body.from,
//     to: req.body.to,
//     current: req.body.current,
//     description: req.body.description

const validateCatalogItemInput = ((data) => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.price = !isEmpty(data.price) ? data.price : '';

  if (isEmpty(data.title)) {
    console.log('Название товара должно быть указано');
    errors.title = 'Название товара должно быть указано';
  }

  if (Validator.isEmpty(data.category)) {
    console.log('Категория должна быть указана');
    errors.category = 'Категория должна быть указана';
  }

  if (isEmpty(data.price)) {
    console.log('Цена должна быть указана');
    errors.price = 'Цена должна быть указана';
  }

  if (isNaN(String(data.price).split(' ').join(''))) {
    console.log('Некорректный формат числа', data.price);
    errors.price = 'Некорректный формат числа';
  }


  return {
    errors,
    isValid: isEmpty(errors)
    // isValid: true
  };
});

module.exports = validateCatalogItemInput;
