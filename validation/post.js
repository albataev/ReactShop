const Validator = require('validator');
const isEmpty = require('./is-empty');

const validatePostInput = ((data) => {
    let  errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
        console.log('Text field length must be between 10 and 300 chars required');
        errors.text = 'Text field length must be between 10 and 300 chars required';
    }

    if(Validator.isEmpty(data.text)) {
        console.log('Text field is required');
        errors.text = 'Text field is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
        // isValid: true
    }
});

module.exports = validatePostInput;
