import Phaser from 'phaser'
import lodash from 'lodash'

class Asteroid extends Phaser.Sprite {
    constructor(game, x, y) {
      super(game, x, y, 'asteroid' + _.random(1, 4))
      this.setUpPhysics()
      this.events.onOutOfBounds.add(this.asteroidBelow, this)
    }

    setUpPhysics() {
      this.game.physics.arcade.enableBody(this)
      this.checkWorldBounds = true
      this.body.bounce.set(1)
      this.anchor.setTo(0.5, 0.5)
      this.body.velocity.y = _.random(50, 100)
    }
    
    /**
     * If the asteroid is out of bounds and below the world kill it
     */
    asteroidBelow() {
      if (this.body.center.y > 0) {
        this.kill()
      }
    }

    update() {
      this.angle += 1
    }
}

export default Asteroid