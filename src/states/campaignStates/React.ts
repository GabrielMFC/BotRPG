import { Interaction, Message, TextChannel } from "discord.js";
import { Campaign, CampaignState } from "./Campaign.js";
import { IaAPI } from "../../utils/api.js";

class React implements CampaignState{
    async stateAct(campaign: Campaign, message: Message): Promise<void> {
        if(message.channel instanceof TextChannel){
            const history = await IaAPI.getHistory(
                campaign.heroes[0], 
                campaign.lastHistoryMessage,
                message.content
            )
            await message.channel.send(history)
            campaign.updateLastHistoryMessage(history)
        }
    }
}

export {React}