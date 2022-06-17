import { route, addRoot } from './base.router';
import { HttpMethod } from '../common/constants';
import * as userController from '../controllers/user.controller';

const initRoute = () => {
  route({ method: HttpMethod.GET, url: '/:id', action: userController.getById, middelware: [] });
  route({ method: HttpMethod.PUT, url: '/', action: userController.updateByUser });
};

export default addRoot(initRoute);
