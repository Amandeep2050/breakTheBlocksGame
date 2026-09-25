function calcOffset(outer, inner) {
    return (outer - inner) / 2;
}

function checkCollision(yOfRect, xOfRect, width, height, centerX, centerY, radius) {
    const decision = yOfRect + height >= centerY - radius && xOfRect + width >= centerX - radius && yOfRect <= centerY + radius && xOfRect <= centerX + radius;

    return decision;
}

module.exports = {
    calcOffset,
    checkCollision,
}; 