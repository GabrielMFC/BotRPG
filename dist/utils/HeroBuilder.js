class HeroBuilder {
    interaction;
    constructor(interaction) {
        this.interaction = interaction;
    }
    getPlayerId() {
        return this.interaction.user.id;
    }
    getDisplayName() {
        return this.interaction.user.displayName;
    }
    getPlayerClass() {
        return this.interaction.values[0];
    }
    getPlayerBody() {
        return {
            eyes: {
                injured: false,
                injuredAmmount: 0
            },
            neck: {
                injured: false
            },
            arms: {
                injured: false,
                injuredAmmount: 0
            },
            belly: {
                injured: false,
            },
            legs: {
                injured: false,
                injuredAmmount: 0
            }
        };
    }
    getHero() {
        const playerId = this.getPlayerId();
        const displayName = this.getDisplayName();
        const playerClass = this.getPlayerClass();
        const initialBody = this.getPlayerBody();
        const hero = {
            id: playerId,
            displayName: displayName,
            class: playerClass,
            body: initialBody
        };
        return hero;
    }
}
export { HeroBuilder };
