import startingMessages from "../gameMessages/starting/messages.js";
class Game {
    state;
    numberOfPlayers;
    playerClasses = [];
    setState(state) {
        this.state = state;
    }
    onMessage() {
        return this.state.onMessage(this);
    }
}
class PreGame {
    onMessage(ctx) {
        if (!ctx.numberOfPlayers) {
            return startingMessages.chooseNumberOfPlayers;
        }
        return startingMessages.choosePlayerClasses;
    }
}
export { Game, PreGame };
