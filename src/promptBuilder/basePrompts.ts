import { Hero } from "../states/gameStates/Game.js"
import { TurnActions } from "../types/turnActions.js"

const rules = {
    light: "- Descreva o ambiente com detalhes sensoriais (luz, clima, sons, cheiro).",
    ambient: "- Apresente o local como se fosse a primeira cena de uma história.",
    initialEvent: "- Inclua um gancho inicial (algo estranho, perigoso ou curioso no local).",

}
const initialLocationPrompt = "Me dê um nome de um lugar aleatório fantasioso de RPG. A sua resposta deve conter somente o nome do lugar e entre parênteses o que é esse lugar. O nome entre parêntese deve ser curto e direto em sua definição"
function getStartingPrompt(heroes: Hero[], lightRule?:boolean, ambientRule?:boolean, initialEventRule?:boolean, maxCharacters?: number) {
  const classes = heroes.map(h => h.class).join(', ')
  const plural = heroes.length > 1

    return `
    Você é um narrador de RPG de fantasia medieval.

    Crie o início de uma campanha colocando ${plural ? 'um grupo de aventureiros com as classes: ' : 'um aventureiro com a classe: '}${classes} em um local fantasioso aleatório.

    Regras importantes:\n
    ${!lightRule && !ambientRule && !initialEventRule ? `- Forneça uma resposa com no máximo ${maxCharacters ? maxCharacters : 300} caractéres.` : ""}
    ${lightRule ? rules.light : ""}
    ${ambientRule ? rules.ambient : ""}
    ${initialEventRule ? rules.initialEvent : ""}
    `.trim()
}

function getPrompt(actions: TurnActions, historyContext: string): string {
  const heroes = actions.map(h => h.name).join(", ")
  const heroActions = actions.map(a => a.action.slice(1)).join(", ")
  return `
  Você é um narrador de RPG de fantasia medieval.
  
  Com base nos heroís ${heroes} e no contexto atual da história:

  ${historyContext}

  \n
  Dê continuidade essa mesma campanha com base nas respectivas ações que os jogador(es)
  tomaram nesse turno: ${heroActions}. Não adicione mais heróis na campanha, somente prosiga a 
  história com base na(s) atitude(s) listada(s).`
}

export {getStartingPrompt, initialLocationPrompt, getPrompt}