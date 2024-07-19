import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import { checkAuth } from '../middlewares';
import { loginValidation, registerValidation } from '../validations';

const router = express.Router();

//Login
router.post('/login', loginValidation, async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'User is not found',
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Login or password is not correct',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userData } = user._doc;
    console.log('success login');

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Authorization is failed',
    });
  }
});

//Get user
router.get('/me', checkAuth, async (req, res) => {
  try {
    console.log(req, 'req');
    const user = await UserModel.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Some error',
    });
  }
});

//Register
router.post('/register', registerValidation, async (req, res) => {
  try {
    console.log('register');
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.email,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Cant register',
    });
  }
});

export default router;
