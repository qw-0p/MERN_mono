import authService from '../services/authService';
import { StatusCodes } from 'http-status-codes';

async function isAdmin(req, res, next) {
  const isAdminUser = await authService.findUserById(req.user.userId);
  if (!isAdminUser.isAdmin) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'Not authorized to access this route',
    });
  }
  next();
}

export default isAdmin;
