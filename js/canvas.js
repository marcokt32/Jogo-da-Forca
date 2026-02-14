function desenharLinhas() {
    const forca = document.getElementById("forca");
    forca.innerHTML = "";

    let linha = document.createElement("div");
    linha.classList.add("linha");

    let contadorLetras = 0;
    const LIMITE_POR_LINHA = 15;

    for (let i = 0; i < palavraSecreta.length; i++) {

        const caractere = palavraSecreta[i];

        // 🔹 Se for espaço, finaliza linha atual
        if (caractere === " ") {
            forca.appendChild(linha);

            linha = document.createElement("div");
            linha.classList.add("linha");

            contadorLetras = 0;
            continue;
        }

        // 🔹 Se ultrapassar limite e não houver espaço
        if (contadorLetras >= LIMITE_POR_LINHA) {
            forca.appendChild(linha);

            linha = document.createElement("div");
            linha.classList.add("linha");

            contadorLetras = 0;
        }

        const letra = document.createElement("p");
        letra.classList.add("letra");
        letra.id = `letra-${i}`;

        linha.appendChild(letra);

        contadorLetras++;
    }

    // adiciona última linha
    forca.appendChild(linha);
}


function atualizarTimerTela() {
    document.getElementById("timer").innerText = tempoRestante;
}

function fimDeJogoPorTempo() {
    alert("⏰ Tempo esgotado!");
    fim = true;
    document.querySelector(".pop-up-perdeu").style.display = "flex";
    registrarErro();
    pararTimer()
    resetarCombo()
    finalizarJogo(false);
}



function escreverLetraCorreta(index, letra) {
    if (fim) return;

    const campo = document.getElementById(`letra-${index}`);

    // Evita contar a mesma letra duas vezes
    if (campo.innerText === '') {
        campo.innerText = letra;
        acertos++;
    }

    const botao = document.getElementById(letra);
    if (botao) {
        botao.classList.add("letra-correta");
    }

}

function escreverLetrasIncorretas(letra, erros) {
    if (fim) return;

    const botao = document.getElementById(letra);
    if (botao) {
        botao.classList.add("letra-errada");
        botao.disabled = true;
    }
    resetarCombo()
    complementarForca(erros);
}

function complementarForca(erros) {
    const estrelas = document.querySelectorAll('.estrela');
    const totalEstrelas = estrelas.length;

    estrelas.forEach((estrela, index) => {
        if (index < totalEstrelas - erros) {
            estrela.classList.add('ativa');
        } else {
            estrela.classList.remove('ativa');
        }
    });

    if (erros >= totalEstrelas) {
        fim = true;
        document.querySelector(".pop-up-perdeu").style.display = "flex";
        registrarErro();
    }
}

function atualizarBarraCombo() {
    const barra = document.getElementById("barra-combo");
    const texto = document.getElementById("texto-combo");

    if (medidorCombo > 1) {
        let porcentagem = (medidorCombo / 8) * 100;

        if (porcentagem > 100) porcentagem = 100;

        barra.style.width = porcentagem + "%";
        texto.innerText = medidorCombo + "x";
    } else {
        barra.style.width = "0%";
        texto.innerText = "";
    }
}

