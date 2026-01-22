export function collectPlayers(channel, duration) {
    const players = new Set();
    return new Promise(resolve => {
        const collector = channel.createMessageCollector({
            filter: (m) => m.content === "!eu" && !m.author.bot,
            time: duration
        });
        collector.on("collect", m => {
            players.add(m.author.id);
            channel.send(`O jogador ${m.author.displayName} entrou no jogo.`);
        });
        collector.on("end", () => {
            resolve(players);
            console.log(`Players list: ${[...players].join(', ')}`);
        });
    });
}
