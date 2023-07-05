window.onload = () => {
    //navegação entre páginas pelo header
    document.getElementsByClassName("nav-btn")[0].addEventListener("click", ()=>{
        window.location.href = "../cardapio/";
    });
    document.getElementsByClassName("nav-btn")[1].addEventListener("click", ()=>{
        window.location.href = "../carrinho/";
    });
    //solicita acesso ao json dos produtos
    fetch("../assets/database/produtos.json")
        .then((res) => res.json())//traduz o resposta da solicitação para JS
        .then((jsonProdutos) => {//renderiza os cards de produtos dinamicamente
            const produtosList = document.getElementsByClassName("container-produtos")[0];//seleciona o container de produtos
            produtosList.innerHTML = '';//limpa o html
            for (let i = 0; i < jsonProdutos.produtos.length; i++) {//laço para renderizar os produtos na tela
                produtosList.innerHTML += `
                <div class="produto" id="${jsonProdutos.produtos[i].codigo}">
                    <img src="${jsonProdutos.produtos[i].urlImg}" alt="${jsonProdutos.produtos[i].nome}">
                    <p>${jsonProdutos.produtos[i].nome}</p>
                </div>`;
            }
            for (let i = 0; i < document.getElementsByClassName("produto").length; i++) {//adiiona um eventListener em todos os cards de produto
                document.getElementsByClassName("produto")[i].addEventListener("click", () => {//Ao clicar...
                    localStorage.setItem("codigo-produto", document.getElementsByClassName("produto")[i].id);//salva o código do item no localStorage
                    window.location.href = "../produto/";//muda de página
                });
            }
        })
        .catch((err) => console.error(err));
}