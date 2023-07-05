window.onload = () =>{
    //naveção entre páginas pelo header
    document.getElementsByClassName("nav-btn")[0].addEventListener("click", () => {
        window.location.href = "../cardapio/";
    });
    document.getElementsByClassName("nav-btn")[1].addEventListener("click", () => {
        window.location.href = "../carrinho/";
    });
    //naveação a partir do botão
    document.querySelector(".container-pedido-processado>button").addEventListener("click", () => {
        window.location.href = "../cardapio/";
    });
}