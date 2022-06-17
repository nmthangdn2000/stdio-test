'use strict';

const LIMIT = 10;
const PAGE = 1;

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const RESPONSE = {
  SUCCESS: 'Success',
  LOGIN_SUCCESS: 'Login Success',
  REGISTER_SUCCESS: 'Register Success',
  VERIFY_EMAIL_SUCCESS: 'Verify email success',
  SEND_VERIFY_EMAIL_SUCCESS: 'Send verify email success',
  SEND_TOKEN_RESET_PASSWORD_SUCCESS: 'Send token reset password success',
  CHANGE_PASSWORD_SUCCESS: 'change password success',
};

const ERROR = {
  Default: 100,
  InternalServerError: 101,
  NoData: 102,
  AccountDoesNotExist: 103,
  PasswordIsNotCorrect: 104,
  //user 111 - 130
  CanNotGetUser: 111,
  CanNotCreateUser: 112,
  CanNotDeleteUser: 113,
  CanNotUpdateUser: 114,
  EmailIsExist: 115,
  UserIsRequired: 116,
  EmailIsRequired: 117,
  InvalidEmail: 118,
  PasswordIsRequired: 119,
  CantNotVerifyEmail: 120,
  CantNotSendVerifyEmail: 121,
  CantNotResetPassword: 122,
  CantNotUpdatePassword: 123,
  EmailDoesNotExist: 124,
  // categories 131 -
  CanNotGetCategory: 131,
  CanNotCreateCategory: 132,
  CanNotDeleteCategory: 133,
  CanNotUpdateCategory: 134,
  CategoryIsExist: 135,
  // posts 141 -
  CanNotGetPosts: 141,
  CanNotCreatePosts: 142,
  CanNotDeletePosts: 143,
  CanNotUpdatePosts: 144,
};

export { LIMIT, PAGE, HttpMethod, ERROR, RESPONSE };
