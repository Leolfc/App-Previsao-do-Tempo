const key = "22756c456f82548c21632c85e3808f8b";
const botao = document.querySelector(".botao-buscar");
botao.addEventListener("click", cliqueNoBotao);

function cliqueNoBotao() {
  const cidade = document.querySelector(".input-city").value;

  buscarCidadeNoServidor(cidade);
}
//!FUNÇÃO ASSINCRONA
async function buscarCidadeNoServidor(cidade) {
  try {
    const dadosDoServidor = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br`
    ).then((resposta) => resposta.json());
    console.log(dadosDoServidor);

    function colocarDadosNatela(dadosDoServidor) {
      document.querySelector(".city").innerHTML =
        "Tempo em " + dadosDoServidor.name;
      document.querySelector(".temp").innerHTML =(dadosDoServidor.main.temp - 273.15).toFixed(2) + " °C";
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
