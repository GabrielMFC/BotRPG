import { ChatInputCommandInteraction, TextChannel } from "discord.js";
import {Game} from "../states/gameStates/Game.js";
import { classModal } from "./ClassModal.js";


const commandHandlers: any = {
    start: async (interaction: ChatInputCommandInteraction, game:Game) => {
        try {
            console.log("Start", interaction.id, Date.now());
            
            await interaction.deferReply()
            const startingMessage = await game.onInteract()
            await interaction.editReply(startingMessage)

            if(!(interaction.channel instanceof TextChannel)) return

            await game.onInteract(interaction.channel)

            const chooseClassMessage = await game.onInteract()

            await interaction.channel.send(chooseClassMessage)

            await interaction.followUp({
                content: "Escolha sua classe!",
                components: [classModal]
            })
        } catch (error) {
            console.log(error);
        }
    },
};

export {commandHandlers}