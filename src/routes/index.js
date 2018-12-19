import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import compare from '../controller/compare';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes
  router.use('/compare', compare({config, db}));
});
export default router;
