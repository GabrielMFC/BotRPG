import startingMessages from "../gameMessages/starting/messages.js"

interface GameState {
    onMessage(ctx: Game, ): string
}

class Game {
    state!: GameState

    numberOfPlayers?: number
    playerClasses: string[] = []

    setState(state: GameState) {
        this.state = state
    }

    onMessage(){
        return this.state.onMessage(this)
    }
}

class PreGame implements GameState {
    onMessage(ctx: Game, ): string {
        if(!ctx.numberOfPlayers){
            return startingMessages.chooseNumberOfPlayers
        }
        return startingMessages.choosePlayerClasses
    }
}

export {Game,PreGame}