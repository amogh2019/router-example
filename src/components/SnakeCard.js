
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
        setInterval(() => this.relocate(), 300);
    }

    relocate = () => {
        console.log("here");
        this.state.positions.forEach((pos, id) => {
            this.updateHead(this.state.directions[id]);
        });
    }

    setVal = (k) => {
        this.setState({
            val: k
        });
    }

    updateHead = (dir) => {
        const oldpos = [...this.state.positions];
        const step = this.state.squareSize;
        const limit = this.state.windowSize;

        switch (dir) {
            case 1:
                oldpos[0][0] = mod(oldpos[0][0] + step, limit);
                break;
            case 2:
                oldpos[0][1] = mod(oldpos[0][1] + step, limit);
                break;
            case 3:
                oldpos[0][0] = mod(oldpos[0][0] - step, limit);
                break;
            case 4:
                oldpos[0][1] = mod(oldpos[0][1] - step, limit);
                break;
            default:
                break;
        }

        this.setState({
            ...this.state,
            positions: [...oldpos]
        });
    }

    updateHeadDirection = (dir) => {
        const oldDir = [...this.state.directions];

        oldDir[0] = dir;
        this.setState({
            ...this.state,
            directions: [...oldDir]
        });
    }

    handleKeyPress = (event) => {
        event.preventDefault();
        console.log(event)
        switch (event.key) {
            case 'ArrowUp':
                this.setVal('up');
                this.updateHeadDirection(4);
                break;
            case 'ArrowDown':
                this.setVal('down');
                this.updateHeadDirection(2);
                break;
            case 'ArrowLeft':
                this.setVal('left');
                this.updateHeadDirection(3);
                break;
            case 'ArrowRight':
                this.setVal('right');
                this.updateHeadDirection(1);
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