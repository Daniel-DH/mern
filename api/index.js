import {Router} from 'express';
import { authRouter, questionRouter, answerRouter } from './routes';

const apiRouter = Router();

apiRouter.get('/',(req,res) => {
    res.status(200).send('Api funciona');
})

apiRouter.use('/auth', authRouter);
apiRouter.use('/question', questionRouter);
apiRouter.use('/answer', answerRouter);

export default apiRouter;