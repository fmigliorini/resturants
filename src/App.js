import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Title from './Shared/Title';
import Board from './Components/Board';

import './App.css';

const App = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Title />
        </Col>
      </Row>
      <Row>
        <Col>
          <Board />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
