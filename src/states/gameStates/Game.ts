import { PreGame } from "./PreGame.js"

interface GameState {
    onInteract(ctx: Game, param?: any): Promise<any>
}

type Hero = {
    id: string
    displayName: string
    class: string
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


export {Game, GameState}