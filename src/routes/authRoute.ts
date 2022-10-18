import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

router.route('/signup').get(authController.signup);
router.route('/signin').post(authController.signin);

export default router;
