function iniciarJogo() {
    fim = false;
    erros = 0;
    acertos = 0;
    letrasUsadas = [];

    totalLetras = palavraSecreta.replace(/ /g, "").length;
    adicionaTecladoVirtual();

    document.querySelectorAll('.estrela').forEach(e => e.classList.add('ativa'));
    document.querySelector(".tutorial").style.display = "none";
    document.querySelector(".area-canvas").style.display = "flex";
    document.querySelector(".menu-inicial").style.display = "none";
    document.querySelector(".categorias").style.display = "none";
    document.querySelector(".contadores").style.display = "none";
    document.getElementById("botao-desistir").style.display = "initial";
    document.getElementById("forca").style.display = "flex";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // usa a dica já definida
    document.querySelector(".dica-palavra").textContent = dicaAtual;

    desenharLinhas();
    document.addEventListener('keydown', (e) => {
        if (fim) return;

        if (!/^[a-zA-Z]$/.test(e.key)) return;

        const letra = e.key.toUpperCase();
        validarJogada(letra);
    });
}


function iniciarJogoCategoria(categoria) {
    const lista = bancoPalavras[categoria];
    const sorteada = lista[Math.floor(Math.random() * lista.length)];

    palavraSecreta = sorteada.palavra;
    dicaAtual = sorteada.dica;

    iniciarJogo();
}

function IniciarJogoPersonalizado() {
    adicionaTecladoVirtual();
    document.querySelector(".tutorial").style.display = "none";
    document.querySelector(".area-canvas").style.display = "flex";
    document.querySelector(".menu-inicial").style.display = "none";
    document.getElementById("botao-desistir").style.display = "initial";
    document.getElementById("forca").style.display = "flex";
    document.querySelector(".campo-nova-palavra").style.display = "none";
    document.querySelector(".principal").style.display = "flex";
    palavraSecreta = document.getElementById('palavra').value.toUpperCase();
    let dica = document.getElementById('dica').value.toUpperCase();
    document.querySelector(".dica-palavra").innerText = "Dica da Palvra:  " + dica;
    desenharLinhas();

    if (fim === false) {
        document.onkeydown = (e) => {
            let letra = e.key.toUpperCase();
            let codLetra = e.key.charCodeAt();
            validarJogada(letra, codLetra);
        }
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

function adicionarAcerto() {
    if (fim === false) {
        acertos++;
    }
}

function recarregar() {
    fim = false;
    erros = 0;
    acertos = 0;
    letrasUsadas = [];

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

function reiniciarPagina() {
    fim = false;
    erros = 0;
    acertos = 0;
    letrasUsadas = [];
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
    document.getElementById("botao-desistir").style.display = "none";
    
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
    }
}