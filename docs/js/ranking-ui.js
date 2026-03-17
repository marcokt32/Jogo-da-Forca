function abrirRanking(){

    document.getElementById("modalRanking").classList.remove("oculto");

    carregarRanking();

}

function fecharRanking(){

    document.getElementById("modalRanking").classList.add("oculto");

}

function carregarRanking(){

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    db.ref("ranking").once("value").then(snapshot =>{

        const dados = snapshot.val() || {};

        let lista = Object.entries(dados);

        lista.sort((a,b)=> b[1].xp - a[1].xp);

        const top10 = lista.slice(0,10);

        const topDiv = document.getElementById("ranking-top10");

        topDiv.innerHTML = "";

        top10.forEach(([id,player],index)=>{

            topDiv.innerHTML += `
                <div class="ranking-linha">
                    <div class="left-ui-info">
                        <span>${index+1}º</span>
                        <img src="${player.avatar}">
                    </div>
                    <span>${player.nome}</span>
                    <span>${player.xp}</span>
                </div>
            `;

        });

        const minhaPosicao = lista.findIndex(([id])=> id === usuario.id);

        if(minhaPosicao !== -1){

            const player = lista[minhaPosicao][1];

            document.getElementById("ranking-meu").innerHTML = `
                <h3># Sua posição</h3>
                <div class="ranking-linha">
                    <span>${minhaPosicao+1}º</span>
                    <img src="${player.avatar}">
                    <span>${player.nome}</span>
                    <span>${player.xp}</span>
                </div>
            `;
        }

    });

}