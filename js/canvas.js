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

    let largura = 600/palavraSecreta.length;

    tabuleiro.beginPath();
    
    for(let i = 0; i < palavraSecreta.length; i++) {
        tabuleiro.moveTo(310+(largura*i),70);
        tabuleiro.lineTo(340+(largura*i),70);
    }

    tabuleiro.stroke();
    tabuleiro.closePath();
}

function escreverLetraCorreta(index) {
    tabuleiro.font = 'bold 40px Inter';
    tabuleiro.lineCap = 'round';
    tabuleiro.fillStyle = 'blue';
    tabuleiro.lineWidth = 6;
    let largura = 600/palavraSecreta.length;

    if(fim === false) {
        if(acertos < palavraSecreta.length) {
            tabuleiro.fillText(palavraSecreta[index], 310+(largura*index), 50)
        }else{
            tabuleiro.fillText(palavraSecreta[index], 310+(largura*index), 50)
            document.querySelector(".pop-up-ganhou").style.display = "block";
            document.querySelector(".tutorial").style.display = "none";
            let img = document.querySelector('.desenho-forca')
            img.setAttribute('src', "ganhou.png");
            fim = true;
        }
    }
}

function escreverLetrasIncorretas(letra, erros) {
    tabuleiro.font = 'bold 40px Inter';
    tabuleiro.lineCap = 'round';
    tabuleiro.fillStyle = 'blue';
    tabuleiro.lineWidth = 6;

    if(fim === false) {
        if(erros < 6) {
            tabuleiro.fillText(letra, 400 + (40 * erros), 130, 40)
        }else{
            tabuleiro.fillText(letra, 400 + (40 * erros), 130, 40)
            document.querySelector(".pop-up-perdeu").style.display = "block";
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