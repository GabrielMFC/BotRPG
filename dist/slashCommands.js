import { REST, Routes } from "discord.js";
import "dotenv/config";
const commands = [{
        name: 'start',
        description: 'Initialize the game.'
    }];
if (!process.env.TOKEN) {
    throw new Error("The TOKEN enviroment varrible is " + typeof (!process.env.TOKEN) + ". It must to be a string!");
}
if (!process.env.APP_ID) {
    throw new Error("The App id is " + typeof (process.env.APP_ID) + ". It must to be a string!");
}
const token = process.env.TOKEN;
const appId = process.env.APP_ID;
const rest = new REST({ version: '10' }).setToken(token);
try {
    console.log("Started refreshing app (/) commands.");
    await rest.put(Routes.applicationCommands(appId), { body: commands });
    console.log("Sucess!");
}
catch (error) {
    console.error(error);
}
