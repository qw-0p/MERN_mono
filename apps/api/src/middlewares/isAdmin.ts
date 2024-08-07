import authService from '../services/authService';

async function isAdmin(req, res, next) {
  const isAdminUser = await authService.findUserById(req.user.userId);
  if (!isAdminUser.isAdmin) {
    throw new Error('Not authorized to access this route');
  }
  next();
}

export default isAdmin;
