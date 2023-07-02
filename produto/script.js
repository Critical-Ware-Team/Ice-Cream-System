window.onload = () => {
    const produtoSelecionado = localStorage.getItem("codigo-produto");
    fetch("../assets/database/produtos.json")
        .then((res) => res.json())
        .then((jsonProdutos) => {
            for (let i = 0; i < jsonProdutos.produtos.length; i++) {
                if (jsonProdutos.produtos[i].codigo == produtoSelecionado) {
                    document.querySelector("head>title").innerHTML = `${jsonProdutos.produtos[i].nome}`;
                    const descricao = document.getElementsByClassName("descricao")[0];
                    const ingredientes = document.getElementsByClassName("ingredientes")[0];
                    const nutricional = document.getElementsByClassName("nutricional")[0];
                    descricao.innerHTML = `
                        <img src="${jsonProdutos.produtos[i].urlImg}" alt="${jsonProdutos.produtos[i].nome}">
                        <div class="texts">
                            <h1>${jsonProdutos.produtos[i].nome}</h1>
                            <p>${jsonProdutos.produtos[i].descricao}</p>
                            <p>R$ ${jsonProdutos.produtos[i].valor}</p>
                        </div>`;
                    ingredientes.innerHTML = `
                        <h2>Ingredientes</h2>
                        <p></p>`;
                    let ingredientesString = "";
                    for(let j=0; j<jsonProdutos.produtos[i].ingredientes.length; j++){
                        if(j==0){
                            let ingrediente = jsonProdutos.produtos[i].ingredientes[j];
                            let capitalized = ingrediente.charAt(0).toUpperCase() + ingrediente.slice(1);
                            ingredientesString += `${capitalized}, `;
                        }
                        else if(j==(jsonProdutos.produtos[i].ingredientes.length)-1){
                            ingredientesString = ingredientesString.slice(0, -2);
                            ingredientesString += ` e ${jsonProdutos.produtos[i].ingredientes[j]}.`;
                        }
                        else{
                            ingredientesString += `${jsonProdutos.produtos[i].ingredientes[j]}, `;
                        }
                    }
                    document.querySelector(".ingredientes>p").innerHTML = `${ingredientesString}`;
                    break;
                }
            }
        })
        .catch((err) => console.error(err));
}