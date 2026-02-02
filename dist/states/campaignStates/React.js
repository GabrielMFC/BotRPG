import { TextChannel } from "discord.js";
import { IaAPI } from "../../utils/api.js";
class React {
    async stateAct(campaign, message) {
        if (message.channel instanceof TextChannel) {
            const history = await IaAPI.getHistory(campaign.heroes[0], campaign.lastHistoryMessage, message.content);
            message.channel.send(history);
            campaign.updateLastHistoryMessage(history);
        }
    }
}
export { React };
