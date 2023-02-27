const textos = ["Perro", "Salud", "Verano", "Bienvenido", "Ajedrez"];
const textoElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("texto-tipeado");
const oportunidadesElemento = document.getElementById("oportunidades");
const oportunidadesContenedor = document.getElementById("contenedorOportunidades");
let words = [], wordIndex = 0;
let oportunidades = 4;

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
  actualizarOportunidades(oportunidades);
  actualizarMensaje("");
  typedValueElement.value = "";
  typedValueElement.style.display = "block";
  oportunidadesContenedor.style.display = "block";
  document.getElementById("inicio").style.display = "none";
  typedValueElement.focus();
}

function finalizarJuego(mensaje) {
  actualizarMensaje(mensaje);
  typedValueElement.style.display = "none";
  document.getElementById("inicio").style.display = "block";
  oportunidades=4;
}

function countBackspaceKeyPresses(inputId) {
  const input = document.getElementById(inputId);
  let counter = 0;

  input.addEventListener("keydown", function(event) {
    if (event.key === "Backspace") {
      counter++;
    }
  });

  return function() {
    return counter;
  };
}

function actualizarOportunidades(oportunidades) {
  oportunidadesElemento.innerText = oportunidades;
}

function procesarInput() {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;
  actualizarOportunidades(oportunidades);
  actualizarMensaje("");
  const currentWordLetters = currentWord.split('');
  const typedValueLetters = typedValue.split('');
  const spanPalabras = ocultarLetras(currentWord).map(letra => `<span>${letra}</span>`);  
  //verifica si se borró alguna letra
  typedValueElement.addEventListener("input", ()=> {
    const typedValue = typedValueElement.value;
    if (typedValue.length < typedValueLetters.length) {
      actualizarOportunidades(oportunidades);
    }
  });
  
  for (let index = 1; index < typedValueLetters.length; index++) {
    const typedLetter = typedValueLetters[index];
    const currentLetter = currentWordLetters[index];

    if (typedLetter.toLowerCase() === currentLetter.toLowerCase()) {
      spanPalabras[index] = `<span>${currentLetter}</span>`;
      actualizarOportunidades(oportunidades);
      if (index === currentWord.length - 1 && typedValueLetters.join('').toLowerCase() === currentWord.toLowerCase()) {
        finalizarJuego("Felicidades Ganaste");
        return;
      }
      if (index === currentWord.length - 1 && typedValueLetters.join('').toLowerCase() != currentWord.toLowerCase()) {
        finalizarJuego(`Perdiste! Vuelve a intentarlo. La palabra era : ${currentWord}`);
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
