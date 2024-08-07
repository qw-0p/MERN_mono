import express from 'express';
import {
  getPostValidation,
  postCreateValidation,
  postUpdateValidation,
} from '../middlewares/validations';
import { postsController } from '../controllers';
import { handleErrorValidation, isAdmin, isAuth } from '../middlewares';

const router = express.Router();

//Get All posts
router.get('/', postsController.getAll);

//Get One post
router.get('/:id', getPostValidation, postsController.getOne);

//Create one post
router.post(
  '/',
  isAuth,
  postCreateValidation,
  handleErrorValidation,
  postsController.create
);

//Update one post
router.patch('/:id', isAuth, postUpdateValidation, postsController.update);

//Delete one post
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  getPostValidation,
  postsController.remove
);

export default router;
