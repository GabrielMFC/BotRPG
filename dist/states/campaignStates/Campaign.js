import { InProgress } from "./InProgress.js";
class Campaign {
    state = new InProgress;
    heroes;
    constructor(heroes) {
        this.heroes = heroes;
    }
    setstate(state) {
        this.state = state;
    }
    stateAct(param) {
        this.state.stateAct(param);
    }
}
export { Campaign };
