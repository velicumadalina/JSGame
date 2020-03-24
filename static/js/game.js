let config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 350},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }

};
let game = new Phaser.Game(config);
let platforms;
let player;
let tp;
let corona;
let scoreText;
let score = 0;
let gameOver = false;

function preload() {
    this.load.image('background', '../static/background.png');
    this.load.image('ground', '../static/ground.png');
    this.load.image('tp', '../static/roll.png');
    this.load.image('corona', '../static/corona.png');
    this.load.image('bricks', '../static/bricks.png');
    this.load.spritesheet('dude', '../static/mario.png', {frameWidth: 45, frameHeight: 38});
}

function create() {
    this.add.image(900, 400, 'background');
    platforms = this.physics.add.staticGroup();

    platforms.create(300, 800, 'ground').setScale().refreshBody();

    platforms.create(500, 550, 'bricks');
    platforms.create(300, 400, 'bricks');
    platforms.create(1600, 400, 'bricks');
    platforms.create(850, 350, 'bricks');
    platforms.create(1200, 550, 'bricks');
    platforms.create(1400, 250, 'bricks');
    platforms.create(400, 170, 'bricks');
    platforms.create(1100, 100, 'bricks');
    player = this.physics.add.sprite(100, 450, 'dude');
    player.body.setGravityY(300);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
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
    tp = this.physics.add.staticGroup();
    tp.create(550, 530, 'tp');
    tp.create(300, 370, 'tp');
    tp.create(850, 320, 'tp');
    tp.create(1200, 520, 'tp');
    tp.create(1400, 220, 'tp');
    tp.create(400, 150, 'tp');
    tp.create(1100, 70, 'tp');
    tp.create(430, 370, 'tp');
    tp.create(1650, 370, 'tp');
    tp.create(950, 320, 'tp');
    tp.create(1300, 520, 'tp');
    tp.create(1500, 220, 'tp');
    tp.create(500, 150, 'tp');
    tp.create(650, 530, 'tp');
    tp.create(200, 370, 'tp');
    tp.create(850, 320, 'tp');
    tp.create(1400, 520, 'tp');
    tp.create(350, 150, 'tp');
    tp.create(990, 70, 'tp');

    corona = this.physics.add.group({
        key: 'corona',
        repeat: 3,
        setXY: {x: 200, y: -100, stepX: 600}
    });

    corona.children.iterate(function (child) {

        child.setBounceY(1);
        child.setBounceX(1);
        child.setVelocity(300, 300);
        child.setCollideWorldBounds(true);

    });
    scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
    this.physics.add.overlap(player, tp, collect, null, this);
    this.physics.add.collider(tp, platforms);
    this.physics.add.collider(corona, platforms);
    this.physics.add.collider(player, corona, getCorona, null, this);

}

function getCorona(player, corona) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

function collect(player, tp) {
    tp.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

}

function update() {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        player.setVelocityX(-260);

        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(260);

        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
    }

}


