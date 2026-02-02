import { getPrompt, getStartingPrompt, initialLocationPrompt } from "../promptBuilder/basePrompts.js";
import { Game, Hero } from "../states/gameStates/Game.js";
import axios from "axios";
import "dotenv/config"


class IaAPI {

    private static async axiosRequest(prompt: unknown) {
        try {
            if (!process.env.URL || !process.env.APIKEY) {
                throw new Error(`The API URL or APIKEY is ${typeof (process.env.URL)}.It must to be a string!`);
            }
            const response = await axios.post(
                process.env.URL,
                {
                    model: "command-a-03-2025",
                    message: prompt,
                    temperature: 0.7,
                    max_tokens: 400,
                    prompt_truncation: "auto",
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.APIKEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.text
        } catch (error) {
            console.error(error);
        }
    }

    static async getInitialLocation(){
        return await IaAPI.axiosRequest(initialLocationPrompt)
    }

    static async getInitialHistory(heroes: Hero[]){
        return await IaAPI.axiosRequest(getStartingPrompt(heroes))
    }

    static async getHistory(hero: Hero, historyContext: string, action: string){
        return await IaAPI.axiosRequest(getPrompt(hero, historyContext, action))
    }
}

export {IaAPI}