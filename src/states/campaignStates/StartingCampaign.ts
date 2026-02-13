import { Message, TextChannel } from "discord.js";
import { Campaign, CampaignState } from "./Campaign.js";
import { IaAPI } from "../../utils/api.js";
import { PlayerRotation } from "./PlayerRotation.js";


class StartingCampaign implements CampaignState {
    async stateAct(campaign: Campaign, message: Message){
        try {
            console.log("Current State: StartingCampaign");

            if(message.channel instanceof TextChannel) {
            
                const history = await IaAPI.getInitialHistory(campaign.heroes)
                campaign.updateLastHistoryMessage(history)
                
                await message.channel.send(history)
                await message.channel.send(`Qual ação você irá tomar?`)
                campaign.setstate(new PlayerRotation)
                campaign.stateAct(campaign, message)
            }
        } catch (error) {
            console.error(error);
            return ""
        }
        
    }
}

export { StartingCampaign }