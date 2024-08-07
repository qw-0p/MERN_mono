import mongoose from 'mongoose';
import { IUser } from '../types';

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
