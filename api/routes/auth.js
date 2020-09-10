import {Router} from 'express';

const authRouter = Router();

authRouter.get('/',(req,res) => {
    res.status(200).send('auth funciona');
})

export default authRouter;