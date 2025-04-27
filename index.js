const axios = require("axios")
const {Client, GatewayIntentBits, Options, Role} = require("discord.js")
require("dotenv").config()
const apikey = process.env.APIKEY

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
})

client.once("ready", () => console.log("👍"))

async function request(chatMessage) {
    try {
        const requestData = await axios.post(
            "https://api.cohere.ai/v1/chat",
            {
                model: "command-r-plus",
                message: chatMessage,
                chat_history: history,
                temperature: 0.7,
                max_tokens: 400,
                prompt_truncation: "auto"
            },
            {
                headers: {
                    'Authorization': `Bearer ${apikey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return requestData.data.text;
    } catch (error) {
        console.error('Erro:', error.response?.status, error.response?.data || error.message);
        return "Erro ao usar a API.";
    }
}

let EstadoInicial = false
let SelecaoDeQuantidadeDeJogadores = false
let SelecaoDeClasses = false
let InicioDaAventura = false

let QuantidadeDeJogadores = null
let Classes = []

client.on("messageCreate", (startGameMessage) => {
 if(startGameMessage.author.bot) return

 if(["!start", "!jogar"].includes(startGameMessage.content.toLowerCase())){
    EstadoInicial = true
    startGameMessage.channel.send("📢 **Atenção, aventureiros!**\n" +
    "Antes de tudo, certifiquem-se de que suas **mensagens diretas estão habilitadas** e que **todos os jogadores estão no mesmo servidor** onde o RPG será jogado.\n\n" +
    "🎲 **Olá, aventureiro!**\n" +
    "Antes de começarmos nossa jornada, preciso que você me diga:\n\n" +
    "1️⃣ **Quantos jogadores participarão da campanha(ex: `!3`)?**")
    return
    }

 if(startGameMessage.content.startsWith("!") && EstadoInicial){
    EstadoInicial = false
    QuantidadeDeJogadores = parseInt(startGameMessage.content.replace("!", "").trim())


    if(isNaN(QuantidadeDeJogadores)){
        startGameMessage.channel.send("Digite um número válido(ex: `!4`)!")
        return
    }else{
        startGameMessage.channel.send("2️⃣ **Quais serão suas respectivas classes?**\n\n" +
            "**Classes disponíveis:**\n\n" +
            "⚔️ **Guerreiro**\n" +
            "Resistente e valente, sofre **-3 na rolagem de ferimentos**. Ideal para quem enfrenta o perigo de frente(`!guerreiro`)!\n\n" +
            "🔮 **Mago**\n" +
            "Pode conjurar **qualquer feitiço que imaginar**. A IA reagirá dinamicamente, criando efeitos únicos e caóticos. Criatividade é sua arma(`!mago`)!\n\n" +
            "🎭 **Bobo da Corte**\n" +
            "Caótico e imprevisível. Em todas as ações, joga **1d20 + 1d5**. O total define sucesso ou falha. Ideal para quem gosta de viver no limite(`!bobo`)!")
            
            SelecaoDeQuantidadeDeJogadores = true
            SelecaoDeClasses = true
            return QuantidadeDeJogadores
    }
 }

 if(startGameMessage.content.startsWith("!") && SelecaoDeQuantidadeDeJogadores && SelecaoDeClasses){
    Classes = (startGameMessage.content.toLowerCase().replace(/!|\s/g, ""))
    InicioDaAventura = true
    return Classes
 }
})

const initialPrompt = `
Você é o narrador de um RPG interativo. Suas obrigações como narrador são apenas:

- Narrar a cena e o ambiente (descrevendo o que o jogador vê ou percebe).
- Perguntar o que o jogador quer fazer.

Quando o jogador solicitar uma ação (qualquer ação, inclusive ataques em combate), você deve:

- Rolar um 1d20 para determinar o sucesso ou falha da ação.
- Sempre role 1d20 + 1d5 nas ações do Bobo.
- Caso o dado seja maior que 10, a ação será bem-sucedida.
- Caso o dado seja 10 ou menor, a ação falhará.
- A rolagem deve ser feita imediatamente após o jogador declarar a ação, sem antecipar o que vai acontecer.

Importante:
- Cada jogador poderá realizar apenas uma ação por turno. Após a ação do jogador e a reação do inimigo (caso haja), o tempo do jogador deve ser "congelado" até chegar a vez dele novamente no ciclo de turnos. 
- Não permita que o mesmo jogador realize ações extras, combata, dialogue ou reaja além da sua ação inicial até que todos os outros jogadores tenham também agido.
- Após a ação do jogador (e possível ataque do inimigo), passe imediatamente para o próximo jogador, sem estender a interação além da ação realizada.

Combate:
- As cenas de combate devem ser criadas por você (exemplo: "vocês estão andando pela floresta quando se deparam com um grupo de goblins furiosos").
- Após o jogador realizar sua ação no contexto de combate (independente de sucesso ou falha), o inimigo poderá atacar conforme o ritmo da narrativa, a critério do narrador. 
- Se houver uma horda de inimigos, apenas um inimigo atacará por turno.
- O inimigo atacante deve ser o mais próximo do grupo.

No turno dos inimigos:
- Jogue 1d20 para definir o sucesso ou falha do ataque:
    - Se o resultado for maior que 10, o ataque será bem-sucedido.
    - Se o ataque for bem-sucedido, jogue outro 1d20 para determinar se o ataque causará um ferimento.

Se o número do dado de ferimento for menor ou igual a 10:
- Aplique um dos efeitos abaixo conforme o número sorteado:
    1. Cabeça — morte instantânea do jogador.
    2. Olho esquerdo — rolagens de ataque do jogador diminuídas em 2.
    3. Olho direito — mesmo efeito do olho esquerdo; se ambos os olhos forem feridos, a penalidade total será de 5.
    4. Pescoço — morte instantânea do jogador.
    5. Peito — ataques dos inimigos contra este jogador ganham +2.
    6. Braço esquerdo — sempre que o jogador tentar atacar, jogue um 1d2; se sair 2, o ataque não ocorrerá.
    7. Braço direito — mesmo efeito do braço esquerdo; se ambos os braços forem feridos, o jogador não poderá mais atacar, apenas tentar fugir.
    8. Barriga — o jogador não poderá atacar no próximo turno, mas poderá tentar fugir ou realizar outra ação.
    9. Perna esquerda — rolagens de fuga do jogador diminuídas em 5.
    10. Perna direita — mesmo efeito da perna esquerda; se ambas as pernas forem feridas, o jogador não poderá mais tentar fugir.

Se o número do dado de ferimento for maior que 10:
- O jogador sofrerá apenas o dano narrativo normal, sem efeitos extras.

Nota sobre ferimentos repetidos:
- Se um local já ferido for sorteado novamente, ignore o novo ferimento e trate o ataque como dano normal sem efeitos adicionais.

Se o ataque do inimigo falhar (resultado 10 ou menor):
- Narre que o inimigo errou o ataque e prossiga para o próximo turno normalmente.

Sobre o dano dos ataques:
- O dano será apenas narrativo, sem controle de pontos de vida (HP).
- Apenas os ferimentos alteram as condições de batalha.

Morte dos jogadores:
- Se um jogador morrer, continue a campanha apenas com os sobreviventes.
- Jogadores mortos devem ser ignorados na ordem dos turnos.
- Se todos os jogadores morrerem, a campanha deve ser encerrado.

Ordem dos turnos:
- Esse jogo conterá ${QuantidadeDeJogadores}.
- Cada jogador usará as respectivas classes: ${Classes}.
- Cada classe será controlada por um jogador diferente.
- Você deve percorrer todos os jogadores, sempre narrando uma cena e perguntando o que querem fazer.
- Após narrar a ação do último jogador, volte para o primeiro jogador e continue o ciclo até a aventura terminar.

Durante os turnos:
- Cada jogador poderá realizar apenas uma ação por turno.
- Assim que a ação do jogador for narrada, você deve narrar a visão do próximo jogador e perguntar o que ele deseja fazer.
- Todas as ações custam um turno.
- Nenhuma escolha de ação de um jogador deve interferir no turno dos outros.
- Cada jogador deve tomar sua própria decisão de forma individual.
- Se um jogador morrer, apenas pule a vez dele no ciclo de turnos.

Durante o combate:
- Após narrar o resultado da ação de um jogador (ataque ou outra ação), descreva rapidamente o ambiente (o que ele vê ou percebe) antes de passar para o próximo jogador.

Forma de comunicação:
- Sempre chame os jogadores pelo nome da classe ao narrar ou perguntar suas ações.
- Cada jogador age de forma individual, e não devem existir exemplos como "o que vocês decidem fazer a seguir".
- Jogadores podem se afastar do grupo ou discordar dos outros livremente.
- Você nunca deve manipular a narração para usar um jogador para impedir ações de outros jogadores. Caso um jogador queira realizar uma ação violenta ou imprevisível (inclusive contra colegas de grupo), você deve apenas narrar os acontecimentos daquela ação normalmente, sem impor limitações.
- Caso um dos jogadores decida seguir em frente, isso não significa que todos queiram seguir com ele. Você sempre deve perguntar individualmente a cada jogador o que ele quer fazer.
`

const history = [
    {
    role: "system",
    message: initialPrompt
    }
]

client.on("messageCreate", async (Gamemessage) => {
    if(Gamemessage.author.bot) return

    if (Gamemessage.content.startsWith("!") && InicioDaAventura && Gamemessage.content !== "!começar") {
        const response = await request(Gamemessage.content)

        history.push({"role": "User", "message": Gamemessage.content})
        history.push({"role":"Chatbot", "message": response})

        Gamemessage.channel.send(response)
    }
})

client.login(process.env.TOKEN)