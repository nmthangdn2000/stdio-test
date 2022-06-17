import * as postsService from '../services/posts.service';
import { responseError, responseSuccess, responseSuccessWithData } from './base.controller';

const getAll = async (req, res) => {
  try {
    const data = await postsService.getAll(req.query);
    responseSuccessWithData(res, data);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const getAllByUser = async (req, res) => {
  try {
    const data = await postsService.getAllByUser(req.user._id, req.query);
    responseSuccessWithData(res, data);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const getById = async (req, res) => {
  try {
    const data = await postsService.getById(req.params.id);
    responseSuccessWithData(res, data);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const create = async (req, res) => {
  try {
    await postsService.create(req.user._id, req.body, req.file.filename);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    await postsService.deleteById(req.params.id);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const updateById = async (req, res) => {
  try {
    await postsService.updateById(req.params.id, req.body, req.file?.filename);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

export { getAll, getAllByUser, getById, create, deleteById, updateById };
