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
  document.getElementById("simboloJogador").textContent = cartaJogador.simbolo; 
  document.getElementById("familiaJogador").textContent = cartaJogador.familia; 
  document.getElementById("raridadeJogador").textContent = cartaJogador.raridade; 

  document.getElementById("linhaReatividadeJogador").style.display = "none";
  document.getElementById("linhaEstabilidadeJogador").style.display = "none";
  document.getElementById("curiosidadeJogador").textContent = "";
}

function revelarCartaJogador(){
  document.getElementById("ataqueJogador").textContent = cartaJogador.reatividade;
  document.getElementById("defesaJogador").textContent = cartaJogador.estabilidade;
  
  document.getElementById("linhaReatividadeJogador").style.display = "block";
  document.getElementById("linhaEstabilidadeJogador").style.display = "block";
  document.getElementById("curiosidadeJogador").textContent = cartaJogador.curiosidade || "";
}

// CORRIGIDO: Mostra apenas Raridade real, Nome e Símbolo (sem nenhuma linha com ???)
function esconderCartaMaquina(){
  document.getElementById("nomeMaquina").textContent = cartaMaquina.nome;
  document.getElementById("simboloMaquina").textContent = cartaMaquina.simbolo; 
  document.getElementById("raridadeMaquina").textContent = cartaMaquina.raridade; 
  
  // Limpa os dados secretos para o início do turno
  document.getElementById("dadosSecretosMaquina").innerHTML = "";
}

// CORRIGIDO: Injeta o resto das informações após a jogada, mantendo o símbolo intacto acima
function revelarCartaMaquina(){
  document.getElementById("dadosSecretosMaquina").innerHTML = `
    <p>🔬 CAMADA DE VALÊNCIA: <span>${cartaMaquina.ultimo}</span></p>
    <p>🧪 FAMÍLIA: <span>${cartaMaquina.familia}</span></p>
    <p>⚔⚡ REATIVIDADE: <span>${cartaMaquina.reatividade}</span></p>
    <p>🛡 ESTABILIDADE: <span>${cartaMaquina.estabilidade}</span></p>
  `;
}

function jogar(atributo){
  if(rodadaFinalizada){
    return;
  }

  rodadaFinalizada = true;
  somClique.play();

  revelarCartaJogador();
  revelarCartaMaquina();

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
  if(!rodadaFinalizada && pontosJogador !== 0 && pontosMaquina !== 0) {
    return;
  }

  rodadaFinalizada = false;

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
