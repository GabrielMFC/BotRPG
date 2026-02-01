import CampaignFactory from "../../factory/CampaignFactory.js";
class InGame {
    async onInteract(ctx) {
        return CampaignFactory.createFromGame(ctx);
    }
}
export { InGame };
