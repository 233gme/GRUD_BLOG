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

export const getSortedPosts = async (req, res) => {
  try {
    const sortby = req.params.sortby;
    const sortItem = sortby === 'new' ? {createdAt: -1} : {viewsCount: -1};

    const posts = await PostModel.find().sort(sortItem).populate('user', 'fullName').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can\'t get all new posts'
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const filter = {_id: postId};
    const update = {$inc: {viewsCount: 1}};
    const returnAfter = {returnOriginal: false};

    const post = await PostModel
      .findOneAndUpdate(filter, update, returnAfter)
      .populate('user', 'fullName')
      .exec();

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

    const filter = {_id: postId};
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

    const filter = {_id: postId};
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

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(10).exec();
    const tags = posts
      .map(post => post.tags)
      .flat()
      .filter(tag => Boolean(tag))
      .reduce((acc, item) => {
        return acc.includes(item) ? acc : [...acc, item];
      }, [])
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can\'t get last tags'
    });
  }
};
