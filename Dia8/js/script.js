// Declaracion del valor de las variables de la api las cartas numericas normales mantienen su valor ya definido
const valores = {
    "ACE": 14,
    "KING": 13,
    "QUEEN": 12,
    "JACK": 11
  };
  
// Iniciacion de variables
  let puntajeUsuario = 0;
  let puntajeMaquina = 0;
  let rondas = 0;
  
// Busca en el html el elemento y alamacena en una nueva variable  
  const btnJugar = document.getElementById("jugar");
  const usuarioCarta = document.getElementById("usuario-carta");
  const maquinaCarta = document.getElementById("maquina-carta");
  const resultado = document.getElementById("resultado");
  const puntaje = document.getElementById("puntaje");
  const btnInstrucciones = document.getElementById("instrucciones");
  const instrucciones = document.getElementById("instruccionesocultar");

  btnInstrucciones.addEventListener('click', () => {
    instrucciones.style.display = instrucciones.style.display === 'none' ? 'block' : 'none';
  });


  async function obtenerCarta() {
    const res = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
    const data = await res.json();
    return data.cards;
  }
  
  function valorCarta(carta) {
    return valores[carta.value] || parseInt(carta.value);
  }
  
  function actualizarPuntaje() {
    puntaje.textContent = `Usuario: ${puntajeUsuario} | Máquina: ${puntajeMaquina}`;
  }
  
  function reiniciarJuego() {
    puntajeUsuario = 0;
    puntajeMaquina = 0;
    rondas = 0;
    actualizarPuntaje();
    resultado.textContent = '';
  }
  
  btnJugar.addEventListener('click', async () => {
    if (rondas >= 5) {
      reiniciarJuego();
      return;
    }
  
    const [cartaUsuario, cartaMaquina] = await obtenerCarta();
    usuarioCarta.src = cartaUsuario.image;
    maquinaCarta.src = cartaMaquina.image;
  
    const valorUsuario = valorCarta(cartaUsuario);
    const valorMaquina = valorCarta(cartaMaquina);
  
    if (valorUsuario > valorMaquina) {
      puntajeUsuario++;
      resultado.textContent = '¡Ganó el usuario esta ronda!';
    } else if (valorMaquina > valorUsuario) {
      puntajeMaquina++;
      resultado.textContent = '¡Ganó la máquina esta ronda!';
    } else {
      resultado.textContent = '¡Empate!';
    }
  
    rondas++;
    actualizarPuntaje();
  
    if (rondas === 5) {
      setTimeout(() => {
        if (puntajeUsuario > puntajeMaquina) {
          alert('¡El usuario gana la partida!');
        } else if (puntajeMaquina > puntajeUsuario) {
          alert('¡La máquina gana la partida!');
        } else {
          alert('¡La partida termina en empate!');
        }
      }, 500);
    }
  });