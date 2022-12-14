import express from 'express';
import apiRouter from './api';
import allowEveryOrigin from './middlewares/allow-every-origin';

const app = express();

//static

//Middleware
app.use(express.json());
app.use(allowEveryOrigin);

//Routes
app.use('/api',apiRouter);

export default app;