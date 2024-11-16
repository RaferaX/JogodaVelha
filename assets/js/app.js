const proxJogador = document.querySelector(".proxJogador");

let selected;
let player = "X";
let timer; // Variável para controlar o timer
let timeLeft = 2; // Tempo limite por turno (2 segundos)

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    selected = [];
    player = "X"; // Reinicia o jogador inicial
    timeLeft = 2; // Reseta o tempo para o primeiro turno

    proxJogador.innerHTML = `Jogador da vez: ${player}`;
    document.getElementById("timer").innerHTML = `Tempo restante: ${timeLeft}s`;

    document.querySelectorAll(".jogo button").forEach((item) => {
        item.innerHTML = "";
        item.disabled = false; // Habilita os botões
        item.addEventListener("click", newMove);
    });

    startTimer(); // Inicia o timer para o primeiro turno
}

init();

function startTimer() {
    clearInterval(timer); // Garante que o timer anterior seja limpo
    timeLeft = 2; // Reinicia o tempo para o jogador atual

    timer = setInterval(() => {
        document.getElementById("timer").innerHTML = `Tempo restante: ${timeLeft}s`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer); // Para o timer
            player = player === "X" ? "O" : "X"; // Passa o turno
            proxJogador.innerHTML = `Jogador da vez: ${player}`;
            startTimer(); // Reinicia o timer para o próximo jogador
        }
    }, 1000);
}

function newMove(e) {
    const index = e.target.getAttribute("data-i");

    if (!selected[index]) {
        e.target.innerHTML = player;
        selected[index] = player;

        clearInterval(timer); // Para o timer ao fazer um movimento
        check(); // Verifica vitória ou empate

        player = player === "X" ? "O" : "X";
        proxJogador.innerHTML = `Jogador da vez: ${player}`;
        startTimer(); // Reinicia o timer para o próximo jogador
    }
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item, i) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (let pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            setTimeout(() => {
                alert("O Jogador '" + playerLastMove + "' Ganhou!");
                clearInterval(timer); // Para o timer
                init(); // Reinicia o jogo
            }, 200);
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        setTimeout(() => {
            alert("Deu Empate!");
            clearInterval(timer); // Para o timer
            init(); // Reinicia o jogo
        }, 200);
        return;
    }
}
