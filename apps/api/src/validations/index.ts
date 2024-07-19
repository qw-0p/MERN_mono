import { body, param } from 'express-validator';

export const loginValidation = [
  body('email', 'Incorrect email').isEmail(),
  body('password', 'The password must be longer then 5 symbols').isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body('email', 'Incorrect email').isEmail(),
  body('password', 'The password must be longer then 5 symbols').isLength({
    min: 5,
  }),
  body('fullName', 'The Full Name is required').isLength({ min: 3 }),
  body('avatarUrl', 'The avatar must be an url').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Title is required').isString(),
  body('title', 'Title length must be equal or greater 3').isLength({ min: 3 }),
  body('text', 'Text is required').isString(),
  body('text', 'Text length must be equal or greater 10').isLength({ min: 10 }),
  body('tags', 'Tags must be an array').optional().isArray(),
  body('imageUrl', 'Image URL is invalid').optional().isURL(),
];

export const getPostValidation = [param('id', 'ID is required').isString()];

export const postUpdateValidation = [
  ...postCreateValidation,
  ...getPostValidation,
];
