var DIR_RIGHT = 'right';
var DIR_LEFT = 'left';

var Invasion = function (display) {
    this.display = display;
    this.rows = 5;
    this.cols = 11;

    this.progress = 0;

    this.invaders = [];

    this.types = ['C', 'B', 'B', 'A', 'A'];

    for (var r = 0; r < this.rows; r++) {
        this.invaders[r] = [];
        var type = this.types[r];
        for (var c = 0; c < this.cols; c++) {
            var alien = new Alien(type);
            alien.move(c * alien.width + 16, r * (alien.height + 16) + 64);
            this.invaders[r][c] = alien;
        }
    }

    this.stepHorizontal = 8;
    this.oldStepHorizontal = this.stepHorizontal;
    this.stepVertical = 16;
    this.speed = 30;

    this.dir = DIR_RIGHT;
};

Invasion.prototype.update = function (frame) {
    if (frame % this.speed === 0) {

        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
                var alien = this.invaders[r][c];
                var nx = alien.x + this.stepHorizontal;
                var ny = alien.y;
                alien.move(nx, ny);

                if (Math.random() < 0.05) {
                    if (alien.alive === true) {
                        var fire = true;

                        for (var tr = r + 1; tr < this.rows; tr++) {
                            if (this.invaders[tr][c].exploded === false) {
                                fire = false;
                                break;
                            }
                        }

                        if (fire === true) {
//                            alien.fire();
                        }
                    }
                }
            }
        }

        if (this.invaders[0][0].x > 64 + 16) {
            this.stepHorizontal *= -1;
            this.dir = DIR_LEFT;
        }

        if (this.invaders[0][0].x < 16) {
            this.stepHorizontal *= -1;
            this.oldStepHorizontal = this.stepHorizontal;
            this.dir = DIR_RIGHT;
        }

        if (this.dir === DIR_LEFT && this.oldStepHorizontal !== this.stepHorizontal) {
            this.oldStepHorizontal = this.stepHorizontal;

            for (var r = 0; r < this.rows; r++) {
                for (var c = 0; c < this.cols; c++) {
                    var alien = this.invaders[r][c];
                    var nx = alien.x + this.stepHorizontal;
                    var ny = alien.y;
                    alien.move(nx, ny + this.stepVertical);
                }
            }

            if (++this.progress % 3 === 0) {
                var xstart = this.display.width;
                saucer = new Saucer(xstart);
            }

            if (this.progress % 2 === 0) {
                this.speed = Math.ceil(this.speed / 2);
                this.speed = this.speed < 4 ? 4 : this.speed;
            }
        }
    }
};