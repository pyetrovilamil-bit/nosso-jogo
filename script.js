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

// ALTERADO: Agora esta função esconde os dados do jogador no início da rodada
function esconderCartaJogador(){
  document.getElementById("nomeJogador").textContent = cartaJogador.nome;
  document.getElementById("simboloJogador").textContent = "???";
  document.getElementById("numeroJogador").textContent = "???";
  document.getElementById("familiaJogador").textContent = "???";
  
  // Mostra apenas os nomes dos atributos nos botões/textos, sem os valores numéricos
  document.getElementById("ataqueJogador").textContent = "???";
  document.getElementById("defesaJogador").textContent = "???";
  
  document.getElementById("curiosidadeJogador").textContent = "";
  document.getElementById("raridadeJogador").textContent = "???";
}

function revelarCartaJogador(){
  document.getElementById("nomeJogador").textContent = cartaJogador.nome;
  document.getElementById("simboloJogador").textContent = cartaJogador.simbolo;
  document.getElementById("numeroJogador").textContent = cartaJogador.ultimo;
  document.getElementById("familiaJogador").textContent = cartaJogador.familia;
  
  // Revela os valores reais que foram balanceados para a rodada
  document.getElementById("ataqueJogador").textContent = cartaJogador.reatividade;
  document.getElementById("defesaJogador").textContent = cartaJogador.estabilidade;
  document.getElementById("raridadeJogador").textContent = cartaJogador.raridade;
}

function esconderCartaMaquina(){
  document.getElementById("cartaMaquina").innerHTML = `
    <div class="raridade">
      ???
    </div>
    <h2>${cartaMaquina.nome}</h2>
  `;
}

function revelarCartaMaquina(){
  document.getElementById("cartaMaquina").innerHTML = `
    <div class="raridade">
      ${cartaMaquina.raridade}
    </div>
    <h2>${cartaMaquina.nome}</h2>
    <p>⚛ Camada de valência: ${cartaMaquina.ultimo}</p>
    <p>⚡ Reatividade: ${cartaMaquina.reatividade}</p>
    <p>🛡 Estabilidade: ${cartaMaquina.estabilidade}</p>
  `;
}

function jogar(atributo){
  if(rodadaFinalizada){
    return;
  }

  rodadaFinalizada = true;
  somClique.play();

  // AMBAS as cartas são reveladas aqui, no momento do clique
  revelarCartaJogador();
  revelarCartaMaquina();

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

  setTimeout(() => {
    novaRodada();
  }, 2500);
}

function atualizarPlacar(){
  document.getElementById("pontosJogador").textContent = pontosJogador;
  document.getElementById("pontosMaquina").textContent = pontosMaquina;
}

function verificarFim(){
  if(pontosJogador >= 10){
    alert("🏆 VOCÊ GANHOU!");
    pontosJogador = 0;
    pontosMaquina = 0;
    atualizarPlacar();
    criarDeck();
  }

  if(pontosMaquina >= 10){
    alert("🤖 A MÁQUINA GANHOU!");
    pontosJogador = 0;
    pontosMaquina = 0;
    atualizarPlacar();
    criarDeck();
  }
}

function novaRodada(){
  rodadaFinalizada = false;

  cartaJogador = balancearCarta(pegarCarta());
  cartaMaquina = balancearCarta(pegarCarta());

  while(cartaJogador.nome === cartaMaquina.nome){
    cartaMaquina = balancearCarta(pegarCarta());
  }

  // ALTERADO: Agora chama a função de esconder o jogador
  esconderCartaJogador();
  esconderCartaMaquina();

  document.getElementById("resultado").textContent = "";
}
