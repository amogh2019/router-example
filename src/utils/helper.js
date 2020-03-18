
export const mod = (n, m) => {
    return ((n % m) + m) % m;
}



export const getRandomPos = (stepSize, windowSize) => {
    const range = Math.floor(windowSize / stepSize);

    return [
        (Math.floor((Math.random() * range))) * stepSize,
        (Math.floor((Math.random() * range))) * stepSize
    ]
}

export const getOppositeDirectionValue = (currentDirection) => {
    let oppositeDirectionIndex = (currentDirection + 2) % 4;
    if (oppositeDirectionIndex === 0) {
        oppositeDirectionIndex = 4;
    }
    return oppositeDirectionIndex;
}