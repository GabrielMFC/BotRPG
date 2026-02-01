import CampaignFactory from "../../factory/CampaignFactory.js";
import { PreGame } from "./PreGame.js";
class Game {
    store;
    state = new PreGame;
    maxPlayers = 4;
    minPlayers = 1;
    pendingPlayersIds = [];
    heroes = [];
    constructor(store) {
        this.store = store;
    }
    updateHero(hero) {
        this.heroes.push(hero);
    }
    startCampaign(channelId, game) {
        const campaign = CampaignFactory.createFromGame(game);
        this.store.save(channelId, campaign);
    }
    setState(state) {
        this.state = state;
    }
    async onInteract(param) {
        return await this.state.onInteract(this, param);
    }
}
export { Game };
