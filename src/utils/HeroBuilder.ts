import { StringSelectMenuInteraction } from "discord.js";
import { Hero, HeroBody } from "../states/Game.js";

class HeroBuilder {
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

    public getHero(): Hero{
        const playerId: string= this.getPlayerId()
        const displayName: string= this.getDisplayName()
        const playerClass: string= this.getPlayerClass()
        const initialBody: HeroBody= this.getPlayerBody()

        const hero: Hero = {
            id: playerId,
            displayName: displayName,
            class: playerClass,
            body: initialBody
        }

        return hero
    }
}

export {HeroBuilder}