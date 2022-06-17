import { ERROR } from '../common/constants';
import { deleteFile, textToSlug } from './base.service';
import CategoryModel from '../models/category.model';

const getAll = async () => {
  const category = await CategoryModel.find();
  if (!category) throw new Error(ERROR.CanNotGetCategory);
  return category;
};

const getById = async (id) => {
  const category = await CategoryModel.findById(id);
  if (!category) throw new Error(ERROR.CanNotGetCategory);
  return category;
};

const create = async (name, avatar) => {
  if (!name) throw new Error(ERROR.CanNotCreateCategory);
  const slug = textToSlug(name);
  const newCategory = new CategoryModel({
    name,
    slug,
    avatar,
  });
  const category = await newCategory.save();

  if (!category) {
    if (avatar) deleteFile(update.avatar);
    throw new Error(ERROR.CanNotCreateCategory);
  }
};

const deleteById = async (id) => {
  if (!id) throw new Error(ERROR.CanNotDeleteCategory);
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) throw new Error(ERROR.CanNotDeleteCategory);

  if (category.avatar) deleteFile(category.avatar);
};

const updateById = async (id, name, avatar) => {
  if (!id || !name) throw new Error(ERROR.CanNotUpdateCategory);
  const data = {
    name,
    slug: textToSlug(name),
  };

  if (avatar) data.avatar = avatar;

  const update = await CategoryModel.findByIdAndUpdate(id, { ...data, updatedAt: new Date() });
  if (!update) throw new Error(ERROR.CanNotUpdateCategory);

  if (avatar) deleteFile(update.avatar);
};

export { getAll, getById, create, deleteById, updateById };
