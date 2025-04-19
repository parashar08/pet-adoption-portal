import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
      trim: true,
      maxLength: [50, 'Name can not exceed more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      trim: true,
      lowercase: true,
      unique: true,
      maxLength: [50, 'Email can not exceed more than 50 characters'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'shelter', 'admin'],
      default: 'user',
    },
    phone: {
      type: String,
      maxLength: [20, 'Phone Number can not exceed more than 20 characters.'],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    about: {
      type: String,
      maxLength: [500, 'Maximum 500 characters are allowed!'],
    },
    avatar: String,
    shelterInfo: {
      shelterName: String,
      licenseNumber: String,
      website: Number,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
