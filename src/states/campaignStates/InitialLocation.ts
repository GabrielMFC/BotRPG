import { CampaignState } from "../Campaign.js";
import { Game } from "../Game.js";

class initialLocation implements CampaignState{
    stateAct(context: Game): void {
    }
}

export {initialLocation}