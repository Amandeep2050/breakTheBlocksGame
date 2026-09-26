const r = require("raylib");
const geometry = require("./geometry");

const windowWidth = 900;
const windowHeight = 600;
const windowTitle = "Break the Block";
const windowFPS = 100;
const windowColor = r.WHITE;

function drawRectangles(numberOfRect, gapFromWindowX, marginX, marginY, rectWidth, rectHeight, rectColor) {
    if (numberOfRect === 0) return;

    r.DrawRectangle(gapFromWindowX, marginY, rectWidth, rectHeight, rectColor);
    const nextGap = gapFromWindowX + rectWidth + 2 * marginX;

    drawRectangles(numberOfRect - 1, nextGap, marginX, marginY, rectWidth, rectHeight, rectColor);
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
const gapFromWindowX = windowWidth % blockWidth;

function draw() {
    // draw the current state
    r.BeginDrawing();

    r.ClearBackground(windowColor);

    r.DrawCircle(centerX, centerY, ballRadius, ballColor);

    const spaceToDrawRect = windowWidth - 2 * margin;
    const extraSpace = spaceToDrawRect % 60;
    const numberOfRect = (spaceToDrawRect - extraSpace) / 60;
    drawRectangles(numberOfRect, gapFromWindowX, margin, margin, blockWidth, blockHeight, r.BLUE);

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