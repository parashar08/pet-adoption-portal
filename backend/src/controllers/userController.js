import { User } from '../models/User.js';
import apiResponse from '../utils/apiResponse.js';

export const registeUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if ([name, email, password, role].some((item) => item.trim() === '')) {
      return res
        .status(400)
        .json({ success: false, message: 'Empty fields is not allowed!' });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(409).json({
        success: false,
        message: 'User with given email already exist!',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error while registering user!',
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Empty email or password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found!' });
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: 'Password doesnot match' });
    }

    const token = user.getSignedJwtToken();

    if (!token) {
      return res.status(500).json({ success: false, message: 'try again!' });
    }

    return res
      .status(200)
      .cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .json({ success: true, data: user, message: 'User login successfully!' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || 'failed to login!' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie('token', { httpOnly: true })
      .json({ success: true, message: 'Logout user successfully!' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to logout. try again!',
    });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { phone, address, about, avatar, shelterInfo, favorites } = req.body;

    const updatedFields = {
      phone,
      address,
      about,
      avatar,
      shelterInfo,
      favorites,
    };

    const updatedUserData = await User.findByIdAndUpdate(
      req.user?._id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updateUserDetails) {
      apiResponse.error(req, 404, 'User not found!');
    }

    return res.status(200).json({
      success: true,
      data: updatedUserData,
      message: 'Update user data successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update user details!',
    });
  }
};
