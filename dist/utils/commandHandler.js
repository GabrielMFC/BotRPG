import { TextChannel } from "discord.js";
import { game } from "../states/game.js";
import { classModal } from "./ClassModal.js";
const commandHandlers = {
    start: async (interaction) => {
        try {
            console.log("Start", interaction.id, Date.now());
            await interaction.deferReply();
            const startingMessage = await game.onInteract();
            await interaction.editReply(startingMessage);
            if (!(interaction.channel instanceof TextChannel))
                return;
            await game.onInteract(interaction.channel);
            const chooseClassMessage = await game.onInteract();
            interaction.channel.send(chooseClassMessage);
            await interaction.followUp({
                content: chooseClassMessage ?? "Escolha sua class!",
                components: [classModal]
            });
        }
        catch (error) {
            console.log(error);
        }
    },
};
export { commandHandlers };
