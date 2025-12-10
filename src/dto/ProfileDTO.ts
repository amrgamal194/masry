import { IProfile } from '../types/Profile';

/**
 * Data Transfer Objects for Profile
 */
class ProfileDTO {
  /**
   * Transform profile to safe response format
   */
  static toResponse(profile: IProfile | null): Partial<IProfile> | null {
    if (!profile) return null;

    const profileObject = (profile as any).toObject ? (profile as any).toObject() : profile;
    
    // Remove sensitive fields
    const {
      __v,
      ...safeProfile
    } = profileObject;

    return safeProfile as Partial<IProfile>;
  }
}

export default ProfileDTO;



