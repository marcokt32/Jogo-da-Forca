function desenharLinhas() {
    
    for(let i = 0; i < palavraSecreta.length; i++) {
        document.getElementById("forca").innerHTML += "<p class='letra' id='"+i+"'></p>";
    }

}

function escreverLetraCorreta(index, letra) {

    if(fim === false) {
        if(acertos < palavraSecreta.length) {
            document.getElementById(index).innerText = letra;
        }else{
            document.getElementById(index).innerText = letra;
            document.querySelector(".pop-up-ganhou").style.display = "flex";
            let img = document.querySelector('.desenho-forca')
            img.setAttribute('src', "ganhou.png");
            fim = true;
        }
    }
}

function escreverLetrasIncorretas(letra, erros) {

    if(fim === false) {
        if(erros >= 6) {
            fim = true;
            document.querySelector(".pop-up-perdeu").style.display = "flex";
        }
    }
}

function complementarForca(erros) {
    let img = document.querySelector('.desenho-forca');
    let forcas = ['forca.png','forca1.png','forca2.png','forca3.png','forca4.png','forca5.png','forca6.png'];

    img.setAttribute('src', forcas[erros]);
}