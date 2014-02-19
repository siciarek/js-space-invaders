var Game = function(imgdir) {

    imgdir = imgdir || 'images';

    this.images = {
        win: new Image(),
        lose: new Image()
    };

    this.images.win.src = imgdir + '/game/win.png';
    this.images.lose.src = imgdir + '/game/lose.png';
};
