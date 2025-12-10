import nodemailer from 'nodemailer';
import config from '../config/env.js';
import { EmailOptions } from '../types/index.js';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: parseInt(String(config.email.port), 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

// Send email
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const message = {
    from: `${config.email.from} <${config.email.user}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || options.message,
  };

  try {
    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
  resetUrl: string
): Promise<void> => {
  const message = `
    You requested a password reset. Please click on the following link to reset your password:
    ${resetUrl}/${resetToken}
    
    This link will expire in 10 minutes.
    
    If you did not request this, please ignore this email.
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Password Reset Request</h2>
      <p>You requested a password reset. Please click on the following button to reset your password:</p>
      <a href="${resetUrl}/${resetToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;

  await sendEmail({
    email,
    subject: 'Password Reset Request',
    message,
    html,
  });
};

// Send email verification email
export const sendEmailVerificationEmail = async (
  email: string,
  verificationToken: string,
  verificationUrl: string
): Promise<void> => {
  const message = `
    Please verify your email address by clicking on the following link:
    ${verificationUrl}/${verificationToken}
    
    This link will expire in 24 hours.
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Email Verification</h2>
      <p>Please verify your email address by clicking on the following button:</p>
      <a href="${verificationUrl}/${verificationToken}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    </div>
  `;

  await sendEmail({
    email,
    subject: 'Email Verification',
    message,
    html,
  });
};

