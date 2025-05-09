import { Pet } from '../models/Pet.js';
import apiResponse from '../utils/apiResponse.js';

export const createPet = async (req, res) => {
  try {
    const petImages = req.files.map((fileObj) => fileObj.path);
    const newPet = await Pet.create({ ...req.body, image: petImages });
    if (!newPet) {
      res.status(500).json({ success: false, message: 'Pet not created' });
    }

    return res
      .status(201)
      .json({ success: true, newPet, message: 'Pet created successfully!' });
  } catch (error) {
    return res.status(500).json({ status: false, message: error });
  }
};

export const getAllPets = async (req, res) => {
  try {
    const petsData = await Pet.find();

    if (!petsData) {
      return res
        .status(500)
        .json({ success: false, message: 'Failed to fetch pet data!' });
    }

    return res.status(200).json({
      success: true,
      data: petsData,
      message: 'Fetched all data successfully!',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error while getting data! ' });
  }
};

export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);

    if (!pet) {
      return res.status(404).json({ success: false, message: 'No pet found!' });
    }

    return res.status(200).json({
      success: true,
      data: pet,
      message: 'Fetch pet data successfully!',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error!' });
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

    return res.status(200).json({
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

export const get4petDetails = async (req, res) => {
  try {
    const pet = await Pet.find().limit(4);

    if (!pet) {
      return res
        .status(404)
        .json({ success: false, error: 'Failed to find pet details!' });
    }

    return res.status(200).json({
      success: true,
      data: pet,
      message: 'Fetch pet data successfully!',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: error || 'Failed to fetch 4 pets data!' });
  }
};
