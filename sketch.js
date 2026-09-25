const r = require("raylib");
const geometry = require("./geometry");

const windowWidth = 900;
const windowHeight = 600;
const windowTitle = "Break the Block";
const windowFPS = 100;
const windowColor = r.WHITE;

function drawRectangles(numberOfRect, prevX, prevY, width, height, color) {
    let tempColor = color;

    if (numberOfRect === 1) {
        return;
    }

    if (geometry.checkCollision(prevY, prevX, width, height, centerX, centerY, ballRadius)) {
        yAxisFactor = -yAxisFactor;
        tempColor = r.WHITE;
    }

    r.DrawRectangle(prevX, prevY, width, height, tempColor);
    drawRectangles(numberOfRect - 1, prevX + width + 5, prevY, width, height, color);
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, windowTitle);
    r.SetTargetFPS(windowFPS);
}

let controllerX = 350;
const controllerY = 500;
const controllerWidth = 200;
const controllerHeight = 10;

let centerX = 10;
let centerY = 300;
const ballRadius = 10;
const ballColor = r.RED;
let xAxisFactor = 2;
let yAxisFactor = 2;

function update() {
    centerX += xAxisFactor;
    centerY += yAxisFactor;

    const collisionWithController = geometry.checkCollision(controllerY, controllerX, controllerWidth, controllerHeight, centerX, centerY, ballRadius);

    // collision
    if (collisionWithController) {
        // xAxisFactor = -xAxisFactor;
        yAxisFactor = -yAxisFactor;
    }
    if (centerX === windowWidth - ballRadius || centerX === 10) {
        xAxisFactor = -xAxisFactor;
    }
    if (centerY === 10) {
        yAxisFactor = -yAxisFactor;
    }
    if (centerY === windowHeight - ballRadius) {
        // yAxisFactor = -yAxisFactor;
        r.CloseWindow();
    }

    // controller
    if (r.IsKeyDown(r.KEY_RIGHT)) {
        if (controllerX + controllerWidth !== windowWidth) controllerX += 5;
    }
    if (r.IsKeyDown(r.KEY_LEFT)) {
        if (controllerX !== 0) controllerX -= 5;
    }
}

const blockWidth = 60;
const blockHeight = 20;
const margin = 30;

function draw() {
    // draw the current state
    r.BeginDrawing();

    r.ClearBackground(windowColor);

    r.DrawCircle(centerX, centerY, ballRadius, ballColor);

    drawRectangles((windowWidth - 2 * margin) / 60, margin, margin, blockWidth, blockHeight, r.BLUE);

    r.DrawRectangle(controllerX, controllerY, controllerWidth, controllerHeight, r.BLACK);

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