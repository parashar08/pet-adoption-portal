import express from 'express';
import {
  createPet,
  getAllPets,
  getPetById,
  updatePetInfo,
  deletePet,
} from '../controllers/petController.js';
import userAuth from '../middlewares/userAuth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.route('/create').post(userAuth, upload.array('image', 5), createPet);
router.route('/getAllPets').get(userAuth, getAllPets);
router.route('/getPet/:petId').get(userAuth, getPetById);
router.route('/update/:petId').put(userAuth, updatePetInfo);
router.route('/delete/:petId').delete(userAuth, deletePet);

export default router;
