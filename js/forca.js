let categoriaAtual = "";
let palavraAtualIndex = null;
let errosRestantes = 3;
let medidorCombo = 0;
let estrelasAtivas = document.querySelectorAll('.estrela.ativa').length;
let tempoPadrao = 60
let tempoRestante = 30; // segundos
let intervaloTimer = null;
let modoAtual = null; // "casual" ou "desafio"
let modoMisto = false
let categoriasModoMisto = []



let palavrasRespondidas = JSON.parse(
    localStorage.getItem('palavrasRespondidas')
) || {};

let pontuacoes = JSON.parse(
    localStorage.getItem('pontuacoesCategorias')
) || {};

function inicializarCategoria(categoria) {
    if (!palavrasRespondidas[categoria]) {
        palavrasRespondidas[categoria] = [];
    }
}

function iniciarJogoCategoria(categoria) {
    document.querySelector(".pop-up-perdeu").style.display = "none";
    document.querySelector(".pop-up-ganhou").style.display = "none";
    limparEstado()
    limparJogo()
    resetarCombo()
    if (modoMisto === false) {
        errosRestantes = 3; // 🔥 reseta vidas
    }
    categoriaAtual = categoria;
    atualizarStatusCategoria(categoria);
    mostrarPontuacaoCategoria(categoria);
    atualizarDisplayVidas()
    zeraPontuacao()

    const sorteada = sortearPalavraCategoria(categoria);

    if (!sorteada) {
        alert("🎉 Você já completou esta categoria!");
        return;
    }

    palavraSecreta = sorteada.palavra;
    dicaAtual = sorteada.dica;

    iniciarJogo();
}

function continuarCategoria(categoria) {
    document.querySelector(".pop-up-perdeu").style.display = "none";
    document.querySelector(".pop-up-ganhou").style.display = "none";
    atualizarStatusCategoria(categoria);
    mostrarPontuacaoCategoria(categoria);
    atualizarDisplayVidas()
    if (modoMisto === true) {
        sortearPalavraModoMisto(categoriasModoMisto)
    } else {
        categoriaAtual = categoria;

        const sorteada = sortearPalavraCategoria(categoria);

        if (!sorteada) {
            alert("🎉 Você já completou esta categoria!");
            return;
        }

        palavraSecreta = sorteada.palavra;
        dicaAtual = sorteada.dica;
        iniciarJogo();
    }
}

function zeraPontuacao() {
    if (pontuacoes[categoriaAtual]) {
        pontuacoes[categoriaAtual].pontos = 0; // zera só a pontuação atual

        localStorage.setItem(
            'pontuacoesCategorias',
            JSON.stringify(pontuacoes)
        );
    }
}

