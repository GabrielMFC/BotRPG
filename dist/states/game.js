import startingMessages from "../gameMessages/starting/messages.js";
import { collectPlayers } from "../utils/playersCollector.js";
class Game {
    state;
    maxPlayers = 4;
    minPlayers = 1;
    pendingPlayersIds = [];
    heroes = [];
    setState(state) {
        this.state = state;
    }
    async onInteract(param) {
        return await this.state.onInteract(this, param);
    }
}
class ChoosingPlayers {
    stateAct(ctx) {
        console.log("Current state: ChoosingPlayers");
        return startingMessages.chooseNumberOfPlayers;
    }
    isFinished(ctx) {
        return typeof ctx.maxPlayers === "number" && typeof ctx.minPlayers === "number";
    }
    next() {
        return new StartPlayersColector();
    }
}
class StartPlayersColector {
    async stateAct(ctx, param) {
        console.log("Current state: StartPlayersColector");
        const players = await collectPlayers(param, 10_000);
        for (const playerId of players) {
            ctx.pendingPlayersIds.push(playerId);
        }
    }
    isFinished(ctx) {
        if (typeof ctx.maxPlayers === "number" && typeof ctx.minPlayers === "number") {
            return ctx.pendingPlayersIds.length >= ctx.minPlayers && ctx.pendingPlayersIds.length <= ctx.maxPlayers;
        }
        return ctx.pendingPlayersIds.length > 0;
    }
    next() {
        return new ChoosingPlayersClasses();
    }
}
class ChoosingPlayersClasses {
    async stateAct(ctx) {
        console.log("Current state: ChoosingPlayersClasses");
        return startingMessages.choosePlayerClasses;
    }
    isFinished(ctx) {
        return true;
    }
    next() {
        return null;
    }
}
class PreGame {
    substate = new ChoosingPlayers();
    async onInteract(ctx, param) {
        const result = await this.substate.stateAct(ctx, param);
        if (this.substate.isFinished(ctx)) {
            const next = this.substate.next();
            if (next && "stateAct" in next) {
                this.substate = next;
            }
            else if (next) {
                ctx.setState(next);
            }
        }
        return result;
    }
}
const game = new Game();
game.setState(new PreGame);
export { game };
