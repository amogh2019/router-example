import React from 'react';

const SnakeGrid = (props) => {
    const { height = 400, positions = [[100, 200]], squareSize = 10 } = props;

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

    </div>
}


export default SnakeGrid
