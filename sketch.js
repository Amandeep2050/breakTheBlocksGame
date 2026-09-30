const r = require("raylib");
const block = require("./blocks_function");
const controller_fn = require("./controller_functions");
const ball_fn = require("./ball_functions");

const window = {
    width: 900,
    height: 600,
    color: r.WHITE,
};

const controller = {
    x: 350,
    y: 500,
    width: 200,
    height: 10,
    velocity: 10,
};

const ball = {
    x: 10,
    y: 300,
    radius: 10,
    color: r.RED,
    xAxisFactor: 2,
    yAxisFactor: 2,
};

const blocks = {
    width: 60,
    height: 20,
    margin: 30,
    color: r.BLUE,
}

const gapFromWindowX = window.width % blocks.width;

const spaceToDrawRect = window.width - 2 * blocks.margin;
const extraSpace = spaceToDrawRect % 60;
const numberOfRect = (spaceToDrawRect - extraSpace) / 60;

const lookUpForRectangle = new Array(numberOfRect).fill(true);

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const windowTitle = "Break the Block";
    const windowFPS = 100;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(window.width, window.height, windowTitle);
    r.SetTargetFPS(windowFPS);
}

function update() {
    ball_fn.changeBallPosition(ball);

    if (controller_fn.isCollisionWithController(controller, ball)) controller_fn.bounceBallFromController(ball);

    ball_fn.deflectBallFromWalls(ball, window);
    block.changeVelocity(numberOfRect, gapFromWindowX, blocks, ball, lookUpForRectangle);
    block.updateLookUp(numberOfRect, gapFromWindowX, blocks, ball, lookUpForRectangle);

    controller_fn.moveContoller(controller, window);
}


function draw() {
    r.BeginDrawing();
    r.ClearBackground(window.color);

    r.DrawCircle(ball.x, ball.y, ball.radius, ball.color);

    block.drawRectangles(numberOfRect, gapFromWindowX, blocks, ball, lookUpForRectangle);

    r.DrawRectangle(controller.x, controller.y, controller.width, controller.height, r.BLACK);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};