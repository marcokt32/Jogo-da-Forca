function desenharCanvas() {
    tabuleiro.fillStyle = 'lightblue';

    tabuleiro.fillRect(0,0,2000,150);
}

function desenharLinhas() {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = 'round';
    tabuleiro.lineJoin = 'round';
    tabuleiro.fillStyle = 'blue';
    tabuleiro.strokeStyle = 'blue';

    let largura = 1600/palavraSecreta.length;

    tabuleiro.beginPath();
    
    for(let i = 0; i < palavraSecreta.length; i++) {
        tabuleiro.moveTo(250+(largura*i),70);
        tabuleiro.lineTo(350+(largura*i),70);
    }

    tabuleiro.stroke();
    tabuleiro.closePath();
}

function escreverLetraCorreta(index) {
    tabuleiro.font = 'bold 80px Inter';
    tabuleiro.lineCap = 'round';
    tabuleiro.fillStyle = 'blue';
    tabuleiro.lineWidth = 6;
    let largura = 1600/palavraSecreta.length;

    if(fim === false) {
        if(acertos < palavraSecreta.length) {
            tabuleiro.fillText(palavraSecreta[index], 260+(largura*index), 65)
        }else{
            tabuleiro.fillText(palavraSecreta[index], 260+(largura*index), 65)
            document.querySelector(".pop-up-ganhou").style.display = "flex";
            document.querySelector(".tutorial").style.display = "none";
            let img = document.querySelector('.desenho-forca')
            img.setAttribute('src', "ganhou.png");
            fim = true;
        }
    }
}

function escreverLetrasIncorretas(letra, erros) {
    tabuleiro.font = 'bold 50px Inter';
    tabuleiro.lineCap = 'round';
    tabuleiro.fillStyle = 'blue';
    tabuleiro.lineWidth = 6;

    if(fim === false) {
        if(erros < 6) {
            tabuleiro.fillText(letra, 600 + (40 * erros), 130, 40)
        }else{
            tabuleiro.fillText(letra, 600 + (40 * erros), 130, 40)
            document.querySelector(".pop-up-perdeu").style.display = "flex";
            document.querySelector(".tutorial").style.display = "none";
            fim = true;
        }
    }
}

function complementarForca(erros) {
    let img = document.querySelector('.desenho-forca');
    let forcas = ['forca.png','forca1.png','forca2.png','forca3.png','forca4.png','forca5.png','forca6.png'];

    img.setAttribute('src', forcas[erros]);
}