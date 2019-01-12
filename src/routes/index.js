import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import compare from '../controller/compare';
import account from '../controller/account';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes
  router.use('/compare', compare({config, db}));
  router.use('/account', account({ config, db}));
});
export default router;
