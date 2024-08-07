import postsService from '../services/postsService';
import { CreatePost } from '../types';
import { StatusCodes } from 'http-status-codes';

const getAll = async (req, res) => {
  try {
    const posts = await postsService.findAll();
    res.json({
      status: 'Success',
      posts,
    });
  } catch (e) {
    res.status(StatusCodes.OK).json({
      message: 'Cant get posts',
    });
  }
};

const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    postsService.findPostById(postId).then((doc) => {
      if (!doc) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Post is not found',
        });
      }

      res.status(StatusCodes.OK).json(doc);
    });
  } catch (e) {
    console.error(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Cant get posts',
    });
  }
};

const create = async (req, res) => {
  try {
    const doc = await postsService.createPost(req.body as CreatePost);

    const post = await doc.save();

    res.status(StatusCodes.CREATED).json(post);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Cant create post',
      error: e.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await postsService.updatePost({ ...req.body, postId });

    res.status(StatusCodes.OK).json(post);
  } catch (e) {
    console.error(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Cant update post',
    });
  }
};

const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    postsService.removePost(postId).then((doc) => {
      if (!doc) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Cant get post!',
        });
      }
      res.status(StatusCodes.OK).json(doc);
    });
  } catch (e) {
    console.error(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Cant get post',
    });
  }
};

export default { getAll, getOne, create, update, remove };
