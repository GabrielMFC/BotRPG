import { Campaign } from "../states/campaignStates/Campaign.js";
class CampaignFactory {
    static createFromGame(game) {
        return new Campaign(game.heroes);
    }
}
export default CampaignFactory;
