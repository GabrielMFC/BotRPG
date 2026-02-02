import { NotStarted } from "./notStarted.js";
class Campaign {
    state = new NotStarted;
    heroes;
    lastHistoryMessage = "";
    constructor(heroes) {
        this.heroes = heroes;
    }
    setstate(state) {
        this.state = state;
    }
    updateLastHistoryMessage(message) {
        this.lastHistoryMessage = message;
    }
    stateAct(campaign, channel) {
        this.state.stateAct(campaign, channel);
    }
}
export { Campaign };
