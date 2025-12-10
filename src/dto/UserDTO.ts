import { IUser } from '../types/index.js';
import { TokenPair } from '../types/index.js';

/**
 * Data Transfer Objects for User
 */
class UserDTO {
  /**
   * Transform user to safe response format
   */
  static toResponse(user: IUser | null): Partial<IUser> | null {
    if (!user) return null;

    const userObject = (user as any).toObject ? (user as any).toObject() : user;
    
    // Remove sensitive fields
    const {
      password,
      refreshToken,
      emailVerificationToken,
      passwordResetToken,
      __v,
      ...safeUser
    } = userObject;

    return safeUser as Partial<IUser>;
  }

  /**
   * Transform multiple users to response format
   */
  static toResponseList(users: IUser[]): Partial<IUser>[] {
    return users.map((user) => this.toResponse(user)).filter((u): u is Partial<IUser> => u !== null);
  }

  /**
   * Transform user for registration response
   */
  static toRegistrationResponse(user: IUser, tokens: TokenPair): { user: Partial<IUser> } & TokenPair {
    return {
      user: this.toResponse(user)!,
      ...tokens,
    };
  }

  /**
   * Transform user for login response
   */
  static toLoginResponse(user: IUser, tokens: TokenPair): { user: Partial<IUser> } & TokenPair {
    return {
      user: this.toResponse(user)!,
      ...tokens,
    };
  }
}

export default UserDTO;

