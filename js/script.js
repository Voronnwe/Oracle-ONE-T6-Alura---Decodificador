
const textoInicial = "Bom, você está dentro. Apenas lembre-se de que os agêntes estão sempre de olho. Precisamos ser cuidadosos, portanto daqui em diante usaremos essa interface para nos comunicar. Ela garantirá a segurança em nossas mensagems. Qualquer dúvida procure o Tank..."
const textContainer = document.querySelector(".boxArea");
let i = 0;
let intervalo;
let exibicaoInicialFeita = false;


// Função Audio 

const audio = new createAudio();

function createAudio() {
  this.sound = document.createElement("audio");
  this.sound.src = "./style/sound/SomDeTeclado.mp3";
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";

  document.body.appendChild(this.sound);

  this.play = function () {
    this.sound.play();
  };
  this.pause = function () {
    this.sound.pause();
    this.sound.currentTime = 0;
  };
}


// Máscaras do Red

document.getElementById('redPillButton').addEventListener('click', function() {
  document.getElementById('maskPage').style.display = 'none';
  intervalo = setInterval(() => exibirLetraPorLetra(textoInicial), 120);
  audio.play();
  });


// Máscaras do Blue + Mostrar Modal ao Click

const botao = document.getElementById('bluePillButton');
const modal = document.getElementById('modalPage');

botao.addEventListener('click', function() {
  modal.style.display = 'block';
});


// Função Exibir Letra por Letra

function exibirLetraPorLetra(textoInput) {
  textContainer.textContent += textoInput[i];
  i++;

  if (i === textoInput.length) {
    clearInterval(intervalo);
    audio.pause();
    i = 0;

    if (!exibicaoInicialFeita) {
      exibicaoInicialFeita = true; 
      setTimeout(() => {
        textContainer.textContent = "Aguardando nova mensagem...";
        textContainer.classList.add("message");
      }, 3000);
    }
  }
}


// Função Letras Minusculas

function transformarParaMinusculas(input) {
  input.value = input.value.toLowerCase(); 
}


// Função Limpar Campo

function limparCampo() {
  let mensagemOriginal = document.querySelector("input");
  mensagemOriginal.value = "";
}


// Função Mensagem de Erro

function exibirErro(mensagemErro) {

  clearInterval(intervalo);
  audio.pause();
  limparCampo();

  textContainer.textContent = mensagemErro
  textContainer.classList.add("errorMessage"); 

  setTimeout(() => {
    textContainer.textContent = "Aguardando nova mensagem...";
    textContainer.classList.remove("errorMessage");
}, 4000);
textContainer.classList.add("message");

exibicaoInicialFeita = true;
}


// Função Criptografia & Descriptografia

let mensagemCriptografada

function cripitografarMensagem() {
  i = 0
  clearInterval(intervalo);
  let mensagemOriginal = document.getElementById("digiteTexto").value;
  
  if (mensagemOriginal.trim() === "") {
    exibirErro("Campo vazio. Por favor, insira uma mensagem.");
    return;
  }
  if (/[A-ZÀ-Úà-ú0-9]/.test(mensagemOriginal)) {
    exibirErro("Não utilize números ou caracteres acentuados");
    return;
  }

  mensagemCriptografada = substituirVogais(mensagemOriginal);

  textContainer.textContent = "";
  audio.play()
  textContainer.classList.remove("message");

  intervalo = setInterval(() => exibirLetraPorLetra(mensagemCriptografada), 120);
  limparCampo();
}
function substituirVogais(texto) {
    texto = texto.replaceAll("e", "enter"); 
    texto = texto.replaceAll("i", "imes"); 
    texto = texto.replaceAll("a", "ai");
    texto = texto.replaceAll("o", "ober")
    texto = texto.replaceAll("u", "ufat");
    return texto;
}

let mensagemDescriptografada;

function descriptografarMensagem() {
  i = 0
  clearInterval(intervalo);
  let mensagemOriginal = document.getElementById("digiteTexto").value;

  if (mensagemOriginal.trim() === "") {
    exibirErro("Campo vazio. Por favor, insira uma mensagem.");
    return;
  }
  if (/[A-ZÀ-Úà-ú0-9]/.test(mensagemOriginal)) {
    exibirErro("Não utilize números ou caracteres acentuados");
    return;
  }

  mensagemDescriptografada = reSubstituirVogais(mensagemOriginal);

  textContainer.textContent = "";
  audio.play()
  textContainer.classList.remove("message");

  intervalo = setInterval(() => exibirLetraPorLetra(mensagemDescriptografada), 120);
  limparCampo();
}
function reSubstituirVogais(texto) {
    texto = texto.replaceAll("enter", "e"); 
    texto = texto.replaceAll("imes", "i"); 
    texto = texto.replaceAll("ai", "a");
    texto = texto.replaceAll("ober", "o")
    texto = texto.replaceAll("ufat", "u");
    return texto;
}
