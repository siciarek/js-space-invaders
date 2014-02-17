/**
 * Controls
 */

var KEY_RIGTH = 39;
var KEY_LEFT = 37;

var KEY_UP = 38;
var KEY_SPACE = 32;

$(document).keydown(function (evt) {
    switch (evt.keyCode) {
        case KEY_RIGTH:
            player.moveRight();
            break;
        case KEY_LEFT:
            player.moveLeft();
            break;
    }
});

$(document).keyup(function (evt) {
    if (evt.keyCode === KEY_SPACE || evt.keyCode === KEY_UP) {
        player.fire();
    }
});
