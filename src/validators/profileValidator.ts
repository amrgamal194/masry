import { body } from 'express-validator';

// Update profile validation rules
export const updateProfileValidator = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  body('phone')
    .optional()
    .trim()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Please provide a valid phone number'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot be more than 500 characters'),
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date'),
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
];

// Update avatar validation
export const updateAvatarValidator = [
  body('avatar')
    .notEmpty()
    .withMessage('Avatar URL is required')
    .isURL()
    .withMessage('Avatar must be a valid URL'),
];

// Update preferences validation
export const updatePreferencesValidator = [
  body('language')
    .optional()
    .isString()
    .withMessage('Language must be a string'),
  body('timezone')
    .optional()
    .isString()
    .withMessage('Timezone must be a string'),
  body('theme')
    .optional()
    .isIn(['light', 'dark'])
    .withMessage('Theme must be light or dark'),
  body('notifications')
    .optional()
    .isBoolean()
    .withMessage('Notifications must be a boolean'),
];



