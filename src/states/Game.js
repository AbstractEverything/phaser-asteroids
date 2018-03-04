/* globals __DEV__ */
import Phaser from 'phaser'
import Ship from '../sprites/Ship'
import Bullet from '../sprites/Bullet'
import Explosion from '../sprites/Explosion'
import Asteroid from '../sprites/Asteroid'
import Bonus from '../sprites/Bonus'
import lodash from 'lodash'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.makeStatsText()
    this.makeShip()
    this.makeBullets()
    this.makeAsteroidsGroup()
    this.makeBonusesGroup()

    this.asteroidCount = 0
    this.bulletTime = 0
    this.asteroidTime = 0
    this.prevBonusScore = 0
  }

  update() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.fireWeapon()
    }

    this.physics.arcade.overlap(
      this.bullets,
      this.asteroids,
      this.bulletHitsAsteroid,
      null,
      this
    )

    this.physics.arcade.overlap(
      this.bonuses,
      this.ship,
      this.shipCollectsBonus,
      null,
      this
    )

    this.makeAsteroid(500)
    this.makeBonus(100)
  }

  /**
   * Make asteroids at a random position at a certain interval.
   */
  makeAsteroid(interval) {
    if (this.game.time.now > this.asteroidTime) {
      let asteroid = new Asteroid(
        this.game,
        _.random(-this.game.width / 2, this.game.width / 2),
        -this.game.height / 2 - 50
      )

      this.asteroids.add(asteroid)
      this.asteroidCount++
      this.asteroidTime = this.game.time.now + interval
    }
  }

  /**
   * Make a bonus at a random position every time the score
   * reaches a certain level.
   */
  makeBonus(score) {
    if (this.prevBonusScore == this.game.stats.score) {
      return
    }

    if (this.game.stats.score % score == 0 && this.game.stats.score != 0) {
      let bonus = new Bonus(
        this.game,
        _.random(-this.game.width / 2, this.game.width / 2),
        -this.game.height / 2 - 50
      )

      this.bonuses.add(bonus)
      this.prevBonusScore = this.game.stats.score
    }
  }

  makeStatsText() {
    this.livesText = this.createText('Lives: ' + this.game.stats.lives, -20, 0, 'right')
    this.scoreText = this.createText('Score: ' + this.game.stats.score, -20, 30, 'right')
    this.killsText = this.createText('Kills: ' + this.game.stats.kills, -20, 60, 'right')
    this.bonusText = this.createText('Bonus: ' + this.game.stats.bonus, -20, 90, 'right')
  }

  createText(text, xOffset, yOffset, align)
  {
    return this.game.add.text(xOffset, yOffset, text, {
      font: '24px Bangers',
      fill: '#fff',
      boundsAlignH: align,
    }).setTextBounds(0, 20, this.game.world.width, 0)
  }

  makeShip() {
    this.ship = new Ship(
      this.game,
      this.game.world.centerX,
      this.game.world.height - 100
    )

    this.game.add.existing(this.ship)
  }

  makeBullets() {
    this.bullets = this.game.add.group()
    this.bullets.enableBody = true
    this.bullets.setAll('outOfBoundsKill', true)
    this.bullets.setAll('checkWorldBounds', true)
  }

  fireWeapon() {
    if (this.game.bonus.trippleFire.timeOut != null && this.game.time.now <= this.game.bonus.trippleFire.timeOut) {
      return this.trippleFire()
    }

    let fireRate = 200

    if (this.game.bonus.rapidFire.timeOut != null && this.game.time.now <= this.game.bonus.rapidFire.timeOut) {
      fireRate = 100
    }

    if (this.game.time.now > this.bulletTime) {
      this.bullets.add(new Bullet(this.game, this.ship.x, this.ship.y))
      this.bulletTime = this.game.time.now + fireRate
    }
  }

  trippleFire() {
    if (this.game.time.now > this.bulletTime) {
      let bullet1 = new Bullet(this.game, this.ship.x, this.ship.y)
      let bullet2 = new Bullet(this.game, this.ship.x, this.ship.y, 10)
      let bullet3 = new Bullet(this.game, this.ship.x, this.ship.y, -10)

      this.bullets.add(bullet1)
      this.bullets.add(bullet2)
      this.bullets.add(bullet3)

      this.bulletTime = this.game.time.now + 200
    }
  }

  bulletHitsAsteroid(bullet, asteroid) {
    bullet.kill()
    asteroid.kill()

    this.asteroidExplosion = new Explosion(
      this.game,
      asteroid.body.x,
      asteroid.body.y
    )

    this.game.add.existing(this.asteroidExplosion)
    this.asteroidExplosion.animations.play('explode', 30, false, true)

    this.game.stats.score += 5
    this.game.stats.kills++

    this.scoreText.text = 'Score: ' + this.game.stats.score
    this.killsText.text = 'Kills: ' + this.game.stats.kills
  }

  shipCollectsBonus(ship, bonus) {
    switch (bonus.type) {
      case 0:
        this.game.bonus.trippleFire.timeOut = this.game.time.now + 5000
        break
      case 1:
        this.game.bonus.rapidFire.timeOut = this.game.time.now + 5000
        break
      case 2:
      this.game.bonus.bomb.quantity++
        break
    }

    bonus.kill()

    this.game.stats.bonus++
    this.bonusText.text = 'Bonus: ' + this.game.stats.bonus
  }

  makeAsteroidsGroup() {
    this.asteroids = this.game.add.group()

    this.asteroids.position.setTo(
      this.game.world.centerX,
      this.game.world.centerY
    )
  }

  makeBonusesGroup() {
    this.bonuses = this.game.add.group()

    this.bonuses.position.setTo(
      this.game.world.centerX,
      this.game.world.centerY
    )
  }

  render () {

  }
}
