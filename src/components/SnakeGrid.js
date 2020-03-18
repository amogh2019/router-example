import React from 'react';

const SnakeGrid = (props) => {
    const { height = 400, positions = [[100, 200]], squareSize = 10, foodPosition = [130, 130] } = props;

    const fieldStyle = {
        width: height,
        height: height
    };

    const elementStyle = (x, y) => {
        const ans = {
            position: 'absolute',
            left: x,
            top: y,
            width: squareSize,
            height: squareSize
        }
        return ans;
    }

    let food = null;
    if (foodPosition != null) {
        food = <div
            style={elementStyle(foodPosition[0], foodPosition[1])}
            className="bg-danger"
        />
    }

    return <div
        style={fieldStyle}
        className="bg-secondary"
    >
        {
            positions.map((elem, id) => {
                return <div
                    style={elementStyle(elem[0], elem[1])}
                    className="bg-warning"
                    key={id}
                />
            })
        }
        {food}
    </div>
}


export default SnakeGrid
