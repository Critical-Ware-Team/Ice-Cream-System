window.onload = () => {
    document.getElementsByClassName("nav-btn")[0].addEventListener("click", ()=>{
        window.location.href = "../cardapio/";
    });
    document.getElementsByClassName("nav-btn")[1].addEventListener("click", ()=>{
        window.location.href = "../carrinho/";
    });
    fetch("../assets/database/produtos.json")
        .then((res) => res.json())
        .then((jsonProdutos) => {
            const produtosList = document.getElementsByClassName("container-produtos")[0];
            produtosList.innerHTML = '';
            for (let i = 0; i < jsonProdutos.produtos.length; i++) {
                produtosList.innerHTML += `
                <div class="produto" id="${jsonProdutos.produtos[i].codigo}">
                    <img src="${jsonProdutos.produtos[i].urlImg}" alt="${jsonProdutos.produtos[i].nome}">
                    <p>${jsonProdutos.produtos[i].nome}</p>
                </div>`;
            }
            for (let i = 0; i < document.getElementsByClassName("produto").length; i++) {
                document.getElementsByClassName("produto")[i].addEventListener("click", () => {
                    localStorage.setItem("codigo-produto", document.getElementsByClassName("produto")[i].id);
                    window.location.href = "../produto/";
                });
            }
        })
        .catch((err) => console.error(err));
}