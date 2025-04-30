import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const userAuth = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req?.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Server does not receive token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded?._id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }
};

export default userAuth;
