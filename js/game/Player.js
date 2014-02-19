var Player = function(display, imgdir) {
    imgdir = imgdir || 'images';
    this.display = display;

    var images = [
        new Image(),
        new Image(),
        new Image()
    ];

    images[0].src = imgdir + '/player/0.png';
    images[1].src = imgdir + '/player/X1.png';
    images[2].src = imgdir + '/player/X2.png';

    this.images = images;
    this.imgindex = 0;
    this.currimg = this.images[this.imgindex];

    this.top = 16;

    this.width = this.currimg.width;
    this.height = this.currimg.height;

    this.width = 16 * 4;
    this.height = 8 * 4;

    this.x = (this.display.width - this.width) / 2;
    this.y = (this.display.height - this.height - this.top);
    this.step = 8;


    this.shields = {};

    this.shieldcount = 4;

    for(var s = 0; s < this.shieldcount; s++) {

        var shield = new Shield(0, 0);

        var x = 64 + s * this.display.width / this.shieldcount - 8;
        var y = this.display.height - shield.height - 64;

        shield.move(x, y);
        this.shields[shield.id] = shield;
    }
};

Player.prototype.hit = function (projectile) {

    var xoff = [0, 0];

    var hit =
        projectile.x > (this.x + xoff[0] * 4)
            && projectile.x < (this.x + this.width - xoff[1] * 4)
            && projectile.y > (this.y - this.height)
            && projectile.y < this.y;

    if (hit === true) {
        this.alive = false;
        projectile.explode();
    }

    return hit;
};


Player.prototype.fire = function() {

    for(var id in projectiles) {
        if(projectiles.hasOwnProperty(id)) {
            if(projectiles[id].type === 'player') {
                return;
            }
        }
    }

    var p = new Projectile(
        this.x + this.width / 2,
        this.y - this.height,
        -15,
        'player'
    );


    projectiles[p.id] = p;
};

Player.prototype.moveRight = function() {
    var x = this.x + this.step;
    if(x < (this.display.width - this.width)) {
        this.x = x;
    }
};

Player.prototype.moveLeft = function() {
    var x = this.x - this.step;
    if(x > 0) {
        this.x = x;
    }
};
