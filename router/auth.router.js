import { route, addRoot } from './base.router';
import { HttpMethod } from '../common/constants';
import * as authController from '../controllers/auth.controller';

const initRoute = () => {
  route({ method: HttpMethod.POST, url: '/login', action: authController.login, middelware: [] });
  route({ method: HttpMethod.POST, url: '/register', action: authController.register, middelware: [] });
  // route({ method: HttpMethod.POST, url: '/refresh-token', action: authController.register, middelware: [] });
};

export default addRoot(initRoute);
