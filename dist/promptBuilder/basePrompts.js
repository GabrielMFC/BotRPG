const rules = {
    light: "- Descreva o ambiente com detalhes sensoriais (luz, clima, sons, cheiro).",
    ambient: "- Apresente o local como se fosse a primeira cena de uma história.",
    initialEvent: "- Inclua um gancho inicial (algo estranho, perigoso ou curioso no local).",
};
const initialLocationPrompt = "Me dê um nome de um lugar aleatório fantasioso de RPG. A sua resposta deve conter somente o nome do lugar e entre parênteses o que é esse lugar. O nome entre parêntese deve ser curto e direto em sua definição";
function getStartingPrompt(heroes, lightRule, ambientRule, initialEventRule, maxCharacters) {
    const classes = heroes.map(h => h.class).join(', ');
    const plural = heroes.length > 1;
    return `
    Você é um narrador de RPG de fantasia medieval.

    Crie o início de uma campanha colocando ${plural ? 'um grupo de aventureiros com as classes: ' : 'um aventureiro com a classe: '}${classes} em um local fantasioso aleatório.

    Regras importantes:\n
    ${!lightRule && !ambientRule && !initialEventRule ? `- Forneça uma resposa com no máximo ${maxCharacters ? maxCharacters : 300} caractéres.` : ""}
    ${lightRule ? rules.light : ""}
    ${ambientRule ? rules.ambient : ""}
    ${initialEventRule ? rules.initialEvent : ""}
    `.trim();
}
function getPrompt(hero) {
    return `
  Você é um narrador de RPG de fantasia medieval.
  
  Com base no heroí de classe ${hero.class} e em sua posição ${hero.location}. Crie uma situação
  fantasiosa que poderia acontecer em um rpg de mesa classíco.`;
}
export { getStartingPrompt, initialLocationPrompt, getPrompt };
