import { StartingCampaign } from "../campaignStates/StartingCampaign.js";
class InGame {
    async onInteract(ctx) {
        ctx.setstate(new StartingCampaign);
        ctx.stateAct();
    }
}
export { InGame };
