import axios from "axios";
import { Client, Message, Events, GatewayIntentBits, TextChannel } from "discord.js";
import "dotenv/config"
import {Game, PreGame } from "./states/game.js";

const client:Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

try {
    if (!process.env.URL || !process.env.APIKEY) {
        throw new Error(`The API URL or APIKEY is ${typeof (process.env.URL)}.It must to be a string!`);
    }
        const response = await axios.post(
            "https://api.cohere.ai/v1/chat",
            {
                model: "command-a-03-2025",
                message: ".",
                temperature: 0.7,
                max_tokens: 400,
                prompt_truncation: "auto"
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.APIKEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    
    if(response.status == 200 || 201){
        console.log(`Response status: ${response.status}`);
    }
}catch(error){
    console.error(error);
}

const game = new Game()
game.setState(new PreGame)

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}.`);
})

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return

    if(interaction.commandName === 'start') {
        await interaction.reply(game.onMessage())
    }
})

client.on("messageCreate", (message: Message) => {
    if (message.author.bot) return;
    if (!message.inGuild()) return;

    const channel = message.channel as TextChannel
    const players = new Set<string>()


    const collector = channel.createMessageCollector({
        filter: msg => msg.content == "!eu" && !msg.author.bot,
        time: 10_000
    })

    collector.on("collect", (msg: Message) => {
        players.add(msg.author.id)
        console.log(`Player ${msg.author.id} has been added!`);
    })

    collector.on("end", () => {
        console.log("Jogadores: ", players);
    })
})


client.login(process.env.TOKEN)