var projectileCounter = 0;

var Projectile = function (x, y, speed, type, imgdir) {
    imgdir = imgdir || 'images';
    this.id = ++projectileCounter;

    var images = [
        new Image(),
        new Image(),
        new Image(),
        new Image(),
        new Image()
    ];

    images[0].src = imgdir + '/projectile/' + type + '/0.png';
    images[1].src = imgdir + '/projectile/' + type + '/1.png';
    images[2].src = imgdir + '/projectile/' + type + '/2.png';
    images[3].src = imgdir + '/projectile/' + type + '/3.png';
    images[4].src = imgdir + '/projectile/' + type + '/4.png';

    this.images = images;
    this.currimg = this.images[0];

    this.x = x;
    this.y = y;
    this.width = this.currimg.width;
    this.height = this.currimg.height;

    this.speed = speed;
};

Projectile.prototype.update = function () {
    this.y += this.speed;
};

Projectile.prototype.explode = function () {
    delete projectiles[this.id];
};

Projectile.prototype.hit = function (projectile) {
    for (var r = 0; r < invasion.rows; r++) {
        for (var c = 0; c < invasion.cols; c++) {
            var a = invasion.invaders[r][c];
            if (a.alive == true) {
                a.hit(this);
            }
        }
    }

    if (saucer !== null) {
        saucer.hit(this);
    }
};
