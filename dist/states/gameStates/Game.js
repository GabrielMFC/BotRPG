import { PreGame } from "./PreGame.js";
class Game {
    state = new PreGame;
    maxPlayers = 4;
    minPlayers = 1;
    pendingPlayersIds = [];
    heroes = [];
    updateHero(hero) {
        this.heroes.push(hero);
    }
    setState(state) {
        this.state = state;
    }
    async onInteract(param) {
        return await this.state.onInteract(this, param);
    }
}
export { Game };
