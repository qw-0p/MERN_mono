import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authService from '../services/authService';
import { StatusCodes } from 'http-status-codes';

const login = async (req, res) => {
  try {
    const user = await authService.signIn(req.params.email);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User is not found',
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(StatusCodes.BAD_REQUEST).json({
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

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Authorization is failed',
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await authService.findUserById(req.body.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Some error',
    });
  }
};

const register = async (req, res) => {
  try {
    console.log('register');
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = await authService.signUp({ ...req.body, passwordHash: hash });

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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Cant register',
    });
  }
};

export default { login, getUser, register };
