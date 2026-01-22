import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
const modalOptions = new StringSelectMenuBuilder()
    .setCustomId("class_select")
    .setPlaceholder("Escolha sua classe!")
    .setMinValues(1)
    .setMaxValues(1)
    .addOptions([
    {
        label: "Guerreiro",
        value: "guerreiro",
        description: "Alta defesa, sempre fica na linha de frente."
    },
    {
        label: "Mago",
        value: "mago",
        description: "Invoca magias instáveis e perigosas."
    },
    {
        label: "Bobo da corte",
        value: "bobo",
        description: "Puro caos, nunca se sabe o que acontecerá em seus turnos."
    }
]);
export const classModal = new ActionRowBuilder()
    .addComponents(modalOptions);
