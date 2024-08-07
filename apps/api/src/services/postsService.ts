import PostModel from '../models/Post';
import { CreatePost, IPost, UpdatePost } from '../types';
import { Document, UpdateWriteOpResult } from 'mongoose';

const findAll = (): Promise<Array<IPost>> => {
  return PostModel.find({}).populate('user').exec();
};

const findPostById = (id: string): Promise<IPost> => {
  return PostModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $inc: { viewsCount: 1 },
    },
    {
      returnDocument: 'after',
    }
  ).populate('user');
};

const createPost = async ({
  title,
  text,
  imageUrl,
  tags,
  userId,
}: CreatePost): Promise<IPost & Document> => {
  return new PostModel({
    title,
    text,
    imageUrl,
    tags,
    user: userId,
  });
};

const updatePost = ({
  _id,
  title,
  text,
  imageUrl,
  tags,
  userId,
}: UpdatePost): Promise<UpdateWriteOpResult> => {
  return PostModel.updateOne(
    {
      _id,
    },
    {
      title,
      text,
      imageUrl,
      tags,
      user: userId,
    }
  );
};

const removePost = (id: string): Promise<IPost> => {
  return PostModel.findOneAndDelete({
    _id: id,
  });
};

export default {
  findAll,
  findPostById,
  createPost,
  updatePost,
  removePost,
};
