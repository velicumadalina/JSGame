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
        this.load.image('cop', '../static/cop.png');
        this.load.spritesheet('dude', '../static/mario.png', {frameWidth: 45, frameHeight: 38});
        this.load.audio('mario', '../static/audio/mario.ogg');
        this.load.audio('cough', '../static/audio/cough.ogg');
        this.load.audio('coin', '../static/audio/coin.ogg');
        this.load.audio('corona', '../static/audio/corona.ogg');
        this.load.audio('lose', '../static/audio/lose.ogg');
    }

    create() {
        // this.load.audio('mario',['../static/audio/mario.ogg']);
        // this.sound.play('mario', {
        //     mute: false,
        //     volume: 1,
        //     rate: 1, detune: 0,
        //     seek: 0,
        //     loop: false,
        //     delay: 0
        // });


        this.add.image(900, 400, 'background');
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
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'SCORE:' + score, {fontSize: '32px', fill: '#fff'});
        this.lives = 3;
        this.livesText = this.add.text(1600, 16, 'LIVES:' + lives, {fontSize: '32px', fill: '#fff'});


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
            this.sound.play('cough')
        }
        if (this.tp.countActive(true) === 22) {
            this.scene.start('level2');
        }
    }
}


class level2 extends Phaser.Scene {
    constructor() {
        super({key: 'level2'});
    }

    preload() {
        this.load.image('backgroundl2', '../static/backgroundl2.png');
        this.load.image('win', '../static/win.png');
        this.load.image('tube', '../static/tube.png');
        this.load.image('brick', '../static/brick2.png');
        this.load.image('ground', '../static/ground.png');
        this.load.image('mona', '../static/mona.png');
        this.load.image('corona', '../static/corona.png');
        this.load.image('cop', '../static/cop.png');
        this.load.audio('cough', '../static/audio/cough.ogg');
        this.load.audio('coin', '../static/audio/coin.ogg');
        this.load.audio('corona', '../static/audio/corona.ogg');
        this.load.audio('winner', '../static/audio/win.ogg');
        this.load.audio('lose', '../static/audio/lose.ogg');
        this.load.spritesheet('dude', '../static/spritesheet.png', {frameWidth: 45, frameHeight: 38});
    }

    create() {
        this.add.image(900, 400, 'backgroundl2');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 800, 'ground').refreshBody();
        this.platforms.create(250, 720, 'tube');
        this.platforms.create(800, 720, 'tube');
        this.platforms.create(1600, 720, 'tube');
        this.platforms.create(500, 550, 'brick');
        this.platforms.create(1200, 550, 'brick2');
        this.platforms.create(1700, 370, 'brick');
        this.platforms.create(200, 370, 'brick2');
        this.platforms.create(1000, 370, 'brick');
        this.platforms.create(200, 200, 'brick');
        this.platforms.create(1500, 200, 'brick');
        this.platforms.create(700, 200, 'brick');
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
        this.mona = this.physics.add.staticGroup();
        this.mona.create(450, 470, 'mona');
        this.mona.create(550, 470, 'mona');
        this.mona.create(1050, 470, 'mona');
        this.mona.create(1150, 470, 'mona');
        this.mona.create(1250, 470, 'mona');
        this.mona.create(1350, 470, 'mona');
        this.mona.create(50, 290, 'mona');
        this.mona.create(150, 290, 'mona');
        this.mona.create(250, 290, 'mona');
        this.mona.create(350, 290, 'mona');
        this.mona.create(950, 290, 'mona');
        this.mona.create(1050, 290, 'mona');
        this.mona.create(1650, 290, 'mona');
        this.mona.create(1750, 290, 'mona');
        this.mona.create(1550, 120, 'mona');
        this.mona.create(1450, 120, 'mona');
        this.mona.create(650, 120, 'mona');
        this.mona.create(750, 120, 'mona');
        this.mona.create(150, 120, 'mona');
        this.mona.create(250, 120, 'mona');

        this.corona = this.physics.add.group({
            key: 'corona',
            repeat: 3,
            setXY: {x: 200, y: -100, stepX: 800}
        });

        this.corona.children.iterate(function (child) {

            child.setBounceY(1);
            child.setBounceX(1);
            child.setVelocity(100, 100);
            child.setCollideWorldBounds(true);

        });

        this.gameOver = false;
        this.physics.add.overlap(this.player, this.mona, collect, null, this);
        this.physics.add.collider(this.mona, this.platforms);
        this.physics.add.collider(this.corona, this.platforms);
        this.physics.add.collider(this.player, this.corona, getCoronaLives, null, this);
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'SCORE:' + score, {fontSize: '32px', fill: '#000080'});
        this.lives = 3;
        this.livesText = this.add.text(1600, 16, 'LIVES:' + lives, {fontSize: '32px', fill: '#000080'});
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
            this.sound.play('cough');
        }
        if (this.mona.countActive(true) === 19) {
            this.youWin = this.add.text(900, 500, 'YOU WIN!', {fontSize: '100px', fill: '#000080'});
            this.youWin.setOrigin(0.5);
            this.add.image(900, 250, 'win');
            this.physics.pause();
        }
        if (this.mona.countActive(true) === 19 && this.cursors.down.isDown) {
            this.sound.play('winner');
        }
    }
}

function getCoronaLives(player, corona, lives, livesText, gameOver) {
    if (this.lives > 1) {
        this.sound.play('corona');
        this.lives -= 1;
        this.livesText.setText('LIVES: ' + this.lives);
        corona.y = -100;
        corona.x -= 300;
    } else {
        this.lives -= 1;
        this.livesText.setText('LIVES: ' + this.lives);
        this.sound.play('lose');
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.gameOver = true;
        this.gameOverText = this.add.text(900, 560, 'GAME OVER!', {fontSize: '100px', fill: '#000080'});
        this.add.image(900, 250, 'cop');
        this.gameOverText.setOrigin(0.5);
    }
}

function collect(player, tp, score, scoreText) {
    tp.disableBody(true, true);
    this.sound.play('coin');
    this.score += 10;
    this.scoreText.setText('SCORE: ' + this.score);
}

function win(mona) {
    if (this.mona.countActive(true) === 19)
        this.sound.play('win')
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
    audio: {
        disableWebAudio: true
    }
    ,
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
let score = 0;
let lives = 3;






