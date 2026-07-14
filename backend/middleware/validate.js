const { body, validationResult } = require('express-validator');

const validationRules = [
  body('username').trim().isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
  body('email').trim().isEmail().withMessage('Invalid email address'),
  body('password').trim().isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters'),
];

const validate = (req, res, next) => {
  validationRules.forEach(rule => rule.run(req));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;