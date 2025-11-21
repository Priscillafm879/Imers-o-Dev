const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("#campo-busca");
const botaoBusca = document.querySelector("#botao-busca");
let dados = [];

async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        if (!resposta.ok) {
            throw new Error('Não foi possível carregar os dados.');
        }
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
        cardContainer.innerHTML = "<p>Ocorreu um erro ao carregar as informações. Tente novamente mais tarde.</p>";
    }
}
    
function renderizarCards(items) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar novos cards
    if (items.length === 0) {
        cardContainer.innerHTML = "<p>Nenhuma linguagem encontrada.</p>";
        return;
    }

    for (const item of items) {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${item.nome}</h2>
            <p>${item.data_criacao}</p>
            <p>${item.Descrição}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

function realizarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const resultados = dados.filter(item => item.nome.toLowerCase().includes(termoBusca));
    renderizarCards(resultados);
}

botaoBusca.addEventListener('click', realizarBusca);
campoBusca.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        realizarBusca();
    }
});

carregarDados(); // Carrega os dados iniciais quando a página é aberta