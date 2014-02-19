/**
 * Controller
 */

var KEY_RIGTH = 39;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_SPACE = 32;

var KEY_W = 87;
var KEY_S = 83;
var KEY_A = 65;
var KEY_D = 68;

$(document).keydown(function (evt) {
    switch (evt.keyCode) {
        case KEY_A:
        case KEY_LEFT:
            player.moveLeft();
            break;
        case KEY_D:
        case KEY_RIGTH:
            player.moveRight();
            break;
    }
});

$(document).keyup(function (evt) {

    switch (evt.keyCode) {
        case KEY_SPACE:
        case KEY_UP:
        case KEY_W:
        case KEY_S:
            if (interval === null) {
                 main();
            }
            else {
                player.fire();
            }
            break;
    }
});
