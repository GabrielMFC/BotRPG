import { Game, GameState } from "./Game.js";
import CampaignFactory from "../../factory/CampaignFactory.js";

class InGame implements GameState {
    async onInteract(ctx: Game): Promise<any> {
        return CampaignFactory.createFromGame(ctx)
    }
}

export {InGame}