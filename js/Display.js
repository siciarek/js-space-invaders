var Display = function (canvas) {
    canvas = canvas || 'display';
    this.canvas = document.getElementById(canvas);
    this.canvas.setAttribute('width', 800);
    this.canvas.setAttribute('height', 600);

    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.images = {
        win: new Image(),
        lose: new Image()
    };

    this.images.win.src = 'images/game/win.png';
    this.images.lose.src = 'images/game/lose.png';

    this.init();
    this.frame = 0;
};

Display.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);
};

Display.prototype.init = function () {
    this.clear();
};

Display.prototype.draw = function (object) {
    this.context.drawImage(object.currimg, object.x, object.y);
};

Display.prototype.run = function () {


    var win = true;
    var lose = false;

    this.frame++;
    this.frame %= FPS;

    this.clear();

    // Draw saucer:

    if (saucer !== null) {
        if (saucer.animate(this.frame) === false) {
            saucer = null;
        }
        else {
            this.draw(saucer);
        }
    }

    // Draw player:

    this.draw(player);

    if(player.alive === false) {
        player.imgindex++;

        if(!(player.imgindex < player.images.length)) {
            lose = true;
        }

        player.currimg = player.images[player.imgindex];
    }

    // Draw aliens:

    invasion.update(this.frame);

    for (var r = 0; r < invasion.rows; r++) {
        for (var c = 0; c < invasion.cols; c++) {
            var i = invasion.invaders[r][c];

            if (i.exploded === false) {
                i.animate(this.frame);
                this.draw(i);

                if (i.alive === true) {
                    win = false;

                    if ((i.y + i.height > this.height - 16)) {
                        lose = true;
                    }
                }
            }
        }

    }

    // Draw projectiles:

    for (var id in projectiles) {
        if (projectiles.hasOwnProperty(id)) {
            var p = projectiles[id];
            p.update();

            if (p.y < 0) {
                delete projectiles[id];
                continue;
            }

            this.draw(p);
            p.hit();
        }
    }


    // Check if Game is over:

    if (win === true) {
        this.context.drawImage(this.images.win, 0, (this.height - this.images.win.height) / 2)
        window.clearInterval(interval);
        return;
    }

    if (lose === true) {
        this.context.drawImage(this.images.lose, 0, (this.height - this.images.lose.height) / 2)
        window.clearInterval(interval);
    }
};
