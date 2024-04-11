import { Boot } from './scenes/Boot'
import { Game } from './scenes/Game'
import { GameOver } from './scenes/GameOver'
import { MainMenu } from './scenes/MainMenu'
import Phaser from 'phaser'
import { Preloader } from './scenes/Preloader'
import { GameOptions } from './options/gameOptions'
import { Control } from './scenes/Control'
import { NextLevel } from './scenes/NextLevel'
import { Message } from './scenes/Message'
import { Home } from './scenes/Home'
import { Help } from './scenes/Help'

// object to initialize the Scale Manager
const scaleObject: Phaser.Types.Core.ScaleConfig = {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  parent: 'game-container',
  width: GameOptions.screen.width,
  height: GameOptions.screen.height
}

// game configuration object
const configObject: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: GameOptions.ui.panelBgColor,
  scale: scaleObject,
  scene: [Boot, Preloader, MainMenu, Game, Home, Control, NextLevel, Message, GameOver, Help],
  // audio: {
  //   disableWebAudio: true
  // },
  fx: {
    glow: {
      distance: 32,
      quality: 0.1
    }
  }
}

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
// const config = {
//     type: Phaser.AUTO,
//     width: 1024,
//     height: 768,
//     parent: 'game-container',
//     backgroundColor: '#028af8',
//     scene: [
//         Boot,
//         Preloader,
//         MainMenu,
//         Game,
//         GameOver
//     ]
// };

const StartGame = (parent) => {
  return new Phaser.Game({ ...configObject, parent: parent })
}

export default StartGame
