/**
 * An enumeration of the possible positions to move a window to.
 * 
 * The positions are relative to the screen, not the window.
 */
const Position = Object.freeze({
    Center: Symbol("center"),
    Left: Symbol("left"),
    Right: Symbol("right"),
});

/**
 * Moves the window to the specified position on the screen.
 * @param {Client} client The window to move.
 * @param {Position} position The position to move the window to.
 * @returns {void}
 */
function moveWindow(client, position) {
    const screen = workspace.clientArea(KWin.MaximizeArea, client);

    const outerPadding = 40;
    const innerPadding = 10;

    let positionX;
    let width;

    switch (position) {
        case Position.Center:
            width = screen.width - outerPadding * 2;
            positionX = screen.left + outerPadding;
            break;
        case Position.Left:
            width = screen.width / 2 - outerPadding - innerPadding;
            positionX = screen.left + outerPadding;
            break;
        case Position.Right:
            width = screen.width / 2 - outerPadding - innerPadding;
            positionX = screen.right - screen.width / 2 + innerPadding;
            break;
    }

    client.frameGeometry = {
        x: Math.round(positionX),
        y: Math.round(screen.top + outerPadding),
        height: Math.round(screen.height - outerPadding * 2),
        width: Math.round(width),
    };
}

function runScript(position) {
    const client = workspace.activeClient;

    const previousX = client.frameGeometry.x;
    const previousWidth = client.frameGeometry.width;

    moveWindow(client, position);

    // Move window to the next screen if it's already in the desired position
    if (client.frameGeometry.x == previousX && client.frameGeometry.width == previousWidth) {
        let nextScreen = client.screen + 1 < workspace.numScreens ? client.screen + 1 : 0;
        workspace.sendClientToScreen(client, nextScreen);
        moveWindow(client, position);
    }
}

registerShortcut("Tile Window to the Center", "Tile Window to the Center", "Meta+Up", function () {
    runScript(Position.Center);
});

registerShortcut("Tile Window to the Left", "Tile Window to the Left", "Meta+Left", function () {
    runScript(Position.Left);
});

registerShortcut("Tile Window to the Right", "Tile Window to the Right", "Meta+Right", function () {
    runScript(Position.Right);
});
