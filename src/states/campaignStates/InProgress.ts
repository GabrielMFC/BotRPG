import { TextChannel } from "discord.js";
import { CampaignState } from "./Campaign.js";
import { IaAPI } from "../../utils/api.js";

class InProgress implements CampaignState{
    async stateAct(channel: TextChannel) {
        //
    }
}

export {InProgress}