import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { checkJwt } from '../middlewares/jwt';
import authController from '../controllers/authController';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 200,
  message: {
    error: true,
    message: 'Too many requests! Please try again after 1 hrs.',
  },
});

router.use(authLimiter);

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);
router.get('/check', checkJwt, authController.check);

export default router;
