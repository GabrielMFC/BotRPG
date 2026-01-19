import { TextChannel } from "discord.js"
import startingMessages from "../gameMessages/starting/messages.js"
import { collectPlayers } from "../utils/playersCollector.js"

interface GameState {
    onInteract(ctx: Game, param: any): any
}

interface PreGameState {
    stateAct(ctx: Game, param?: any): any
    isFinished(ctx: Game): boolean
    next(): PreGameState | GameState | null
}

class Game {
    state!: GameState

    numberOfPlayers?: number
    pendingPlayersIds: string[] = []
    players: Array<{ playerId: string; class?: string }> = []


    setState(state: GameState) {
        this.state = state
    }

    onInteract(param?: any){
        return this.state.onInteract(this, param)
    }
}

class ChoosingPlayers implements PreGameState {
    stateAct(ctx: Game): string {
        return startingMessages.chooseNumberOfPlayers
    }

    isFinished(ctx: Game): boolean {
        return typeof ctx.numberOfPlayers === "number"
    }

    next(): PreGameState | null {
        return new StartPlayersColector()
    }
}

class StartPlayersColector implements PreGameState {
    async stateAct(ctx: Game, param: TextChannel) {
        const players = await collectPlayers(param,10_000)
        for(const playerId of players){
            ctx.pendingPlayersIds.push(playerId)
        }
    }

    isFinished(ctx: Game): boolean {
        return ctx.pendingPlayersIds.length == 4
    }

    next(): PreGameState | null {
        return new ChoosingPlayersClasses()
    }
}

class ChoosingPlayersClasses implements PreGameState {
    async stateAct(ctx: Game) {
        return startingMessages.choosePlayerClasses
    }

    isFinished(ctx: Game): boolean {
        return ctx.pendingPlayersIds.length < 5
    }

    next(): PreGameState | null {
        return null
    }
}

class PreGame implements GameState {
    private substate: PreGameState = new ChoosingPlayers()

    onInteract(ctx: Game, param?: unknown): any {
        const result = this.substate.stateAct(ctx, param)

        if (this.substate.isFinished(ctx)) {
            const next = this.substate.next()

            if(next && "stateAct" in next){
                this.substate = next
            }
            else if(next) {
                ctx.setState(next)
            }
        }

        return result
    }
}

export {Game,PreGame}