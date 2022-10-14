import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const QuestionsList = (props) => {
  return (
    <>
      {props.questions?.map((question) => {
        return (
          <Card key={question.id}>
            <Card.Header>{/* <Icon /> */}</Card.Header>
            <Card.Body>
              <Card.Title>{question.title}</Card.Title>
              <Card.Text>{question.description}</Card.Text>
              <Link to={question.id }>
                <Button variant="primary">Ver pregunta</Button>
              </Link>
              
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default QuestionsList;
    