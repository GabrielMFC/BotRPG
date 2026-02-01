import { CampaignState } from "./Campaign.js";

class NotStarted implements CampaignState{
    stateAct(param: unknown): void {
        console.error("The campaign is not started.");
    }
}

export {NotStarted}