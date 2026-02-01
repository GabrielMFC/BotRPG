import { TextChannel } from "discord.js";
import { Campaign, CampaignState } from "./Campaign.js";

class React implements CampaignState{
    stateAct(campaign: CampaignState, channel: TextChannel): void {
        channel.send("")
    }
}

export {React}