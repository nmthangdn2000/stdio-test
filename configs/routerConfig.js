import authRouter from '../router/auth.router';

const initRouter = (app) => {
  app.use('/api', authRouter);
};

export default initRouter;
