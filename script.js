function alternarEstado() {
  var interruptor = document.querySelector(".interruptor")
  var bolinha = document.getElementById("bolinha")
  var estadoInput = document.getElementById("estado")

  if (interruptor.classList.contains("ativo")) {
    interruptor.classList.remove("ativo")
    estadoInput.value = "0"
  } else {
    interruptor.classList.add("ativo")
    estadoInput.value = "1"
  }
}
