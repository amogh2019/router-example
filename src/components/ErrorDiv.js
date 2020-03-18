
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const ErrorDiv = (props) => {
    const { message, color } = props;
    const bgcolor = color === 'red' ? 'bg-danger' : 'bg-warning';
    const autoString = 'auto';
    return <Container className="mt-5" >
        <Row className="justify-content-md-center ">
            <Col md={autoString + ' ' + bgcolor}>
                <h2>
                    This section is under development!
                </h2>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col md={autoString + ' ' + bgcolor}>
                <p>
                    {message}
                </p>
            </Col>
        </Row>
    </Container>
}


export default ErrorDiv