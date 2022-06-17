import { ERROR } from '../common/constants';
import UserModel from '../models/user.model';

const getById = async (id) => {
  const user = await UserModel.findById(id);
  if (!user) throw new Error(ERROR.CanNotGetUser);

  return user;
};

const updateByUser = async (id, data) => {
  if (!id) throw new Error(ERROR.CanNotUpdateUser);

  const { email, password, ...dataUpdate } = data;
  if (JSON.stringify(dataUpdate) === '{}') return;

  const user = await UserModel.findByIdAndUpdate(id, { ...dataUpdate, updatedAt: new Date() });

  if (!user) throw new Error(ERROR.CanNotUpdateUser);
};

export { getById, updateByUser };
