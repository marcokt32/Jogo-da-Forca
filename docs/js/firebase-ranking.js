window.enviarPontuacaoFirebase = function (xp) {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    const userId = usuario.id;

    const rankingRef = db.ref("ranking/" + userId);

    const dados = {
        nome: usuario.nome,
        avatar: usuario.avatar,
        xp: xp,
        atualizado: Date.now()
    };

    rankingRef.update(dados);

    atualizarLeaderboard(userId, dados);

};

window.sincronizarUsuarioFirebase = function () {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    const userRef = db.ref("ranking/" + usuario.id);

    userRef.update({
        nome: usuario.nome,
        avatar: usuario.avatar,
        atualizado: Date.now()
    });

};

window.carregarUsuarioFirebase = function () {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    const userRef = db.ref("ranking/" + usuario.id);

    userRef.once("value").then(snapshot => {

        const dados = snapshot.val();

        // usuário já existe no banco
        if (dados) {

            usuario.nome = dados.nome || usuario.nome;
            usuario.avatar = dados.avatar || usuario.avatar;

            localStorage.setItem("usuario", JSON.stringify(usuario));

            renderizarUsuario();

        }

        // usuário não existe → cria
        else {

            userRef.set({
                nome: usuario.nome,
                avatar: usuario.avatar,
                xp: 0,
                atualizado: Date.now()
            });

        }

    });

};

function atualizarLeaderboard(userId, dadosUsuario) {

    const leaderboardRef = db.ref("leaderboard");

    leaderboardRef.once("value").then(snapshot => {

        let leaderboard = snapshot.val() || {};

        leaderboard[userId] = dadosUsuario;

        let lista = Object.entries(leaderboard);

        lista.sort((a, b) => b[1].xp - a[1].xp);

        lista = lista.slice(0, 10);

        let novoLeaderboard = {};

        lista.forEach(([id, dados]) => {
            novoLeaderboard[id] = dados;
        });

        leaderboardRef.set(novoLeaderboard);

    });

}