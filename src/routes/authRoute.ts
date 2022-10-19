import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import authController from '../controllers/authController';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: {
    error: true,
    message: 'Too many requests! Please try again after 1 hrs.',
  },
});

router.use(authLimiter);

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);

export default router;
