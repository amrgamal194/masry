import express, { Router } from 'express';
import authController from '../controllers/AuthController.js';
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  refreshTokenValidator,
} from '../validators/authValidator.js';
import { validate } from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';

const router: Router = express.Router();

// Public routes
router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/refresh-token', refreshTokenValidator, validate, authController.refreshToken);
router.post('/forgot-password', forgotPasswordValidator, validate, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidator, validate, authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/resend-verification', forgotPasswordValidator, validate, authController.resendVerificationEmail);

// Protected routes
router.use(protect); // All routes below this line are protected
router.post('/logout', authController.logout);
router.get('/me', authController.getMe);
router.post('/change-password', changePasswordValidator, validate, authController.changePassword);

export default router;

