import profileRepository from '../repositories/ProfileRepository.js';
import { NotFoundError, ConflictError } from '../errors/ErrorTypes.js';
import logger from '../utils/logger.js';
import { UpdateProfileData, IProfile } from '../types/Profile.js';


class ProfileService {
  // Get user profile
  async getProfile(userId: string): Promise<IProfile> {
    const profile = await profileRepository.findByUserId(userId);
    if (!profile) {
      // Create default profile if doesn't exist
      return await this.createProfile(userId, {});
    }
    return profile;
  }

  // Create profile
  async createProfile(userId: string, profileData: UpdateProfileData): Promise<IProfile> {
    const exists = await profileRepository.exists(userId);
    if (exists) {
      throw new ConflictError('Profile already exists');
    }

    const profile = await profileRepository.create({
      user: userId as any,
      ...profileData,
    });

    logger.info('Profile created', { userId, profileId: profile._id.toString() });
    return profile;
  }

  // Update profile
  async updateProfile(userId: string, updateData: UpdateProfileData): Promise<IProfile> {
    const profile = await profileRepository.update(userId, updateData);
    if (!profile) {
      // Create if doesn't exist
      return await this.createProfile(userId, updateData);
    }

    logger.info('Profile updated', { userId, profileId: profile._id.toString() });
    return profile;
  }

  // Update avatar
  async updateAvatar(userId: string, avatarUrl: string): Promise<IProfile> {
    return await this.updateProfile(userId, { avatar: avatarUrl });
  }

  // Update preferences
  async updatePreferences(userId: string, preferences: UpdateProfileData['preferences']): Promise<IProfile> {
    const profile = await profileRepository.findByUserId(userId);
    if (!profile) {
      return await this.createProfile(userId, { preferences });
    }

    const updated = await profileRepository.update(userId, {
      preferences: {
        ...profile.preferences,
        ...preferences,
      },
    });

    if (!updated) {
      throw new NotFoundError('Profile not found');
    }

    return updated;
  }
}

export default new ProfileService();



