import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hash,
      mobilePhone: req.body.mobilePhone,
      avatarUrl: req.body.avatarUrl
    });

    const user = await doc.save();

    const token = jwt.sign({
      _id: user._id
    }, 'req.body.email',
    {
      expiresIn: '30d'
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can't register this user"
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: 'User or Password not found'
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password, user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Password or User not found'
      });
    }

    const token = jwt.sign({
      _id: user._id
    }, 'req.body.email',
    {
      expiresIn: '30d'
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Authorisation Error'
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not founded'
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can't found this user"
    });
  }
};
