import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');

      req.body.userId = decoded._id;

      next();
    } catch (e) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Not allowed!',
        error: e.message,
      });
    }
  } else {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'Not allowed',
    });
  }
};
