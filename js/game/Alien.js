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

    this.type = type;

    this.images = images;
    this.imgindex = 0;
    this.currimg = this.images[this.imgindex];


    this.width = this.currimg.width;
    this.height = this.currimg.height;

    this.width = 16 * 4;
    this.height = 8 * 4;

    this.x = 0;
    this.y = 0;

    this.alive = true;
    this.exploded = false;
};

Alien.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};

Alien.prototype.fire = function () {

    var types = [
        'plunger',
        'rolling',
        'squigly'
    ];

    var type = Math.floor(Math.random() * 1000) % types.length;

    var p = new Projectile(
        this.x + this.width / 2,
        this.y + this.height,
        5,
        types[type]
    );

    projectiles[p.id] = p;
};

Alien.prototype.animate = function (frame) {
    if (frame % 10 === 0) {
        if (this.alive === false) {
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

    var xoffsets = {
        A: [2, 2],
        B: [3, 2],
        C: [4, 4]
    };

    var xoff = xoffsets[this.type];

    var hit =
        projectile.x > (this.x + xoff[0] * 4)
            && projectile.x < (this.x + this.width - xoff[1] * 4)
            && projectile.y > (this.y - this.height)
            && projectile.y < this.y;

    if (hit === true) {
        this.alive = false;
        this.imgindex = this.images.length - 1;
        this.currimg = this.images[this.imgindex];
        projectile.explode();
    }
};
