import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const sign = (user) => jwt.sign({ sub: user._id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.isActive || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }
  user.lastLoginAt = new Date();
  await user.save({ validateModifiedOnly: true });
  res.json({
    success: true,
    token: sign(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

export const me = asyncHandler(async (req, res) => {
  const { _id, name, email, role } = req.user;
  res.json({ success: true, user: { id: _id, name, email, role } });
});
