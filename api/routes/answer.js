import {Router} from 'express';
import { Answer, Question } from '../../db/models';
import authRequired from '../../middlewares/auth_required';

const answerRouter = Router();

answerRouter.get('/', async (req, res) => {
    try {
        const answers = await Answer.find();

        res.status(200).send(answers);
    } catch (err) {
        res.status(500).send(err);
    }
});
  
  // GET /api/questions/iddklasdjkad
answerRouter.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const answer = await Answer.findOne({ _id: id });

        if (answer){
        res.status(200).send(answer);
        }else{
        res.status(404).send({message: "question no found"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
  
answerRouter.post('/', authRequired, async (req, res) => {
    try {
        const { description, questionId } = req.body;
        
        const answer = new Answer({
            description,
            user: req.userId
        });

        const question = Question.findOne({_id:questionId});

        if(question){
            await answer.save();
            question.answers.push(answer._id);
            // Y guardamos la actualización de la pregunta
            await question.save();
            // Finalmente retornamos la nueva respuesta
            res.status(200).send(answer);
        }else{
            res.status(404).send({
                message: "Host question not found"
            });
        }
    } catch (err) {
        res.status(500).send(err);
}
});
  
answerRouter.put('/:id', authRequired, async (req, res) => {
    try {
        // Obtenemos el id de la pregunta a editar
        const { id } = req.params;
        // Obtenemos los nuevos datos
        const { description } = req.body;
        // Creamos un nuevo objeto de respuesta
        const newAnswer = { description };
        const answer = await Answer.findOneAndUpdate(
            { _id: id },
            { $set: newAnswer },
            { new: true }
        );
        res.status(200).send(answer);
        } catch (err) {
            // Cachamos cualquier potencial error
            console.log(err);
            res.status(500).send(err);
        }
});
  
answerRouter.delete('/:id', authRequired, async (req, res) => {
    try {
        // Obtenemos el id de la respuesta a eliminar
        const { id } = req.params;
        // Retiramos esa respuesta de la pregunta original
        await Question.findOneAndUpdate(
          { answers: id },
          { $pull: { answers: id } },
          { new: true }
        );
        // Eliminamos la respuesta
        await Answer.findByIdAndRemove(id);
        // Enviamos una notificación al usuario de que se elimnó
        res.status(200).send(true);
      } catch (err) {
        // Cachamos cualquier potencial error
        res.status(500).send(err);
      }
});

export default answerRouter;