import { PreGame } from "./gameStates/PreGame.ts"

interface GameState {
    onInteract(ctx: Game, param?: any): Promise<any>
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

type Hero = {
    id: string
    displayName: string
    class: string,
    body: HeroBody
}

class Game {
    state: GameState = new PreGame

    maxPlayers: number = 4
    minPlayers: number = 1
    pendingPlayersIds: string[] = []
    heroes: Hero[] = []


    setState(state: GameState) {
        this.state = state
    }

    async onInteract(param?: any){
        return await this.state.onInteract(this, param)
    }
}


export {Game, GameState, Hero, HeroBody}