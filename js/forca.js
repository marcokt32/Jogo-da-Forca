//Seletores

//let palavras = ["ALURA", "ORACLE", "HTML", "LOGICA"];
let fruta = ["BANANA","MACA","TANGERINA","ABACATE","LARANJA","MELANCIA","UVA","LIMAO","GOIABA","MARACUJA"];
let animal = ["CACHORRO","GATO","PAPAGAIO","VACA","TARTARUGA","COIOTE","JACARE","GRALHA","ALBATROZ","COBRA","LEOPARDO"];
let cor = ["VERMELHO","VERDE","AMARELO","AZUL","ROSA","LARANJA","PRETO","BRANCO","ROXO","LILAS","CINZA","VIOLETA","MARSALA"];
let profissao = ["PROGRAMADOR","MEDICO","ENGENHEIRO","ESTETICISTA","PROFESSOR","ADVOGADO","PAPILOSCOPISTA","MOTORISTA"];
let instrumentoMusical = ["VIOLINO","VIOLAO","GAITA","TAMBOR","TAMBORIM","TECLADO","BATERIA","FLAUTA","TROMBONE","TROMPETE"];
let elementoQuimico = ["ALUMINIO","ANTIMONIO","ARSENIO","BARIO","BORO","BISMUTO","CALCIO","CARBONO","CESIO","DISPROSIO","ENXOFRE","FERRO","GALIO","HIDROGEIO","IODO","LITIO","MAGNESIO","OURO","PRATA","ZINCO"];
let canvas = document.getElementById("forca");
let tabuleiro = canvas.getContext('2d');
let letras = [];
let erros = 0;
let acertos = 0;
let fim = false;
let mostraDicaDaPalavra = "";
let codLetra = ""


function iniciarJogo() {
    document.querySelector(".area-canvas").style.display = "inherit";
    document.querySelector(".menu-inicial").style.display = "none";
    document.getElementById("botao-desistir").style.display = "initial";
    canvas.style.display = "inline-block";
    sorteiaDica();
    sorteiaPalavra();
    desenharCanvas();
    desenharLinhas();

    if(fim === false) {
        document.onkeydown = (e) => {
            let letra = e.key.toUpperCase();
            let codLetra = e.key.charCodeAt();
            console.log(codLetra)
            
            if((verificarLetra(codLetra) === true) && (palavraSecreta.includes(letra))) {
                if((letras.includes(letra) === false)) {
                    for(let i = 0; i < palavraSecreta.length; i++) {
                        if(palavraSecreta[i] === letra) {
                            adicionarAcerto();
                            escreverLetraCorreta(i);
                        }
                    }
                    letras.push(letra);
                }
            }else{
                if((verificarLetra(codLetra) === true) && (palavraSecreta.includes(letra) === false)) {
                    if((letras.includes(letra) === false)) {
                        adicionarErro();
                        escreverLetrasIncorretas(letra, erros);
                        complementarForca(erros);
                        letras.push(letra);
                        
                    }
            
                }
            }
        }
    }

}

function IniciarJogoPersonalizado() {
    document.querySelector(".area-canvas").style.display = "inherit";
    document.querySelector(".menu-inicial").style.display = "none";
    document.getElementById("botao-desistir").style.display = "initial";
    document.querySelector(".campo-nova-palavra").style.display = "none";
    canvas.style.display = "inline-block";
    palavraSecreta = document.getElementById('palavra').value.toUpperCase();
    let dica = document.getElementById('dica').value.toUpperCase();
    document.querySelector(".dica-palavra").innerText = "Dica da Palvra:  " + dica;
    desenharCanvas();
    desenharLinhas();

    if(fim === false) {
        document.onkeydown = (e) => {
            let letra = e.key.toUpperCase();
            let codLetra = e.key.charCodeAt();
            console.log(codLetra)
            
            if((verificarLetra(codLetra) === true) && (palavraSecreta.includes(letra))) {
                if((letras.includes(letra) === false)) {
                    for(let i = 0; i < palavraSecreta.length; i++) {
                        if(palavraSecreta[i] === letra) {
                            adicionarAcerto();
                            escreverLetraCorreta(i);
                        }
                    }
                    letras.push(letra);
                }
            }else{
                if((verificarLetra(codLetra) === true) && (palavraSecreta.includes(letra) === false)) {
                    if((letras.includes(letra) === false)) {
                        adicionarErro();
                        escreverLetrasIncorretas(letra, erros);
                        complementarForca(erros);
                        letras.push(letra);
                        
                    }
            
                }
            }
        }
    }
}

function sorteiaDica() {
    let dicas = [fruta,animal,cor,profissao,instrumentoMusical,elementoQuimico];
    let nomeDicas = ["FRUTA","ANIMAL","COR","PROFISSÃO","INSTRUMENTO MUSICAL","ELEMENTO QUÍMICO"];
    let rng = Math.floor(Math.random() * dicas.length);
    let dica = dicas[rng];
    dicaDaPalavra = dica;
    document.querySelector(".dica-palavra").innerText = "Dica da Palvra:  " + nomeDicas[rng];
}

function sorteiaPalavra() {
    let palavra = dicaDaPalavra[Math.floor(Math.random() * dicaDaPalavra.length)];
    palavraSecreta = palavra;
}

function verificarLetra(key) {
    let estado = false;
    if(((key >= 97) && (key <= 122))) {
        estado = true;
        return estado;

    } else {
        return estado;
    }

}

function adicionarErro() {
    if(fim === false){
        erros++;
    }
}

function adicionarAcerto() {
    if(fim === false){
        acertos++;
    }
}

function recarregar() {
    return location.reload();
}

function adicionarPalavra() {
    document.querySelector(".campo-nova-palavra").style.display = "initial";
}

function voltar() {
    document.querySelector(".campo-nova-palavra").style.display = "none";
}