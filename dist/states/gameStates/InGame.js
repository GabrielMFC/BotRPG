import { IaAPI } from "../../utils/api.js";
class InGame {
    async onInteract(ctx, channel) {
        const api = new IaAPI();
        const initialLocation = await api.getInitialLocation();
        console.log(initialLocation);
        await channel?.send(initialLocation);
    }
}
export { InGame };
