import Phaser from 'phaser'

class Bullet extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'bullet')
    }

    update() {
        this.y -= 20
    }
}

export default Bullet