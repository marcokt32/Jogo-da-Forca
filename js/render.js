document.addEventListener('DOMContentLoaded', () => {
    renderizarCategorias();
    atualizarContadores();
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
    { id: 'politica', nome: 'Politica', imagem: 'img/politica.png' },
    { id: 'tratamento', nome: 'Tratamento de água', imagem: 'img/tratamento.png' },
    { id: 'biblia', nome: 'Bíblia', imagem: 'img/biblia.png' }

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
        const dados = obterDadosCategoria(categoria.id);
        const info = document.createElement('div');
        info.classList.add('card-info');
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.categoria = categoria.id;

        info.innerHTML = `
    <p>🥇<br> ${dados.hiscore}</p>
    <p>📚<br> ${dados.descobertas}/${dados.totalPalavras}</p>
`;


        card.addEventListener('click', () => iniciarJogoCategoria(categoria.id));

        // 🔹 Botão limpar
        const botaoLimpar = document.createElement('button');
        botaoLimpar.textContent = "🗑";
        botaoLimpar.classList.add('btn-limpar');

        botaoLimpar.addEventListener('click', (e) => {
            e.stopPropagation(); // 🚨 impede abrir o jogo

            const confirmar = confirm(
                `Deseja limpar as palavras respondidas da categoria "${categoria.nome}"?`
            );

            if (confirmar) {
                limparCategoria(categoria.id);
                alert("Categoria limpa com sucesso!");
            }
        });

        const img = document.createElement('img');
        img.src = categoria.imagem;
        img.classList.add('card-img');

        const titulo = document.createElement('h2');
        titulo.textContent = categoria.nome;

        card.appendChild(botaoLimpar); // 👈 primeiro elemento (fica sobreposto)
        card.appendChild(img);
        card.appendChild(titulo);
        card.appendChild(info);

        container.appendChild(card);
    });
}

function obterDadosCategoria(categoriaId) {
    const totalPalavras = bancoPalavras[categoriaId]?.length || 0;
    const descobertas = palavrasRespondidas[categoriaId]?.length || 0;

    const pontos = pontuacoes[categoriaId]?.pontos || 0;
    const hiscore = pontuacoes[categoriaId]?.hiscore || 0;

    return {
        totalPalavras,
        descobertas,
        pontos,
        hiscore
    };
}