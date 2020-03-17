
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SnakeGrid from './SnakeGrid';
import { mod } from '../utils/helper';


class SnakeCard extends React.Component {

    constructor(props) {
        super(props);
        const { windowSize = 400 } = props;
        this.state = {
            val: 'Press up / down / left / right to move',
            windowSize: windowSize,
            squareSize: 10,
            positions: [[100, 200]],
            directions: [1]
        };
    }
    //const { theme, label } = props;

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        setInterval(() => this.relocate(), 1000);
    }

    relocate = () => {
        console.log("here");
        this.state.positions.forEach((pos, id) => {
            switch (this.state.directions[id]) {
                case 1:
                    this.updateHead(1, null, true);
                    break;
                case 2:
                    this.updateHead(null, 1, true);
                    break;
                case 3:
                    this.updateHead(1, null, false);
                    break;
                case 4:
                    this.updateHead(null, 1, false);
                    break;
                default:
                    break;
            }
        });
    }

    setVal = (k) => {
        this.setState({
            val: k
        });
    }

    updateHead = (x, y, sign) => {
        const oldpos = [...this.state.positions];
        const step = this.state.squareSize;
        const limit = this.state.windowSize;

        if (x == null && y == null) {
            return;
        }
        if (x == null) {

            if (sign) {
                oldpos[0][1] = mod(oldpos[0][1] + step, limit);
            }
            else
                oldpos[0][1] = mod(oldpos[0][1] - step, limit);
        }
        if (y == null) {

            if (sign) {
                oldpos[0][0] = mod(oldpos[0][0] + step, limit);
            }
            else
                oldpos[0][0] = mod(oldpos[0][0] - step, limit);
        }

        this.setState({
            ...this.state,
            positions: [...oldpos]
        });
    }

    handleKeyPress = (event) => {
        event.preventDefault();
        console.log(event)
        switch (event.key) {
            case 'ArrowUp':
                this.setVal('up');
                this.updateHead(null, 1, false);
                break;
            case 'ArrowDown':
                this.setVal('down');
                this.updateHead(null, 1, true);
                break;
            case 'ArrowLeft':
                this.setVal('left');
                this.updateHead(1, null, false);
                break;
            case 'ArrowRight':
                this.setVal('right');
                this.updateHead(1, null, true);
                break;
            default:
                this.setVal('Press up / down / left / right to move');
                break;
        }
    }



    render() {
        return (<Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <p>
                        This is just another snake game, move snake, eat to grow, dont eat yourself!
                </p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    {/* <h1>Here will be the snake game block</h1> */}
                    <SnakeGrid
                        height={this.state.windowSize}
                        squareSize={this.state.squareSize}
                        positions={this.state.positions}
                    />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    {this.state.val}
                </Col>
                <Col md="auto">
                    {this.state.windowSize}
                </Col>
            </Row>
        </Container>
        );
    }

}


export default SnakeCard;