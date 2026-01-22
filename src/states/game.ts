import { TextChannel } from "discord.js"
import startingMessages from "../gameMessages/starting/messages.js"
import { collectPlayers } from "../utils/playersCollector.js"

interface GameState {
    onInteract(ctx: Game, param?: any): Promise<any>
}

interface PreGameState {
    stateAct(ctx: Game, param?: any): Promise<any> | any
    isFinished(ctx: Game): boolean
    next(): PreGameState | GameState | null
}

type Hero = {
    id: string
    displayName: string
    class: string
}

class Game {
    state!: GameState

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

class ChoosingPlayers implements PreGameState {
    stateAct(ctx: Game): string {
        console.log("Current state: ChoosingPlayers");
        return startingMessages.chooseNumberOfPlayers
    }

    isFinished(ctx: Game): boolean {
        return typeof ctx.maxPlayers === "number" &&  typeof ctx.minPlayers === "number"
    }

    next(): PreGameState | null {
        return new StartPlayersColector()
    }
}

class StartPlayersColector implements PreGameState {
    async stateAct(ctx: Game, param: TextChannel) {
        console.log("Current state: StartPlayersColector");
        
        const players = await collectPlayers(param,10_000)
        for(const playerId of players){
            ctx.pendingPlayersIds.push(playerId)
        }
    }

    isFinished(ctx: Game): boolean {
        if(typeof ctx.maxPlayers === "number" && typeof ctx.minPlayers === "number"){
            return ctx.pendingPlayersIds.length >= ctx.minPlayers && ctx.pendingPlayersIds.length <= ctx.maxPlayers
        }
        return ctx.pendingPlayersIds.length > 0
    }

    next(): PreGameState | null {
        return new ChoosingPlayersClasses()
    }
}

class ChoosingPlayersClasses implements PreGameState {
    async stateAct(ctx: Game) {
        console.log("Current state: ChoosingPlayersClasses");
        return startingMessages.choosePlayerClasses
    }

    isFinished(ctx: Game): boolean {
        return true
    }

    next(): PreGameState | null {
        return null
    }
}

class PreGame implements GameState {
    private substate: PreGameState = new ChoosingPlayers()

    async onInteract(ctx: Game, param?: unknown): Promise<any> {
        const result = await this.substate.stateAct(ctx, param)

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

const game = new Game()
game.setState(new PreGame)

export {game}