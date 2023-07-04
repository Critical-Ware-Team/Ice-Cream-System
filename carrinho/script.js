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
                carrinho[i].quantidade = carrinho[i].quantidade-1;
                if(carrinho[i].quantidade == 0){
                    carrinho.splice(i, 1);//remove o produto do array
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));//salava no localstorage
                    location.reload();//regarrega a página para atulizar os produtos exibidos
                }
                else{
                    document.getElementsByClassName("qnt")[i].innerHTML = `${carrinho[i].quantidade}`;
                    document.getElementsByClassName("total")[i].innerHTML = `R$${(carrinho[i].quantidade) * (carrinho[i].valor)}`;
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));//salava no localstorage
                }
            });
            btnPlus[i].addEventListener("click", ()=>{
                carrinho[i].quantidade = carrinho[i].quantidade+1;//aumenta a quantidade
                document.getElementsByClassName("qnt")[i].innerHTML = `${carrinho[i].quantidade}`;//muda a quantidade exibido na tela
                document.getElementsByClassName("total")[i].innerHTML = `R$${(carrinho[i].quantidade) * (carrinho[i].valor)}`;//muda o subtotal do item
                localStorage.setItem("carrinho", JSON.stringify(carrinho));//salava no localstorage
            });
            lixeira[i].addEventListener("click", ()=>{
                carrinho.splice(i, 1);//remove o produto do array
                localStorage.setItem("carrinho", JSON.stringify(carrinho));//salava no localstorage
                location.reload();//regarrega a página para atulizar os produtos exibidos
            });
        }
    }
    console.log(carrinho);
}
function exibirPix() {
    let modalPix = document.getElementById("modal-pix");
    modalPix.classList.add("flexer");
    modalPix.showModal();
  }
  
  function fecharPix() {
    let modalPix = document.getElementById("modal-pix");
    modalPix.classList.remove("flexer");
    modalPix.close();
  }
  
  function exibirCartao() {
    let modalCartao = document.getElementById("modal-cartao");
    modalCartao.showModal();
  }
  
  function fecharCartao() {
    let modalCartao = document.getElementById("modal-cartao");
    modalCartao.close();
  }