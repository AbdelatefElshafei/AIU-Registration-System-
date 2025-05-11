const { body, validationResult } = require('express-validator');

exports.userValidationRules = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];


exports.courseValidationRules = [
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('courseCode')
    .trim()
    .matches(/^[A-Z]{2,3}\d{3}$/)
    .withMessage('Course code must be in format ABC123'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  body('maxStudents')
    .isInt({ min: 1 })
    .withMessage('Maximum students must be a positive number'),
  body('semester')
    .isIn(['First Semester', 'Second Semester', 'Summer'])
    .withMessage('Invalid semester'),
  body('year')
    .isInt({ min: 1, max: 4 })
    .withMessage('Year must be between 1 and 4')
];


exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  
  return res.status(422).json({
    errors: extractedErrors
  });
}; 