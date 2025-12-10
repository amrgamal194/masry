import Profile from '../models/Profile.js';
import { IProfile} from '../types/Profile';

class ProfileRepository {
  // Create profile
  async create(profileData: Partial<IProfile>): Promise<IProfile> {
    const profile = new Profile(profileData);
    return await profile.save();
  }

  // Find profile by user ID
  async findByUserId(userId: string): Promise<IProfile | null> {
    return await Profile.findOne({ user: userId })
      .populate('user', 'name email')
      .exec();
  }

  // Find profile by ID
  async findById(id: string): Promise<IProfile | null> {
    return await Profile.findById(id)
      .populate('user', 'name email')
      .exec();
  }

  // Update profile
  async update(userId: string, updateData: Partial<IProfile>): Promise<IProfile | null> {
    return await Profile.findOneAndUpdate(
      { user: userId },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name email')
      .exec();
  }

  // Delete profile
  async delete(userId: string): Promise<IProfile | null> {
    return await Profile.findOneAndDelete({ user: userId }).exec();
  }

  // Check if profile exists
  async exists(userId: string): Promise<boolean> {
    const profile = await Profile.findOne({ user: userId }).exec();
    return !!profile;
  }
}

export default new ProfileRepository();



