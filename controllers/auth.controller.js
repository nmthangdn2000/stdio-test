// import authService from '../services/auth.service';
import { RESPONSE } from '../common/constants';
import { responseSuccess, responseSuccessWithData, responseError } from './base.controller';

const login = async (req, res) => {
  res.send('login');
};

const register = async (req, res) => {
  res.send('register');
};

export { login, register };
