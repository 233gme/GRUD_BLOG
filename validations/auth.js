import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid Email').isEmail(),
  body('fullName', 'Invalid full name (must be more then 3 letters)')
    .isLength({ min: 3 }),
  body('password', 'Invalid password length (more then 8 letters)')
    .isLength({ min: 8 }),
  body('mobilePhone', 'Invalid phone number')
    .isMobilePhone(['it-CH', 'it-IT', 'it-SM']),
  body('avatar', 'Invalid image URL').optional().isURL()
];

export const loginValidation = [
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Invalid password length (more then 8 letters)')
    .isLength({ min: 8 })
];
