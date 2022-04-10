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
};

const ERROR = {
  Default: 100,
  InternalServerError: 101,
  NoData: 102,
  AccountDoesNotExist: 103,
  PasswordIsNotCorrect: 104,
  //user 111 - 120
  CanNotGetUser: 111,
  CanNotCreateUser: 112,
  CanNotDeleteUser: 113,
  CanNotUpdateUser: 114,
  PhoneIsExist: 115,
  UserIsRequired: 116,
  PhoneIsRequired: 117,
  PasswordIsRequired: 118,
};

export { LIMIT, HttpMethod, ERROR, RESPONSE };
