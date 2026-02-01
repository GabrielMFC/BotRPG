import { getPrompt, getStartingPrompt, initialLocationPrompt } from "../promptBuilder/basePrompts.js";
import axios from "axios";
import "dotenv/config";
class IaAPI {
    static async axiosRequest(prompt) {
        try {
            if (!process.env.URL || !process.env.APIKEY) {
                throw new Error(`The API URL or APIKEY is ${typeof (process.env.URL)}.It must to be a string!`);
            }
            const response = await axios.post("https://api.cohere.ai/v1/chat", {
                model: "command-a-03-2025",
                message: prompt,
                temperature: 0.7,
                max_tokens: 400,
                prompt_truncation: "auto",
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.APIKEY}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.text;
        }
        catch (error) {
            console.error(error);
        }
    }
    static async getInitialLocation() {
        return await IaAPI.axiosRequest(initialLocationPrompt);
    }
    static async getInitialHistory(heroes) {
        return await IaAPI.axiosRequest(getStartingPrompt(heroes));
    }
    static async getHistory(hero) {
        return await IaAPI.axiosRequest(getPrompt(hero));
    }
}
export { IaAPI };
