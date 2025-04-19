import express from 'express';
import {
  createPet,
  getAllPets,
  getPetById,
  updatePetInfo,
  deletePet,
} from '../controllers/petController.js';
import userAuth from '../middlewares/userAuth.js';

const router = express.Router();

router.route('/create').post(userAuth, createPet);
router.route('/getAllPets').get(userAuth, getAllPets);
router.route('/getPet/:petId').get(userAuth, getPetById);
router.route('/update/:petId').put(userAuth, updatePetInfo);
router.route('/delete/:petId').delete(userAuth, deletePet);

export default router;
