/**
 * A class for any creature in the game world, including the player character
 */
class Creature {

    /**
     * Creates a creature represented by the specified sprite.
     *
     * @param sprite    The sprite representing this creature. The creature uses the sprite's physics body.
     * @param health    The creatures health (hit points). Default: 100
     * @param damage    The damage dealt by the creature's basic attack. Default: 10
     * @param abilities Any abilities the creature has.
     */
    constructor(sprite, health=100, damage=10, ...abilities) {
        this.gameObject = sprite;
        this.body = sprite.body;  // physics body
        this.game = sprite.game;

        this.health = health;
        this.damage = damage;

        this.ability1 = abilities[0];
        this.ability2 = abilities[1];
        this.ability3 = abilities[2];
        this.ability4 = abilities[3];
    }
}