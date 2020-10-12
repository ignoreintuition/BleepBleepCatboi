import Phaser from 'phaser';

let gameScene = new Phaser.Scene('Game');

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: gameScene
}

const game = new Phaser.Game(config);

gameScene.preload = function () {
    this.load.image('bookcase', '../assets/bookcase.png');
    this.load.spritesheet('pot', '../assets/pot.png', { frameWidth: 20, frameHeight: 26 })
};

gameScene.create = function () {
    this.bookcase = this.add.sprite(400,300, 'bookcase');
    this.bookcase.setScale(4);

    this.pot = this.add.sprite(400, 88, 'pot', 0);
    this.pot.setScale(4);

    this.anims.create({
        key: 'break',
        frames: this.anims.generateFrameNumbers('pot', {start: 0, end: 3}),
        frameRate: 10,
        repeat: 1
    });
};

gameScene.update = function () {
    pointerMove(this.input.activePointer, this.pot);
};

function pointerMove(pointer, pot) {
    if (pointer.velocity.x > 100) {
        pot.x += 5;
    } else if (pointer.velocity.x < -100) {
        pot.x -= 5;
    }
}

