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
    cartaJogador.ataque;

  document.getElementById("defesaJogador").textContent =
    cartaJogador.defesa;

  document.getElementById("curiosidadeJogador").textContent =
    cartaJogador.curiosidade;

  document.getElementById("raridadeJogador").textContent =
    cartaJogador.raridade;

  let nomeImagem =
    cartaJogador.nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  document.getElementById("imagemJogador").src =
    `imagens/cartas/${nomeImagem}.png`;
}

function esconderCartaMaquina(){

  document.getElementById("cartaMaquina").innerHTML =
  `
    <h2>???</h2>
    <p>Escolha um atributo</p>
  `;
}

function revelarCartaMaquina(){

  let nomeImagem =
    cartaMaquina.nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  document.getElementById("imagemMaquina").src =
    `imagens/cartas/${nomeImagem}.png`;

  document.getElementById("cartaMaquina").innerHTML =
  `
    <div class="raridade">
      ???
    </div>

    <h2>${cartaMaquina.nome}</h2>

    <p>⚛ Elemento Revelado</p>
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

    alert("🏆 VOCÊ GANHOU O JOGO!");

    criarDeck();

    pontosJogador = 0;
    pontosMaquina = 0;

    atualizarPlacar();

    novaRodada();
  }

  if(pontosMaquina >= 10){

    alert("🤖 A MÁQUINA GANHOU!");

    criarDeck();

    pontosJogador = 0;
    pontosMaquina = 0;

    atualizarPlacar();

    novaRodada();
  }
}

function novaRodada(){

  cartaJogador = pegarCarta();

  cartaMaquina = pegarCarta();

  while(cartaJogador.nome === cartaMaquina.nome){

    cartaMaquina = pegarCarta();
  }

  mostrarCarta();

  esconderCartaMaquina();

  document.getElementById("resultado").textContent = "";
}
