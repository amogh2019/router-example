
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const SnakeCard = (props) => {
    const { theme, label } = props;
    const k = 0;

    return <Container className="mt-5">
        <Row className="justify-content-md-center">
            <Col md="auto">
                <p>
                    This is just another snake game, move up down left right to move snake!
                </p>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col md="auto">
                <h1>Here will be the snake game block</h1>
            </Col>
        </Row>
    </Container>
}


export default SnakeCard