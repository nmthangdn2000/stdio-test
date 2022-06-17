import { route, addRoot } from './base.router';
import { HttpMethod } from '../common/constants';
import * as postsController from '../controllers/posts.controller';
import { uploadDiskStorage } from '../middlewares/upload.middleware';

const initRoute = () => {
  route({ method: HttpMethod.GET, url: '', action: postsController.getAll, middelware: [] });
  route({ method: HttpMethod.GET, url: '/:id', action: postsController.getById, middelware: [] });
  route({ method: HttpMethod.GET, url: '/user', action: postsController.getAllByUser });
  route({
    method: HttpMethod.POST,
    url: '',
    action: postsController.create,
    middelware: [uploadDiskStorage.single('avatar')],
  });
  route({ method: HttpMethod.DELETE, url: '/:id', action: postsController.deleteById });
  route({
    method: HttpMethod.PUT,
    url: '/:id',
    action: postsController.updateById,
    middelware: [uploadDiskStorage.single('avatar')],
  });
};

export default addRoot(initRoute);
