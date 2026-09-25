const r = require("raylib");

const windowWidth = 900;
const windowHeight = 600;
const windowTitle = "Break the Block";
const windowFPS = 100;
const windowColor = r.WHITE;

let centerX = 10;
let centerY = 300;
const ballRadius = 10;
const ballColor = r.RED;
let xAxisFactor = 2;
let yAxisFactor = 2;

function checkCollision(yOfRect, xOfRect, width, height, centerX, centerY, radius) {
    const decision = yOfRect + height >= centerY - radius && xOfRect + width >= centerX - radius && yOfRect <= centerY + radius && xOfRect <= centerX + radius;

    return decision;
}

function choseColor(yOfRect, xOfRect, width, height, centerX, centerY, radius, prevColor) {
    return checkCollision(yOfRect, xOfRect, width, height, centerX, centerY, radius) ? r.WHITE : prevColor;
}

function rectangle(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function isDrawable(x, y, width, height, color) {
    if (color === r.WHITE) return;
    rectangle(x, y, width, height, color);
}

function drawRectangles(numberOfRect, prevX, prevY, width, height, color) {
    if (numberOfRect === 1) {
        return;
    }
    const tempColor = choseColor(prevY, prevX, width, height, centerX, centerY, ballRadius, color);
    if (checkCollision(prevY, prevX, width, height, centerX, centerY, ballRadius)) {
        yAxisFactor = -yAxisFactor;
    }
    r.DrawRectangle(prevX, prevY, width, height, tempColor);
    drawRectangles(numberOfRect - 1, prevX + width + 5, prevY, width, height, color);
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, windowTitle);
    r.SetTargetFPS(windowFPS);
}

let controllerX = 350;
const controllerY = 500;
const controllerWidth = 200;
const controllerHeight = 10;

function update() {
    // update
    centerX += xAxisFactor;
    centerY += yAxisFactor;

    const collisionWithController = checkCollision(controllerY, controllerX, controllerWidth, controllerHeight, centerX, centerY, ballRadius);

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

// rows
const row1 = 30;
const row2 = 55;
const row3 = 80;

// columns
const col1 = 250;
const col2 = col1;

function draw() {
    r.BeginDrawing();

    r.ClearBackground(windowColor);

    r.DrawCircle(centerX, centerY, ballRadius, ballColor);

    // drawRectangles((windowWidth - 2 * margin) / 60, margin, margin, blockWidth, blockHeight, r.BLUE);
    rectangle(30, 30, blockWidth, blockHeight, color1);
    rectangle();

    r.DrawRectangle(controllerX, controllerY, controllerWidth, controllerHeight, r.BLACK);

    // checkCollisionForEachRect((windowWidth - 2 * margin) / 60, margin, margin, blockWidth, blockHeight, ballRadius, r.BLUE);

    isDrawable()

    r.EndDrawing();
}

function loop() {
    while (!r.WindowShouldClose()) {
        draw();
        update();
    }
}

function main() {
    setup();
    loop();
    r.CloseWindow();
}

main();