function iniciarJogo() {
    clearInterval(intervaloTimer);
    limparEstado();
    atualizarBarraCombo();
    if (modoAtual === "desafio") {
        iniciarTimer();
    }

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
    document.getElementById("forca").style.display = "flex";
    document.getElementById("botao-reiniciar").style.display = "none";
    document.getElementById("botao-proxima").style.display = "block"

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // usa os dados já definidos
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

function reiniciar() {
    errosRestantes = 3
    limparJogo()
    limparEstado()
    resetarCombo()
    novaRodada()
}

function novaRodada() {
    limparEstado()
    limparJogo()
    if (errosRestantes > 1) {
        if (document.querySelector(".pop-up-perdeu").style.display === "none"
            && document.querySelector(".pop-up-ganhou").style.display === "none") {
            continuarCategoria(categoriaAtual)
            registrarErro()
        } else {
            continuarCategoria(categoriaAtual)
        }

    } else if (errosRestantes === 1) {
        if (document.querySelector(".pop-up-perdeu").style.display === "none"
            && document.querySelector(".pop-up-ganhou").style.display === "none") {
            alert("Você não pode pular essa!")
        } else {
            continuarCategoria(categoriaAtual)
        }
    }

}

function reiniciarPagina() {
    resetarCombo()
    limparEstado()
    limparJogo()
    pararTimer()
    window.location.hash = "";
    modoAtual = "";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    document.getElementById('categorias').style.display = "none"

    location.reload();
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
        if (estrelasAtivas === 5) {
            medidorCombo++;

            atualizarBarraCombo();

            console.log("Combo:", medidorCombo);

        } else {
            resetarCombo();
        }
        fim = true;
        document.querySelector(".pop-up-ganhou").style.display = "flex";
        pararTimer()
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
    console.log(categoriaAtual)
}

function limparJogo() {
    palavraSecreta = ""
    dicaAtual = ""
}

function mudarCategoria() {
    renderizarCategorias()
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
    if (!categoriaAtual) return;

    const estrelasAtivas = document.querySelectorAll('.estrela.ativa').length;
    const multiplicadorCombo = medidorCombo > 0 ? medidorCombo : 1;
    const pontosGanhos = 10 * estrelasAtivas * multiplicadorCombo;

    if (pontosGanhos === 0) return;

    if (!pontuacoes[categoriaAtual]) {
        pontuacoes[categoriaAtual] = {
            pontos: 0,
            hiscore: 0
        };
    }

    const valorInicial = pontuacoes[categoriaAtual].pontos;
    const valorFinal = valorInicial + pontosGanhos;

    // Atualiza pontuação real
    pontuacoes[categoriaAtual].pontos = valorFinal;

    // Atualiza hi-score
    if (valorFinal > pontuacoes[categoriaAtual].hiscore) {
        pontuacoes[categoriaAtual].hiscore = valorFinal;
    }

    // Salva
    localStorage.setItem(
        'pontuacoesCategorias',
        JSON.stringify(pontuacoes)
    );

    // 🔥 Agora anima
    animarPontuacao(valorInicial, valorFinal, categoriaAtual);
}

function animarPontuacao(valorInicial, valorFinal, categoria) {
    const display = document.querySelector('.display-pontuacao');
    const inicio = performance.now();
    const duracao = 600;

    function animar(tempoAtual) {
        const progresso = Math.min((tempoAtual - inicio) / duracao, 1);

        const valorAtual = Math.floor(
            valorInicial + (valorFinal - valorInicial) * progresso
        );

        const hiscore = pontuacoes[categoria]?.hiscore || 0;

        display.textContent =
            `Pontos: ${valorAtual} | Recorde: ${hiscore}`;

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

function sortearPalavraModoMisto(categoriasSelecionadas) {
    categoriasModoMisto = categoriasSelecionadas
    modoMisto = true
    let categoriasDisponiveis = [...categoriasSelecionadas];
    while (categoriasDisponiveis.length > 0) {

        const indiceCategoria = Math.floor(
            Math.random() * categoriasDisponiveis.length
        );

        const categoriaSorteada = categoriasDisponiveis[indiceCategoria];

        // Testa se ainda existe palavra disponível
        const palavraTeste = sortearPalavraCategoria(categoriaSorteada);

        if (palavraTeste !== null) {

            // ⚠️ Importante:
            // precisamos "desfazer" o sorteio teste
            palavrasRespondidas[categoriaSorteada].pop();

            // Agora inicia o jogo oficialmente
            categoriaAtual = categoriaSorteada
            iniciarJogoCategoria(categoriaAtual);
            return;
        }

        // Remove categoria esgotada
        categoriasDisponiveis.splice(indiceCategoria, 1);
    }

    alert("Todas as categorias selecionadas foram concluídas.");
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

function limparCategoria(categoria) {
    // 🔹 Remove palavras respondidas
    if (palavrasRespondidas[categoria]) {
        delete palavrasRespondidas[categoria];
        localStorage.setItem(
            'palavrasRespondidas',
            JSON.stringify(palavrasRespondidas)
        );
    }

    // 🔹 Remove pontuação E hi-score da categoria
    if (pontuacoes[categoria]) {
        delete pontuacoes[categoria];
        localStorage.setItem(
            'pontuacoesCategorias',
            JSON.stringify(pontuacoes)
        );
    }

    // 🔹 Atualiza interface
    renderizarCategorias();

    console.log(`Categoria ${categoria} limpa COMPLETAMENTE.`);
}

function adicionarPontos(categoria, pontos) {
    if (!pontuacoes[categoria]) {
        pontuacoes[categoria] = {
            pontos: 0,
            hiscore: 0
        };
    }

    pontuacoes[categoria].pontos += pontos;

    // Atualiza hi-score se necessário
    if (pontuacoes[categoria].pontos > pontuacoes[categoria].hiscore) {
        pontuacoes[categoria].hiscore = pontuacoes[categoria].pontos;
    }

    salvarPontuacoes();
}

function salvarPontuacoes() {
    localStorage.setItem(
        'pontuacoesCategorias',
        JSON.stringify(pontuacoes)
    );
}

function resetarPontuacaoCategoria(categoria) {
    if (!pontuacoes[categoria]) return;

    pontuacoes[categoria].pontos = 0;
    salvarPontuacoes();
}

function mostrarPontuacaoCategoria(categoria) {
    const dados = pontuacoes[categoria] || { pontos: 0, hiscore: 0 };

    document.querySelector('.display-pontuacao').textContent =
        `Pontos: ${dados.pontos} | Recorde: ${dados.hiscore}`;
}

function registrarErro() {
    if (errosRestantes <= 0) return;

    errosRestantes--;

    atualizarDisplayVidas();

    if (errosRestantes === 0) {
        gameOver();
    }
}

function gameOver() {
    document.querySelector(".botao-reiniciar").style.display = "block";
    document.querySelector(".botao-proxima").style.display = "none";

    alert("Game Over! Você errou 3 vezes.");


    if (pontuacoes[categoriaAtual]) {
        pontuacoes[categoriaAtual].pontos = 0;

        localStorage.setItem(
            'pontuacoesCategorias',
            JSON.stringify(pontuacoes)
        );
    }

    mostrarPontuacaoCategoria(categoriaAtual);
}


function atualizarDisplayVidas() {
    const display = document.querySelector('.display-vidas');

    display.textContent = "❤️".repeat(errosRestantes);
}

function resetarCombo() {
    medidorCombo = 0;
    atualizarBarraCombo();
}

function iniciarTimer() {
    tempoRestante = tempoPadrao;
    atualizarTimerTela();

    intervaloTimer = setInterval(() => {
        tempoRestante--;
        atualizarTimerTela();

        if (tempoRestante <= 0) {
            clearInterval(intervaloTimer);
            fimDeJogoPorTempo();
        }
    }, 1000);
}

function pararTimer() {
    if (intervaloTimer !== null) {
        clearInterval(intervaloTimer);
        intervaloTimer = null;
    }
}

function configurarInterfacePorModo() {
    const timer = document.getElementById("timer");
    const timerSpan = document.querySelector(".timer-span");
    const statusContador = document.querySelector(".status-contador");

    if (modoAtual === "casual") {
        timer.style.display = "none";
        timerSpan.style.display = "none";
        statusContador.style.display = "none";
    } else {
        timer.style.display = "block";
        timerSpan.style.display = "inline";
        statusContador.style.display = "inline";
    }
}

function abrirModalMisto() {
    const modal = document.getElementById('modal-misto');
    const lista = document.getElementById('lista-categorias-misto');

    lista.innerHTML = '';

    categorias.forEach(cat => {
        const label = document.createElement('label');
        label.innerHTML = `
      <input type="checkbox" value="${cat.id}">
      ${cat.nome}
    `;
        lista.appendChild(label);
    });

    modal.classList.remove('oculto');
}