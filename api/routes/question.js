import { Router } from 'express';
import authRequired from '../../middlewares/auth_required';
import { Question } from '../../db/models';

const questionRouter = Router();

questionRouter.get('/', async (req, res) => {
  try {
    const questions = await Question.find();

    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET /api/questions/iddklasdjkad
questionRouter.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const question = await Question.findById(id);

    if (question){
      res.status(200).send(question);
    }else{
      res.status(404).send({message: "question no found"});
    }
  } catch (error) {
    res.status(500).send(error);
  }

  
});

questionRouter.post('/', authRequired, async (req, res) => {
  try {
    const { title, description, icon } = req.body;

    const question = new Question({
      title,
      description,
      icon,
      user: req.userId,
    });

    await question.save();

    res.status(201).send(question);
  } catch (err) {
    res.status(500).send(err);
  }
});

questionRouter.put('/:id', authRequired, async (req, res) => {
  try {
    const {id} = req.params;
    const {title,description,icon} = req.body;
    const newQuestion = {title, description, icon};
    const question = await Question.findByIdAndUpdate(
      {_id:id},
      {$set: newQuestion},
      {new:true}
    );
    if(question){
      res.status(200).send(question);
    }else{
      res.status(404).send({
        message: "Question not found"
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

questionRouter.delete('/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndRemove(id);
    res.status(200).send(true);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default questionRouter;