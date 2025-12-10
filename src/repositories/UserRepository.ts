import User, { IUser } from '../models/User.js';
import crypto from 'crypto';

class UserRepository {
  // Create a new user
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  // Find user by email
  async findByEmail(email: string, includePassword: boolean = false): Promise<IUser | null> {
    const query = User.findOne({ email: email.toLowerCase() });
    if (includePassword) {
      return await query.select('+password').exec();
    }
    return await query.exec();
  }

  // Find user by ID
  async findById(id: string, includePassword: boolean = false): Promise<IUser | null> {
    const query = User.findById(id);
    if (includePassword) {
      return await query.select('+password +refreshToken').exec();
    }
    return await query.exec();
  }

  // Find user by password reset token
  async findByPasswordResetToken(token: string): Promise<IUser | null> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    return await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: new Date() },
    }).select('+password').exec();
  }

  // Find user by email verification token
  async findByEmailVerificationToken(token: string): Promise<IUser | null> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    return await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: new Date() },
    }).exec();
  }

  // Update user
  async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  // Update user by email
  async updateByEmail(email: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).exec();
  }

  // Delete user
  async delete(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id).exec();
  }

  // Check if email exists
  async emailExists(email: string): Promise<boolean> {
    const user = await User.findOne({ email: email.toLowerCase() }).exec();
    return !!user;
  }

  // Get all users (with pagination)
  async findAll(page: number = 1, limit: number = 10): Promise<IUser[]> {
    const skip = (page - 1) * limit;
    return await User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
  }

  // Count total users
  async count(): Promise<number> {
    return await User.countDocuments().exec();
  }
}

export default new UserRepository();

