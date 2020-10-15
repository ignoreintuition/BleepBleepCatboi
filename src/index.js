import Phaser from 'phaser';

let gameScene = new Phaser.Scene('Game');
const world = {};
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#2d2d2d',
    parent: 'game',
    dom: {
        createContainer: true
    },
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
var breakFlag = false;

const game = new Phaser.Game(config);

gameScene.preload = function () {
    this.load.image('bookcase', '../assets/bookcase.png');
    this.load.spritesheet('ground', '../assets/ground.png', { frameWidth: 16, frameHeight: 11});
    this.load.spritesheet('pot', '../assets/pot.png', { frameWidth: 20, frameHeight: 26 })
};

gameScene.create = function () {
    this.physics.world.setBounds(0,0,800,600);
    this.bookcase = this.physics.add.sprite(400,440, 'bookcase');
    this.bookcase.setScale(4);

    this.pot = this.physics.add.sprite(400, 228, 'pot', 0);
    this.pot.setScale(4);
    this.physics.add.collider(this.bookcase, this.pot);
    this.bookcase.setCollideWorldBounds(true);
    this.pot.setCollideWorldBounds(true);

    this.anims.create({
        key: 'break',
        frames: this.anims.generateFrameNumbers('pot', {start: 0, end: 3}),
        frameRate: 20,
        repeat: 0
    });
};

gameScene.update = function () {
    pointerMove(this.input.activePointer, this.pot);
    if (this.pot.y > 530 && breakFlag === false ){
        this.pot.play('break', true);
        breakFlag = true;
    }
}

function pointerMove(pointer, pot) {
    if (pointer.velocity.x > 200) {
        pot.x += pointer.velocity.x * 0.05;
    } else if (pointer.velocity.x < -200) {
        pot.x += pointer.velocity.x * 0.05;
    }
}

