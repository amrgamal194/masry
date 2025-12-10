import userRepository from '../repositories/UserRepository.js';
import { generateTokens, verifyRefreshToken, generateToken } from '../utils/jwt.js';
import { sendPasswordResetEmail, sendEmailVerificationEmail } from '../utils/email.js';
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../errors/ErrorTypes.js';
import logger from '../utils/logger.js';
import UserDTO from '../dto/UserDTO.js';
import { RegisterData, IUser, TokenPair } from '../types/index.js';

class AuthService {
  // Register a new user
  async register(userData: RegisterData): Promise<{ user: Partial<IUser> } & TokenPair> {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('User already exists with this email');
    }

    // Create user
    const user = await userRepository.create({
      name,
      email,
      password,
    });

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Generate tokens
    const tokens = generateTokens(user._id.toString());

    // Save refresh token
    await userRepository.update(user._id.toString(), { refreshToken: tokens.refreshToken });

    // Send verification email (optional - you can comment this out if email is not configured)
    try {
      const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email`;
      await sendEmailVerificationEmail(user.email, verificationToken, verificationUrl);
      logger.info('Verification email sent', { email: user.email });
    } catch (error) {
      // If email fails, still allow registration but log the error
      logger.error('Email verification could not be sent', error as Error, { email: user.email });
    }

    // Transform user to DTO
    const userDTO = UserDTO.toResponse(user);

    return {
      user: userDTO!,
      ...tokens,
    };
  }

  // Login user
  async login(email: string, password: string): Promise<{ user: Partial<IUser> } & TokenPair> {
    // Find user with password
    const user = await userRepository.findByEmail(email, true);
 
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedError('Your account has been deactivated');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate tokens
    const tokens = generateTokens(user._id.toString());

    // Save refresh token
    await userRepository.update(user._id.toString(), { refreshToken: tokens.refreshToken });

    logger.info('User logged in', { userId: user._id.toString(), email: user.email });

    // Transform user to DTO
    const userDTO = UserDTO.toResponse(user);

    return {
      user: userDTO!,
      ...tokens,
    };
  }

  // Refresh access token
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token is required');
    }

    try {
      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken);

      // Find user with refresh token
      const user = await userRepository.findById(decoded.id, true);
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      // Generate new access token
      const token = generateToken(user._id.toString());

      return { token };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  }

  // Logout user
  async logout(userId: string): Promise<{ message: string }> {
    await userRepository.update(userId, { refreshToken: undefined });
    return { message: 'Logged out successfully' };
  }

  // Forgot password
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return { message: 'If the email exists, a password reset link has been sent' };
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send reset email
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password`;
      await sendPasswordResetEmail(user.email, resetToken, resetUrl);
      logger.info('Password reset email sent', { email: user.email });
      return { message: 'Password reset email sent' };
    } catch (error) {
      // Reset token if email fails
      user.passwordResetToken = undefined;
      user.passwordResetExpire = undefined;
      await user.save({ validateBeforeSave: false });
      logger.error('Failed to send password reset email', error as Error, { email: user.email });
      throw new InternalServerError('Email could not be sent');
    }
  }

  // Reset password
  async resetPassword(resetToken: string, newPassword: string): Promise<{ message: string }> {
    // Find user by reset token
    const user = await userRepository.findByPasswordResetToken(resetToken);
    if (!user) {
      throw new BadRequestError('Invalid or expired reset token');
    }

    // Update password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();

    logger.info('Password reset successful', { userId: user._id.toString() });

    return { message: 'Password reset successfully' };
  }

  // Verify email
  async verifyEmail(verificationToken: string): Promise<{ message: string }> {
    const user = await userRepository.findByEmailVerificationToken(verificationToken);
    if (!user) {
      throw new BadRequestError('Invalid or expired verification token');
    }

    // Update user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    logger.info('Email verified', { userId: user._id.toString(), email: user.email });

    return { message: 'Email verified successfully' };
  }

  // Resend verification email
  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestError('Email already verified');
    }

    // Generate new verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Send verification email
    try {
      const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email`;
      await sendEmailVerificationEmail(user.email, verificationToken, verificationUrl);
      logger.info('Verification email resent', { email: user.email });
      return { message: 'Verification email sent' };
    } catch (error) {
      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;
      await user.save({ validateBeforeSave: false });
      logger.error('Failed to send verification email', error as Error, { email: user.email });
      throw new InternalServerError('Email could not be sent');
    }
  }

  // Change password (for authenticated users)
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    const user = await userRepository.findById(userId, true);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    logger.info('Password changed', { userId: user._id.toString() });

    return { message: 'Password changed successfully' };
  }
}

export default new AuthService();

