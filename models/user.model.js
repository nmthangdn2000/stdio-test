import * as BaseModel from './base.model';
import { ERROR } from '../common/constants';

// model name
const name = 'users';

const model = {
  name: {
    type: String,
    required: [true, ERROR.UserIsRequired.toString()],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, ERROR.EmailIsRequired.toString()],
    unique: true,
    trim: true,
  },
  avata: {
    type: String,
    default: 'avata-default.png',
  },
  password: {
    type: String,
    required: [true, ERROR.PasswordIsRequired.toString()],
    select: false,
  },
  verify_email: {
    type: Number,
    default: 0,
  },
};

const index = { name: 'text', phone: 'text', district: 'text', province: 'text' };

export default BaseModel.createModel({ name, model, index });
