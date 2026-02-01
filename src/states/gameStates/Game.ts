import { Hero } from "../../factory/HeroFactory.js"
import { Campaign } from "../campaignStates/Campaign.js"
import { PreGame } from "./PreGame.js"

interface GameState {
    onInteract(ctx: Game | Campaign, param?: any): Promise<any>
}

type HeroBody = {
    eyes: {
        injured: boolean,
        injuredAmmount: number
    },
    neck: {
        injured: boolean
    },
    arms: {
        injured: boolean,
        injuredAmmount: number
    },
    belly: {
        injured: boolean,
    },
    legs: {
        injured: boolean,
        injuredAmmount: number
    }
}


class Game {
    state: GameState = new PreGame

    maxPlayers: number = 4
    minPlayers: number = 1
    pendingPlayersIds: string[] = []
    heroes: Hero[] = []

    updateHero(hero:Hero){
        this.heroes.push(hero)
    }

    setState(state: GameState) {
        this.state = state
    }

    async onInteract(param?: any){
        return await this.state.onInteract(this, param)
    }
}


export {Game, GameState, Hero, HeroBody}