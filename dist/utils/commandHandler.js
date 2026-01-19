import { TextChannel } from "discord.js";
import { Game, PreGame } from "../states/game.js";
import { collectPlayers } from "./playersCollector.js";
import { classModal } from "./ClassModal.js";
const game = new Game();
game.setState(new PreGame);
const commandHandlers = {
    start: async (interaction) => {
        await interaction.reply(await game.onInteract(interaction));
        if (interaction.channel instanceof TextChannel) {
            console.log("Coletor ativado!");
            collectPlayers(interaction.channel, 10_000);
        }
        else {
            console.log("Não é um canal de texto.");
        }
    },
    classmodal: async (interaction) => {
        if (interaction.channel instanceof TextChannel) {
            interaction.reply({
                content: "Escolha sua classe!",
                components: [classModal]
            });
        }
    },
    // futuramente você pode adicionar outros comandos aqui
    // outroComando: async (interaction) => { ... }
};
export { commandHandlers };
