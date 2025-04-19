import express from 'express';
import {
  registeUser,
  loginUser,
  logoutUser,
  updateUserDetails,
} from '../controllers/userController.js';
import userAuth from '../middlewares/userAuth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.route('/register').post(registeUser);
router.route('/login').post(loginUser);
router.route('/logout').post(userAuth, logoutUser);
router
  .route('/update')
  .patch(userAuth, upload.single('avatar'), updateUserDetails);

export default router;
