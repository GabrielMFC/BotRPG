import { TextChannel } from "discord.js";
import { Campaign, CampaignState } from "./Campaign.js";
import { React } from "./React.js";
import { IaAPI } from "../../utils/api.js";


class StartingCampaign implements CampaignState {
    async stateAct(campaign: Campaign, channel: TextChannel): Promise<void> {
        channel.send(await IaAPI.getInitialHistory(campaign.heroes) + ".\n\n Digite !eu para interagir.")

        campaign.setstate(new React)
    }
}

export { StartingCampaign }