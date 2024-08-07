import User from '../models/User';
import { IUser, UserRegister } from '../types';
import { Document } from 'mongoose';

const signIn = (email: string): Promise<IUser & Document> => {
  return User.findOne({ email });
};

const findUserById = (id: string): Promise<IUser> => {
  return User.findById(id);
};

const signUp = ({ email, fullName, avatarUrl, passwordHash }: UserRegister) => {
  return new User({
    email,
    fullName,
    avatarUrl,
    passwordHash,
  });
};

export default {
  signIn,
  signUp,
  findUserById,
};
