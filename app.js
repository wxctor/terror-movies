function pesquisar() {
  // Obtém a seção HTML onde os resultados serão exibidos pelo ID "resultados-pesquisa".
  let section = document.getElementById("resultados-pesquisa");

  let campoPesquisa = document.getElementById("campo-pesquisa").value;

  // se campoPesquisa for uma string sem nada
  if (campoPesquisa == "") {
    section.innerHTML = `<p class="notfound">Nenhum filme encontrado. Digite algo.</p>`;
    return;
  }

  campoPesquisa = campoPesquisa.toLowerCase();

  // Inicializa uma string vazia para armazenar os resultados da pesquisa.
  let resultados = "";
  let titulo = "";
  let sinopse = "";
  let tags = "";

  // Itera sobre cada objeto (filme) no array 'dados'.
  for (let dado of dados) {
    titulo = dado.titulo.toLowerCase();
    tags = dado.tags.toLowerCase();
    // se titulo includes campoPesquisa
    if (titulo.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
      // Concatena HTML para criar um elemento div com as informações do filme.
      resultados += `
            <div class="item-resultado">
              <h2>
                <a href="${dado.link}" target=_blank>${dado.titulo}</a>
              </h2>
              <img src="${dado.img}" class="cape">
              <p class="sinopse">${dado.sinopse}</p>
              <p class="genero">${dado.genero}</p>
            </div>
          `;
    }
  }

  if (!resultados) {
    section.innerHTML =
      '<p class="notfound">Nenhum filme encontrado. Você deve digitar um filme válido.</p>';
    return;
  }

  // Atribui o HTML gerado para a propriedade innerHTML da seção, substituindo o conteúdo existente.
  section.innerHTML = resultados;
}

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const btn = document.querySelector("#pesquisar");
    btn.click();
  }
});

function createFlyingBat() {
  const bat = document.createElement("div");
  bat.classList.add("bat");

  const img = document.createElement("img");
  img.src = "./src/icon/bat.png"; // caminho da sua imagem
  bat.appendChild(img);

  // Posição inicial: canto inferior ou lateral da tela
  const xStart = Math.random() * window.innerWidth;
  const yStart = Math.random() * window.innerHeight;
  bat.style.left = xStart + "px";
  bat.style.top = yStart + "px";

  // Direção aleatória
  const dx = (Math.random() - 0.5) * 400; // pode ir para a esquerda ou direita
  const dy = -Math.random() * 300 - 100; // sempre subindo um pouco

  // 🧠 Calcular ângulo da direção
  const angleRad = Math.atan2(dy, dx);
  const angleDeg = angleRad * (90 / Math.PI);

  // 🔁 Rotacionar a imagem para a direção do voo
  img.style.transform = `rotate(${angleDeg}deg)`;

  // Animação
  bat.animate(
    [
      { transform: "translate(0, 0)", opacity: 0 },
      { transform: `translate(${dx}px, ${dy}px)`, opacity: 1 },
      { transform: `translate(${dx * 1.5}px, ${dy * 1.5}px)`, opacity: 0 },
    ],
    {
      duration: 5000,
      easing: "ease-out",
      fill: "forwards",
    }
  );
  const size = Math.random() * 10 + 20;
  bat.style.width = size + "px";
  bat.style.height = size + "px";
  document.getElementById("bat-container").appendChild(bat);

  setTimeout(() => bat.remove(), 5500);
}

// Criar morcegos constantemente
setInterval(() => {
  createFlyingBat();
}, 650); // ajustável: menor = mais morcegos
