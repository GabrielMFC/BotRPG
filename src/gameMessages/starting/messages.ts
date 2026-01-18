const chooseNumberOfPlayers: string = "📢 **Atenção, aventureiros!**\n" +
"Antes de tudo, certifiquem-se de que suas **mensagens diretas estão habilitadas** e que **todos os jogadores estão no mesmo servidor** onde o RPG será jogado.\n\n" +
"🎲 **Olá, aventureiro!**\n" +
"Se você quiser entrar nesta campanha, digite !eu no chat.\n" +
"**ATENÇÃO: HÁ UM LIMITE DE 4 JOGADORES POR CAMPANHA!**"

const choosePlayerClasses: string = "2️⃣ **Quais serão suas respectivas classes?**\n\n" +
"**Classes disponíveis:**\n\n" +
"⚔️ **Guerreiro**\n" +
"Resistente e valente, sofre **-3 na rolagem de ferimentos**. Ideal para quem enfrenta o perigo de frente(`!guerreiro`)!\n\n" +
"🔮 **Mago**\n" +
"Pode conjurar **qualquer feitiço que imaginar**. A IA reagirá dinamicamente, criando efeitos únicos e caóticos. Criatividade é sua arma(`!mago`)!\n\n" +
"🎭 **Bobo da Corte**\n" +
"Caótico e imprevisível. Em todas as ações, joga **1d20 + 1d5**. O total define sucesso ou falha. Ideal para quem gosta de viver no limite(`!bobo`)!"

const startingMessages = {
    chooseNumberOfPlayers: chooseNumberOfPlayers,
    choosePlayerClasses: choosePlayerClasses
}

export default startingMessages