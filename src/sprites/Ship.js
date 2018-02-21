import Phaser from 'phaser'

class Ship extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'ship')
    this.setUpPhysics()
  }

  setUpPhysics() {
    this.game.physics.arcade.enableBody(this)
  }

  update() {
    if (this.x >= 0 && game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.x -= 10
    }
    
    if (this.x <= game.world.width - this.width && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.x += 10
    }
  }
}

export default Ship