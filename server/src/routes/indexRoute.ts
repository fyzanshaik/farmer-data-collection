import { Router } from 'express';
import { pingController } from '../controllers/pingController';
const router = Router();

router.get('/', pingController);

export default router;
