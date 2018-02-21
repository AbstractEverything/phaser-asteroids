import Phaser from 'phaser'
import lodash from 'lodash'

class Bonus extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'bonus')
        this.setUpPhysics()
        this.events.onOutOfBounds.add(this.bonusBelow, this)
        this.type = _.random(0, 3)
    }

    setUpPhysics() {
        this.game.physics.arcade.enableBody(this)
        this.checkWorldBounds = true
        this.anchor.setTo(0.5, 0.5)
        this.body.velocity.y = 200
    }

    bonusBelow() {
        if (this.body.center.y > 0) {
            this.kill()
        }
    }
}

export default Bonus