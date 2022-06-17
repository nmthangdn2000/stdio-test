import { route, addRoot } from './base.router';
import { HttpMethod } from '../common/constants';
import * as categoryController from '../controllers/category.controller';
import { uploadDiskStorage } from '../middlewares/upload.middleware';

const initRoute = () => {
  route({ method: HttpMethod.GET, url: '/', action: categoryController.getAll, middelware: [] });
  route({ method: HttpMethod.GET, url: '/:id', action: categoryController.getById, middelware: [] });
  route({
    method: HttpMethod.POST,
    url: '/',
    action: categoryController.create,
    middelware: [uploadDiskStorage.single('avatar')],
  });
  route({ method: HttpMethod.DELETE, url: '/:id', action: categoryController.deleteById });
  route({
    method: HttpMethod.PUT,
    url: '/:id',
    action: categoryController.updateById,
    middelware: [uploadDiskStorage.single('avatar')],
  });
};

export default addRoot(initRoute);
