const celulas = document.querySelectorAll('.celula');
const reiniciarBtn = document.getElementById("reiniciar");
const resultado = document.querySelector('.result');
let vezDoX = true;

reiniciarBtn.addEventListener('click', iniciarJogo);

function iniciarJogo() {
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove("mystyle", "vencedor"); // Remove as classes de estilo
        celula.disabled = false; // Reabilita os botões
        celula.removeEventListener('click', tratarClick); // Remove event listener anterior
        celula.addEventListener('click', tratarClick, { once: true });
    });
    vezDoX = true; // Reinicia a vez para o jogador X
    resultado.textContent = ""; // Limpa a mensagem de vitória/empate
}

function tratarClick(evento) {
    const clicado = evento.target;
    clicado.textContent = vezDoX ? "X" : "O";
    clicado.classList.add("mystyle");
    if (verificarVitoria()) {
        return; // Se houver vitória, não continua
    }
    vezDoX = !vezDoX; // Alterna a vez
}

function verificarVitoria() {
    const combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6] // diagonais
    ];

    for (const [a, b, c] of combinacoesVitoria) {
        if (celulas[a].textContent && 
            celulas[a].textContent === celulas[b].textContent && 
            celulas[a].textContent === celulas[c].textContent) {
            celulas[a].classList.add("vencedor");
            celulas[b].classList.add("vencedor");
            celulas[c].classList.add("vencedor");

            // Desabilita todas as células após a vitória
            celulas.forEach(celula => celula.disabled = true);

            resultado.textContent = `Jogador ${celulas[a].textContent} venceu!`; // Exibe a mensagem de vitória
            return true; // Retorna true para indicar que houve uma vitória
        }
    }

    // Verifica empate
    if ([...celulas].every(celula => celula.textContent !== "")) {
        resultado.textContent = "Empate!"; // Exibe a mensagem de empate
        return true;
    }

    resultado.textContent = ""; // Limpa a mensagem de vitória/empate se não houver vencedor
    return false; 
}

iniciarJogo();
