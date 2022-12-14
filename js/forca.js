//Seletores

//let palavras = ["ALURA", "ORACLE", "HTML", "LOGICA"];
let fruta = ["BANANA","MACA","TANGERINA","ABACATE","LARANJA","MELANCIA","UVA","LIMAO","GOIABA","MARACUJA","ABACAXI","GRAVIOLA","CARAMBOLA","PITAYA","MAMAO","MELAO","MORANGO","JACA","JAMELAO","JABUTICABA"];
let animal = ["CACHORRO","GATO","PAPAGAIO","VACA","TARTARUGA","COIOTE","JACARE","GRALHA","ALBATROZ","COBRA","LEOPARDO","CAMELO","BALEIA","GOLFINHO","AGUIA","MORCEGO","GIRAFA","ORNITORRINCO","POLVO","HARPIA"];
let cor = ["VERMELHO","VERDE","AMARELO","AZUL","ROSA","LARANJA","PRETO","BRANCO","ROXO","LILAS","CINZA","VIOLETA","MARSALA","CIANO","MAGENTA","BEGE","INDIGO","GRENA"];
let profissao = ["PROGRAMADOR","MEDICO","ENGENHEIRO","ESTETICISTA","PROFESSOR","ADVOGADO","PAPILOSCOPISTA","MOTORISTA","GARÇOM","PILOTO","MANOBRISTA","GARI","CONTADOR","PIZZAIOLO","BARISTA","GENETICISTA"];
let instrumentoMusical = ["VIOLINO","VIOLAO","GAITA","TAMBOR","TAMBORIM","TECLADO","BATERIA","FLAUTA","TROMBONE","TROMPETE","FLAUTIM","XILOFONE","SAXOFONE","GUITARRA","BAIXO","VIOLONCELO","TRIANGULO","CAVAQUINHO"];
let elementoQuimico = ["ALUMINIO","ANTIMONIO","ARSENIO","BARIO","BORO","BISMUTO","CALCIO","CARBONO","CESIO","DISPROSIO","ENXOFRE","FERRO","GALIO","HIDROGENIO","IODO","LITIO","MAGNESIO","OURO","PRATA","ZINCO"];
let pais = ["BRASIL","CHILE","VENEZUELA","EGITO","JAPAO","CHINA","INDIA","CANADA","FRANCA","ITALIA","ALEMANHA","INGLATERRA","MEXICO","AUSTRALIA","JAMAICA","ANGOLA","RUSSIA","IRA","ISRAEL","PAQUISTAO","MONACO"];
let corpoHumano = ["BRACO","PERNA","CABECA","TORAX","ORELHA","OLHO","CABELO","CORACAO","INTESTINO","FIGADO","BOCA","NARIZ","ESTOMAGO","RIM","PULMAO","CEREBRO","OSSO","DENTE","LINGUA","UNHA","OUVIDO","JOELHO"];
let letras = [];
let erros = 0;
let acertos = 0;
let fim = false;
let mostraDicaDaPalavra = "";


function iniciarJogo() {
    adicionaTecladoVirtual();
    document.querySelector(".tutorial").style.display = "none";
    document.querySelector(".area-canvas").style.display = "flex";
    document.querySelector(".menu-inicial").style.display = "none";
    document.getElementById("botao-desistir").style.display = "initial";
    document.getElementById("forca").style.display = "flex";
    sorteiaDica();
    sorteiaPalavra();
    desenharLinhas();

    if(fim === false) {
        document.onkeydown = (e) => {
            let letra = e.key.toUpperCase();
            let codLetra = e.key.charCodeAt();
            validarJogada(letra, codLetra);
        }
    }

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

    if(fim === false) {
        document.onkeydown = (e) => {
            let letra = e.key.toUpperCase();
            let codLetra = e.key.charCodeAt();
            validarJogada(letra, codLetra);
        }
    }
}

function sorteiaDica() {
    let dicas = [fruta,animal,cor,profissao,instrumentoMusical,elementoQuimico,pais,corpoHumano];
    let nomeDicas = ["FRUTA","ANIMAL","COR","PROFISSÃO","INSTRUMENTO MUSICAL","ELEMENTO QUÍMICO","PAÍS","CORPO HUMANO"];
    let rng = Math.floor(Math.random() * dicas.length);
    let dica = dicas[rng];
    dicaDaPalavra = dica;
    document.querySelector(".dica-palavra").innerText = "Dica da Palvra:  " + nomeDicas[rng];
}

function sorteiaPalavra() {
    let palavra = dicaDaPalavra[Math.floor(Math.random() * dicaDaPalavra.length)];
    palavraSecreta = palavra;
}

function verificarLetra(codkey) {
    let estado = false
    if(((codkey >= 97) && (codkey <= 122))) {
        estado = true;
        return estado;

    }else{ 
        return estado
    }
}

function verificarLetraTecladoVirtual(key) {

    if(fim === false) {
        let letra = key.toLowerCase();
        let codLetra = letra.charCodeAt();

        validarJogada(key,codLetra);
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
    document.querySelector(".campo-nova-palavra").style.display = "flex";
    document.querySelector(".principal").style.display = "none";
}

function voltar() {
    document.querySelector(".campo-nova-palavra").style.display = "none";
    document.querySelector(".principal").style.display = "flex";
}

function adicionaTecladoVirtual() {
    let fileira1 = ["Q","W","E","R","T","Y","U","I","O","P"];
    let fileira2 = ["A","S","D","F","G","H","J","K","L"];
    let fileira3 = ["Z","X","C","V","B","N","M"];

    document.querySelector(".teclado-virtual").style.display = "grid";

    for(i = 0;i < fileira1.length;i++) {
        document.getElementById("fileira1").innerHTML += "<button class='tecla' id='" + fileira1[i] + "' value='" + fileira1[i] + "' onclick='verificarLetraTecladoVirtual(value)'>" + fileira1[i] + "</button>";
    }

    for(i = 0;i < fileira2.length;i++) {
        document.getElementById('fileira2').innerHTML += "<button class='tecla' id='" + fileira2[i] + "' value='" + fileira2[i] + "' onclick='verificarLetraTecladoVirtual(value)'>" + fileira2[i] + "</button>";
    }

    for(i = 0;i < fileira3.length;i++) {
        document.getElementById('fileira3').innerHTML += "<button class='tecla' id='" + fileira3[i] + "' value='" + fileira3[i] + "' onclick='verificarLetraTecladoVirtual(value)'>" + fileira3[i] + "</button>";
    }

}

function validarJogada(letra, codletra) {
    
    if(fim === false) {
        if(verificarLetra(codletra) === true) {
            if((palavraSecreta.includes(letra)) && (letras.includes(letra) === false)) {
                for(let i = 0; i < palavraSecreta.length; i++) {
                    if(palavraSecreta[i] === letra) {
                        adicionarAcerto();
                        escreverLetraCorreta(i, letra);
                        letras.push(letra)
                        document.getElementById(letra).style.backgroundColor = "green";
                    }
                }
            }else{
                if((palavraSecreta.includes(letra) === false) && (letras.includes(letra) === false)) {
                    adicionarErro();
                    escreverLetrasIncorretas(letra, erros);
                    complementarForca(erros);
                    letras.push(letra);
                    document.getElementById(letra).style.backgroundColor = "red";
                }

            }
        }
    }

}