import * as userService from '../services/user.service';
import { responseSuccess, responseSuccessWithData, responseError } from './base.controller';

const getById = async (req, res) => {
  try {
    const data = await userService.getById(req.params.id);
    responseSuccessWithData(res, data);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const updateByUser = async (req, res) => {
  try {
    await userService.updateByUser(req.user._id, req.body);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

export { getById, updateByUser };
