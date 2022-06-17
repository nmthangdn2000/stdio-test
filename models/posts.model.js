import * as BaseModel from './base.model';
import { ERROR } from '../common/constants';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// model name
const name = 'posts';

const model = {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, ERROR.UserIsRequired.toString()],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
    required: [true, ERROR.CategoryIsExist.toString()],
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    default: 'avata-default.png',
  },
  status: {
    type: String,
    enum: ['draft', 'public'],
    default: 'draft',
  },
  avatar: String,
};

export default BaseModel.createModel({ name, model });
