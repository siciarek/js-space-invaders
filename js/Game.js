var Game = function(imgdir) {

    imgdir = imgdir || 'images';

    this.display = new Display();
    this.imgdir = imgdir;

    this.player = new Player(this.display.width, this.display.height, this.imgdir);
//    this.saucer = new Saucer();
//    this.invasion = new Invasion();

    this.projectiles = {};

    this.FPS = 30;
    this.tics = Math.ceil(1000 / this.FPS);
    this.interval = null;
};

Game.prototype.update = function() {
    this.display.draw(this.player);
};

Game.prototype.run = function() {
    var self = new Game();
    this.interval = setInterval(function(){self.update()}, this.tics);
};
