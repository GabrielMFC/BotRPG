import startingMessages from "../gameMessages/starting/messages.js";
import { collectPlayers } from "../utils/playersCollector.js";
class Game {
    state;
    numberOfPlayers;
    pendingPlayersIds = [];
    players = [];
    setState(state) {
        this.state = state;
    }
    onInteract(param) {
        return this.state.onInteract(this, param);
    }
}
class ChoosingPlayers {
    stateAct(ctx) {
        return startingMessages.chooseNumberOfPlayers;
    }
    isFinished(ctx) {
        return typeof ctx.numberOfPlayers === "number";
    }
    next() {
        return new StartPlayersColector();
    }
}
class StartPlayersColector {
    async stateAct(ctx, param) {
        const players = await collectPlayers(param, 10_000);
        for (const playerId of players) {
            ctx.pendingPlayersIds.push(playerId);
        }
    }
    isFinished(ctx) {
        return ctx.pendingPlayersIds.length == 4;
    }
    next() {
        return new ChoosingPlayersClasses();
    }
}
class ChoosingPlayersClasses {
    async stateAct(ctx) {
        return startingMessages.choosePlayerClasses;
    }
    isFinished(ctx) {
        return ctx.pendingPlayersIds.length < 5;
    }
    next() {
        return null;
    }
}
class PreGame {
    substate = new ChoosingPlayers();
    onInteract(ctx, param) {
        const result = this.substate.stateAct(ctx, param);
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
export { Game, PreGame };
