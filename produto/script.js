window.onload = () => {
    document.getElementsByClassName("nav-btn")[0].addEventListener("click", ()=>{
        window.location.href = "../cardapio/";
    });
    document.getElementsByClassName("nav-btn")[1].addEventListener("click", ()=>{
        window.location.href = "../carrinho/";
    });
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
                    const similares = document.getElementsByClassName("simil-cards-row")[0];
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
                        document.querySelector(".ingredientes>p").innerHTML = `${ingredientesString}`;
                    }
                    nutricional.innerHTML = `
                        <h2>Informações Nutricionais</h2>
                        <div class="nutri-cards-row">
                            <div class="nutri-card">
                                <h3>energia</h3>
                                <p>${jsonProdutos.produtos[i].nutricional.valor_energetico}kcal</p>
                                <div class="nutri-value">
                                    <p>${(jsonProdutos.produtos[i].nutricional.valor_energetico/2000*100).toFixed(1)}%</p>
                                </div>
                            </div>
                            <div class="nutri-card">
                                <h3>gorduras</h3>
                                <p>${jsonProdutos.produtos[i].nutricional.gorduras_totais}g</p>
                                <div class="nutri-value">
                                    <p>${(jsonProdutos.produtos[i].nutricional.gorduras_totais/55*100).toFixed(1)}%</p>
                                </div>
                            </div>
                            <div class="nutri-card">
                                <h3>sal</h3>
                                <p>${jsonProdutos.produtos[i].nutricional.sodio}mg</p>
                                <div class="nutri-value">
                                    <p>${(jsonProdutos.produtos[i].nutricional.sodio/2400*100).toFixed(1)}%</p>
                                </div>
                            </div>
                            <div class="nutri-card">
                                <h3>carboidratos</h3>
                                <p>${jsonProdutos.produtos[i].nutricional.carboidratos}g</p>
                                <div class="nutri-value">
                                    <p>${(jsonProdutos.produtos[i].nutricional.carboidratos/300*100).toFixed(1)}%</p>
                                </div>
                            </div>
                            <div class="nutri-card">
                                <h3>proteínas</h3>
                                <p>${jsonProdutos.produtos[i].nutricional.proteinas}g</p>
                                <div class="nutri-value">
                                    <p>${(jsonProdutos.produtos[i].nutricional.proteinas/75*100).toFixed(1)}%</p>
                                </div>
                            </div>`;
                    let similaresArray = jsonProdutos.produtos.filter(function(produto) {
                        return produto.categorias.some(function(categoria){
                            return jsonProdutos.produtos[i].categorias.includes(categoria);
                        });
                    });
                    let nRandom = [];
                    if(similaresArray.length<5){
                        for(let j=0; j<(5-similaresArray.length); j++){
                            let control;
                            do
                            {
                                control=0;
                                nRandom[j] = Math.ceil(Math.random() * (jsonProdutos.produtos.length-1));
                                for(let k=0; k<(5-similaresArray.length); k++){
                                    if(nRandom[j]==nRandom[k] && k!=j){
                                        control=1;
                                    }
                                }
                            }while(control == 1);
                        }
                        similares.innerHTML='';
                        for(let j=0; j<similaresArray.length; j++){
                            similares.innerHTML += `
                                <div class="simil-card" id="${similaresArray[j].codigo}">
                                    <img src="${similaresArray[j].urlImg}" alt="${similaresArray[j].nome}">
                                    <p>${similaresArray[j].nome}</p>
                                </div>`;
                        }
                        for(let j=0; j<nRandom.length; j++){
                            similares.innerHTML += `
                                <div class="simil-card" id="${jsonProdutos.produtos[nRandom[j]].codigo}">
                                    <img src="${jsonProdutos.produtos[nRandom[j]].urlImg}" alt="${jsonProdutos.produtos[nRandom[j]].nome}">
                                    <p>${jsonProdutos.produtos[nRandom[j]].nome}</p>
                                </div>`;
                        }
                    }
                    else{
                        for(let j=0; j<5; j++){
                            let control;
                            do
                            {
                                control=0;
                                nRandom[j] = Math.ceil(Math.random() * (similaresArray.length-1));
                                for(let k=0; k<5; k++){
                                    if(nRandom[j]==nRandom[k] && k!=j){
                                        control=1;
                                    }
                                }
                            }while(control == 1);
                        }
                        similares.innerHTML='';
                        for(let j=0; j<5; j++){
                            similares.innerHTML += `
                                <div class="simil-card" id="${similaresArray[nRandom[j]].codigo}">
                                    <img src="${similaresArray[nRandom[j]].urlImg}" alt="${similaresArray[nRandom[j]].nome}">
                                    <p>${similaresArray[nRandom[j]].nome}</p>
                                </div>`;
                        }
                    }
                    for(let j=0; j<document.getElementsByClassName("simil-card").length; j++){
                        document.getElementsByClassName("simil-card")[j].addEventListener("click", ()=>{
                            localStorage.setItem("codigo-produto", document.getElementsByClassName("simil-card")[j].id);
                            window.location.href = "../produto/";
                        });
                    }
                    let carrinho = [];
                    if(localStorage.hasOwnProperty("carrinho")){
                        carrinho = JSON.parse(localStorage.getItem("carrinho"));
                    }
                    const buyBtn = document.getElementsByClassName("cor")[0];
                    buyBtn.addEventListener("click", ()=>{
                        let pCarrinho = carrinho.find(pCarrinho => pCarrinho.nome === jsonProdutos.produtos[i].nome);
                        if(pCarrinho){
                            pCarrinho.quantidade = pCarrinho.quantidade + parseFloat(document.getElementById("quantidade").value);
                            localStorage.setItem("carrinho", JSON.stringify(carrinho));
                        }
                        else{
                            carrinho.push(jsonProdutos.produtos[i]);
                            carrinho[carrinho.length-1].quantidade = parseFloat(document.getElementById("quantidade").value);
                            localStorage.setItem("carrinho", JSON.stringify(carrinho));
                        }
                    });
                    console.log(carrinho);
                    break;
                }
            }
        })
        .catch((err) => console.error(err));
}