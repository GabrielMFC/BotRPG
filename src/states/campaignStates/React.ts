import { Interaction, Message, TextChannel } from "discord.js";
import { Campaign, CampaignState } from "./Campaign.js";
import { IaAPI } from "../../utils/api.js";
import { TurnActions } from "../../types/turnActions.js";

class React{
    async stateAct(campaign: Campaign, message: Message, actions: TurnActions): Promise<void> {
        if(message.channel instanceof TextChannel){
            console.log("Current State: React");
            
            const history = await IaAPI.getHistory(
                actions, campaign.lastHistoryMessage
            )
            await message.channel.send(history)
            campaign.updateLastHistoryMessage(history)
        }
    }
}

export {React}