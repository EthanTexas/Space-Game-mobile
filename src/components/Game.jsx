import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import main from '../main';

const Game = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    console.log('Game component mounted');
    if (!gameRef.current) {
      console.log('Initializing Phaser game');
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false
          }
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: {
          preload: main.preload,
          create: main.create,
          update: main.update
        }
      };

      gameRef.current = new Phaser.Game(config);
    }
  }, []);

  return <div id="game-container"></div>;
};

export default Game;
