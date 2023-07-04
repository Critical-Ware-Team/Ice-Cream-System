window.onload = () => {
    document.getElementsByClassName("nav-btn")[0].addEventListener("click", () => {
        window.location.href = "../cardapio/";
    });
    document.getElementsByClassName("nav-btn")[2].addEventListener("click", () => {
        window.location.href = "../carrinho/";
    });
    let carrinho = [];
    if (localStorage.hasOwnProperty("carrinho")) {
        carrinho = JSON.parse(localStorage.getItem("carrinho"));
    }
    const main = document.getElementById("main");
    const subtotal = document.getElementById("subtotal");
    let soma = 0;
    if(carrinho.length == 0){
        main.innerHTML += `<h2>Carrinho Vazio</h2>`;
    }
    else{
        carrinho.forEach(produto => {
            main.innerHTML += `
                <div class="box">
                    <img src="${produto.urlImg}" class="${produto.nome}">
                    <div class="esquerda">
                        <p>R$${produto.valor} por unidade</p>
                        <h3>${produto.nome}</h3>
                        <div>
                            <button class="btnMinus">-</button>
                            <button class="qnt">${produto.quantidade}</button>
                            <button class="btnPlus">+</button>
                        </div>
                    </div>
                    <img src="assets/images/Frame 149lixeira.png" class="lixeira">
                    <p class="total">R$${(produto.quantidade) * (produto.valor)}</p>
                </div>`;
                soma += (produto.valor) * (produto.quantidade);
                console.log(`soma = ${soma}`);
        });
        const btnPlus = document.getElementsByClassName("btnPlus");
        const btnMinus = document.getElementsByClassName("btnMinus");
        const lixeira = document.getElementsByClassName("lixeira");
        for(let i=0; i<carrinho.length; i++){
            btnMinus[i].addEventListener("click", ()=>{
                carrinho[i].quantidade = parseFloat(carrinho[i].quantidade)-1;
                if(carrinho[i].quantidade == 0){
                    carrinho.splice(i, 1);
                    document.getElementsByClassName("box")[i].remove();
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));
                    location.reload();
                }
                document.getElementsByClassName("qnt")[i].innerHTML = `${carrinho[i].quantidade}`;
            });
            btnPlus[i].addEventListener("click", ()=>{
                carrinho[i].quantidade = parseFloat(carrinho[i].quantidade)+1;
                document.getElementsByClassName("qnt")[i].innerHTML = `${carrinho[i].quantidade}`;
            });
            lixeira[i].addEventListener("click", ()=>{
                carrinho.splice(i, 1);
                document.getElementsByClassName("box")[i].remove();
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                location.reload();
            });
        }
    }
    console.log(carrinho);
}