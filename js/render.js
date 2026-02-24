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

function renderizarCategorias(modo) {
    modoAtual = modo;
    configurarInterfacePorModo();

    const container = document.querySelector('.grid-container');
    container.innerHTML = '';

    // Renderiza UM ÚNICO card Modo Misto
    const cardMisto = document.createElement('div');
    cardMisto.classList.add('card', 'card-misto');
    cardMisto.innerHTML = `<h2>🔥 Modo Misto</h2>`;

    document.getElementById('fechar-misto')
        .addEventListener('click', () => {
            document.getElementById('modal-misto')
                .classList.add('oculto');
        });
    document.getElementById('check-todas')
        .addEventListener('change', function () {

            const checkboxes = document
                .querySelectorAll('#lista-categorias-misto input');

            checkboxes.forEach(cb => {
                cb.checked = this.checked;
            });

        });
    document.getElementById('iniciar-misto')
        .addEventListener('click', () => {

            const selecionadas = [
                ...document.querySelectorAll(
                    '#lista-categorias-misto input:checked'
                )
            ].map(cb => cb.value);

            if (selecionadas.length === 0) {
                alert("Selecione pelo menos uma categoria.");
                return;
            }

            document.getElementById('modal-misto')
                .classList.add('oculto');
            iniciarModoMisto(selecionadas)
            //sortearPalavraModoMisto(selecionadas);
        });
    cardMisto.addEventListener('click', abrirModalMisto);

    container.appendChild(cardMisto);

    // Renderiza categorias normais
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

        card.addEventListener('click', () =>
            iniciarJogoCategoria(categoria.id)
        );

        // 🔹 Botão limpar
        const botaoLimpar = document.createElement('button');
        botaoLimpar.textContent = "🗑";
        botaoLimpar.classList.add('btn-limpar');

        botaoLimpar.addEventListener('click', (e) => {
            e.stopPropagation();

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

        card.appendChild(img);
        card.appendChild(titulo);
        card.appendChild(info);
        card.appendChild(botaoLimpar);

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