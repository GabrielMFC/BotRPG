import { IaAPI } from "../utils/api.js";
class HeroFactory {
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
    async getInitialPlayerLocation() {
        const initialLocation = await IaAPI.getInitialLocation();
        return initialLocation;
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
    async getHero() {
        const playerId = this.getPlayerId();
        const displayName = this.getDisplayName();
        const playerClass = this.getPlayerClass();
        const initialBody = this.getPlayerBody();
        const initialLocation = await this.getInitialPlayerLocation();
        const hero = {
            id: playerId,
            displayName: displayName,
            class: playerClass,
            body: initialBody,
            location: initialLocation
        };
        return hero;
    }
}
export { HeroFactory };
