var Saucer = function (xstart, imgdir) {
    imgdir = imgdir || 'images';

    var images = [
        new Image(),
        new Image()
    ];

    images[0].src = imgdir + '/saucer/0.png'; // frame I
    images[1].src = imgdir + '/saucer/X.png'; // explode

    this.alive = true;
    this.exploded = false;

    this.images = images;
    this.imgindex = 0;
    this.currimg = this.images[this.imgindex];

    this.width = this.currimg.width;
    this.height = this.currimg.height;

    this.x = xstart;
    this.y = 16;

    this.speed = -4;
};

Saucer.prototype.animate = function(frame) {
    if(this.x > -1 * this.width + Math.abs(this.speed) && this.exploded === false) {
        this.x += this.speed;

        if(this.alive === false) {
            this.imgindex = this.images.length - 1;
            this.exploded = true;
        }

        return true;
    }


    return false;
};

Saucer.prototype.hit = function (projectile) {
    var hit = projectile.x > this.x
        && projectile.x < this.x + this.width
        && projectile.y > this.y - this.height
        && projectile.y < this.y;

    if (hit === true) {
        this.alive = false;
        this.imgindex = this.images.length - 1;
        this.currimg = this.images[this.imgindex];
        this.speed = 0;
        projectile.explode();
    }
};
