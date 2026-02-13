import { Interaction, Message, TextChannel } from "discord.js";
import { Campaign, CampaignState } from "./Campaign.js";
import { IaAPI } from "../../utils/api.js";
import { TurnActions } from "../../types/turnActions.js";
import { PlayerRotation } from "./PlayerRotation.js";

class React implements CampaignState{
    async stateAct(campaign: Campaign, message: Message, actions: TurnActions): Promise<void> {
        if(message.channel instanceof TextChannel){
            console.log("Current State: React");
            
            const history = await IaAPI.getHistory(
                actions, campaign.lastHistoryMessage
            )
            await message.channel.send(history)
            await message.channel.send(`Qual ação você irá tomar?`)
            campaign.updateLastHistoryMessage(history)

            campaign.stateAct(campaign, message)
        }
    }
}

export {React}