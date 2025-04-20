import mongoose from 'mongoose';

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Pet name is required!'],
      trim: true,
      maxLength: [50, 'Pet name cannot be more than 50 characters!'],
    },
    type: {
      type: String,
      required: [true, 'Please provide pet type!'],
      trim: true,
    },
    breed: {
      type: String,
      required: [true, 'Please add about breed'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Plese provide pet age'],
      min: [0, 'Pet age cannot be negative'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      required: [true, 'Please specify gender'],
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large', 'x-large'],
      required: [true, 'Please provide size of pet'],
    },
    color: {
      type: String,
      required: [true, 'Please provide pet color'],
    },
    description: {
      type: String,
      required: [true, 'Please add description'],
      maxLength: [1000, 'Description cannot exceed 1000 characters'],
    },
    adoptionFee: {
      type: Number,
      required: [true, 'Please add an adoption fee'],
    },
    isAdopted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: [String],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    shelter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    healthInfo: {
      vaccinated: {
        type: Boolean,
        default: false,
      },
      spayedNeutered: {
        type: Boolean,
        default: false,
      },
      specialNeeds: {
        type: Boolean,
        default: false,
      },
      additionalInfo: {
        type: String,
        maxlength: [500, 'Health info cannot be more than 500 characters'],
      },
    },
  },
  { timestamps: true }
);

export const Pet = mongoose.model('Pet', petSchema);
