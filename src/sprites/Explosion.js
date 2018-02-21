import Phaser from 'phaser'

class Explosion extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'explosion')
        this.animations.add('explode', [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        10, true)
    }
}

export default Explosion