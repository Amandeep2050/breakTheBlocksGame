const r = require("raylib");
const geometry = require("./geometry");

function moveContoller(controller, window) {
    if (r.IsKeyDown(r.KEY_RIGHT)) {
        if (controller.x + controller.width !== window.width) controller.x += controller.velocity;
    }
    if (r.IsKeyDown(r.KEY_LEFT)) {
        if (controller.x !== 0) controller.x -= controller.velocity;
    }
}

function isCollisionWithController(controller, ball) {
    return geometry.checkCollision(controller.y, controller.x, controller.width, controller.height, ball.x, ball.y, ball.radius, false);
}

function bounceBallFromController(ball) {
    ball.yAxisFactor = -ball.yAxisFactor;
}

module.exports = {
    moveContoller,
    isCollisionWithController,
    bounceBallFromController,
}