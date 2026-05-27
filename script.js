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

// MODIFICADO: Esta função agora deixa visível apenas o Nome e a Camada de Valência
function mostrarCartaParcialJogador(){
  // Informações que FICAM VISÍVEIS desde o início da rodada
  document.getElementById("nomeJogador").textContent = cartaJogador.nome;
  document.getElementById("numeroJogador").textContent = cartaJogador.ultimo; // Camada de Valência

  // Informações que começam ESCONDIDAS (???)
  document.getElementById("simboloJogador").textContent = "???";
  document.getElementById("familiaJogador").textContent = "???";
  document.getElementById("ataqueJogador").textContent = "???"; // Reatividade
  document.getElementById("defesaJogador").textContent = "???";  // Estabilidade
  document.getElementById("raridadeJogador").textContent = "???";
  document.getElementById("curiosidadeJogador").textContent = "";
}

// MODIFICADO: Esta função revela o restante dos dados após o clique
function revelarCartaJogador(){
  // Revela o resto que estava oculto
  document.getElementById("simboloJogador").textContent = cartaJogador.simbolo;
  document.getElementById("familiaJogador").textContent = cartaJogador.familia;
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
    <p>⚛ Último elemento: ${cartaMaquina.ultimo}</p>
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

  // Revela o resto dos dados de ambas as cartas ao mesmo tempo
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

  // MODIFICADO: Tempo alterado de 2500 para 10000 milissegundos (10 segundos)
  setTimeout(() => {
    novaRodada();
  }, 10000); 
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

  // Inicializa a rodada mostrando apenas os dados permitidos do jogador
  mostrarCartaParcialJogador();
  esconderCartaMaquina();

  document.getElementById("resultado").textContent = "";
}
