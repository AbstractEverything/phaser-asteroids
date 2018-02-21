import Phaser from 'phaser'
import WebFont from 'webfontloader'
import stats from './globals/stats'
import bonus from './globals/bonus'
import { clone } from 'lodash'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  create() {
    this.game.stats = clone(stats)
    this.game.bonus = clone(bonus)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('ship', './assets/images/ship.png')
    this.load.image('bullet', './assets/images/bullet.png')
    this.load.image('bonus', './assets/images/bonus.png')
    this.load.image('asteroid1', './assets/images/asteroid1.png')
    this.load.image('asteroid2', './assets/images/asteroid2.png')
    this.load.image('asteroid3', './assets/images/asteroid3.png')
    this.load.image('asteroid4', './assets/images/asteroid4.png')
    this.load.spritesheet('explosion', './assets/images/explosion.png', 128, 128, 14)
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
