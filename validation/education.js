const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateEducationInput = ((data) => {
    let  errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.school)) {
        console.log('School field is required');
        errors.school = 'School field is required';
    }

    if(Validator.isEmpty(data.degree)) {
        console.log('Degree field is required');
        errors.degree = 'Degree field is required';
    }

    if(Validator.isEmpty(data.fieldofstudy)) {
        console.log('Field of study field is required');
        errors.fieldofstudy = 'Field of study field is required';
    }

    if(Validator.isEmpty(data.from)) {
        console.log('From date field is required');
        errors.from = 'From date field is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
        // isValid: true
    }
});

module.exports = validateEducationInput;
