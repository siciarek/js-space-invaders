var shieldCounter = 0;

var Shield = function (x, y, imgdir) {
    imgdir = imgdir || 'images';

    this.id = ++shieldCounter;

    var images = [
        new Image()
    ];

    images[0].src = imgdir + '/player/shield.png';

    this.images = images;
    this.imgindex = 0;
    this.currimg = this.images[this.imgindex];

    this.x = x;
    this.y = y;
    this.width = this.currimg.width;
    this.height = this.currimg.height;

    this.width = 22 * 4;
    this.height = 16 * 4;

    this.damages = [];
};

Shield.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};

Shield.prototype.hit = function (projectile) {

    var xoff = [0, 0];

    var hit =
        projectile.x > (this.x)
            && projectile.x < (this.x + this.width)
            && projectile.y + projectile.height > this.y

    if (hit === true) {
        var damage = new Damage(0, 0, projectile.type);
        var dy = this.y + Math.floor(Math.random() * this.height) - projectile.height;
        damage.move(projectile.x, dy);

        this.damages.push(damage);

        projectile.explode();
    }

    return hit;
};
