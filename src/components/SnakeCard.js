
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
            positions: [[100, 200], [110, 200], [120, 200]],
            directions: [1, 1, 1]
        };
    }
    //const { theme, label } = props;

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        setInterval(() => this.relocate(), 300);
    }

    relocate = () => {
        console.log("here");
        // when updating single point based on its direction
        // this.state.positions.forEach((pos, id) => {
        //     this.updatePoint(this.state.directions[id], id);
        // });

        // for updating all points
        // move points
        const oldpos = [...this.state.positions];
        const step = this.state.squareSize;
        const limit = this.state.windowSize;
        this.state.positions.forEach((pos, id) => {
            console.log(pos + ' ' + id);
            switch (this.state.directions[id]) {
                case 1:
                    oldpos[id][0] = mod(oldpos[id][0] + step, limit);
                    break;
                case 2:
                    oldpos[id][1] = mod(oldpos[id][1] + step, limit);
                    break;
                case 3:
                    oldpos[id][0] = mod(oldpos[id][0] - step, limit);
                    break;
                case 4:
                    oldpos[id][1] = mod(oldpos[id][1] - step, limit);
                    break;
                default:
                    break;
            }
        });
        // shift direction to right by one step // keeping the first element as it is 
        // assumes this is a blocking thread and while this operation executes, all update head queries wait

        let last = this.state.directions[0];
        const newDirections = [last];
        this.state.directions.forEach((dir, id) => {
            if (id > 0) {
                newDirections.push(last);
                last = dir;
            }
        });

        this.setState({
            ...this.state,
            positions: [...oldpos],
            directions: [...newDirections]
        });
    }

    setVal = (k) => {
        this.setState({
            val: k
        });
    }

    updatePoint = (dir, id) => {
        const oldpos = [...this.state.positions];
        const step = this.state.squareSize;
        const limit = this.state.windowSize;

        switch (dir) {
            case 1:
                oldpos[id][0] = mod(oldpos[id][0] + step, limit);
                break;
            case 2:
                oldpos[id][1] = mod(oldpos[id][1] + step, limit);
                break;
            case 3:
                oldpos[id][0] = mod(oldpos[id][0] - step, limit);
                break;
            case 4:
                oldpos[id][1] = mod(oldpos[id][1] - step, limit);
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