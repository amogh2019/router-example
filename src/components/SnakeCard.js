
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SnakeGrid from './SnakeGrid';
import { mod, getRandomPos, getOppositeDirectionValue } from '../utils/helper';
import Swipe from 'react-easy-swipe';

const initialState = {
    val: 'Press up / down / left / right to move',
    windowSize: 400,
    squareSize: 10,
    positions: [[100, 200], [90, 200], [80, 200], [70, 200], [60, 200], [50, 200]],
    directions: [1, 1, 1, 1, 1, 1, 1],
    maxLength: 6,
    foodPosition: getRandomPos(10, 400)
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
        setInterval(() => this.relocate(), 100);
    }

    relocate = () => {

        // when updating single point based on its direction
        // this.state.positions.forEach((pos, id) => {
        //     this.updatePoint(this.state.directions[id], id);
        // });

        // for updating all points
        // move points
        const oldpos = [...this.state.positions];
        const oldLastPositionX = this.state.positions[this.state.positions.length - 1][0];
        const oldLastPositionY = this.state.positions[this.state.positions.length - 1][1];
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
        const oldLastPositionDirection = this.state.directions[this.state.directions.length - 1];
        const newDirections = [last];
        this.state.directions.forEach((dir, id) => {
            if (id > 0) {
                newDirections.push(last);
                last = dir;
            }
        });

        // if food found on head // relocate food // increase length at end // update max length
        const headPos = oldpos[0];
        let currentFoodPosition = this.state.foodPosition;
        let oldMaxLength = this.state.maxLength;

        if (headPos.toString() === currentFoodPosition.toString()) {
            // update new food position
            currentFoodPosition = getRandomPos(this.state.squareSize, this.state.windowSize);
            // add new pos
            oldpos.push([oldLastPositionX, oldLastPositionY]);
            // add new direction
            newDirections.push(oldLastPositionDirection);
        }


        // if repeats found in current position // snake tried ate itself
        const positionsCountMap =
            oldpos
                .reduce((acc, iposArr) => ({
                    ...acc,
                    [iposArr]: (acc[iposArr] || 0) + 1
                }), {});
        const duplicateFound = Object.values(positionsCountMap).some(posCount => posCount > 1);

        if (duplicateFound) {
            this.setState({
                ...getInitialState(),
                maxLength: oldMaxLength
            });
        } else {
            this.setState({
                ...this.state,
                positions: [...oldpos],
                directions: [...newDirections],
                foodPosition: currentFoodPosition,
                maxLength: oldpos.length > oldMaxLength ? oldpos.length : oldMaxLength
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
        let oppositeDirectionIndex = getOppositeDirectionValue(currentHeadDirection);

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

    changeDirectionOnClick = (direction) => {
        const event = {
            key: direction,
            preventDefault: () => { }
        }
        this.handleKeyPress(event);
    }

    disableScrollForSwipeInGridMobileView = (pos, event) => {
        return true;
    }

    render() {
        return (<Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs="auto">
                    <p>
                        This is just another snake game, move snake, eat to grow, dont bite yourself!
                </p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs="auto pl-0">
                    {/* <h1>Here will be the snake game block</h1> */}
                    <Swipe 
                        onSwipeLeft={() => this.changeDirectionOnClick('ArrowLeft')}
                        onSwipeRight={() => this.changeDirectionOnClick('ArrowRight')}
                        onSwipeUp={() => this.changeDirectionOnClick('ArrowUp')}
                        onSwipeDown={() => this.changeDirectionOnClick('ArrowDown')}
                        onSwipeMove={(pos, event) => this.disableScrollForSwipeInGridMobileView(pos, event)}
                        allowMouseEvents={true}
                    >
                        <SnakeGrid
                            height={this.state.windowSize}
                            squareSize={this.state.squareSize}
                            positions={this.state.positions}
                            foodPosition={this.state.foodPosition}
                        />
                    </Swipe>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs="auto">
                    {this.state.val}
                </Col>
                <Col xs="auto">
                    {this.state.windowSize}
                </Col>
            </Row>
            <Row className="mt-5 justify-content-md-center">
                <Col xs="auto">
                    Current Length : {this.state.positions.length}
                </Col>
                <Col xs="auto">
                    Max Length : {this.state.maxLength}
                </Col>
            </Row>
            <Row className="mt-5 justify-content-md-center">
                <Col xs="auto" onClick={() => this.changeDirectionOnClick('ArrowLeft')} >
                    <svg class="bi bi-chevron-left" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M13.354 3.646a.5.5 0 010 .708L7.707 10l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd" />
                    </svg>
                </Col>
                <Col xs="auto" onClick={() => this.changeDirectionOnClick('ArrowRight')} >
                    <svg class="bi bi-chevron-left" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clip-rule="evenodd" />
                    </svg>
                </Col>
                <Col xs="auto" onClick={() => this.changeDirectionOnClick('ArrowUp')} >
                    <svg class="bi bi-chevron-up" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M9.646 6.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L10 7.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clip-rule="evenodd" />
                    </svg>
                </Col>
                <Col xs="auto" onClick={() => this.changeDirectionOnClick('ArrowDown')} >
                    <svg class="bi bi-chevron-down" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3.646 6.646a.5.5 0 01.708 0L10 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd" />
                    </svg>
                </Col>
            </Row>
        </Container>
        );
    }

}


export default SnakeCard;