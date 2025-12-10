import mongoose, { Schema, Model } from 'mongoose';

export interface IMigration extends mongoose.Document {
  name: string;
  timestamp: number;
  executedAt: Date;
}

const migrationSchema = new Schema<IMigration>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    executedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Migration: Model<IMigration> = mongoose.model<IMigration>('Migration', migrationSchema);

export default Migration;

