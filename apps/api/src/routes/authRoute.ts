import express from 'express';
import { isAdmin, isAuth } from '../middlewares';
import {
  loginValidation,
  registerValidation,
} from '../middlewares/validations';
import { authController } from '../controllers';

const router = express.Router();

//Login
router.post('/login', loginValidation, authController.login);

//Get user
router.get('/me', isAuth, isAdmin, authController.getUser);

//Register
router.post('/register', registerValidation, authController.register);

export default router;
