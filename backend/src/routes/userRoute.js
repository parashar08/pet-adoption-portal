import express from 'express';
import {
  registeUser,
  loginUser,
  logoutUser,
  updateUserDetails,
} from '../controllers/userController.js';
import { userAuth } from '../middlewares/userAuth.js';

const router = express.Router();

router.route('/register').post(registeUser);
router.route('/login').post(loginUser);
router.route('/logout').post(userAuth, loginUser);
router.route('/update').patch(userAuth, updateUserDetails);

export default router;
