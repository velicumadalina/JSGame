
let config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1800,
        height: 800
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
        ,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    }
};

let game = new Phaser.Game(config);
let platforms;
let bricks;
let player;
let stars;
let bombs;


function preload() {
    this.load.image('ground', '../static/platform.png');
    this.load.image('bricks', '../static/tile.png');
    this.load.image('star', '../static/star.png');
    this.load.image('bomb', '../static/bomb.png');
    this.load.spritesheet('dude', '../static/spritesheet.png', {frameWidth: 45, frameHeight: 38});
}

function create() {
    platforms = this.physics.add.staticGroup();

    platforms.create(300, 500, 'ground');
    this.physics.add.collider(player, platforms);


    bricks = this.physics.add.staticGroup();
    bricks.create(200, 500, 'bricks');
    bricks.create(300, 500, 'bricks');
    bricks.create(400, 500, 'bricks');

    player = this.physics.add.sprite(100, 700, 'dude');
    player.body.setGravityY(200);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);

    this.physics.add.collider(player, bricks);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: {x: 12, y: -100, stepX: 70}
    });

    stars.children.iterate(function (child) {

        child.setBounceY(0);

    });

    bombs = this.physics.add.group({
        key: 'bomb',
        repeat: 4,
        setXY: {x: 12, y: -100, stepX: 200}
    });

    bombs.children.iterate(function (child) {

        child.setBounceY(0.5);
        child.setBounceX(0.7);
        child.setVelocity(200);
        child.setCollideWorldBounds(true);

    });

}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
    }

}

