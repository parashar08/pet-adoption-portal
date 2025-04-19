import { Pet } from '../models/Pet.js';
import apiResponse from '../utils/apiResponse.js';

export const createPet = async (req, res) => {
  try {
    const newPet = await Pet.create(req.body);
    if (!newPet) {
      return apiResponse.error(req, 500, 'Failed to create pet. TRY AGAIN!');
    }

    return apiResponse.success(req, 201, newPet, 'Pet created successfully!');
  } catch (error) {
    return apiResponse.error(req, 500, error.message || 'Failed to create!');
  }
};

export const getAllPets = async (req, res) => {
  try {
    const petsData = await Pet.find();

    if (!petsData) {
      return apiResponse.error(req, 500, 'Failed to find all data. TRY AGAIN!');
    }

    return apiResponse(req, 200, petsData, 'Get all pets data successfully!');
  } catch (error) {
    return apiResponse.error(
      req,
      500,
      error?.message || 'Failed to get all pets!'
    );
  }
};

export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);

    if (!pet) {
      return apiResponse.error(req, 404, 'Pet with given id not found!');
    }

    return apiResponse.success(req, 200, pet, 'Fetch pet data successfully!');
  } catch (error) {
    return apiResponse.error(
      req,
      500,
      error?.message || 'Failed to get pet info!'
    );
  }
};

export const updatePetInfo = async (req, res) => {
  try {
    const updatedPetInfo = await Pet.findByIdAndUpdate(
      req.params?.petId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatePetInfo) {
      return res.status(404).json({ success: false, message: 'Pet not found' });
    }

    return res.status(200).json({
      success: true,
      data: updatePetInfo,
      message: 'Pet updated successfully!',
    });
  } catch (error) {
    return apiResponse.error(
      req,
      500,
      error?.message || 'Failed to update pet Info!'
    );
  }
};

export const deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.petId);

    if (!deletePet) {
      return res
        .status(404)
        .json({ success: false, message: 'Pet not found!' });
    }

    return res
      .status(200)
      .json({
        success: true,
        data: deletePet,
        message: 'Pet deleted successfully!',
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || 'Failed to delete pet!',
    });
  }
};
