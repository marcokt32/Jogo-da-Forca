document.addEventListener('DOMContentLoaded', () => {
    renderizarCategorias();
    atualizarContadores();
    mostrarPontuacao();
});

const categorias = [
    { id: 'portugues', nome: 'Portugues', imagem: 'img/portugues.png' },
    { id: 'matematica', nome: 'Matematica', imagem: 'img/matematica.png' },
    { id: 'historia', nome: 'História', imagem: 'img/historia.png' },
    { id: 'geografia', nome: 'Geografia', imagem: 'img/geografia.png' },
    { id: 'quimica', nome: 'Química', imagem: 'img/quimica.png' },
    { id: 'biologia', nome: 'Biologia', imagem: 'img/biologia.png' },
    { id: 'fisica', nome: 'Física', imagem: 'img/fisica.png' },
    { id: 'cultura', nome: 'Cultura', imagem: 'img/cultura.png' },
    { id: 'cinema', nome: 'Cinema', imagem: 'img/cinema.png' },
    { id: 'musica', nome: 'Musica', imagem: 'img/musica.png' },
    { id: 'games', nome: 'Games', imagem: 'img/games.png' },
    { id: 'esporte', nome: 'Esporte', imagem: 'img/esporte.png' },
    { id: 'literatura', nome: 'Literatura', imagem: 'img/literatura.png' },
    { id: 'politica', nome: 'Politica', imagem: 'img/politica.png' }

];

function atualizarContadores() {
    const totalCategorias = Object.keys(bancoPalavras).length;

    let totalPalavras = 0;
    Object.values(bancoPalavras).forEach(lista => {
        totalPalavras += lista.length;
    });

    document.getElementById("contador-categorias").innerText =
        `${totalCategorias} categorias`;

    document.getElementById("contador-palavras").innerText =
        `${totalPalavras} palavras`;
}

function renderizarCategorias() {
    const container = document.querySelector('.grid-container');
    container.innerHTML = '';

    categorias.forEach(categoria => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.categoria = categoria.id; // 👈 importante

        card.addEventListener('click', () => iniciarJogoCategoria(categoria.id));

        const img = document.createElement('img');
        img.src = categoria.imagem;
        img.classList.add('card-img');

        const titulo = document.createElement('h2');
        titulo.textContent = categoria.nome;

        card.appendChild(img);
        card.appendChild(titulo);
        container.appendChild(card);
    });
}

function mostrarPontuacao() {
    document.querySelector('.display-pontuacao').textContent = "Pontuação: " + pontuacao
}