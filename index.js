import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { checkAuth, handleValidationError } from './utils/index.js';
import { PostController, UserController } from './controllers/index.js';

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

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

// auth
app.post(
  '/auth/login',
  loginValidation,
  handleValidationError,
  UserController.login
);
app.post(
  '/auth/register',
  registerValidation,
  handleValidationError,
  UserController.register
);
app.get('/auth/me', checkAuth, UserController.getMe);

// posts
app.get('/posts', postCreateValidation, PostController.getAllPosts);
app.get('/posts/:id', postCreateValidation, PostController.getPost);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationError,
  PostController.createPost
);
app.delete(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  PostController.deletePost
);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationError,
  PostController.updatePost
);

// images
app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  });
});

// start
app.listen(4444, (err) => {
  if (err) {
    return console.log('Server Error', err);
  }

  console.log('OK Mogafior server\n');
});
