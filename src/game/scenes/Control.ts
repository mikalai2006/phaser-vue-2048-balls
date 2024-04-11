import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import { langs } from '../lang'
import { GameOptions } from '../options/gameOptions'
import { IGameData, TLang } from '@/App.vue'
import { TextButton } from '../objects/textButton'
import { capitalizeFirstLetter } from '../utils/utils'

export class Control extends Scene {
  constructor() {
    super('Control')
  }

  banners: Phaser.GameObjects.DOMElement
  homeButton: Phaser.GameObjects.Container
  homeButtonBg: Phaser.GameObjects.NineSlice
  homeButtonSprite: Phaser.GameObjects.Sprite
  pauseButton: Phaser.GameObjects.Container
  playButton: Phaser.GameObjects.Container
  playButtonText: Phaser.GameObjects.Text
  pauseButtonSprite: Phaser.GameObjects.Sprite
  soundButton: Phaser.GameObjects.Container
  soundButtonBg: Phaser.GameObjects.NineSlice
  soundButtonSprite: Phaser.GameObjects.Sprite
  helpButton: Phaser.GameObjects.Container
  helpButtonBg: Phaser.GameObjects.NineSlice
  helpButtonSprite: Phaser.GameObjects.Sprite
  textPause: Phaser.GameObjects.Text
  textPanel: Phaser.GameObjects.Rectangle
  click: Phaser.Sound.HTML5AudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.WebAudioSound

  overlay: Phaser.GameObjects.Rectangle
  btnContainer: Phaser.GameObjects.Container
  btnLangText: Phaser.GameObjects.Text
  btnBg: Phaser.GameObjects.NineSlice

  gameData: IGameData

