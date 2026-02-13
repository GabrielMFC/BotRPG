import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel
} from "discord.js"

const startButton = new ButtonBuilder()
.setCustomId("start_button")
.setLabel("Começar")
.setStyle(ButtonStyle.Primary)

export const row = new ActionRowBuilder<ButtonBuilder>()
.addComponents(startButton)