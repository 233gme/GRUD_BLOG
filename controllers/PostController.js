import PostModel from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can\'t create the post'
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user', 'fullName').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can\'t get all posts'
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const filter = { _id: postId };
    const update = { $inc: { viewsCount: 1 } };
    const returnAfter = { returnOriginal: false };

    const post = await PostModel
      .findOneAndUpdate(filter, update, returnAfter)
      .populate('user', 'fullName')
      .exec();

    // (err, doc) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({
    //       message: 'Can\'t get post'
    //     });
    //   }
    //
    //   if (!doc) {
    //     return res.status(404).json({
    //       message: 'Can\'t find post'
    //     });
    //   }
    // }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can\'t get the post'
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const filter = { _id: postId };
    await PostModel.findOneAndDelete(filter);

    res.json({
      success: true,
      message: 'Post deleted'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can\'t delete the post'
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const filter = { _id: postId };
    const update = {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl
    };

    await PostModel.updateOne(filter, update);

    res.json({
      success: true,
      message: 'Post updated'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can\'t update the post'
    });
  }
};
