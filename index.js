import express from 'express';
import mongoose from 'mongoose';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

import { loginValidation, registerValidation } from './validations/auth.js';
import { postCreateValidation } from './validations/post.js';

mongoose.connect(
  'mongodb+srv://mogafior_admin:' +
  'D5VKko7lA90X27BK@mogafior.gtopwco.mongodb.net/' +
  'mogafior?retryWrites=true&w=majority'
).then(() => {
  console.log('OK MongoDB\n');
}).catch((err) => {
  console.log('DB ERROR', err);
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

// auth
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// posts
app.get('/posts', postCreateValidation, PostController.getAllPosts);
app.get('/posts/:id', postCreateValidation, PostController.getPost);
app.post('/posts', checkAuth, postCreateValidation, PostController.createPost);
app.delete(
  '/posts/:id', checkAuth, postCreateValidation, PostController.deletePost
);
app.patch(
  '/posts/:id', checkAuth, postCreateValidation, PostController.updatePost
);

// start
app.listen(4444, (err) => {
  if (err) {
    return console.log('Server Error', err);
  }

  console.log('OK Mogafior server\n');
});
