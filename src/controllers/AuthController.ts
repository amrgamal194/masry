import { Request, Response } from 'express';
import authService from '../services/AuthService.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import responseFormatter from '../utils/response.js';
import UserDTO from '../dto/UserDTO.js';

class AuthController {
  // Register new user
  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    return responseFormatter.created(res, result, 'User registered successfully');
  });

  // Login user
  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return responseFormatter.success(res, result, 'Login successful');
  });

  // Refresh access token
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    return responseFormatter.success(res, result, 'Token refreshed successfully');
  });

  // Logout user
  logout = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.logout(req.user!._id.toString());
    return responseFormatter.success(res, result, 'Logged out successfully');
  });

  // Forgot password
  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    return responseFormatter.success(res, result, result.message);
  });

  // Reset password
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;
    const result = await authService.resetPassword(token, password);
    return responseFormatter.success(res, result, 'Password reset successfully');
  });

  // Verify email
  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;
    const result = await authService.verifyEmail(token);
    return responseFormatter.success(res, result, 'Email verified successfully');
  });

  // Resend verification email
  resendVerificationEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await authService.resendVerificationEmail(email);
    return responseFormatter.success(res, result, 'Verification email sent');
  });

  // Change password
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(
      req.user!._id.toString(),
      currentPassword,
      newPassword
    );
    return responseFormatter.success(res, result, 'Password changed successfully');
  });

  // Get current user
  getMe = asyncHandler(async (req: Request, res: Response) => {
    const user = UserDTO.toResponse(req.user!);
    return responseFormatter.success(res, { user }, 'User retrieved successfully');
  });
}

export default new AuthController();

