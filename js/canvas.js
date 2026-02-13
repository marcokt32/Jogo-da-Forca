function desenharLinhas() {
    const forca = document.getElementById("forca");
    forca.innerHTML = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === " ") {
            forca.innerHTML += `<p class="letra espaco"></p>`;
        } else {
            forca.innerHTML += `<p class="letra" id="letra-${i}"></p>`;
        }
    }
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

    if (medidorCombo > 1) {
        let porcentagem = (medidorCombo / 8) * 100;
        barra.style.width = porcentagem + "%";
    } else {
        barra.style.width = 0 + "%";
    }
}

