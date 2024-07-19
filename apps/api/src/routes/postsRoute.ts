import express from 'express';
import PostModel from '../models/Post';
import {
  getPostValidation,
  postCreateValidation,
  postUpdateValidation,
} from '../validations';
import { checkAuth, handleErrorValidation } from '../middlewares';

const router = express.Router();

//Get All posts
router.get('/', async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Cant get posts',
    });
  }
});

//Get One post
router.get('/:id', getPostValidation, async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      }
    )
      .populate('user')
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Post is not found',
          });
        }

        res.json(doc);
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Cant get posts',
    });
  }
});

//Create one post
router.post(
  '/',
  checkAuth,
  postCreateValidation,
  handleErrorValidation,
  async (req, res) => {
    try {
      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.body.userId,
      });

      const post = await doc.save();

      res.json(post);
    } catch (e) {
      res.status(500).json({
        message: 'Cant create post',
        error: e.message,
      });
    }
  }
);

//Update one post
router.patch('/:id', postUpdateValidation, async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.body.userId,
      }
    );

    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Cant update post',
    });
  }
});

//Delete one post
router.delete('/:id', getPostValidation, async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({
      _id: postId,
    }).then((doc) => {
      console.log(doc, 'doc');
      if (!doc) {
        return res.status(404).json({
          message: 'Cant get post!',
        });
      }
      res.json(doc);
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Cant get post',
    });
  }
});

export default router;
