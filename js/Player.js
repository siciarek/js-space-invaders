var Player = function(display, imgdir) {
    imgdir = imgdir || 'images';
    this.display = display;

    var images = [
        new Image(),
        new Image(),
        new Image()
    ];

    images[0].src = imgdir + '/player/0.png';
    images[1].src = imgdir + '/player/1.png';
    images[2].src = imgdir + '/player/2.png';

    this.images = images;
    this.currimg = this.images[0];

    this.width = this.currimg.width;
    this.height = this.currimg.height;
    this.x = (this.display.width - this.width) / 2;
    this.y = (this.display.height - 16 - this.height);
    this.step = 8;
};

Player.prototype.fire = function() {
    var p = new Projectile(this.x + this.width / 2, this.y - this.height, -5, 'player');
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
