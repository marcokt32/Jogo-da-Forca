let categoriaAtual = "";
let pontuacao = 0;
let palavraAtualIndex = null;
let palavrasRespondidas = JSON.parse(
    localStorage.getItem('palavrasRespondidas')
) || {};

function inicializarCategoria(categoria) {
    if (!palavrasRespondidas[categoria]) {
        palavrasRespondidas[categoria] = [];
    }
}

function iniciarJogoCategoria(categoria) {
    categoriaAtual = categoria;
    atualizarStatusCategoria(categoria);

    const sorteada = sortearPalavraCategoria(categoria);

    if (!sorteada) {
        alert("🎉 Você já completou esta categoria!");
        return;
    }

    palavraSecreta = sorteada.palavra;
    dicaAtual = sorteada.dica;

    iniciarJogo();
}

function iniciarJogo() {
    limparEstado()

    totalLetras = palavraSecreta.replace(/ /g, "").length;
    adicionaTecladoVirtual();

    document.querySelector(".pop-up-perdeu").style.display = "none";
    document.querySelector(".pop-up-ganhou").style.display = "none";
    document.querySelectorAll('.estrela').forEach(e => e.classList.add('ativa'));
    document.querySelector(".tutorial").style.display = "none";
    document.querySelector(".area-canvas").style.display = "flex";
    document.querySelector(".botoes-in-game").style.display = "flex";
    document.querySelector(".menu-inicial").style.display = "none";
    document.querySelector(".categorias").style.display = "none";
    document.querySelector(".contadores").style.display = "none";
    document.getElementById("botao-desistir").style.display = "initial";
    document.getElementById("forca").style.display = "flex";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // usa os dados já definidos
    document.querySelector(".display-categoria").textContent = "Categoria: " + categoriaAtual;
    document.querySelector(".dica-palavra").textContent = "💡 Dica: " + dicaAtual;

    desenharLinhas();
    document.addEventListener('keydown', (e) => {
        if (fim) return;

        if (!/^[a-zA-Z]$/.test(e.key)) return;

        const letra = e.key.toUpperCase();
        validarJogada(letra);
    });
}

function adicionaTecladoVirtual() {
    document.getElementById("fileira1").innerHTML = "";
    document.getElementById("fileira2").innerHTML = "";
    document.getElementById("fileira3").innerHTML = "";
    let fileira1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    let fileira2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    let fileira3 = ["Z", "X", "C", "V", "B", "N", "M"];

    document.querySelector(".teclado-virtual").style.display = "grid";

    for (i = 0; i < fileira1.length; i++) {
        document.getElementById("fileira1").innerHTML += "<button class='tecla' id='" + fileira1[i] + "' value='" + fileira1[i] + "' onclick='verificarLetraTecladoVirtual(value)'>" + fileira1[i] + "</button>";
    }

    for (i = 0; i < fileira2.length; i++) {
        document.getElementById('fileira2').innerHTML += "<button class='tecla' id='" + fileira2[i] + "' value='" + fileira2[i] + "' onclick='verificarLetraTecladoVirtual(value)'>" + fileira2[i] + "</button>";
    }

    for (i = 0; i < fileira3.length; i++) {
        document.getElementById('fileira3').innerHTML += "<button class='tecla' id='" + fileira3[i] + "' value='" + fileira3[i] + "' onclick='verificarLetraTecladoVirtual(value)'>" + fileira3[i] + "</button>";
    }

}

function IniciarJogoPersonalizado() {
    palavraSecreta = document.getElementById('palavra').value.toUpperCase();
    dicaAtual = document.getElementById('dica').value.toUpperCase();

    adicionaTecladoVirtual();
    document.querySelector(".tutorial").style.display = "none";
    document.querySelector(".area-canvas").style.display = "flex";
    document.querySelector(".menu-inicial").style.display = "none";
    document.getElementById("botao-desistir").style.display = "initial";
    document.getElementById("forca").style.display = "flex";
    document.querySelector(".campo-nova-palavra").style.display = "none";
    document.querySelector(".principal").style.display = "flex";
    document.querySelector(".dica-palavra").innerText = "Dica da Palvra:  " + dicaAtual;
    iniciarJogo();

}

function verificarLetra(codkey) {
    let estado = false
    if (((codkey >= 97) && (codkey <= 122))) {
        estado = true;
        return estado;

    } else {
        return estado
    }
}

function verificarLetraTecladoVirtual(key) {

    if (fim === false) {
        let letra = key.toLowerCase();
        let codLetra = letra.charCodeAt();

        validarJogada(key, codLetra);
    }
}

function adicionarErro() {
    if (fim === false) {
        erros++;
    }
}

function adicionarAcerto() {
    if (fim === false) {
        acertos++;
    }
}