  create() {
    this.click = this.sound.add('click')

    // panel.
    this.textPause = this.add
      .text(GameOptions.screen.width / 2, 100, '#pause', {
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 70,
        color: GameOptions.ui.primaryColor,
        stroke: '#ffffff',
        // strokeThickness: 0,
        align: 'center'
      })
      .setDepth(10003)
      .setOrigin(0.5)
    this.textPanel = this.add
      .rectangle(
        GameOptions.screen.width / 2,
        GameOptions.screen.height / 2,
        GameOptions.screen.width,
        GameOptions.screen.height,
        0x000000,
        0.9
      )
      .setDepth(10001)
      .setInteractive()

    // big play button
    const btnPlay = this.add
      .nineslice(0, 50, 'panel', 0, 500, 250, 33, 33, 33, 33)
      .setTint(GameOptions.ui.primaryColor)
      .setAlpha(1)
    const btnPlayBgInteractive = this.add
      .nineslice(0, 50, 'panel', 0, 500, 250, 33, 33, 33, 33)
      .setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
      .setAlpha(0.8)
      // .setDepth(1000)
      .setInteractive({ useHandCursor: true })
    this.playButtonText = new TextButton(this, 0, 90, 'Play', {
      fontFamily: 'Arial',
      fontStyle: 'bold',
      fontSize: 45,
      color: GameOptions.ui.panelBgColor,
      align: 'center',
      wordWrap: { width: 450, useAdvancedWrap: true }
    })
      .setOrigin(0.5)
      .setDepth(100)
    btnPlayBgInteractive.on('pointerup', (pointer) => {
      this.onClickPlayPause(pointer)
    })
    btnPlayBgInteractive
      .on('pointerover', () => {
        btnPlayBgInteractive.setTint(0xffffff)
      })
      .on('pointerout', () => {
        btnPlayBgInteractive.setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
      })
    const playImg = this.add
      .sprite(0, 0, 'play')
      .setTint(GameOptions.ui.panelBgColor)
      .setScale(0.4)
      .setOrigin(0.5)
      .setFrame(1)
    this.playButton = this.add
      .container(GameOptions.screen.width / 2, 300, [
        btnPlay,
        btnPlayBgInteractive,
        this.playButtonText,
        playImg
      ])
      .setDepth(10002)
      .setVisible(false)

    const baseStartX = (this.game.config.width as number) / 2 - GameOptions.gameField.width / 2
    const centerXLeft = baseStartX - GameOptions.bodies[GameOptions.bodies.length - 1].size * 2
    const centerXRight =
      baseStartX +
      GameOptions.gameField.width +
      GameOptions.bodies[GameOptions.bodies.length - 1].size * 2

    // home button.
    this.homeButtonBg = this.add
      .nineslice(0, 0, 'button', 0, 110, 110, 33, 33, 33, 33)
      .setTint(GameOptions.ui.buttonBgColor)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    this.homeButtonSprite = this.add
      .sprite(0, 0, 'home')
      .setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
      .setScale(0.2)
      .setOrigin(0.5)
    this.homeButtonBg.on('pointerup', (pointer) => {
      this.scene.get('Game').onSaveGameData()
      this.scene.get('Game').onStopGame()
      this.scene.get('Home').stopGame()
    })
    this.homeButtonBg.on('pointerover', (pointer) => {
      this.homeButtonSprite.setTint(0xffffff)
    })
    this.homeButtonBg.on('pointerout', (pointer) => {
      this.homeButtonSprite.setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
    })
    this.homeButton = this.add.container(centerXLeft, 70, [
      this.homeButtonBg,
      this.homeButtonSprite
    ]) //.setInteractive()

    // lang button.
    this.btnBg = this.add
      .nineslice(0, 0, 'button', 0, 110, 110, 33, 33, 33, 33)
      .setTint(GameOptions.ui.buttonBgColor)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })

    // this.btnSprite = this.add
    //   .sprite(0, 0, 'lang')
    //   .setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
    //   .setScale(0.2)
    //   .setOrigin(0.5)
    this.btnLangText = this.add
      .text(0, 0, 'He', {
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 38,
        color: GameOptions.ui.primaryColor,
        align: 'center'
      })
      .setOrigin(0.5)

    this.btnContainer = this.add.container(centerXRight, GameOptions.screen.height - 80, [
      this.btnBg,
      // this.btnSprite
      this.btnLangText
    ]) //.setInteractive()

    this.btnBg
      .on('pointerup', (pointer) => this.onShowLangList(pointer))
      .on('pointerover', (pointer) => {
        this.btnLangText.setTint(0xffffff)
      })
      .on('pointerout', (pointer) => {
        this.btnLangText.setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
      })

    // button sound.
    const soundButtonBg = this.add
      .nineslice(0, 0, 'button', 0, 110, 110, 33, 33, 33, 33)
      .setTint(GameOptions.ui.buttonBgColor)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    this.soundButtonSprite = this.add
      .sprite(0, 0, 'sound')
      .setFrame(1)
      .setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
      .setScale(0.25)
      .setOrigin(0.5)
    // this.add.existing(this.settingButton)
    this.soundButton = this.add
      .container(centerXRight, this.btnContainer.y - 120, [soundButtonBg, this.soundButtonSprite])
      .setDepth(100)
    soundButtonBg.on('pointerover', (pointer) => {
      if (!this.game.sound.mute) {
        this.soundButtonSprite.setTint(0xffffff)
      }
    })
    soundButtonBg.on('pointerout', (pointer) => {
      if (!this.game.sound.mute) {
        this.soundButtonSprite.setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
      }
    })
    soundButtonBg.on('pointerup', () => {
      this.click.play()
      this.game.sound.mute = !this.game.sound.mute
      // console.log('tap to toggle mute. sound.mute = ' + this.game.sound.mute)
      this.toggleSoundEffect()
    })

    // button pause.
    const bgButtonPause = this.add
      .nineslice(0, 0, 'button', 0, 110, 110, 33, 33, 33, 33)
      .setTint(GameOptions.ui.buttonBgColor)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    this.pauseButtonSprite = this.add
      .sprite(0, 0, 'play')
      .setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
      .setScale(0.27)
      .setOrigin(0.5)
    // this.add.existing(this.pauseButton)
    this.pauseButton = this.add
      .container(centerXRight, this.soundButton.y - 120, [bgButtonPause, this.pauseButtonSprite])
      .setDepth(100)
    bgButtonPause.on('pointerup', (pointer) => {
      this.onClickPlayPause(pointer)
    })
    bgButtonPause.on('pointerover', (pointer) => {
      this.pauseButtonSprite.setTint(0xffffff)
    })
    bgButtonPause.on('pointerout', (pointer) => {
      this.pauseButtonSprite.setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
    })

    // button help.
    const helpButtonBg = this.add
      .nineslice(0, 0, 'button', 0, 110, 110, 33, 33, 33, 33)
      .setTint(GameOptions.ui.buttonBgColor)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    this.helpButtonSprite = this.add
      .sprite(0, 0, 'help')
      .setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
      .setScale(0.7)
      .setOrigin(0.5)
    this.helpButton = this.add
      .container(centerXRight, this.pauseButton.y - 120, [helpButtonBg, this.helpButtonSprite])
      .setDepth(100)
    helpButtonBg.on('pointerover', (pointer) => {
      this.helpButtonSprite.setTint(0xffffff)
    })
    helpButtonBg.on('pointerout', (pointer) => {
      this.helpButtonSprite.setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
    })
    helpButtonBg.on('pointerup', () => {
      this.click.play()
      this.scene.pause('Game')
      this.game.scene.getScene('Help').onStartHelp()
    })
    // this.settingButton = new TextButton(this, leftPanelCenter, 600, 'Options', {
    //   fontFamily: 'Arial Black',
    //   fontSize: 38,
    //   color: '#ffffff',
    //   stroke: '#ffffff',
    //   // strokeThickness: 0,
    //   align: 'center'
    // })
    //   .setDepth(100)
    //   .setOrigin(0.5)

    // this.settingButtonBg = this.add
    //   .nineslice(this.settingButton.x, this.settingButton.y, 'button', 0, 200, 200, 33, 33, 33, 33)
    //   .setOrigin(0.5, 0)
    //   .setTint(0x3d3d3d)
    //   .setInteractive({ useHandCursor: true })
    // this.add.existing(this.settingButtonBg)

    // this.settingButtonBg.on('pointerover', () => {
    //   this.settingButtonBg.setAlpha(0.9)
    // })
    // this.settingButtonBg.on('pointerout', () => {
    //   this.settingButtonBg.setAlpha(1)
    // })
    // this.settingButtonBg.on('pointerdown', () => {
    //   this.settingButtonBg.setFrame(1)
    // })

    // events.
    this.events.on('pause', () => {
      this.click.pause()
    })
    this.events.on('resume', () => {
      this.tooglePanel(false)
    })
    // this.toggleSoundEffect()
    this.onCreateBanner()
    this.tooglePanel(false)

    EventBus.emit('current-scene-ready', this)
  }

  update() {
    // pause
    if (!this.game.scene.isPaused('Game')) {
      this.pauseButtonSprite.setFrame(0)
    } else {
      this.pauseButtonSprite.setFrame(1)
    }
  }

  toggleSoundEffect() {
    // sound
    if (!this.game.sound.mute) {
      this.soundButtonSprite.setTint(0x000000)
      this.soundButtonSprite.setFrame(0)
      // if (!this.textPause) {
      //   this.createText('Pause')
      // }
    } else {
      this.soundButtonSprite.setTint(GameOptions.ui.primaryColor.replace('#', '0x'))
      this.soundButtonSprite.setFrame(1)
      // if (this.textPause) {
      //   this.disablePanel()
      // }
    }
  }

  // createText(text: string) {
  //   this.textPause = this.add
  //     .text(GameOptions.screen.width / 2, GameOptions.screen.height / 2, text, {
  //       fontFamily: 'Arial Black',
  //       fontSize: 50,
  //       color: '#ffffff',
  //       stroke: '#ffffff',
  //       // strokeThickness: 0,
  //       align: 'center'
  //     })
  //     .setDepth(1000)
  //     .setOrigin(0.5)
  //   this.add.existing(this.textPause)
  // }

  tooglePanel(status: boolean) {
    this.textPause?.setVisible(status)
    this.textPanel?.setVisible(status)
    this.playButton?.setVisible(status)
  }

  onShowLangList(pointer: any) {
    // // this.tooglePanel(true)
    // this.textPanel?.setVisible(true)
    // this.pauseButton.setDepth(0)
    // this.soundButton.setDepth(0)
    // this.helpButton?.setDepth(0)
    // const sceneGame = this.game.scene.getScene('Game')
    // this.click.play()
    // if (sceneGame && (sceneGame.scene.isActive() || sceneGame.scene.isPaused())) {
    //   sceneGame?.scene.pause()
    // }
    // EventBus.emit('toggle-lang-list')
    EventBus.emit('toggle-lang')

    // // this.tweens.addCounter({
    // //   from: 100,
    // //   to: 0,
    // //   duration: 300,
    // //   onUpdate: (tween) => {
    // //     this.text.setFontSize(tween.getValue())
    // //   },
    // //   onComplete: () => {
    // //     this.panel.setVisible(false)
    // //   }
    // // })
    // // sceneGame?.scene.resume()
    // // this.scene.get('Game').onNewLevel()
  }

  onHideLangList() {
    this.pauseButton.setDepth(100)
    this.soundButton.setDepth(100)
    this.helpButton.setDepth(100)
    this.tooglePanel(false)
    // this.pauseButton.setVisible
    const sceneGame = this.game.scene.getScene('Game')
    this.click.play()
    sceneGame?.scene.resume()
  }

  togglePause(status) {
    this.pauseButton.setVisible(status)
    this.helpButton.setVisible(status)
    this.homeButton.setVisible(status)
    // this.playButton.setVisible(status)
  }

  changeLocale(lang: TLang) {
    this.textPause.setText(lang.pause || '#pause')
    this.playButtonText.setText(lang.btn_continue || '#btn_continue')
    this.btnLangText.setText(capitalizeFirstLetter(langs[this.gameData.lang.toString()].codeName))
  }

  onClickPlayPause(pointer: Phaser.Input.Pointer) {
    this.click.play()
    if (!this.scene.isPaused('Game')) {
      this.scene.pause('Game')
      // this.pauseButton.setFrame(1)
      this.tooglePanel(true)

      this.banners?.setVisible(true)
      if (window.onShowBanner) {
        window.onShowBanner('banner', 300, 250)
      }
      // this.textPause.setText('Pause')
    } else {
      this.scene.resume('Game')
      // this.pauseButton.setFrame(0)
      this.tooglePanel(false)
      this.banners.setVisible(false)
      if (window.onClearBanner) {
        window.onClearBanner('banner')
      }
    }
    // this.settingButtonBg.setFrame(0)
  }

  onSetGameData(data: IGameData) {
    this.gameData = JSON.parse(JSON.stringify(data))

    this.btnLangText.setText(capitalizeFirstLetter(langs[this.gameData.lang.toString()].codeName))
  }

  onCreateBanner() {
    var style = {
      'background-color': '#11111115',
      width: '300px',
      height: '250px'
    }
    var banners = document.getElementById('banner')
    this.banners = this.add.dom(150, 170, banners, style, '')
    this.banners.setVisible(false)
  }
}
