import startingMessages from "../gameMessages/starting/messages.js";
import { collectPlayers } from "../utils/playersCollector.js";
import { classModal } from "../utils/ClassModal.js";
class Game {
    state;
    numberOfPlayers;
    players = {
        playerId: "",
        class: ""
    };
    setState(state) {
        this.state = state;
    }
    onMessage(param) {
        return this.state.onMessage(this, param);
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
            ctx.players.playerId = playerId;
        }
    }
    isFinished(ctx) {
        return ctx.players ? true : false;
    }
    next() {
        return new ChoosingPlayersClasses();
    }
}
class ChoosingPlayersClasses {
    async stateAct(ctx, param) {
        await param.reply(startingMessages.choosePlayerClasses);
        await param.followUp({
            content: "Choose your class:",
            components: [
                classModal
            ],
            ephemeral: true
        });
    }
    isFinished(ctx) {
        return ctx.players.class ? true : false;
    }
    next() {
        return null;
    }
}
class PreGame {
    substate = new ChoosingPlayers();
    onMessage(ctx, param) {
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
