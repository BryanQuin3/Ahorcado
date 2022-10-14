// dentro del script.js
// todas nuestros textos de ejemplo
const textos = [
  "Perro", "Salud", "Verano", "Bienvenido", "Ajedrez"
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let words = [];
let wordIndex = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const textoElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("texto-tipeado");
const oportunidadesElemento = document.getElementById("oportunidades");
const oportunidadesContenedor = document.getElementById("contenedorOportunidades");
/*
*Recibe una palabra y oculta las letras a excepcion de la primera y la ultima
*/
function ocultarLetras(frase) {
  let palabraIncompleta = [];
  for (let i = 0; i < frase.length; i++) {
    //rellena los espacios de la palbra con "_"
    palabraIncompleta[i] = "_";
  }
  //agrega las letras
  palabraIncompleta[0] = frase.charAt(0);
  palabraIncompleta[palabraIncompleta.length - 1] = frase.charAt(frase.length - 1);
  return palabraIncompleta;
}

document.getElementById("inicio").addEventListener("click", () => {
  // elegimos el texto de ejemplo a mostrar
  const textoIndice = Math.floor(Math.random() * textos.length);
  const texto = textos[textoIndice];

  typedValueElement.style.display = "block";
  oportunidadesContenedor.style.display = "block";
  document.getElementById("inicio").style.display = "none";
  // separamos el texto en un array de palabras
  words = texto.split(" ");
  // reestablemos el idice de palabras para el seguimiento
  wordIndex = 0;
  let palabraInconpleta = ocultarLetras(texto);
  let palabraSinComa = palabraInconpleta.toString().replace(/,/g, ' ');
  // Actualizamos la interfaz de usuario
  // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
  const spanPalabras = words.map(function (word) {
    return `<span>${palabraSinComa} </span>`;
  });

  // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
  textoElement.innerHTML = spanPalabras.join("");
  // Resaltamos la primer palabra
  // Borramos los mensajes previos
  messageElement.innerText = "";

  // Definimos el elemento textbox
  // Vaciamos el elemento textbox
  typedValueElement.value = "";
  // Definimos el foco en el elemento
  typedValueElement.focus();
  // Establecemos el manejador de eventos

  // Iniciamos el contador de tiempo
  startTime = new Date().getTime();
});

// al final de nuestro archivo script.js
typedValueElement.addEventListener("input", () => {
  // tomamos la palabra actual
  const currentWord = words[wordIndex];
  // tomamos el valor actual
  const typedValue = typedValueElement.value;
  // tiene 5 oportunidades mas que la cantidad de letras de la palabra
  let oportunidades = currentWord.length + 4;
  oportunidadesElemento.innerText = oportunidades;
  for (let index = 0; index < typedValue.length; index++) {
    if (typedValue.charAt(index) === currentWord.charAt(index) && wordIndex === words.length - 1) {
      message = "Letra Correcta"
      messageElement.innerText = message;
      oportunidades--;
      oportunidadesElemento.innerText = oportunidades;
      if (typedValue === currentWord) {
        message = "Felicidades! Ganaste"
        messageElement.innerText = message;
        typedValueElement.style.display = "none";
        document.getElementById("inicio").style.display = "block";
      } else if (typedValue !== currentWord && index === currentWord.length - 1) {
        message = "Perdiste! Vuelve a intentarlo"
        messageElement.innerText = message;
        typedValueElement.style.display = "none";
        document.getElementById("inicio").style.display = "block";
      }
    } else {
      message = "Letra Incorrecta"
      messageElement.innerText = message;
      oportunidades--;
      oportunidadesElemento.innerText = oportunidades;
      if (oportunidades === 0 || index === currentWord.length - 1) {
        message = "Perdiste! Vuelve a intentarlo"
        messageElement.innerText = message;
        typedValueElement.style.display = "none";
        document.getElementById("inicio").style.display = "block";
      }
    }
  }
}
);

