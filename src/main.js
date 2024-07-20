import Phaser from 'phaser';
import { LaserGroup, fireLaser, checkOutOfBounds } from './laser1';
import { EnemyGroup, move, enemyCheckOutOfBounds } from './enemies';

let player;
let laserGroup;
let enemyGroup;
let score = 0;
let scoreText;
let lives = 3;
let livesText;

function preload() {
  console.log('Preloading assets');
  this.load.image('player', 'assets/player.png');
  this.load.image('laser', 'assets/laser.png');
  this.load.image('enemy', 'assets/enemy.png');
}

function create() {
  console.log('Creating game objects');
  player = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight - 100, 'player');
  player.setCollideWorldBounds(true);

  laserGroup = new LaserGroup(this);
  enemyGroup = new EnemyGroup(this);

  this.physics.add.overlap(laserGroup, enemyGroup, (laser, enemy) => {
    laser.setActive(false);
    laser.setVisible(false);
    laser.disableBody(true, true);

    enemy.setActive(false);
    enemy.setVisible(false);
    enemy.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
  });

  this.physics.add.overlap(player, enemyGroup, (player, enemy) => {
    lives -= 1;
    livesText.setText('Lives: ' + lives);

    if (lives <= 0) {
      this.physics.pause();
      player.setTint(0xff0000);
    }
  });

  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
  livesText = this.add.text(16, 48, 'Lives: 3', { fontSize: '32px', fill: '#fff' });

  this.input.on('pointermove', pointer => {
    player.setX(pointer.x);
  });

  this.input.on('pointerdown', pointer => {
    if (lives > 0) {
      fireLaser(laserGroup, player);
    }
  });
}

function update() {
  checkOutOfBounds(laserGroup, this);
  enemyCheckOutOfBounds(enemyGroup, this);
}

export default { preload, create, update };
