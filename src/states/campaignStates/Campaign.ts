import { NotStarted } from "./notStarted.js"
import { Hero } from "../gameStates/Game.js"
import { Interaction, Message, TextChannel } from "discord.js"
import { TurnActions } from "../../types/turnActions.js"

interface CampaignState {
    stateAct(campaign: Campaign | CampaignState, channel?: Message | TextChannel, actions?: TurnActions): void
}

class Campaign implements CampaignState{
    state: CampaignState = new NotStarted
    heroes: Hero[]
    lastHistoryMessage: string = ""
    isActiveTurn: boolean = false

    constructor(heroes: Hero[]){
        this.heroes = heroes
    }

    setstate(state:CampaignState) {
        this.state = state
    }

    updateLastHistoryMessage(message: string) {
        this.lastHistoryMessage = message
    }

    stateAct(campaign: Campaign, channel?: Message | TextChannel, actions?: TurnActions): void {
        this.state.stateAct(campaign, channel, actions)
    }
}

export {Campaign, CampaignState}