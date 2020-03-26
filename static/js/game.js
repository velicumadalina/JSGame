class level1 extends Phaser.Scene {
    constructor() {

        super({key: 'level1'});
    }

    preload() {
        this.load.image('background', '../static/background.png');
        this.load.image('ground', '../static/ground.png');
        this.load.image('tp', '../static/roll.png');
        this.load.image('corona', '../static/corona.png');
        this.load.image('tube', '../static/tube.png');
        this.load.image('brick', '../static/brick.png');
        this.load.image('brick2', '../static/brick2.png');
        this.load.image('brick3', '../static/brick3.png');
        this.load.spritesheet('dude', '../static/mario.png', {frameWidth: 45, frameHeight: 38});
    }

    create() {
        this.add.image(900, 400, 'background');
        this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#fff'});
        this.livesText = this.add.text(1600, 16, 'lives: 3', {fontSize: '32px', fill: '#fff'});
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 800, 'ground').setScale().refreshBody();
        this.platforms.create(800, 720, 'tube');
        this.platforms.create(1500, 720, 'tube');
        this.platforms.create(400, 550, 'brick2');
        this.platforms.create(1200, 550, 'brick');
        this.platforms.create(1600, 370, 'brick2');
        this.platforms.create(300, 370, 'brick');
        this.platforms.create(900, 370, 'brick');
        this.platforms.create(350, 200, 'brick3');
        this.platforms.create(1400, 200, 'brick2');

        this.player = this.physics.add.sprite(100, 730, 'dude');
        this.player.body.setGravityY(300);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.platforms);
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

        this.tp = this.physics.add.staticGroup();
        this.tp.create(200, 480, 'tp');
        this.tp.create(300, 480, 'tp');
        this.tp.create(400, 480, 'tp');
        this.tp.create(500, 480, 'tp');
        this.tp.create(600, 480, 'tp');
        this.tp.create(1150, 480, 'tp');
        this.tp.create(1250, 480, 'tp');
        this.tp.create(250, 300, 'tp');
        this.tp.create(350, 300, 'tp');
        this.tp.create(850, 300, 'tp');
        this.tp.create(950, 300, 'tp');
        this.tp.create(1420, 300, 'tp');
        this.tp.create(1520, 300, 'tp');
        this.tp.create(1620, 300, 'tp');
        this.tp.create(1720, 300, 'tp');
        this.tp.create(1250, 130, 'tp');
        this.tp.create(1350, 130, 'tp');
        this.tp.create(1450, 130, 'tp');
        this.tp.create(1550, 130, 'tp');
        this.tp.create(100, 130, 'tp');
        this.tp.create(200, 130, 'tp');
        this.tp.create(300, 130, 'tp');
        this.tp.create(400, 130, 'tp');
        this.tp.create(500, 130, 'tp');
        this.tp.create(600, 130, 'tp');

        this.corona = this.physics.add.group({
            key: 'corona',
            repeat: 3,
            setXY: {x: -100, y: -100, stepX: 1000, stepY: 200}
        });

        this.corona.children.iterate(function (child) {
            child.setBounceY(1);
            child.setBounceX(1);
            child.setVelocity(100, 100);
            child.setCollideWorldBounds(true);

        });


        this.physics.add.overlap(this.player, this.tp, collect, null, this);
        this.physics.add.collider(this.tp, this.platforms);
        this.physics.add.collider(this.corona, this.platforms);
        this.physics.add.overlap(this.player, this.corona, getCoronaLives, null, this);

    }


    update() {
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-260);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(260);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-510);
        }
        if (this.tp.countActive(true) === 24) {
            this.scene.start('level2');
            // this.scene.start('level2');
        }
    }
}


class level2 extends Phaser.Scene {
    constructor() {
        super({key: 'level2'});
    }

    preload() {
        this.load.image('backgroundl2', '../static/backgroundl2.png');
        this.load.image('brick', '../static/brick2.png');
        this.load.image('ground', '../static/ground.png');
        this.load.image('flour', '../static/mona.png');
        this.load.image('corona', '../static/corona.png');
        this.load.spritesheet('dude', '../static/spritesheet.png', {frameWidth: 45, frameHeight: 38});
    }

    create() {
        this.add.image(900, 400, 'backgroundl2');
        let scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#fff'});
        let livesText = this.add.text(1600, 16, 'lives: 3', {fontSize: '32px', fill: '#fff'});
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 800, 'ground').refreshBody();
        this.platforms.create(550, 570, 'brick');
        this.platforms.create(300, 420, 'brick');
        this.platforms.create(1600, 420, 'brick');
        this.platforms.create(850, 370, 'brick');
        this.platforms.create(1200, 580, 'brick');
        this.platforms.create(1400, 270, 'brick');
        this.platforms.create(400, 200, 'brick');
        this.platforms.create(1100, 120, 'brick');
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.body.setGravityY(300);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);
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
        this.flour = this.physics.add.staticGroup();
        this.flour.create(550, 500, 'flour');
        this.flour.create(300, 350, 'flour');
        this.flour.create(850, 300, 'flour');
        this.flour.create(1200, 500, 'flour');
        this.flour.create(1400, 200, 'flour');
        this.flour.create(400, 120, 'flour');
        this.flour.create(1100, 500, 'flour');
        this.flour.create(430, 350, 'flour');
        this.flour.create(1650, 350, 'flour');
        this.flour.create(950, 300, 'flour');
        this.flour.create(1300, 500, 'flour');
        this.flour.create(1500, 200, 'flour');
        this.flour.create(500, 120, 'flour');
        this.flour.create(650, 510, 'flour');
        this.flour.create(200, 350, 'flour');
        this.flour.create(850, 300, 'flour');
        this.flour.create(1400, 500, 'flour');
        this.flour.create(350, 130, 'flour');
        this.flour.create(990, 50, 'flour');

        this.corona = this.physics.add.group({
            key: 'corona',
            repeat: 3,
            setXY: {x: 200, y: -100, stepX: 600}
        });

        this.corona.children.iterate(function (child) {

            child.setBounceY(1);
            child.setBounceX(1);
            child.setVelocity(300, 300);
            child.setCollideWorldBounds(true);

        });
        this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#fff'});
        this.gameOver = false;
        this.score;
        this.physics.add.overlap(this.player, this.flour, collect, null, this);
        this.physics.add.collider(this.flour, this.platforms);
        this.physics.add.collider(this.corona, this.platforms);
        this.physics.add.collider(this.player, this.corona, getCorona, null, this);

    }


    update() {
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-260);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(260);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-600);
        }
    }
}

function getCoronaLives(player, corona, lives, livesText, gameOver) {
    if (lives > 1) {
        lives -= 1;
        // livesText.setText('Lives: ' + lives);
        corona.y = -100;
        corona.x -= 300;
    } else {
        lives -= 1;
        // livesText.setText('Lives: ' + lives);
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
    }
}

function collect(player, tp, score, scoreText) {
    tp.disableBody(true, true);
    // score += 10;
    // scoreText.setText('Score: ' + score);
}

function getCorona(player, corona, gameOver) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.gameOver = true;
    this.gameOverText = this.add.text(900, 400, 'GAME OVER!', {fontSize: '64px', fill: '#fff'});
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.visible = true;

}


let config = {
    type: Phaser.AUTO,
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
            gravity: {y: 400},
            debug: false
        }
    },
    scene: [level1, level2]

};
let game = new Phaser.Game(config);
let gameOver = false;




