const chooseNumberOfPlayers = "📢 **Atenção, aventureiros!**\n" +
    "Antes de tudo, certifiquem-se de que suas **mensagens diretas estão habilitadas** e que **todos os jogadores estão no mesmo servidor** onde o RPG será jogado.\n\n" +
    "🎲 **Olá, aventureiro!**\n" +
    "**SE VOCÊ QUISER ENTRAR NESSA CAMPANHA, DIGITE `!eu` NO CHAT.**\n\n" +
    "**ATENÇÃO: HÁ UM LIMITE DE 4 JOGADORES POR CAMPANHA!**";
const choosePlayerClasses = "**ESCOLHA SUA CLASSE!**\n\n" +
    "**Classes disponíveis:**\n\n" +
    "⚔️ **Guerreiro**\n" +
    "Resistente e valente, sofre **-3 na rolagem de ferimentos**. Ideal para quem enfrenta o perigo de frente!\n\n" +
    "🔮 **Mago**\n" +
    "Pode conjurar **qualquer feitiço que imaginar**. A IA reagirá dinamicamente, criando efeitos únicos e caóticos. Criatividade é sua arma!\n\n" +
    "🎭 **Bobo da Corte**\n" +
    "Caótico e imprevisível. Em todas as ações, joga **1d20 + 1d5**. O total define sucesso ou falha. Ideal para quem gosta de viver no limite!\n\n";
const initialComment = [
    {
        commentType: "positive",
        commentList: [
            "Um honrado(a) e valente herói, será que conseguirá livrar esta terra do mal?",
            "Grave este nome, surgirão lendas de seus feitos.",
            "Você tem nome de vencedor(a)!",
            "É difícil vê-lo(a) com todo seu brihlo.",
            "Esse RPG é jogo de criança para você!",
            "Sinto muito, esse jogo não tem um modo mais difícil para as suas lendárias habilidades.",
            "Você será um aventureiro implacável!",
            "Os seus lendários feitos ecoarão por todos os cantos deste mundo."
        ]
    },
    {
        commentType: "negative",
        commentList: [
            "Você não é muito, mas você poderá servir de escudo humano para os outros.",
            "Será que você morrerá primeiro?",
            "Você tem cheiro de um novato recém-nascido.",
            "Eh, eu acho que jogar com você é melhor do que jogar com uma pessoa a menos",
            "Não me parece que você sobreviverá por muito tempo nesta campanha.",
            "Eu sei que será difícil para você, mas tente se concentrar.",
            "Você é digno de pena.",
            "Sinto muito, esse jogo não tem um modo mais fácil para você.",
            "Eu tenho pena dos seus companheiros, os pobres coitados terão que lhe carregar no campo de batalha."
        ]
    }
];
const startingMessages = {
    chooseNumberOfPlayers: chooseNumberOfPlayers,
    choosePlayerClasses: choosePlayerClasses
};
export { startingMessages, initialComment };
