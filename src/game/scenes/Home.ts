import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import { GameOptions } from '../options/gameOptions'
import { IGameData, Ilb, TLang } from '@/App.vue'

export class Home extends Scene {
  constructor() {
    super('Home')
  }

  gameData: IGameData

  lang: TLang
  scoreText: Phaser.GameObjects.Text
  scoreValueText: Phaser.GameObjects.Text
  recordText: Phaser.GameObjects.Text
  bestScoreText: Phaser.GameObjects.Text
  bestScoreContainer: Phaser.GameObjects.Container

  lbData: Ilb
  leaderBoardTitle: Phaser.GameObjects.Text
  leaderBoardList: Phaser.GameObjects.Container

  bg: Phaser.GameObjects.Image
  startButton: Phaser.GameObjects.Container
  startButtonBg: Phaser.GameObjects.NineSlice
  startButtonText: Phaser.GameObjects.Text
  startButtonSprite: Phaser.GameObjects.Sprite
  textName: Phaser.GameObjects.Text

  click: Phaser.Sound.HTML5AudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.WebAudioSound

  create() {
    this.click = this.sound.add('click')

    // bg.
    // this.bg = this.add
    //   .image(GameOptions.screen.width / 2, GameOptions.screen.height / 2, 'bg')
    //   .setTint(GameOptions.ui.panelBgColor)
    //   .setDepth(-100)

    if (GameOptions.isLeaderBoard) {
      this.leaderBoardList = this.add.container(200, 370, [])
      this.leaderBoardTitle = this.add
        .text(300, 320, 'Leader board', {
          fontFamily: 'Arial',
          fontStyle: 'bold',
          fontSize: 40,
          color: GameOptions.ui.primaryColor,
          stroke: '#000000',
          strokeThickness: 0,
          align: 'center'
        })
        .setOrigin(0)
        .setDepth(100)
    }

    // panel.
    this.textName = this.add
      .text(GameOptions.screen.width / 2, 100, '#NameGame', {
        fontFamily: 'Arial',
        fontSize: 100,
        fontStyle: 'bold',
        color: GameOptions.ui.accent, //GameOptions.ui.accent,
        align: 'center',
        lineSpacing: -25
      })
      .setDepth(1000)
      .setOrigin(0.5)

    // record.
    // const bgPanel = this.add
    //   .nineslice(0, 10, 'panel', 0, 550, 800, 33, 33, 33, 33)
    //   .setTint(GameOptions.ui.panelBgColorLight)
    //   .setAlpha(0.05)
    //   .setOrigin(0)
    const rate = this.add
      .image(50, 70, 'rate')
      .setTint(0xffffff)
      .setScale(0.5)
      .setDepth(10)
      .setOrigin(0)
    this.bestScoreText = this.add
      .text(190, 125, '', {
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 60,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 0,
        align: 'center'
      })
      .setOrigin(0)
      .setDepth(100)
    this.recordText = this.add
      .text(195, 90, '', {
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 30,
        color: '#ffffff',
        // stroke: '#000000',
        // strokeThickness: 0,
        align: 'right'
      })
      .setAlpha(0.8)
      .setOrigin(0)
      .setDepth(100)
    this.bestScoreContainer = this.add.container(
      this.leaderBoardList ? GameOptions.screen.width / 2 : GameOptions.screen.width / 2 - 250,
      250,
      [rate, this.bestScoreText, this.recordText]
    )

    // start game button.
    this.startButtonBg = this.add
      .nineslice(0, 0, 'button', 0, 500, 250, 33, 33, 33, 33)
      .setTint(GameOptions.ui.activeTextNumber)
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    this.startButtonText = this.add
      .text(0, 50, '#startGame', {
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 50,
        color: '#000',
        // stroke: '#000000',
        // strokeThickness: 2,
        align: 'center'
      })
      .setDepth(1000)
      .setOrigin(0.5)

    this.startButtonBg.on('pointerup', (pointer) => this.startGame(pointer))
    this.startButtonBg.on('pointerover', (pointer) => {
      this.startButtonBg.setAlpha(0.8)
    })
    this.startButtonBg.on('pointerout', (pointer) => {
      this.startButtonBg.setAlpha(1)
    })

    this.scoreText = this.add
      .text(0, -80, 'Current score', {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#000000',
        align: 'left'
      })
      .setAlpha(0.8)
      .setOrigin(0.5)
      .setDepth(100)
    this.scoreValueText = this.add
      .text(0, -40, '123456789012345', {
        fontFamily: 'Arial',
        fontSize: 50,
        color: '#000000',
        align: 'left'
      })
      .setAlpha(0.8)
      .setOrigin(0.5)
      .setDepth(100)

    this.startButton = this.add.container(
      this.leaderBoardList ? GameOptions.screen.width / 2 + 280 : GameOptions.screen.width / 2,
      600,
      [this.startButtonBg, this.startButtonText, this.scoreText, this.scoreValueText]
    ) //.setInteractive()

    // events.
    this.events.on('pause', () => {
      this.click.pause()
    })
    this.events.on('resume', () => {
      this.tooglePanel(false)
    })

    this.tooglePanel(true)

    EventBus.emit('start-create', null)
    EventBus.emit('current-scene-ready', this)
  }

  update() {
    if (this.gameData && this.gameData.bestScore) {
      this.startButtonText.setText(this.lang.btn_continue || '#btn_continue')
    } else {
      this.startButtonText.setText(this.lang.btn_startgame || '#btn_startgame')
    }
    // pause
    // if (!this.game.scene.isPaused('Game')) {
    // } else {
    // }
  }

