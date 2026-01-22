import axios from "axios";
import { Client, Events, GatewayIntentBits, TextChannel } from "discord.js";
import "dotenv/config";
import { commandHandlers } from "./utils/commandHandler.js";
import { game } from "./states/game.js";
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
try {
    if (!process.env.URL || !process.env.APIKEY) {
        throw new Error(`The API URL or APIKEY is ${typeof (process.env.URL)}.It must to be a string!`);
    }
    const response = await axios.post("https://api.cohere.ai/v1/chat", {
        model: "command-a-03-2025",
        message: ".",
        temperature: 0.7,
        max_tokens: 400,
        prompt_truncation: "auto"
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.APIKEY}`,
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 200 || 201) {
        console.log(`Response status: ${response.status}`);
    }
}
catch (error) {
    console.error(error);
}
client.once(Events.ClientReady, () => {
    console.log(`Logged!`);
});
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const handler = commandHandlers[interaction.commandName];
    if (handler) {
        await handler(interaction);
    }
    else {
        console.log(`Comando não registrado: ${interaction.commandName}`);
    }
});
client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId !== "class_select")
            return;
        await interaction.deferUpdate();
        // a opção escolhida
        const chosenClass = interaction.values[0];
        const userId = interaction.user.id;
        // 1) valida se está nos pending
        if (!game.pendingPlayersIds.includes(userId)) {
            await interaction.followUp({
                content: "Você não está na lista de jogadores desse pré-jogo.",
                ephemeral: true
            });
            return;
        }
        // 2) pega displayName (guild) ou fallback (user)
        const displayName = interaction.member && "displayName" in interaction.member
            ? interaction.member.displayName
            : interaction.user.username;
        // 3) salva / atualiza hero
        const existing = game.heroes.find(p => p.id === userId);
        if (existing) {
            existing.class = chosenClass;
        }
        else {
            game.heroes.push({ id: userId, displayName, class: chosenClass });
        }
        // 4) remove dos pendentes (marca que já escolheu)
        game.pendingPlayersIds = game.pendingPlayersIds.filter(id => id !== userId);
        await interaction.followUp({
            content: `✅ <@${userId}> escolheu **${chosenClass[0].toUpperCase() + chosenClass.slice(1)}**.`,
            ephemeral: false
        });
        // 5) se todo mundo escolheu, fecha o PreGame
        if (game.pendingPlayersIds.length === 0 && interaction.channel instanceof TextChannel) {
            await interaction.channel?.send("🎉 Todos escolheram! Iniciando o jogo...");
            // aqui você troca o estado global:
            // game.setState(new CombatState())  // por exemplo
        }
    }
});
client.login(process.env.TOKEN);
