import { React } from "./React.js";
import { IaAPI } from "../../utils/api.js";
class StartingCampaign {
    async stateAct(campaign, channel) {
        try {
            const history = await IaAPI.getInitialHistory(campaign.heroes);
            campaign.updateLastHistoryMessage(history);
            await channel.send(history + '.\n\n Digite qualquer mensagem com "!" na frente para interagir.');
            campaign.setstate(new React);
        }
        catch (error) {
            console.error(error);
            return "Deu ruim aqui zé.";
        }
    }
}
export { StartingCampaign };
