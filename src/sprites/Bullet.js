import Phaser from 'phaser'

class Bullet extends Phaser.Sprite {
    constructor(game, x, y, angle = 0) {
        super(game, x, y, 'bullet')
        this.angle = angle
    }

    update() {
        this.y -= 20
        this.x -= this.angle
    }
}

export default Bullet