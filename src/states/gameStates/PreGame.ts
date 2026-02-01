import { Game, GameState } from "./Game.js"
import { TextChannel } from "discord.js"
import {startingMessages} from "../../gameMessages/starting/messages.js"
import { Colletor } from "../../utils/playersCollector.js"

interface PreGameState {
    stateAct(ctx: Game, param?: any): Promise<any> | any
    isFinished(ctx: Game): boolean
    next(): PreGameState | GameState | null
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
    async stateAct(ctx: Game, channel: TextChannel) {
        console.log("Current state: StartPlayersColector");
        
        const players = await Colletor.preGameStartingColletor(channel, 10_000)
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

export {PreGame}