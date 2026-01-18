import { TextChannel, Message } from "discord.js"

export function collectPlayers(
  channel: TextChannel,
  duration: number
): Promise<Set<string>> {

  const players = new Set<string>()

  return new Promise(resolve => {
    const collector = channel.createMessageCollector({
      filter: (m: Message) => m.content === "!eu" && !m.author.bot,
      time: duration
    })

    collector.on("collect", m => {
      players.add(m.author.id)
      console.log(`Player ${m.author.id} has been added!`);
    })

    collector.on("end", () => {
      resolve(players)
      console.log(`Players list: ${players}`);
    })
  })
}
