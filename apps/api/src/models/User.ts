import mongoose from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl: string
}
const UserSchema = new mongoose.Schema<IUser>({
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
  avatarUrl: String
}, {
  timestamps: true,
  selectPopulatedPaths: false
})

export default mongoose.model('User', UserSchema)
