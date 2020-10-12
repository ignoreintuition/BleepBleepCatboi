import Phaser from 'phaser';

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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


const game = new Phaser.Game(config);

function preload () {
    this.load.image('bookcase', '../assets/bookcase.png');
    this.load.spritesheet('pot', '../assets/pot.png', { frameWidth: 20, frameHeight: 26 })
};

function create () {
    let bookcase = this.add.image(400,300, 'bookcase');
    bookcase.setScale(4);

    let pot = this.add.image(400, 88, 'pot', 0);
    pot.setScale(4);

    this.anims.create({
        key: 'break',
        frames: this.anims.generateFrameNumbers('pot', {start: 0, end: 3}),
        frameRate: 10,
        repeat: 1
    });
};

function update () {
    pointerMove(this.input.activePointer);
};

function pointerMove(pointer) {
    if (pointer.velocity.x > 100 || pointer.velocity < -100) {
      console.log(pointer.velocity);
    }
}

