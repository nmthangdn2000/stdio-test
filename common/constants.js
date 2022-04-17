'use strict';

const LIMIT = 10;

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
  PasswordIsRequired: 118,
  CantNotVerifyEmail: 119,
  CantNotSendVerifyEmail: 120,
  CantNotResetPassword: 121,
  CantNotUpdatePassword: 122,
};

export { LIMIT, HttpMethod, ERROR, RESPONSE };
