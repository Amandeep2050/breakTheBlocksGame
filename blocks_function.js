const r = require("raylib")
const geometry = require("./geometry");

function isCollisionWithBlocks(numberOfRect, gapFromWindowX, blocks, ball, lookUpForRectangle) {
    if (lookUpForRectangle[numberOfRect - 1] === true) {
        let collision = geometry.checkCollision(blocks.margin, gapFromWindowX, blocks.width, blocks.height, ball.x, ball.y, ball.radius);
        return collision;
    }
}

function changeVelocity(numberOfRect, gapFromWindowX, blocks, ball, lookUpForRectangle) {

    if (numberOfRect === 0) return;

    const collision = isCollisionWithBlocks(numberOfRect, gapFromWindowX, blocks, ball, lookUpForRectangle);
    if (collision) {
        lookUpForRectangle[numberOfRect - 1] = false;
        ball.yAxisFactor = -ball.yAxisFactor;
    }

    const nextGap = gapFromWindowX + blocks.width + 2 * blocks.margin;

    changeVelocity(numberOfRect - 1, nextGap, blocks, ball, lookUpForRectangle);
}

function updateLookUp(numberOfRect, gapFromWindowX, blocks, ball, lookUpForRectangle) {
    if (numberOfRect === 0) return;

    const collision = isCollisionWithBlocks(numberOfRect, gapFromWindowX, blocks, ball, lookUpForRectangle);
    if (collision) {
        lookUpForRectangle[numberOfRect - 1] = false;
    }

    const nextGap = gapFromWindowX + blocks.width + 2 * blocks.margin;

    updateLookUp(numberOfRect - 1, nextGap, blocks, ball, lookUpForRectangle);
}

function drawRectangles(numberOfRect, gapFromWindowX, blocks, ball, lookUpForRectangle,) {
    if (numberOfRect === 0) return;

    if (lookUpForRectangle[numberOfRect - 1] === true) {
        r.DrawRectangle(gapFromWindowX, blocks.margin, blocks.width, blocks.height, blocks.color);
    }

    const nextGap = gapFromWindowX + blocks.width + 2 * blocks.margin;

    drawRectangles(numberOfRect - 1, nextGap, blocks, ball, lookUpForRectangle);
}

module.exports = {
    changeVelocity,
    updateLookUp,
    drawRectangles,
};