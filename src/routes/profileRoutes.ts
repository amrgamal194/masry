import express, { Router } from 'express';
import profileController from '../controllers/ProfileController.js';
import {
  updateProfileValidator,
  updateAvatarValidator,
  updatePreferencesValidator,
} from '../validators/profileValidator.js';
import { validate } from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';

const router: Router = express.Router();

// All routes require authentication
router.use(protect);

// Profile routes
router.get('/', profileController.getProfile);
router.put('/', updateProfileValidator, validate, profileController.updateProfile);
router.patch('/avatar', updateAvatarValidator, validate, profileController.updateAvatar);
router.patch('/preferences', updatePreferencesValidator, validate, profileController.updatePreferences);

export default router;

