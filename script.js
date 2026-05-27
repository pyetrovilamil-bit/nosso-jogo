let pontosJogador = 0;
let pontosMaquina = 0;

let cartaJogador;
let cartaMaquina;

let deck = [];

let rodadaFinalizada = false;

const somVitoria = new Audio("sons/vitoria.mp3");
const somDerrota = new Audio("sons/derrota.mp3");
const somClique = new Audio("sons/clique.mp3");

function iniciarJogo(){
  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("jogo").style.display = "block";
  criarDeck();
  novaRodada();
}

function criarDeck(){
  deck = [...cartas];
  embaralhar(deck);
}

function embaralhar(array){
  for(let i = array.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function pegarCarta(){
  if(deck.length === 0){
    criarDeck();
  }
  return deck.pop();
}

function balancearCarta(carta){
  let tipo = Math.floor(Math.random() * 3);

  if(tipo === 0){
    carta.reatividade = 90;
    carta.estabilidade = 40;
  }
  else if(tipo === 1){
    carta.reatividade = 45;
    carta.estabilidade = 95;
  }
  else{
    carta.reatividade = 70;
    carta.estabilidade = 70;
  }
  return carta;
}

function mostrarCartaParcialJogador(){
  document.getElementById("nomeJogador").textContent = cartaJogador.nome;
  document.getElementById("numeroJogador").textContent = cartaJogador.ultimo; 

  document.getElementById("simboloJogador").textContent = "???";
  document.getElementById("familiaJogador").textContent = "???";
  document.getElementById("ataqueJogador").textContent = "???";
  document.getElementById("defesaJogador").textContent = "???";
  document.getElementById("raridadeJogador").textContent = "???";
  document.getElementById("curiosidadeJogador").textContent = "";
}

function revelarCartaJogador(){
  document.getElementById("simboloJogador").textContent = cartaJogador.simbolo;
  document.getElementById("familiaJogador").textContent = cartaJogador.familia;
  document.getElementById("ataqueJogador").textContent = cartaJogador.reatividade;
  document.getElementById("defesaJogador").textContent = cartaJogador.estabilidade;
  document.getElementById("raridadeJogador").textContent = cartaJogador.raridade;
  document.getElementById("curiosidadeJogador").textContent = cartaJogador.curiosidade || "";
}

function esconderCartaMaquina(){
  document.getElementById("cartaMaquina").innerHTML = `
    <div class="raridade">???</div>
    <h2>${cartaMaquina.nome}</h2>
  `;
}

function revelarCartaMaquina(){
  document.getElementById("cartaMaquina").innerHTML = `
    <div class="raridade">${cartaMaquina.raridade}</div>
    <h2>${cartaMaquina.nome}</h2>
    <p>⚛ Símbolo: ${cartaMaquina.simbolo}</p>
    <p>🔬 CAMADA DE VALÊNCIA: ${cartaMaquina.ultimo}</p>
    <p>🧪 FAMÍLIA: ${cartaMaquina.familia}</p>
    <p>⚔⚡ REATIVIDADE: ${cartaMaquina.reatividade}</p>
    <p>🛡 ESTABILIDADE: ${cartaMaquina.estabilidade}</p>
  `;
}

function jogar(atributo){
  // Trava para impedir que cliques repetidos na mesma rodada buguem o placar
  if(rodadaFinalizada){
    return;
  }

  rodadaFinalizada = true;
  somClique.play();

  revelarCartaJogador();
  revelarCartaMaquina();

  // Torna o botão "Próxima Rodada" visível apenas AGORA que a rodada foi jogada
  if(document.getElementById("botaoProxima")) {
    document.getElementById("botaoProxima").style.display = "block";
  }

  let valorJogador = cartaJogador[atributo];
  let valorMaquina = cartaMaquina[atributo];

  if(valorJogador > valorMaquina){
    pontosJogador++;
    somVitoria.play();
    document.getElementById("resultado").textContent = `🎉 ${cartaJogador.nome} venceu ${cartaMaquina.nome}!`;
  }
  else if(valorJogador < valorMaquina){
    pontosMaquina++;
    somDerrota.play();
    document.getElementById("resultado").textContent = `💀 ${cartaMaquina.nome} venceu ${cartaJogador.nome}!`;
  }
  else{
    document.getElementById("resultado").textContent = "⚖ EMPATE!";
  }

  atualizarPlacar();
  verificarFim();
  
  // REMOVIDO: O setTimeout antigo que forçava a passar em 10 segundos foi deletado daqui.
}

function atualizarPlacar(){
  document.getElementById("pontosJogador").textContent = pontosJogador;
  document.getElementById("pontosMaquina").textContent = pontosMaquina;
}

function verificarFim(){
  if(pontosJogador >= 10){
    alert("🏆 VOCÊ GANHOU O JOGO!");
    pontosJogador = 0;
    pontosMaquina = 0;
    atualizarPlacar();
    criarDeck();
  }

  if(pontosMaquina >= 10){
    alert("🤖 A MÁQUINA GANHOU O JOGO!");
    pontosJogador = 0;
    pontosMaquina = 0;
    atualizarPlacar();
    criarDeck();
  }
}

function novaRodada(){
  // SEGURANÇA: Se a rodada atual não tiver sido finalizada (ou seja, o jogador não escolheu um atributo),
  // ele não consegue avançar mesmo se tentar forçar o clique.
  if(!rodadaFinalizada && pontosJogador !== 0 && pontosMaquina !== 0) {
    return;
  }

  rodadaFinalizada = false;

  // Esconde o botão novamente para a nova rodada iniciar travada
  if(document.getElementById("botaoProxima")) {
    document.getElementById("botaoProxima").style.display = "none";
  }

  cartaJogador = balancearCarta(pegarCarta());
  cartaMaquina = balancearCarta(pegarCarta());

  while(cartaJogador.nome === cartaMaquina.nome){
    cartaMaquina = balancearCarta(pegarCarta());
  }

  mostrarCartaParcialJogador();
  esconderCartaMaquina();

  document.getElementById("resultado").textContent = "";
}
