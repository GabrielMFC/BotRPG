# Discord Bot RPG


## O que este projeto fará?

> Este projeto tem como objetivo, criar um bot que jogará um rpg de texto interativo 
dentro da plataforma Discord, usando uma API de IA.


## Como funcionará?


### Início

> Para começar o jogo, o jogador deve usar o slash command /start.


#### Pre Game

> Imediatamente após o jogador usar o comando de inicio de jogo, o bot irá perguntar quais 
jogadores iram participar do jogo e também dará alguns avisos, como: quantidade máxima de 
jogadores, recomendação de notificações ativadas e o comando necessário para entrar na 
campanha(!eu). Conforme os jogadores forem entrando na campanha usando o comando !eu, o bot
irá dizer no chat o nome do jogador que entrou, juntamente com um comentário que poderá 
ser um elogio ou uma zoação desmerecendo o mesmo. O fluxo do Pre Game será assim:

    /start > seleção de jogadores > comentário do bot > seleção de classes.


##### Classes:

> As classes disponíveis por enquanto são:

⚔️ **Guerreiro**
Resistente e valente, sofre **-3 na rolagem de ferimentos**.

🔮 **Mago**
Pode conjurar **qualquer feitiço que imaginar**. 
A IA reagirá dinamicamente, criando efeitos únicos e caóticos.

"🎭 **Bobo da Corte**
Caótico e imprevisível. Em todas as ações, joga **1d20 + 1d5**. 
O total define sucesso ou falha.


### Início da campanha

> Após o Pre Game ser completado, uma request será enviada para a API de IA para obter um 
local inicial para a campanha. Os jogadores poderam interagir livremente com o cenário 
atráves de mensagens no chat com o prefixo "!". Cada mensagem irá encerrar o turno do 
jogador atual e iniciar o turno do próximo jogador.

> Para TODAS as ações tanto de jogadores quanto de inimigos, será jogado dado 1d20 para decidir
a eficácia da ação na campanha.

### Combate

> No turno dos jogadores, eles não poderam usar comandos de texto de forma 
arbitrária(com exceção do mago). Durante o combate será exibido um menu semelhante ao que 
foi exibido na seleção de classes, esse menu irá listar as habilidades que a classe do 
jogador possuí baseada no nível atual dele na campanha, os jogadores poderam aumentar seu 
nível vencendo batalhas.

> No turno dos inimigos após ele atacar, seŕa lançado um dado 1d20 e se o valor desse dado 
for maior que 15, será causado um ferimento com base no valor. Ferimentos causam efeitos 
negativosque perduram por toda a campanha do jogador. Abaixo segue uma lista dos ferimentos 
e seus efeitos negativos:

**Barriga(16)**: Ferimentos na barriga fazem o jogador perder um pouco de vida após cada 
fim de seu turno de combate. Quando o combate acabar, os ferimentos na barriga deixam de 
surtir efeito.

**Braço(17)**: Ferimentos no braço fazem o valor da eficácia do ataque do jogador ser 
reduzido em -1, com os dois braços feridos o valor passará a ser reduzido em -4.

**Perna(18)**: Ferimentos na perna fazem o valor necessário para o jogador conseguir fugir 
de uma batalha ser incrementado em +1, se as duas pernas forem feridas o valor 
incrementado passa a ser +4. 

**Olho(19)**: Com um dos olhos feridos, o valor do dado de ferimento do inimigo será 
aumentado em +1, com os dois olhos feridos, o valor será aumentado em +4.

**Pescoço(20)**: Se o pescoço for ferido, o jogador desmaia. Jogadores desmaiados podem 
ser acordados após a batalha por jogadores que não tem ferimentos nos braços, se o jogador 
não for acordado dentro de 4 turnos, ele morre. 