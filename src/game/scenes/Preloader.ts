import { Scene } from 'phaser'
import { GameOptions } from '../options/gameOptions'
import { EventBus } from '../EventBus'

export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    //this.add.image(512, 384, 'background')
    // this.cameras.main.setBackgroundColor(0x050505)
    // this.add
    //   .sprite(GameOptions.screen.width / 2 + 180, GameOptions.screen.height / 2 + 40, 'logo')
    //   .setScale(0.2)
    //   .setOrigin(0.5)
    this.add
      .sprite(GameOptions.screen.width / 2, GameOptions.screen.height / 2 - 100, 'brand')
      .setScale(0.5)
      .setTint(0xffffff)
      .setOrigin(0.5)
    // bg.
    // this.add
    //   .image(GameOptions.screen.width / 2, GameOptions.screen.height / 2, 'bg')
    //   .setTint(GameOptions.ui.panelBgColor)

    //  A simple progress bar. This is the outline of the bar.
    this.add
      .rectangle(GameOptions.screen.width / 2, GameOptions.screen.height / 2, 468, 32)
      .setStrokeStyle(1, 0xffffff)

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(
      GameOptions.screen.width / 2 - 230,
      GameOptions.screen.height / 2,
      4,
      28,
      0xffffff
    )

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    if (window && window.onSdkGameLoadingStart) {
      window.onSdkGameLoadingStart()
    }
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets')

    this.load.atlas('flares', 'particles/flares.png', 'particles/flares.json')

    this.load.image('logo', 'logo.png')
    // this.load.image('bg', 'img/bg.png')

    this.load.image('ball', 'img/ball.png')
    this.load.image('panel', 'img/panel.png')
    this.load.image('wall', 'img/wall.png')
    this.load.image('angle', 'img/angle.png')
    this.load.image('crown', 'img/crown.png')
    this.load.image('ship', 'img/ship.png')
    this.load.image('rotate', 'img/rotate.png')
    this.load.image('arrowdownup', 'img/arrowdownup.png')
    this.load.image('lighting', 'img/lighting.png')
    this.load.image('shipFace', 'img/shipFace.png')
    this.load.image('shipFaceBg', 'img/shipFaceBg.png')
    this.load.image('button', 'img/button.png')
    this.load.image('lang', 'img/lang.png')
    this.load.image('home', 'img/home.png')
    // this.load.image('rate', 'img/rate.png')
    // this.load.image('danger', 'img/danger.png')
    this.load.image('adv', 'img/adv.png')
    this.load.image('repeat', 'img/repeat.png')
    this.load.image('floor', 'img/floor.png')
    this.load.image('ok', 'img/ok.png')
    this.load.image('border_top', 'img/border_top.png')

    // Record.
    // this.load.image('heroboard', 'img/record/heroboard.png')
    // this.load.image('record_boom_5', 'img/record/record_boom_5.png')
    // this.load.image('record_boom_10', 'img/record/record_boom_10.png')
    // this.load.image('record_boom_15', 'img/record/record_boom_15.png')
    // this.load.image('record_boom_20', 'img/record/record_boom_20.png')
    // this.load.image('record_boom', 'img/record/record_boom.png')
    // this.load.image('record_crown', 'img/record/record_crown.png')
    // this.load.image('record_level_10', 'img/record/record_level_10.png')
    // this.load.image('record_level_50', 'img/record/record_level_50.png')
    // this.load.image('record_level_100', 'img/record/record_level_100.png')
    // this.load.image('record_level_250', 'img/record/record_level_250.png')
    // this.load.image('record_level_500', 'img/record/record_level_500.png')
    // this.load.image('record_level_1000', 'img/record/record_level_1000.png')
    // this.load.image('record_level_5000', 'img/record/record_level_5000.png')

    // this is how to load a sprite sheet
    // this.load.spritesheet('faces', 'img/faces.png', {
    //   frameWidth: 45,
    //   frameHeight: 25
    // })
    this.load.spritesheet('sound', 'img/sound.png', {
      frameWidth: 256,
      frameHeight: 256
    })
    this.load.spritesheet('play', 'img/play.png', {
      frameWidth: 256,
      frameHeight: 256
    })
    // this.load.spritesheet('button4', 'img/button4.png', {
    //   frameWidth: 88,
    //   frameHeight: 88
    // })
    this.load.spritesheet('face', 'img/face.png', {
      frameWidth: 128,
      frameHeight: 128
    })
    this.load.spritesheet('help_move', 'help/help_move.png', {
      frameWidth: 300,
      frameHeight: 406
    })
    this.load.spritesheet('help_bomb', 'help/help_bomb.png', {
      frameWidth: 300,
      frameHeight: 344
    })
    this.load.spritesheet('help_rotate_zoom', 'help/help_rotate_zoom.png', {
      frameWidth: 274,
      frameHeight: 191.8
    })
    this.load.spritesheet('help_floor', 'help/help_floor.png', {
      frameWidth: 338,
      frameHeight: 326
    })
    this.load.spritesheet('help_general', 'help/help_general.png', {
      frameWidth: 300,
      frameHeight: 344
    })
    this.load.image('help', 'help/help.png')
    this.load.image('next', 'help/next.png')
    this.load.image('placeholder', 'img/placeholder.png')

    // this is how to load a bitmap font
    // this.load.bitmapFont('font', 'img/fonts.png', 'img/fonts.fnt')

    // Audio.
    this.load.audio('ball_start', [
      // 'assets/audio/oedipus_wizball_highscore.ogg',
      'audio/ball_start.mp3'
    ])
    this.load.audio('ball_destroy', ['audio/ball_destroy.mp3'])
    this.load.audio('click', ['audio/click.mp3'])
    this.load.audio('level_complete', ['audio/level_completed.mp3'])
    this.load.audio('game_over', ['audio/game_over.mp3'])
    this.load.audio('fire', ['audio/fire.mp3'])
    this.load.audio('rotate', ['audio/rotate.mp3'])
    this.load.audio('addbonus', ['audio/addbonus.mp3'])
    this.load.audio('gojob', ['audio/gojob.mp3'])
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('Message')
    // this.scene.start('Lang')
    this.scene.start('GameOver')
    this.scene.start('Control')
    this.scene.start('NextLevel')
    // this.scene.start('Game')
    this.scene.start('Help')
    this.scene.start('Home')
    // this.scene.start('Record')
    console.log('Created game!')

    // Init SDK
    if (window && window.initSDK) {
      window?.initSDK()
    }

    if (window && window.onSdkGameLoadingStop) {
      window.onSdkGameLoadingStop()
    }
  }
}
