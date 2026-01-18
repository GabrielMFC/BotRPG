import axios from "axios";
import { Client, Message, Events, GatewayIntentBits, TextChannel, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import "dotenv/config"
import {Game, PreGame } from "./states/game.js";
import { classModal } from "./utils/ClassModal.js";

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

client.once(Events.ClientReady, () => {
    console.log(`Logged!`);
})

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return

    if(interaction.commandName === "start") {
        await game.onMessage(interaction)
    }
    if(interaction.commandName === "classmodal") {
        await game.onMessage(interaction)
    }
})

client.login(process.env.TOKEN)