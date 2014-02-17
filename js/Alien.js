var Alien = function (type, imgdir) {
    imgdir = imgdir || 'images';

    var images = [
        new Image(),
        new Image(),
        new Image()
    ];

    images[0].src = imgdir + '/alien/' + type + '/0.png'; // frame I
    images[1].src = imgdir + '/alien/' + type + '/1.png'; // frame II
    images[2].src = imgdir + '/alien/X.png';              // explode

    this.alive = true;
    this.exploded = false;

    this.images = images;
    this.imgindex = 0;
    this.currimg = this.images[this.imgindex];

    this.width = this.currimg.width;
    this.height = this.currimg.height;

    this.x = 0;
    this.y = 0;
};

Alien.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};

Alien.prototype.animate = function (frame) {
    if (frame % 10 === 0) {
        if(this.alive === false) {
            this.imgindex = this.images.length - 1;
            this.exploded = true;
        }
        if (this.imgindex <= 1) {
            this.imgindex += 1;
            this.imgindex %= 2;
            this.currimg = this.images[this.imgindex];
        }
    }
};

Alien.prototype.hit = function (projectile) {
    var hit = projectile.x > this.x
        && projectile.x < this.x + this.width
        && projectile.y > this.y - this.height
        && projectile.y < this.y;

    if (hit === true) {
        this.alive = false;
        this.imgindex = this.images.length - 1;
        this.currimg = this.images[this.imgindex];
        projectile.explode();
    }
};
