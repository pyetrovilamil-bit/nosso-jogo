let pontosJogador = 0;
let pontosMaquina = 0;

let cartaJogador;
let cartaMaquina;

let deck = [];

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

    [array[i], array[j]] =
    [array[j], array[i]];
  }
}

function pegarCarta(){

  if(deck.length === 0){

    criarDeck();
  }

  return deck.pop();
}

function balancearCarta(carta){

  let tipo =
    Math.floor(Math.random() * 3);

  if(tipo === 0){

    carta.reatividade =
      90;

    carta.estabilidade =
      40;
  }

  else if(tipo === 1){

    carta.reatividade =
      45;

    carta.estabilidade =
      95;
  }

  else{

    carta.reatividade =
      70;

    carta.estabilidade =
      70;
  }

  return carta;
}

function mostrarCarta(){

  document.getElementById("nomeJogador").textContent =
    cartaJogador.nome;

  document.getElementById("simboloJogador").textContent =
    cartaJogador.simbolo;

  document.getElementById("numeroJogador").textContent =
    cartaJogador.numero;

  document.getElementById("familiaJogador").textContent =
    cartaJogador.familia;

  document.getElementById("ataqueJogador").textContent =
    cartaJogador.reatividade;

  document.getElementById("defesaJogador").textContent =
    cartaJogador.estabilidade;

  document.getElementById("curiosidadeJogador").textContent =
    cartaJogador.curiosidade;

  document.getElementById("raridadeJogador").textContent =
    cartaJogador.raridade;
}

function esconderCartaMaquina(){

  document.getElementById("cartaMaquina").innerHTML =
  `
    <div class="raridade">
      ???
    </div>

    <h2>${cartaMaquina.nome}</h2>
  `;
}

function revelarCartaMaquina(){

  document.getElementById("cartaMaquina").innerHTML =
  `
    <div class="raridade">
      ${cartaMaquina.raridade}
    </div>

    <h2>${cartaMaquina.nome}</h2>

    <p>⚛ Símbolo:
      ${cartaMaquina.simbolo}
    </p>

    <p>🔬 Número Atômico:
      ${cartaMaquina.numero}
    </p>

    <p>🧪 Família:
      ${cartaMaquina.familia}
    </p>

    <p>⚡ Reatividade:
      ${cartaMaquina.reatividade}
    </p>

    <p>🛡 Estabilidade:
      ${cartaMaquina.estabilidade}
    </p>

    <small>
      ${cartaMaquina.curiosidade}
    </small>
  `;
}

function jogar(atributo){

  somClique.play();

  revelarCartaMaquina();

  let valorJogador =
    cartaJogador[atributo];

  let valorMaquina =
    cartaMaquina[atributo];

  if(valorJogador > valorMaquina){

    pontosJogador++;

    somVitoria.play();

    document.getElementById("resultado").textContent =
      `🎉 ${cartaJogador.nome} venceu ${cartaMaquina.nome}!`;
  }

  else if(valorJogador < valorMaquina){

    pontosMaquina++;

    somDerrota.play();

    document.getElementById("resultado").textContent =
      `💀 ${cartaMaquina.nome} venceu ${cartaJogador.nome}!`;
  }

  else{

    document.getElementById("resultado").textContent =
      "⚖ EMPATE!";
  }

  atualizarPlacar();

  verificarFim();
}

function atualizarPlacar(){

  document.getElementById("pontosJogador").textContent =
    pontosJogador;

  document.getElementById("pontosMaquina").textContent =
    pontosMaquina;
}

function verificarFim(){

  if(pontosJogador >= 10){

    alert("🏆 VOCÊ GANHOU!");

    pontosJogador = 0;
    pontosMaquina = 0;

    atualizarPlacar();

    criarDeck();

    novaRodada();
  }

  if(pontosMaquina >= 10){

    alert("🤖 A MÁQUINA GANHOU!");

    pontosJogador = 0;
    pontosMaquina = 0;

    atualizarPlacar();

    criarDeck();

    novaRodada();
  }
}

function novaRodada(){

  cartaJogador =
    balancearCarta(pegarCarta());

  cartaMaquina =
    balancearCarta(pegarCarta());

  while(cartaJogador.nome === cartaMaquina.nome){

    cartaMaquina =
      balancearCarta(pegarCarta());
  }

  mostrarCarta();

  esconderCartaMaquina();

  document.getElementById("resultado").textContent = "";
}
