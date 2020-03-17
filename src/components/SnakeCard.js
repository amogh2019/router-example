
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


class SnakeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0
        };
    }
    //const { theme, label } = props;

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    
    setVal = (k) => {
        this.setState({
          val : k
        });
    }

    handleKeyPress = (event) => {
        event.preventDefault();
        console.log(event)
        switch (event.key) {
            case 'ArrowUp':
                this.setVal(1);
                break;
            case 'ArrowDown':
                this.setVal(2);
                break;
            case 'ArrowLeft':
                this.setVal(3);
                break;
            case 'ArrowRight':
                this.setVal(4);
                break;
            default:
                this.setVal(0);
                break;
        }
    }

    

    render() {
        return (<Container className="mt-5">
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
            <Row className="justify-content-md-center">
                <Col md="auto">
                    {this.state.val}
                </Col>
            </Row>
        </Container>
        );
    }

}


export default SnakeCard