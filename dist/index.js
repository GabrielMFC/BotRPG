import { Client, Events, GatewayIntentBits, TextChannel } from "discord.js";
import { commandHandlers } from "./utils/commandHandler.js";
import { Game } from "./states/gameStates/Game.js";
import "dotenv/config";
import { HeroFactory } from "./factory/HeroFactory.js";
import { Campaign } from "./states/campaignStates/Campaign.js";
import { StartingCampaign } from "./states/campaignStates/StartingCampaign.js";
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
client.once(Events.ClientReady, () => {
    console.log(`Logged!`);
});
const game = new Game();
const campaign = new Campaign(game.heroes);
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const handler = commandHandlers[interaction.commandName];
    if (handler) {
        await handler(interaction, game);
    }
    else {
        console.log(`Comando não registrado: ${interaction.commandName}`);
    }
});
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isStringSelectMenu()) {
        return;
    }
    if (interaction.customId !== "class_select") {
        return;
    }
    await interaction.deferUpdate();
    const hero = await new HeroFactory(interaction).getHero();
    if (!game.pendingPlayersIds.includes(hero.id)) {
        await interaction.followUp({
            content: "Você não está na lista de jogadores desse pré-jogo.",
            ephemeral: true
        });
        return;
    }
    const existing = game.heroes.find(p => p.id === hero.id);
    if (existing) {
        existing.class = hero.class;
    }
    else {
        game.updateHero(hero);
    }
    game.pendingPlayersIds = game.pendingPlayersIds.filter(id => id !== hero.id);
    await interaction.followUp({
        content: `✅ @${hero.displayName} escolheu **${hero.class[0].toUpperCase() + hero.class.slice(1)}**.`,
        ephemeral: false
    });
    if (game.pendingPlayersIds.length === 0 && interaction.channel instanceof TextChannel) {
        await interaction.channel?.send("🎉 Todos escolheram! Iniciando o jogo...");
        campaign.setstate(new StartingCampaign);
        campaign.stateAct(campaign, interaction.channel);
    }
});
client.on("messageCreate", (message) => {
    if (message.author.bot)
        return;
    if (!message.content.startsWith("!") || message.content == "!eu")
        return;
    if (message.channel instanceof TextChannel) {
        campaign.stateAct(campaign, message.channel);
    }
});
client.login(process.env.TOKEN);
