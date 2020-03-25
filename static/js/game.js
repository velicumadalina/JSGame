var GameScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function GameScene() {
            Phaser.Scene.call(this, {key: 'gameScene', active: true});

            this.player = null;
            this.cursors = null;
            this.score = 0;
            this.scoreText = null;
            this.platforms = null;
            this.tp = null;
            this.corona = null;
            this.livesText = null;
            this.lives = 3;
            this.gameOver = false;
        },


    preload: function () {
        this.load.image('background', '../static/background.png');
        this.load.image('ground', '../static/ground.png');
        this.load.image('tp', '../static/roll.png');
        this.load.image('corona', '../static/corona.png');
        this.load.image('tube', '../static/tube.png');
        this.load.image('brick', '../static/brick.png');
        this.load.image('brick2', '../static/brick2.png');
        this.load.image('brick3', '../static/brick3.png');
        this.load.spritesheet('dude', '../static/mario.png', {frameWidth: 45, frameHeight: 38});
    },

    create: function () {
        this.add.image(900, 400, 'background');
        platforms = this.physics.add.staticGroup();
        platforms.create(300, 800, 'ground').setScale().refreshBody();
        platforms.create(800, 720, 'tube');
        platforms.create(1500, 720, 'tube');
        platforms.create(400, 550, 'brick2');
        platforms.create(1200, 550, 'brick');
        platforms.create(1600, 370, 'brick2');
        platforms.create(300, 370, 'brick');
        platforms.create(900, 370, 'brick');
        platforms.create(350, 200, 'brick3');
        platforms.create(1400, 200, 'brick2');

        player = this.physics.add.sprite(100, 730, 'dude');
        player.body.setGravityY(300);
        // player.setBounce(0.2);
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
        tp.create(200, 480, 'tp');
        tp.create(300, 480, 'tp');
        tp.create(400, 480, 'tp');
        tp.create(500, 480, 'tp');
        tp.create(600, 480, 'tp');
        tp.create(1150, 480, 'tp');
        tp.create(1250, 480, 'tp');
        tp.create(250, 300, 'tp');
        tp.create(350, 300, 'tp');
        tp.create(850, 300, 'tp');
        tp.create(950, 300, 'tp');
        tp.create(1420, 300, 'tp');
        tp.create(1520, 300, 'tp');
        tp.create(1620, 300, 'tp');
        tp.create(1720, 300, 'tp');
        tp.create(1250, 130, 'tp');
        tp.create(1350, 130, 'tp');
        tp.create(1450, 130, 'tp');
        tp.create(1550, 130, 'tp');
        tp.create(100, 130, 'tp');
        tp.create(200, 130, 'tp');
        tp.create(300, 130, 'tp');
        tp.create(400, 130, 'tp');
        tp.create(500, 130, 'tp');
        tp.create(600, 130, 'tp');

        corona = this.physics.add.group({
            key: 'corona',
            repeat: 3,
            setXY: {x: 200, y: -100, stepX: 600}
        });

        corona.children.iterate(function (child) {
            child.setBounceY(1);
            child.setBounceX(1);
            child.setVelocity(100, 100);
            child.setCollideWorldBounds(true);

        });
        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
        livesText = this.add.text(1600, 16, 'lives: 3', {fontSize: '32px', fill: '#000'});

        this.physics.add.overlap(player, tp, collect, null, this);
        this.physics.add.collider(tp, platforms);
        this.physics.add.collider(corona, platforms);
        this.physics.add.collider(player, corona, getCorona, null, this);

    },


    getCorona: function (player, corona) {
        // this.physics.pause();
        // player.setTint(0xff0000);
        // player.anims.play('turn');
        gameOver = true;

    },

    collect: function (player, tp) {
        tp.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);
    },

// function life(player, corona) {
//     tp.disableBody(true, true);
//     lives -= 1;
//     livesText.setText('Lives: ' + lives);
// }

    update: function () {
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

});

   var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: GameScene
};

var game = new Phaser.Game(config);

