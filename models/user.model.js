import * as BaseModel from './base.model';
import { ERROR } from '../common/constants';

// model name
const name = 'users';

const model = {
  userName: {
    type: String,
    required: [true, ERROR.UserIsRequired.toString()],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, ERROR.EmailIsRequired.toString()],
    validate: [isEmail, ERROR.InvalidEmail.toString()],
  },
  // avata: {
  //   type: String,
  //   default: 'avata-default.png',
  // },
  password: {
    type: String,
    required: [true, ERROR.PasswordIsRequired.toString()],
    select: false,
  },
  age: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  verify_email: {
    type: Number,
    default: 0,
  },
};

const index = { name: 'text', email: 'text' };

export default BaseModel.createModel({ name, model, index });

function isEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}
