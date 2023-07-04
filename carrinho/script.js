window.onload = () => {
    //naveção entre páginas pelo header
    document.getElementsByClassName("nav-btn")[0].addEventListener("click", () => {
        window.location.href = "../cardapio/";
    });
    document.getElementsByClassName("nav-btn")[1].addEventListener("click", () => {
        window.location.href = "../carrinho/";
    });
    let carrinho = [];
    if (localStorage.hasOwnProperty("carrinho")) {//ve se tem produto no localStorage
        carrinho = JSON.parse(localStorage.getItem("carrinho"));//se tiver, pega ele, converte de string pra objeto e joga no vetor carrinho
    }
    const main = document.getElementById("main");
    const subtotal = document.getElementById("subtotal");
    let soma = 0;
    if(carrinho.length == 0){//se o carrinho tá vazio, fala que tá vazio
        main.innerHTML += `<h2>Carrinho Vazio</h2>`;
    }
    else{
        carrinho.forEach(produto => {//laço para colocar todos os produtos do carrinho na tela
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
        const textoSubtotal = document.getElementById("texto_subtotal");
        textoSubtotal.innerHTML = `<p>R$ ${soma}</p>`;//exibe subtotal
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
                    soma -= carrinho[i].valor;//diminui subtotal final
                    textoSubtotal.innerHTML = `<p>R$ ${soma}</p>`;//atualiza subtotal final
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));//salava no localstorage
                }
            });
            btnPlus[i].addEventListener("click", ()=>{
                carrinho[i].quantidade = carrinho[i].quantidade+1;//aumenta a quantidade
                document.getElementsByClassName("qnt")[i].innerHTML = `${carrinho[i].quantidade}`;//muda a quantidade exibido na tela
                document.getElementsByClassName("total")[i].innerHTML = `R$${(carrinho[i].quantidade) * (carrinho[i].valor)}`;//muda o subtotal do item
                soma += carrinho[i].valor;//diminui subtotal final
                textoSubtotal.innerHTML = `<p>R$ ${soma}</p>`;//atualiza subtotal final
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
    let modalPix = document.getElementById("modal-pix");//pega o modal
    modalPix.classList.add("flexer");//deixa o modal flex
    modalPix.showModal();//abre o modal
}

function fecharPix() {
    let modalPix = document.getElementById("modal-pix");//pega o modal
    modalPix.classList.remove("flexer");//tira flex do modal
    modalPix.close();//fecha o modal
}

function exibirCartao() {
    let modalCartao = document.getElementById("modal-cartao");//pega modal
    modalCartao.showModal();//abre modal
}

function fecharCartao() {
    let modalCartao = document.getElementById("modal-cartao");//pega modal
    modalCartao.close();//fecha modal
}
function concluirPedido (){
    localStorage.removeItem("carrinho");//limpa carrinho do localStorage
    window.location.href = "../confirmapedido";
}