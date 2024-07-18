import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123')

      req.body.userId = decoded._id;

      next();
    } catch (e) {
      return res.status(405).json({
        message: 'Not allowed!'
      })
    }
  } else {
    return res.status(405).json({
      message: 'Not allowed'
    })
  }
}
