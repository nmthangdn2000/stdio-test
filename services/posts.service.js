import { ERROR, LIMIT, PAGE } from '../common/constants';
import { deleteFile, pagination, textToSlug } from './base.service';
import PostsModel from '../models/posts.model';
import categoryModel from '../models/category.model';

const getAll = async ({ q = '', page = PAGE, limit = LIMIT, sort, user, category }) => {
  const query = {
    status: 'public',
  };

  if (user) query.user = user;
  if (category) query.category = category;

  const count = PostsModel.find(query).countDocuments();
  // chưa làm sort
  const getPosts = PostsModel.find(query)
    .populate('user', 'userName')
    .populate('category', '-createdAt -updatedAt')
    .skip(page * limit - limit)
    .limit(Number(limit));
  const [total, posts] = await Promise.all([count, getPosts]);

  if (!posts) throw new Error(ERROR.CanNotGetPosts);
  return {
    data: posts,
    currentPage: Number(page),
    totalPage: pagination(total, limit),
  };
  // const posts = await PostsModel.find();
  // if (!posts) throw new Error(ERROR.CanNotGetPosts);
  // return posts;
};

const getAllByUser = async (user, { q = '', status, page = PAGE, limit = LIMIT }) => {
  const query = { user };
  if (status) query.status = status;

  const count = PostsModel.find(query).countDocuments();
  // chưa làm sort
  const getPosts = PostsModel.find(query)
    .populate('user', 'userName')
    .populate('category', '-createdAt -updatedAt')
    .skip(page * limit - limit)
    .limit(Number(limit));
  const [total, posts] = await Promise.all([count, getPosts]);

  if (!posts) throw new Error(ERROR.CanNotGetPosts);
  return {
    data: posts,
    currentPage: Number(page),
    totalPage: pagination(total, limit),
  };
  // const posts = await PostsModel.find();
  // if (!posts) throw new Error(ERROR.CanNotGetPosts);
  // return posts;
};

const getById = async (id) => {
  const posts = await PostsModel.findById(id)
    .populate('user', 'userName')
    .populate('category', '-createdAt -updatedAt');
  if (!posts) throw new Error(ERROR.CanNotGetPosts);
  return posts;
};

const create = async (user, data, avatar) => {
  if (!data.category) throw new Error(ERROR.CanNotCreatePosts);

  const getCategory = await categoryModel.findById(data.category);
  if (!getCategory) throw new Error(ERROR.CanNotCreatePosts);

  const newPosts = new PostsModel({
    ...data,
    user,
    avatar,
  });
  const posts = await newPosts.save();

  if (!posts) {
    if (avatar) deleteFile(update.avatar);
    throw new Error(ERROR.CanNotCreatePosts);
  }
};

const deleteById = async (id) => {
  if (!id) throw new Error(ERROR.CanNotDeletePosts);
  const posts = await PostsModel.findByIdAndDelete(id);

  if (!posts) throw new Error(ERROR.CanNotDeletePosts);

  if (posts.avatar) deleteFile(posts.avatar);
};

const updateById = async (id, data, avatar) => {
  if (!id) {
    if (avatar) deleteFile(avatar);
    throw new Error(ERROR.CanNotUpdatePosts);
  }

  if (avatar) data.avatar = avatar;

  const update = await PostsModel.findByIdAndUpdate(id, { ...data, updatedAt: new Date() });
  if (!update) {
    if (avatar) deleteFile(avatar);
    throw new Error(ERROR.CanNotUpdatePosts);
  }

  if (avatar) deleteFile(update.avatar);
};

export { getAll, getAllByUser, getById, create, deleteById, updateById };
