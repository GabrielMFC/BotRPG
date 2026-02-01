import { NotStarted } from "./notStarted.js";
class Campaign {
    state = new NotStarted;
    heroes;
    constructor(heroes) {
        this.heroes = heroes;
    }
    setstate(state) {
        this.state = state;
    }
    stateAct(campaign, channel) {
        this.state.stateAct(campaign, channel);
    }
}
export { Campaign };
