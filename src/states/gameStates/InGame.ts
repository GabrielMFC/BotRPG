import { Game, GameState } from "../Game.js";
import { IaAPI } from "../../utils/api.js";
import { TextChannel } from "discord.js";

class InGame implements GameState {
    async onInteract(ctx: Game, channel?: TextChannel): Promise<any> {
        const api = new IaAPI()
        const initialLocation = await api.getInitialLocation()
        console.log(initialLocation);

        await channel?.send(initialLocation)
    }
}

export {InGame}