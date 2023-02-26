const textos = ["Perro", "Salud", "Verano", "Bienvenido", "Ajedrez"];
const textoElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("texto-tipeado");
const oportunidadesElemento = document.getElementById("oportunidades");
const oportunidadesContenedor = document.getElementById("contenedorOportunidades");
let words = [], wordIndex = 0, startTime = 0;

function ocultarLetras(frase) {
  const palabraIncompleta = new Array(frase.length).fill('_');
  palabraIncompleta[0] = frase.charAt(0);
  palabraIncompleta[palabraIncompleta.length - 1] = frase.charAt(frase.length - 1);
  return palabraIncompleta;
}

function mostrarPalabra(palabra) {
  const spanPalabras = palabra.map(word => `<span>${ocultarLetras(word).join(' ')} </span>`);
  textoElement.innerHTML = spanPalabras.join('');
}

function actualizarMensaje(mensaje) {
  messageElement.innerText = mensaje;
}

function iniciarJuego() {
  const textoIndice = Math.floor(Math.random() * textos.length);
  const texto = textos[textoIndice];
  words = texto.split(" ");
  wordIndex = 0;
  mostrarPalabra(words);
  actualizarMensaje("");
  typedValueElement.value = "";
  typedValueElement.style.display = "block";
  oportunidadesContenedor.style.display = "block";
  document.getElementById("inicio").style.display = "none";
  typedValueElement.focus();
  startTime = new Date().getTime();
}

function finalizarJuego(mensaje) {
  actualizarMensaje(mensaje);
  typedValueElement.style.display = "none";
  document.getElementById("inicio").style.display = "block";
}

function actualizarOportunidades(oportunidades) {
  oportunidadesElemento.innerText = oportunidades;
}

function procesarInput() {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;
  let oportunidades = currentWord.length + 4;
  actualizarOportunidades(oportunidades);

  const currentWordLetters = currentWord.split('');
  const typedValueLetters = typedValue.split('');
  const spanPalabras = ocultarLetras(currentWord).map(letra => `<span>${letra}</span>`);

  for (let index = 1; index < typedValueLetters.length; index++) {
    const typedLetter = typedValueLetters[index];
    const currentLetter = currentWordLetters[index];

    if (typedLetter === currentLetter) {
      spanPalabras[index] = `<span>${currentLetter}</span>`;

      if (index === currentWord.length - 1 && typedValueLetters.join('') === currentWord) {
        finalizarJuego("Felicidades Ganaste");
        return;
      }
      if (index === currentWord.length - 1 && typedValueLetters.join('') != currentWord) {
        finalizarJuego(`Perdiste! Vuelve a intentarlo, la palabra era : ${currentWord}`);
        return;
      }

    } else {
      actualizarMensaje("Letra Incorrecta");
      oportunidades--;
      actualizarOportunidades(oportunidades);

      if (oportunidades === 0 || index === currentWord.length - 1) {
        finalizarJuego(`Perdiste! Vuelve a intentarlo.La palabra era : ${currentWord}`);
        return;
      }
    }
  }

  textoElement.innerHTML = spanPalabras.join('');
}

document.getElementById("inicio").addEventListener("click", iniciarJuego);
typedValueElement.addEventListener("input", procesarInput);
