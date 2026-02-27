const STORAGE_KEY = 'pontuacoesJogoForca';

function criarEstruturaPadrao() {
    return {
        casual: {
            categorias: {}
        },
        desafio: {
            categorias: {}
        },
        misto: {
            casual: { pontos: 0, hiscore: 0 },
            desafio: { pontos: 0, hiscore: 0 }
        }
    };
}

function carregarPontuacoes() {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);

    if (!dadosSalvos) {
        return criarEstruturaPadrao();
    }

    try {
        const dados = JSON.parse(dadosSalvos);

        return {
            ...criarEstruturaPadrao(),
            ...dados
        };

    } catch (erro) {
        return criarEstruturaPadrao();
    }
}

function calcularPontuacao() {
    if (!categoriaAtual) return;

    const estrelasAtivas = document.querySelectorAll('.estrela.ativa').length;
    const multiplicadorCombo = medidorCombo > 0 ? medidorCombo : 1;
    const pontosGanhos = 10 * estrelasAtivas * multiplicadorCombo;

    if (pontosGanhos === 0) return;

    const resultado = salvarPontuacoes({
        modoAtual,
        modoMisto,
        categoriaAtual,
        pontosGanhos
    });

    if (!resultado) return;

    animarPontuacao(
        resultado.valorInicial,
        resultado.valorFinal,
        resultado.hiscoreAtual
    );
}

function salvarPontuacoes({ modoAtual, modoMisto, categoriaAtual, pontosGanhos }) {

    if (!modoAtual) return;

    const dados = carregarPontuacoes();
    let estruturaAtual;

    // 🎯 MODO POR CATEGORIA
    if (!modoMisto) {

        if (!dados[modoAtual].categorias[categoriaAtual]) {
            dados[modoAtual].categorias[categoriaAtual] = {
                pontos: 0,
                hiscore: 0
            };
        }

        estruturaAtual = dados[modoAtual].categorias[categoriaAtual];
    }

    // 🎲 MODO MISTO
    else {
        estruturaAtual = dados.misto[modoAtual];
    }

    if (!estruturaAtual) return;

    const valorInicial = estruturaAtual.pontos;
    const valorFinal = valorInicial + pontosGanhos;

    estruturaAtual.pontos = valorFinal;

    if (valorFinal > estruturaAtual.hiscore) {
        estruturaAtual.hiscore = valorFinal;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));

    return {
        valorInicial,
        valorFinal,
        hiscoreAtual: estruturaAtual.hiscore
    };
}

function animarPontuacao(valorInicial, valorFinal, hiscoreAtual) {

    const display = document.querySelector('.display-pontuacao');
    const inicio = performance.now();
    const duracao = 600;

    function animar(tempoAtual) {

        const progresso = Math.min((tempoAtual - inicio) / duracao, 1);

        const valorAtual = Math.floor(
            valorInicial + (valorFinal - valorInicial) * progresso
        );

        display.textContent =
            `Pontos: ${valorAtual} | Recorde: ${hiscoreAtual}`;

        if (progresso < 1) {
            requestAnimationFrame(animar);
        }
    }

    requestAnimationFrame(animar);
}

function mostrarPontuacaoAtual() {

    const display = document.querySelector('.display-pontuacao');
    const dados = carregarPontuacoes();

    let estruturaAtual;

    // 🎯 Modo por categoria
    if (!modoMisto) {

        estruturaAtual =
            dados[modoAtual]?.categorias[categoriaAtual] || {
                pontos: 0,
                hiscore: 0
            };
    }

    // 🎲 Modo misto
    else {
        estruturaAtual =
            dados.misto?.[modoAtual] || {
                pontos: 0,
                hiscore: 0
            };
    }

    display.textContent =
        `Pontos: ${estruturaAtual.pontos} | Recorde: ${estruturaAtual.hiscore}`;
}

function zeraPontuacao() {
    const dados = carregarPontuacoes();

    // 🔹 Casual por categoria
    for (const categoria in dados.casual.categorias) {
        dados.casual.categorias[categoria].pontos = 0;
    }

    // 🔹 Desafio por categoria
    for (const categoria in dados.desafio.categorias) {
        dados.desafio.categorias[categoria].pontos = 0;
    }

    // 🔹 Modo misto casual
    if (dados.misto.casual) {
        dados.misto.casual.pontos = 0;
    }

    // 🔹 Modo misto desafio
    if (dados.misto.desafio) {
        dados.misto.desafio.pontos = 0;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}