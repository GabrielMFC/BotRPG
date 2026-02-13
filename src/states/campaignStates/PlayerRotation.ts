import { Message, TextChannel } from "discord.js";
import { Campaign, CampaignState } from "./Campaign.js";
import { Colletor } from "../../utils/messageCollector.js";
import { React } from "./React.js";
import { TurnActions } from "../../types/turnActions.js";


class PlayerRotation implements CampaignState {
    async stateAct(campaign: Campaign, message: Message): Promise<void> {
        let actions = []
        if(message.channel instanceof TextChannel){
            console.log("Current State: PLayerRotation");
            
            for(let i = 0; i < campaign.heroes.length; i++){
                let player = campaign.heroes[i]
                const playerMessage = await Colletor.playersInteractionMessageCollector(
                    message, 
                    600000
                )
                console.log("Turn action:",message.content);
                
                if(playerMessage.has(campaign.heroes[i].id)){
                    actions.push({id: player.id, name: player.displayName, action: message.content})
                }
            }
        }
        const react = new React()
        react.stateAct(campaign, message, actions as TurnActions)
    }
}

export {PlayerRotation}