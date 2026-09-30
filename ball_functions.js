const r = require("raylib");

function changeBallPosition(ball) {
    ball.x += ball.xAxisFactor;
    ball.y += ball.yAxisFactor;
}

function deflectBallFromWalls(ball, window) {
    if (ball.x === window.width - ball.radius || ball.x === 10) ball.xAxisFactor = -ball.xAxisFactor;

    if (ball.y === 10) ball.yAxisFactor = -ball.yAxisFactor;

    if (ball.y === window.height - ball.radius) r.CloseWindow();
}

module.exports = {
    changeBallPosition,
    deflectBallFromWalls,
};