function recarregar() {

    document.querySelector(".categorias").style.display = "flex";
    document.querySelector(".principal").style.display = "flex";
    document.querySelector(".pop-up-perdeu").style.display = "none";
    document.querySelector(".pop-up-ganhou").style.display = "none";
    document.querySelector(".campo-nova-palavra").style.display = "none";

    document.getElementById("categorias").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function novaRodada() {
    limparEstado()
    limparJogo()
    iniciarJogoCategoria(categoriaAtual)

    document.querySelector(".pop-up-perdeu").style.display = "none";
    document.querySelector(".pop-up-ganhou").style.display = "none";

}

function reiniciarPagina() {
    limparEstado()
    document.querySelector(".categorias").style.display = "flex";
    document.querySelector(".principal").style.display = "flex";
    document.querySelector(".tutorial").style.display = "flex";
    document.querySelector(".contadores").style.display = "flex";
    document.querySelector(".menu-inicial").style.display = "flex";
    document.querySelector(".pop-up-perdeu").style.display = "none";
    document.querySelector(".pop-up-ganhou").style.display = "none";
    document.querySelector(".campo-nova-palavra").style.display = "none";
    document.querySelector(".area-canvas").style.display = "none";
    document.querySelector(".teclado-virtual").style.display = "none";
    document.querySelector(".botoes-in-game").style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function adicionarPalavra() {
    document.querySelector(".campo-nova-palavra").style.display = "flex";
    document.querySelector(".principal").style.display = "none";
    document.querySelector(".categorias").style.display = "none";
}

function voltar() {
    document.querySelector(".campo-nova-palavra").style.display = "none";
    document.querySelector(".principal").style.display = "flex";
    document.querySelector(".categorias").style.display = "flex";
}

function validarJogada(letra) {
    if (fim) return;
    if (letrasUsadas.includes(letra)) return;

    letrasUsadas.push(letra);

    let acertou = false;

    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === " ") continue;

        if (palavraSecreta[i] === letra) {
            escreverLetraCorreta(i, letra);
            acertou = true;
        }
    }

    if (!acertou) {
        erros++;
        escreverLetrasIncorretas(letra, erros);
    }

    verificarVitoria();
}

function verificarVitoria() {
    if (acertos === totalLetras) {
        fim = true;
        document.querySelector(".pop-up-ganhou").style.display = "flex";
        calcularPontuacao()
        confirmarPalavraRespondida();
        atualizarStatusCategoria(categoriaAtual);
    }
}

function limparEstado() {
    fim = false;
    erros = 0;
    acertos = 0;
    letrasUsadas = [];
}

function limparJogo() {
    palavraSecreta = ""
    dicaAtual = ""
}

function mudarCategoria() {
    const categorias = document.getElementById("categorias");

    document.querySelector(".categorias").style.display = "flex";

    if (categorias) {
        categorias.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

function calcularPontuacao() {
    const estrelasAtivas = document.querySelectorAll('.estrela.ativa').length;
    const pontosGanhos = estrelasAtivas * 20;

    const pontuacaoAnterior = pontuacao;
    pontuacao += pontosGanhos;

    localStorage.setItem('pontuacao', pontuacao);

    animarPontuacao(pontuacaoAnterior, pontuacao);
}

function animarPontuacao(valorInicial, valorFinal, duracao = 600) {
    const display = document.querySelector('.display-pontuacao');
    const inicio = performance.now();

    function animar(tempoAtual) {
        const progresso = Math.min((tempoAtual - inicio) / duracao, 1);
        const valorAtual = Math.floor(
            valorInicial + (valorFinal - valorInicial) * progresso
        );

        display.textContent = `Placar: ${valorAtual}`;

        if (progresso < 1) {
            requestAnimationFrame(animar);
        }
    }

    requestAnimationFrame(animar);
}

function sortearPalavraCategoria(categoria) {
    if (!palavrasRespondidas[categoria]) {
        palavrasRespondidas[categoria] = [];
    }

    const lista = bancoPalavras[categoria];
    const usadas = palavrasRespondidas[categoria];

    if (usadas.length >= lista.length) {
        return null;
    }

    let indice;
    do {
        indice = Math.floor(Math.random() * lista.length);
    } while (usadas.includes(indice));

    palavraAtualIndex = indice; // guarda temporariamente
    return lista[indice];
}

function atualizarStatusCategoria(categoria) {
    const total = bancoPalavras[categoria].length;
    const feitas = palavrasRespondidas[categoria]?.length || 0;

    const porcentagem = (feitas / total) * 100;

    document.querySelector('.status-nome').textContent =
        categoria.charAt(0).toUpperCase() + categoria.slice(1);

    document.querySelector('.barra-preenchida').style.width =
        `${porcentagem}%`;

    document.querySelector('.status-contador').textContent =
        `${feitas} / ${total}`;
}

function confirmarPalavraRespondida() {
    if (palavraAtualIndex === null) return;

    palavrasRespondidas[categoriaAtual].push(palavraAtualIndex);

    localStorage.setItem(
        'palavrasRespondidas',
        JSON.stringify(palavrasRespondidas)
    );

    palavraAtualIndex = null;
}