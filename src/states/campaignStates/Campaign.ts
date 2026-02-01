import { NotStarted } from "./notStarted.js"
import { Hero } from "../gameStates/Game.js"
import { TextChannel } from "discord.js"

interface CampaignState {
    stateAct(campaign: Campaign | CampaignState, channel: TextChannel):void
}

class Campaign implements CampaignState{
    state: CampaignState = new NotStarted
    heroes: Hero[]

    constructor(heroes: Hero[]){
        this.heroes = heroes
    }

    setstate(state:CampaignState) {
        this.state = state
    }

    stateAct(campaign: Campaign, channel: TextChannel): void {
        this.state.stateAct(campaign, channel)
    }
}

export {Campaign, CampaignState}