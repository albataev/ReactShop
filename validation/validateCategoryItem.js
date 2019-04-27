const Validator = require('validator');
const isEmpty = require('./is-empty');
//     title: req.body.title,
//     company: req.body.company,
//     location: req.body.location,
//     from: req.body.from,
//     to: req.body.to,
//     current: req.body.current,
//     description: req.body.description

const validateCategoryItemInput = ((data) => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.russtitle = !isEmpty(data.russtitle) ? data.russtitle : '';

  if (Validator.isEmpty(data.title)) {
    console.log('Название товара должно быть указано');
    errors.title = 'Название товара должно быть указано';
  }

  if (Validator.isEmpty(data.russtitle)) {
    console.log('Русское название категории должно быть указано');
    errors.russtitle = 'Русское название категории должно быть указано';
  }

  return {
    errors,
    isValid: isEmpty(errors)
    // isValid: true
  };
});

module.exports = validateCategoryItemInput;
