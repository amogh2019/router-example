
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SnakeGrid from './SnakeGrid';
import { mod } from '../utils/helper';

const initialState = {
    val: 'Press up / down / left / right to move',
    windowSize: 400,
    squareSize: 10,
    positions: [[100, 200], [90, 200], [80, 200], [70, 200], [60, 200], [50, 200]],
    directions: [1, 1, 1, 1, 1, 1, 1],
    maxLength: 6,
    foodPosition: [135, 135]
};

const getInitialState = () => {
    return JSON.parse(JSON.stringify(initialState));
}

class SnakeCard extends React.Component {

    constructor(props) {
        super(props);
        const { windowSize = 400 } = props;
        this.state = { ...getInitialState(), windowSize };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        setInterval(() => this.relocate(), 300);
    }

    relocate = () => {

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
            //console.log(pos + ' ' + id);
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

        // if repeats found in position // snake ate itself
        const positionsCountMap =
            this.state.positions
                .reduce((acc, iposArr) => ({
                    ...acc,
                    [iposArr]: (acc[iposArr] || 0) + 1
                }), {});
        const duplicateFound = Object.values(positionsCountMap).some(posCount => posCount > 1);

        if (duplicateFound) {
            this.setState({
                ...getInitialState()
            });
        } else {
            this.setState({
                ...this.state,
                positions: [...oldpos],
                directions: [...newDirections]
            });
        }
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

        const dirToIndex = {
            'ArrowUp': 4,
            'ArrowDown': 2,
            'ArrowLeft': 3,
            'ArrowRight': 1
        };

        // snake cant move back
        const currentHeadDirection = this.state.directions[0];
        let oppositeDirectionIndex = (currentHeadDirection + 2) % 4;
        if (oppositeDirectionIndex === 0) {
            oppositeDirectionIndex = 4;
        }

        if (dirToIndex[event.key] === oppositeDirectionIndex) {
            return;
        }

        // update head direction
        switch (event.key) {
            case 'ArrowUp':
                this.setVal('up');
                this.updateHeadDirection(dirToIndex[event.key]);
                break;
            case 'ArrowDown':
                this.setVal('down');
                this.updateHeadDirection(dirToIndex[event.key]);
                break;
            case 'ArrowLeft':
                this.setVal('left');
                this.updateHeadDirection(dirToIndex[event.key]);
                break;
            case 'ArrowRight':
                this.setVal('right');
                this.updateHeadDirection(dirToIndex[event.key]);
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
                        This is just another snake game, move snake, eat to grow, dont bite yourself!
                </p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto pl-0">
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
            <Row className="mt-5 justify-content-md-center">
                <Col md="auto">
                    Current Length : {this.state.positions.length}
                </Col>
                <Col md="auto">
                    Max Length : {this.state.maxLength}
                </Col>
            </Row>
        </Container>
        );
    }

}


export default SnakeCard;