  tooglePanel(status: boolean) {
    this.leaderBoardTitle?.setVisible(status)
    this.leaderBoardList?.setVisible(status)
    this.textName?.setVisible(status)
    // this.bg.setVisible(status)
    this.bestScoreContainer.setVisible(status)
    this.startButton.setVisible(status)

    const sceneControl = this.scene.get('Control')
    if (sceneControl) {
      sceneControl?.togglePause(!status)
    }
    // window.getLB && window.getLB()
  }

  startGame(pointer: any) {
    this.tooglePanel(false)

    this.click.play()
    // this.scene.start('Game')
    const sceneGame = this.game.scene.getScene('Game')
    sceneGame?.scene.start()

    if (window && window.onGamePlayStart) {
      window.onGamePlayStart()
    }
    // const sceneGame = this.game.scene.getScene('Game')
    // sceneGame?.onSetGameData(this.gameData)
    // EventBus.emit('toggle-lang-list')
  }

  stopGame() {
    EventBus.emit('show-lb', true)
    this.tooglePanel(true)

    const sceneGame = this.game.scene.getScene('Game')
    this.click.play()
    sceneGame?.scene.stop()

    if (window && window.onGameplayStop) {
      window.onGameplayStop()
    }
  }

  onSetLeaderBoard(data: Ilb) {
    this.lbData = JSON.parse(JSON.stringify(data))
    this.drawLeaderBoard()
  }

  drawLeaderBoard() {
    // if (!this.leaderBoardList) {
    //   return
    // }
    // console.log('drawLeaderBoard: ', this.lbData)
    this.leaderBoardList?.removeAll(true)
    const bgLb = this.add
      .nineslice(30, -110, 'panel', 0, 650, 750, 33, 33, 33, 33)
      .setTint(GameOptions.ui.panelBgColorLight)
      .setAlpha(0.1)
      .setOrigin(0)
    this.leaderBoardList.add([bgLb])

    for (let i = 0; i < 5; i++) {
      const itemData = this.lbData.entries[i]
      if (!itemData) return
      // const bg = this.add
      //   .nineslice(350, 0, 'panel', 0, 600, 150, 33, 33, 33, 33)
      //   .setTint(GameOptions.ui.panelBgColor)
      //   .setAlpha(0.8)
      //   .setOrigin(0.5, 0)
      //   .setInteractive({ useHandCursor: true })
      const text = this.add
        .text(200, 40, itemData.name, {
          fontFamily: 'Arial',
          fontSize: 30,
          color: GameOptions.ui.primaryColor,
          align: 'center'
        })
        .setDepth(111)
        .setOrigin(0)
      const score = this.add
        .text(200, 90, itemData.score.toString(), {
          fontFamily: 'Arial',
          fontSize: 30,
          fontStyle: 'bold',
          color: GameOptions.ui.primaryColor,
          align: 'center'
        })
        .setDepth(111)
        .setOrigin(0)

      const nameImage = `image-${i}`
      if (this.textures.exists(nameImage)) {
        this.textures.remove(nameImage)
      }

      const img = this.add.image(120, 80, 'placeholder').setScale(1)
      this.load.image(
        nameImage,
        itemData.photo
        //'https://avatars.mds.yandex.net/get-yapic/21493/enc-949461d55ad8e9deb5fb42767a562a9cb258976f2c3ad874aa76c9afbae08952/islands-middle'
      )
      this.load.once(Phaser.Loader.Events.COMPLETE, () => {
        // texture loaded so use instead of the placeholder
        img.setTexture(nameImage)
      })
      this.load.start()
      // this.toDataUrl(
      //   'https://avatars.mds.yandex.net/get-yapic/21493/enc-949461d55ad8e9deb5fb42767a562a9cb258976f2c3ad874aa76c9afbae08952/islands-middle',
      //   (myBase64) => {
      //     console.log(nameImage)

      //     const b = this.textures.addBase64(nameImage, myBase64)
      //     b.once('addtexture', (key) => {
      //       console.log(key, nameImage)

      //       if (key === nameImage) {
      //         img.setTexture(nameImage)
      //       } else {
      //         throw new Error('Wrong key: ' + key)
      //       }
      //     })
      //   }
      // )
      const item = this.add.container(0, i * 120, [text, img, score]).setDepth(100)

      this.leaderBoardList.add([item])
    }
  }

  toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
      var reader = new FileReader()
      reader.onloadend = function () {
        callback(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
  }

  onSetGameData(data: IGameData) {
    this.gameData = JSON.parse(JSON.stringify(data))

    this.bestScoreText.setText(this.gameData.bestScore.toString())
    this.scoreValueText.setText(this.gameData.totalScore.toString())
  }

  changeLocale(lang: TLang) {
    this.lang = lang

    this.leaderBoardTitle?.setText(lang.leaderboard_title || '#leaderboard')
    this.textName.setText(lang.name_game || '#name_game')
    // if (this.gameData.bestScore) {
    //   this.startButtonText.setText(lang.btn_continue || '#btn_continue')
    // } else {
    //   this.startButtonText.setText(lang.btn_startgame || '#btn_startgame')
    // }
    this.recordText.setText(lang.record || '#record')
    this.scoreText.setText(lang.current_score || '#current_score')
  }
}
