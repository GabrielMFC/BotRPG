import { StringSelectMenuInteraction } from "discord.js";
import { HeroBody } from "../states/gameStates/Game.js";
import { IaAPI } from "../utils/api.js";

type Hero = {
    id: string
    displayName: string
    class: string,
    body: HeroBody,
    location: string | Promise<string>
}

class HeroFactory {
    private interaction!: StringSelectMenuInteraction
    constructor(interaction: StringSelectMenuInteraction){
        this.interaction = interaction
    }

    private getPlayerId(): string{
        return this.interaction.user.id
    }

    private getDisplayName(): string{
        return this.interaction.user.displayName
    }

    private getPlayerClass(): string{
        return this.interaction.values[0]
    }

    private async getInitialPlayerLocation(): Promise<string>{
        const initialLocation = await IaAPI.getInitialLocation()
        return initialLocation
    }

    private getPlayerBody(): HeroBody{
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
        }
    }

    public async getHero(): Promise<Hero>{
        const playerId: string= this.getPlayerId()
        const displayName: string= this.getDisplayName()
        const playerClass: string= this.getPlayerClass()
        const initialBody: HeroBody= this.getPlayerBody()
        const initialLocation: string = await this.getInitialPlayerLocation()

        const hero: Hero = {
            id: playerId,
            displayName: displayName,
            class: playerClass,
            body: initialBody,
            location: initialLocation
        }

        return hero
    }
}

export {HeroFactory, Hero}