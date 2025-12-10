import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import responseFormatter from '../utils/response.js';
import profileService from '../services/ProfileService.js';
import ProfileDTO from '../dto/ProfileDTO.js';

class ProfileController {
  // Get current user profile
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const profile = await profileService.getProfile(req.user!._id.toString());
    const profileDTO = ProfileDTO.toResponse(profile);
    return responseFormatter.success(res, { profile: profileDTO }, 'Profile retrieved successfully');
  });

  // Update profile
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const profile = await profileService.updateProfile(req.user!._id.toString(), req.body);
    const profileDTO = ProfileDTO.toResponse(profile);
    return responseFormatter.success(res, { profile: profileDTO }, 'Profile updated successfully');
  });

  // Update avatar
  updateAvatar = asyncHandler(async (req: Request, res: Response) => {
    const { avatar } = req.body;
    const profile = await profileService.updateAvatar(req.user!._id.toString(), avatar);
    const profileDTO = ProfileDTO.toResponse(profile);
    return responseFormatter.success(res, { profile: profileDTO }, 'Avatar updated successfully');
  });

  // Update preferences
  updatePreferences = asyncHandler(async (req: Request, res: Response) => {
    const profile = await profileService.updatePreferences(req.user!._id.toString(), req.body);
    const profileDTO = ProfileDTO.toResponse(profile);
    return responseFormatter.success(res, { profile: profileDTO }, 'Preferences updated successfully');
  });
}

export default new ProfileController();



