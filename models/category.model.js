import * as BaseModel from './base.model';
import { ERROR } from '../common/constants';

// model name
const name = 'categories';

const model = {
  name: {
    type: String,
    required: [true, ERROR.CanNotGetCategory.toString()],
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
  },
  avatar: String,
};

export default BaseModel.createModel({ name, model });
