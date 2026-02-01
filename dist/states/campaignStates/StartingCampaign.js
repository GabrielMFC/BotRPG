import { React } from "./React.js";
import { IaAPI } from "../../utils/api.js";
class StartingCampaign {
    async stateAct(campaign, channel) {
        channel.send(await IaAPI.getInitialHistory(campaign.heroes) + ".\n\n Digite !eu para interagir.");
        campaign.setstate(new React);
    }
}
export { StartingCampaign };
