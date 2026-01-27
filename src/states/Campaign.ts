import { Hero } from "./Game.js"

interface CampaignState {
    stateAct(param: unknown):void
}

class Campaign implements CampaignState{
    state!: CampaignState
    private heroes: Hero[]

    constructor(heroes: Hero[]){
        this.heroes = heroes
    }

    setstate(state:CampaignState) {
        this.state = state
    }

    stateAct(param: any): void {
        
    }
}

export {Campaign, CampaignState}