const Position = Object.freeze({
    Center: Symbol("center"),
    Left: Symbol("left"),
    Right: Symbol("right"),
    TopLeft: Symbol("topleft"),
    TopRight: Symbol("topright"),
    BottomLeft: Symbol("bottomleft"),
    BottomRight: Symbol("bottomright")
});

function moveWindow(position) {
    const client = workspace.activeClient;
    const screen = workspace.clientArea(KWin.MaximizeArea, client);

    const outerPadding = 40;
    const innerPadding = 10;

    let posX;
    let posY;
    let width;
    let height;

    const Widths = {
        Full: screen.width - outerPadding * 2,
        Half: screen.width / 2 - outerPadding - innerPadding
    };

    const Heights = {
        Full: screen.height - outerPadding * 2,
        Half: screen.height / 2 - outerPadding - innerPadding
    };

    const PositionsX = {
        Left: screen.left + outerPadding,
        Right: screen.right - screen.width / 2 + innerPadding
    };

    const PositionsY = {
        Top: screen.top + outerPadding,
        Bottom: screen.bottom - screen.height / 2 + innerPadding
    }

    switch (position) {
        case Position.Center:
            width = Widths.Full;
            height = Heights.Full;
            posX = PositionsX.Left;
            posY = PositionsY.Top;
            break;
        case Position.Left:
            width = Widths.Half;
            height = Heights.Full;
            posX = PositionsX.Left;
            posY = PositionsY.Top;
            break;
        case Position.Right:
            width = Widths.Half;
            height = Heights.Full;
            posX = PositionsX.Right;
            posY = PositionsY.Top;
            break;
        case Position.TopLeft:
            width = Widths.Half;
            height = Heights.Half;
            posX = PositionsX.Left;
            posY = PositionsY.Top;
            break;
        case Position.TopRight:
            width = Widths.Half;
            height = Heights.Half;
            posX = PositionsX.Right;
            posY = PositionsY.Top;
            break;
        case Position.BottomLeft:
            width = Widths.Half;
            height = Heights.Half;
            posX = PositionsX.Left;
            posY = PositionsY.Bottom;
            break;
        case Position.BottomRight:
            width = Widths.Half;
            height = Heights.Half;
            posX = PositionsX.Right;
            posY = PositionsY.Bottom;
            break;

    }

    client.setMaximize(false, false);

    client.frameGeometry = {
        x: Math.round(posX),
        y: Math.round(posY),
        height: Math.round(height),
        width: Math.round(width),
    };

    client.currentPosition = position;
}

function changeScreen(position) {
    const client = workspace.activeClient;
    let nextScreen;

    if (position === Position.Left) {
        nextScreen = client.screen - 1 > -1 ? client.screen - 1 : workspace.numScreens - 1;
    } else {
        nextScreen = client.screen + 1 < workspace.numScreens ? client.screen + 1 : 0;
    }

    workspace.sendClientToScreen(client, nextScreen);

    if (client.currentPosition) {
        moveWindow(client.currentPosition);
    }
    
}

registerShortcut("Tile Window to the Center", "Tile Window to the Center", "Meta+Num+5", function () {
    moveWindow(Position.Center);
});

registerShortcut("Tile Window to the Left", "Tile Window to the Left", "Meta+Num+4", function () {
    moveWindow(Position.Left);
});

registerShortcut("Tile Window to the Right", "Tile Window to the Right", "Meta+Num+6", function () {
    moveWindow(Position.Right);
});

registerShortcut("Tile Window to the Bottom Left", "Tile Window to the Bottom Left", "Meta+Num+1", function () {
    moveWindow(Position.BottomLeft);
});

registerShortcut("Tile Window to the Bottom Right", "Tile Window to the Bottom Right", "Meta+Num+3", function () {
    moveWindow(Position.BottomRight);
});

registerShortcut("Tile Window to the Top Left", "Tile Window to the Top Left", "Meta+Num+7", function () {
    moveWindow(Position.TopLeft);
});

registerShortcut("Tile Window to the Top Right", "Tile Window to the Top Right", "Meta+Num+9", function () {
    moveWindow(Position.TopRight);
});

registerShortcut("Move (and tile) window to the left screen", "Move (and tile) window to the left screen", "Meta+Left", function () {
    changeScreen(Position.Left);
});

registerShortcut("Move (and tile) window to the right screen", "Move (and tile) window to the right screen", "Meta+Right", function () {
    changeScreen(Position.Right);
});

