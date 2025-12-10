import mongoose, { Document } from 'mongoose';

export interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    bio?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
    socialLinks?: {
      website?: string;
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
    preferences?: {
      language?: string;
      timezone?: string;
      theme?: 'light' | 'dark';
      notifications?: boolean;
    };
  }

export interface IProfile extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    bio?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
    socialLinks?: {
      website?: string;
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
    preferences?: {
      language?: string;
      timezone?: string;
      theme?: 'light' | 'dark';
      notifications?: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
  }