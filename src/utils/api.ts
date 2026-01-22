import { Game } from "../states/game.js";
import { getStartingPrompt } from "../promptBuilder/basePrompts.js";
import axios from "axios";
import "dotenv/config"

const game2 = new Game()
const id = "12838"
const name = "Gabriel"
const className = "Mago"

game2.heroes.push({id:id,displayName:name,class:className})

async function iaApiRequest(game: Game) {
    try {
        if (!process.env.URL || !process.env.APIKEY) {
            throw new Error(`The API URL or APIKEY is ${typeof (process.env.URL)}.It must to be a string!`);
        }
        const response = await axios.post(
            "https://api.cohere.ai/v1/chat",
            {
                model: "command-a-03-2025",
                message: getStartingPrompt(game, false, false, false),
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
        console.log(response.data);
    }catch(error){
        console.error(error);
    }
}

iaApiRequest(game2)

export {iaApiRequest}