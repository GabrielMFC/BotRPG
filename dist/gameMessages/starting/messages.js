const chooseNumberOfPlayers = "📢 **Atenção, aventureiros!**\n" +
    "Antes de tudo, certifiquem-se de que suas **mensagens diretas estão habilitadas** e que **todos os jogadores estão no mesmo servidor** onde o RPG será jogado.\n\n" +
    "🎲 **Olá, aventureiro!**\n" +
    "**SE VOCÊ QUISER ENTRAR NESSA CAMPANHA, DIGITE `!eu` NO CHAT.**\n\n" +
    "**ATENÇÃO: HÁ UM LIMITE DE 4 JOGADORES POR CAMPANHA!**";
const choosePlayerClasses = "**ESCOLHA SUA CLASSE!**\n\n" +
    "**Classes disponíveis:**\n\n" +
    "⚔️ **Guerreiro**\n" +
    "Resistente e valente, sofre **-3 na rolagem de ferimentos**. Ideal para quem enfrenta o perigo de frente(`!guerreiro`)!\n\n" +
    "🔮 **Mago**\n" +
    "Pode conjurar **qualquer feitiço que imaginar**. A IA reagirá dinamicamente, criando efeitos únicos e caóticos. Criatividade é sua arma(`!mago`)!\n\n" +
    "🎭 **Bobo da Corte**\n" +
    "Caótico e imprevisível. Em todas as ações, joga **1d20 + 1d5**. O total define sucesso ou falha. Ideal para quem gosta de viver no limite(`!bobo`)!\n\n";
const initialComment = [
    {
        commentType: "positive",
        commentList: [
            "Um honrado(a) e valente herói, será que conseguirá livrar esta terra do mal?",
            "Grave este nome, surgiram lendas de seus feitos.",
            "Essa pessoa tem nome de vencedor(a)!",
            "É difícil vê-lo(a) com todo seu brihlo.",
            "Esse RPG é jogo de criança para você!"
        ]
    },
    {
        commentType: "negative",
        commentList: [
            "Não é muito, mas já serve.",
            "Um pobre coitado(a).",
            "Será que você morrerá primeiro?",
            "Você parece um iniciante.",
            "É melhor do que nada.",
            "Não me parece que você viverá por muito tempo.",
            "Eu sei que vai ser difícil para você, mas tente se concentrar."
        ]
    }
];
const startingMessages = {
    chooseNumberOfPlayers: chooseNumberOfPlayers,
    choosePlayerClasses: choosePlayerClasses
};
export { startingMessages, initialComment };
