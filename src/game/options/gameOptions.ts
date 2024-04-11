// CONFIGURABLE GAME OPTIONS
// changing these values will affect gameplay

export const GameOptions: any = {
  // local storage name
  localStorageName: 'com.mikalai2006.bal2048new',

  // maximum size of the ball going to be dropped
  maxStartBallSize: 3,

  isLeaderBoard: true,
  lang: 'en',

  startJob: [
    [4, 1]
    // [5, 6],
    // [6, 5],
    // [7, 4],
    // [8, 3],
    // [9, 2],
    // [10, 1]
  ],

  koofLevel: 10,
  minNeedValueScoreByLevel: 2048,

  debounceCheckSeria: 500,
  maxBallForBomb: 10,
  // rangeDateAddBomb: 10000,
  defaultSizeBomb: 0.5,
  maxBallSizeForAddBonusBomb: 2048,

  // floor.
  maxTimeForChangeFloorY: 8000,
  minTimeForChangeFloorY: 3000,
  stepChangeFloor: 5,
  durationFloor: 300,
  floorBgColor: 0xdb7093,

  // radius and impulse of the blast occurring when to balls merge
  blast: {
    radius: 100,
    impulse: 2
  },

  // idle time after the played droppet the ball
  idleTime: 500,

  screen: {
    width: 1920,
    height: 1080
  },

  ui: {
    primaryColor: '#94a3b8',
    successColor: '#84cc16',
    panelBgColor: 0x0f172a, // 0x4a5449,
    panelBgColorLight: 0x94a3b8,
    panelBgColorAccent: 0xe1d41c,
    buttonBgColor: 0x1e293b, //475569,
    activeText: '#ADFF2F',
    activeTextNumber: 0xe1d41c, //0x84cc16,
    dangerText: '#FF7F50',
    pathColor: 0x404040,
    accent: '#e1d41c',
    accentNumber: 0xe1d41c
  },

  // game field size
  gameField: {
    width: 700,
    height: 850,
    distanceFromBottom: 30,
    borderColor: 0x475569,
    y: 70,
    ballY: 50
  },

  timerNewBall: {
    widthProgress: 12,
    heightProgress: 150,
    maxTimeWait: 10000,
    minTimeWait: 5000,
    progressColor: 0x84cc16
  },

  // Box2D gravity and scale
  Box2D: {
    gravity: 50,
    worldScale: 30
  },

  maxVelocity: 80,
  minVelocity: 30,

  minIndexFindBody: 4,
  maxIndexFindBody: 6,
  // bodies
  // bodies: [
  //   {
  //     size: 50,
  //     color: 0xe32421,
  //     particleSize: 10,
  //     score: 2,
  //     textSize: 35,
  //     textColor: '#ffffff'
  //   },
  //   {
  //     size: 60,
  //     color: 0xadff2f,
  //     particleSize: 20,
  //     score: 4,
  //     textSize: 40,
  //     textColor: '#000'
  //   },
  //   {
  //     size: 70,
  //     color: 0xf4e402,
  //     particleSize: 30,
  //     score: 8,
  //     textSize: 45,
  //     textColor: '#000'
  //   },
  //   {
  //     size: 80,
  //     color: 0xff49b2,
  //     particleSize: 40,
  //     score: 16,
  //     textSize: 50,
  //     textColor: '#fff'
  //   },
  //   {
  //     size: 90,
  //     color: 0x1ac6f9,
  //     particleSize: 50,
  //     score: 32,
  //     textSize: 50,
  //     textColor: '#fff'
  //   },
  //   {
  //     size: 100,
  //     color: 0x7638c8,
  //     particleSize: 60,
  //     score: 64,
  //     textSize: 50,
  //     textColor: '#ffffff'
  //   },
  //   {
  //     size: 110,
  //     color: 0x925f2c,
  //     particleSize: 70,
  //     score: 128,
  //     textSize: 50,
  //     textColor: '#ffffff'
  //   },
  //   {
  //     size: 120,
  //     color: 0xf28e1c,
  //     particleSize: 80,
  //     score: 256,
  //     textSize: 40,
  //     textColor: '#ffffff'
  //   },
  //   {
  //     size: 130,
  //     color: 0x5181ad,
  //     particleSize: 90,
  //     score: 512,
  //     textSize: 40,
  //     textColor: '#ffffff'
  //   },
  //   {
  //     size: 135,
  //     color: 0x96c3b2,
  //     particleSize: 100,
  //     score: 1024,
  //     textSize: 45,
  //     textColor: '#ffffff'
  //   },
  //   {
  //     size: 140,
  //     color: 0x2f2f2d,
  //     particleSize: 100,
  //     score: 2048,
  //     textSize: 50,
  //     textColor: '#ffffff'
  //   }
  // ]

  bodies: [
    {
      size: 35,
      color: 0xf05837,
      particleSize: 10,
      score: 2,
      textSize: 25,
      textColor: '#ffffff',
      max: 0
    },
    {
      size: 40,
      color: 0x9acd32,
      particleSize: 20,
      score: 4,
      textSize: 27,
      textColor: '#000',
      max: 0
    },
    {
      size: 45,
      color: 0xffd700,
      particleSize: 30,
      score: 8,
      textSize: 27,
      textColor: '#000',
      max: 0
    },
    {
      size: 50,
      color: 0xd6618f,
      particleSize: 40,
      score: 16,
      textSize: 27,
      textColor: '#fff',
      max: 0
    },
    {
      size: 52,
      color: 0x6495ed,
      particleSize: 50,
      score: 32,
      textSize: 30,
      textColor: '#fff',
      max: 20
    },
    {
      size: 54,
      color: 0x824ca7,
      particleSize: 60,
      score: 64,
      textSize: 30,
      textColor: '#ffffff',
      max: 10
    },
    {
      size: 56,
      color: 0xa0522d, //483d8b,
      particleSize: 70,
      score: 128,
      textSize: 30,
      textColor: '#ffffff',
      max: 5
    },
    {
      size: 58,
      color: 0xf28e1c,
      particleSize: 80,
      score: 256,
      textSize: 30,
      textColor: '#ffffff',
      max: 4
    },
    {
      size: 60,
      color: 0x5f9ea0, //0x5181ad,
      particleSize: 90,
      score: 512,
      textSize: 30,
      textColor: '#ffffff',
      max: 3
    },
    {
      size: 63,
      color: 0xa9a9a9,
      particleSize: 100,
      score: 1024,
      textSize: 30,
      textColor: '#ffffff',
      max: 2
    },
    {
      size: 66,
      color: 0x708090,
      particleSize: 100,
      score: 2048,
      textSize: 30,
      textColor: '#ffffff',
      max: 1
    }
  ]
}
