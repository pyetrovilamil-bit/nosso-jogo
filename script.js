let pontosJogador = 0;
let pontosMaquina = 0;

let cartaJogador;
let cartaMaquina;

const somVitoria = new Audio("sons/vitoria.mp3");
const somDerrota = new Audio("sons/derrota.mp3");
const somClique = new Audio("sons/clique.mp3");

function iniciarJogo(){

  document.getElementById("telaInicial").style.display = "none";

  document.getElementById("jogo").style.display = "block";

  novaRodada();
}

function pegarCarta(){

  return cartas[
    Math.floor(Math.random() * cartas.length)
  ];
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
}

function esconderCartaMaquina(){

  document.getElementById("cartaMaquina").innerHTML =
  `
    <h2>???</h2>
    <p>Escolha um atributo</p>
  `;
}

function revelarCartaMaquina(){

  document.getElementById("cartaMaquina").innerHTML =
  `
    <h2>${cartaMaquina.nome}</h2>

    <p>⚛ Símbolo:
      ${cartaMaquina.simbolo}
    </p>

    <p>🔬 Número:
      ${cartaMaquina.numero}
    </p>

    <p>🧪 Família:
      ${cartaMaquina.familia}
    </p>

    <p>⚔ Ataque:
      ${cartaMaquina.ataque}
    </p>

    <p>🛡 Defesa:
      ${cartaMaquina.defesa}
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
      "🎉 VOCÊ GANHOU A RODADA!";

  }

  else if(valorJogador < valorMaquina){

    pontosMaquina++;

    somDerrota.play();

    document.getElementById("resultado").textContent =
      "💀 VOCÊ PERDEU!";

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

  if(pontosJogador >= 5){

    alert("🏆 VOCÊ VENCEU O JOGO!");

    location.reload();
  }

  if(pontosMaquina >= 5){

    alert("🤖 A MÁQUINA VENCEU!");

    location.reload();
  }
}

function novaRodada(){

  cartaJogador = pegarCarta();

  cartaMaquina = pegarCarta();

  mostrarCarta();

  esconderCartaMaquina();

  document.getElementById("resultado").textContent = "";
}
