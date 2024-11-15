import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { upload, fileFields } from '../middleware/upload';
import { createFarmer, getAllFarmers, getFarmerById, updateFarmer, deleteFarmer } from '../controllers/farmerController';

const router = Router();

router.post('/', upload.fields(fileFields), asyncHandler(createFarmer));
router.get('/', asyncHandler(getAllFarmers));
router.get('/:id', asyncHandler(getFarmerById));
router.put('/:id', upload.fields(fileFields), asyncHandler(updateFarmer));
router.delete('/:id', asyncHandler(deleteFarmer));

export default router;
