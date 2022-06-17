import { ERROR } from '../common/constants';

class ErrorMessageMongoose {
  getErrorMessage = (key) => {
    switch (key) {
      case 'email':
        return ERROR.EmailIsExist;
      case 'name':
        return ERROR.UserIsRequired;
      default:
        break;
    }
  };
}

export default new ErrorMessageMongoose();
