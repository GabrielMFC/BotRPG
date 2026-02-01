import { initialComment } from "../gameMessages/starting/messages.js";
import { getRandomArrayItem } from "./getRandomArrayItem.js";
class Colletor {
    static preGameStartingColletor(channel, duration) {
        const players = new Set();
        return new Promise(resolve => {
            const collector = channel.createMessageCollector({
                filter: (m) => m.content === "!eu" && !m.author.bot,
                time: duration
            });
            collector.on("collect", m => {
                players.add(m.author.id);
                const commentType = getRandomArrayItem(initialComment);
                const comment = getRandomArrayItem(commentType.commentList);
                channel.send(`**O jogador ${m.author.displayName} entrou no jogo.\n ${comment}\n\n**`);
            });
            collector.on("end", () => {
                resolve(players);
                console.log(`Players list: ${[...players].join(', ')}`);
            });
        });
    }
    static playersInteractionMessageCollector(channel, duration) {
        var playersInteractions;
        return new Promise(resolve => {
            const collector = channel.createMessageCollector({
                filter: (m) => m.content.startsWith("!") && !m.author.bot,
                time: duration
            });
            collector.on("collect", m => {
                playersInteractions.push({ playerId: m.author.id, interaction: m.content });
            });
            collector.on("end", () => {
                resolve(playersInteractions);
            });
        });
    }
}
export { Colletor };
