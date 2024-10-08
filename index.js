const key = "22756c456f82548c21632c85e3808f8b";
const botao = document.querySelector(".botao-buscar");
botao.addEventListener("click", cliqueNoBotao);
const inputCidade = document.querySelector(".input-city");

inputCidade.addEventListener("keypress", (evento) => {
  if (evento.key === "Enter") {
    cliqueNoBotao();
  }
});

function cliqueNoBotao() {
  const cidade = document.querySelector(".input-city").value.trim();
  if (cidade === "" || !isNaN(cidade)) {
    alert("Por favor, digite o nome de uma cidade!");
    return;
  }
  buscarCidadeNoServidor(cidade);
}

//!FUNÇÃO ASSINCRONA
async function buscarCidadeNoServidor(cidade) {
  try {
    const dadosDoServidor = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br`
    ).then((resposta) => resposta.json());

    if (dadosDoServidor.cod === "404") {
      alert("Cidade não encontrada");
      return;
    }
    function colocarDadosNatela(dadosDoServidor) {
      document.querySelector(".city").innerHTML =
        "Tempo em " + dadosDoServidor.name;
      document.querySelector(".temp").innerHTML =
        (dadosDoServidor.main.temp - 273.15).toFixed(2) + " °C";
      document.querySelector(".texto-previsao").innerHTML =
        dadosDoServidor.weather[0].description;
      document.querySelector(".texto-umidade").innerHTML =
        "Umidade " + dadosDoServidor.main.humidity + "%";

      document.querySelector(
        ".img-previsao"
      ).src = `https://openweathermap.org/img/wn/${dadosDoServidor.weather[0].icon}.png`;
    }
    colocarDadosNatela(dadosDoServidor);
  } catch (erro) {
    console.log("erro", erro);
  }
}
