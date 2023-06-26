import { body } from 'express-validator';

export const postCreateValidation = [
  body('title', 'Add title (more then 3 letters)').isLength({ min: 3 }),
  body('text', 'Add text (more then 50 letters)').isLength({ min: 20 }),
  body('tags', 'Invalid tag format').optional().isArray(),
  body('imageUrl', 'Invalid image URL').optional().isString()
];
