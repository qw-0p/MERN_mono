import mongoose from 'mongoose';

export interface DocumentResult<T> {
  _doc: T;
}

export interface IUser extends DocumentResult<IUser>, UpdatePost {
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl: string;
  isAdmin: boolean;
}

export interface CreatePost {
  title: string;
  text: string;
  imageUrl: string;
  tags: string[];
  userId: string;
}

export interface UpdatePost extends CreatePost {
  _id: string;
}

export interface IPost {
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: mongoose.Types.ObjectId;
  imageUrl: string;
}

export interface UserRegister {
  email: string;
  fullName: string;
  avatarUrl: string;
  passwordHash: string;
}
