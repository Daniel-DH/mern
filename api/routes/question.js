import {Router} from 'express';

const questionRouter = Router();

questionRouter.get('/',(req,res) => {
    res.status(200).send('question funciona');
})

export default questionRouter;