import { Client, Message, Events, GatewayIntentBits, TextChannel } from "discord.js";
import { commandHandlers } from "./utils/commandHandler.js";
import { Game } from "./states/gameStates/Game.js";
import "dotenv/config"

const client:Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once(Events.ClientReady, () => {
    console.log(`Logged!`);
})
const game = new Game
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const handler = commandHandlers[interaction.commandName];
    if (handler) {
        await handler(interaction, game);
    } else {
        console.log(`Comando não registrado: ${interaction.commandName}`);
    }
});


client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isStringSelectMenu()){
        return
    } 
    if (interaction.customId !== "class_select"){
        return
    } 

    await interaction.deferUpdate()

    const chosenClass = interaction.values[0]
    const userId = interaction.user.id

    if (!game.pendingPlayersIds.includes(userId)) {
      await interaction.followUp({
        content: "Você não está na lista de jogadores desse pré-jogo.",
        ephemeral: true
      })
      return
    }

    const displayName = interaction.user.displayName

    const existing = game.heroes.find(p => p.id === userId)
    if (existing) {
      existing.class = chosenClass
    } else {
      game.heroes.push({ id: userId, displayName, class: chosenClass })
    }

    game.pendingPlayersIds = game.pendingPlayersIds.filter(id => id !== userId)

    await interaction.followUp({
      content: `✅ <@${userId}> escolheu **${chosenClass[0].toUpperCase() + chosenClass.slice(1)}**.`,
      ephemeral: false
    })

    if (game.pendingPlayersIds.length === 0 && interaction.channel instanceof TextChannel) {
      await interaction.channel?.send("🎉 Todos escolheram! Iniciando o jogo...")
    }
  }
)


client.login(process.env.TOKEN)