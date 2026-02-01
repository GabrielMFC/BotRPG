import { Campaign } from "../states/campaignStates/Campaign.js";
import { Game } from "../states/gameStates/Game.js";

class CampaignFactory {

    static createFromGame(game: Game): Campaign {
        return new Campaign(game.heroes)
    }
}

export default CampaignFactory