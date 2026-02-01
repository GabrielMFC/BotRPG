import { InProgress } from "./InProgress.js"
import { Hero } from "../gameStates/Game.js"

interface CampaignState {
    stateAct(param: unknown):void
}

class Campaign implements CampaignState{
    state: CampaignState = new InProgress
    private heroes: Hero[]

    constructor(heroes: Hero[]){
        this.heroes = heroes
    }

    setstate(state:CampaignState) {
        this.state = state
    }

    stateAct(param: any): void {
        this.state.stateAct(param)
    }
}

export {Campaign, CampaignState}