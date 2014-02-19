var Damage = function (x, y, type, imgdir) {
    imgdir = imgdir || 'images';

    var src = 'images/projectile/' + type + '/X.png'

    this.currimg = new Image();
    this.currimg.src = src;

    this.width = this.currimg.width;
    this.height = this.currimg.height;

    this.x = x;
    this.y = y;

    this.width = type === 'player' ? 8 * 4 : 6 * 4;
    this.height = 8 * 4;
};

Damage.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};
