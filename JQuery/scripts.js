(()=>{
  "use strict";

  //Este array sirve para lso slots de la máquina.
  const slotcuadrado = ["aguacate","ajo","cebolla","pepino","puerro","tomate","zanahoria"];

  //Referencias de variables al html
  const divcuadro1fruta = document.querySelector("#cuadro1fruta");
  const divcuadro2fruta = document.querySelector("#cuadro2fruta");
  const divcuadro3fruta = document.querySelector("#cuadro3fruta");
  const buttonPlay = document.querySelector("#buttonPlay");
  const slotsFrutas = document.querySelectorAll(".slot-fruta");
  const contador = document.querySelector("#contador");
  const buttonMoney = document.querySelector("#moneda");
  const divTabla = document.querySelector("#divTabla");
  const filasResultados = document.querySelector("#resultados-jugadas");
  const divPremios = document.querySelector("#premio");
  const buttonExit = document.querySelector("#salir");
  const modalInfo = document.querySelector("#info");
  const cierreInfo = document.querySelector("#cerrar-info")  
  
  //Inicialización de variables
  let jugada = []; //Guarda la jugada resultante
  let contadorMonedas = 0; //Monedas introducidas
  let contadorTiradas = 0; //Número de tirada
  let monedasInicial = 0;  //Monedas al comienzo del juego. Esto se utiliza para el mensaje de alert del final.
  
  
  //Se pinta el contador de monedas y se desactiva los botones de jugar y salir.
  contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
  buttonPlay.disabled = true;
  buttonExit.disabled = true;
  /* La función de insertar las monedas realiza lo siguiente:
  - Actualiza los contadores.
  - Pinta el contador en el html.
  - Activa el botón de jugar.
  - Oculta la tabla del resultado anterior.
  - Reproduce la música agregada al código.
   */
  const insertarMoneda = () => {
    contadorMonedas++;
    monedasInicial++;
    contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
    buttonPlay.disabled = false;
    filasResultados.innerHTML = "";
    divTabla.classList.add("oculto");
    
    var a = new Audio('sounds/1.wav'); 
    a.play();
  };
  
  
  //Función que limpia las frutas
  const vaciarFrutas = ()=>{
    divcuadro1fruta.innerHTML = "";
    divcuadro2fruta.innerHTML = "";
    divcuadro3fruta.innerHTML = "";
  }
  
  // Función Principal (Realizar una jugada)
  const jugar = () => {
    //sonido de jugada
    var a = new Audio('sounds/2.wav'); 
    a.play();
    //activa y desactiva los botones que corresponden
    buttonExit.disabled = false;
    buttonMoney.disabled = true;
    buttonPlay.disabled = true;
    divTabla.classList.remove("oculto"); 
    divPremios.innerHTML = "";
    --contadorMonedas;
    ++contadorTiradas;
    
    contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
    
    //eliminación de la información en el contenedor de las frutas
    vaciarFrutas();
  
    // Función para obtener un número al azar con el límite de la longitud del array
    function shuffle(array) {
      let  i;
      i = Math.floor(Math.random() * array.length);
      console.log(i);
      return i;
    }

    //Tirada aleatoria de 3 frutas
    const cuadro1fruta = slotcuadrado[shuffle(slotcuadrado)];
    const cuadro2fruta = slotcuadrado[shuffle(slotcuadrado)];
    const cuadro3fruta = slotcuadrado[shuffle(slotcuadrado)];
  
    //Almacena resultado en un array para comprobar premio
    jugada[0] = cuadro1fruta;
    jugada[1] = cuadro2fruta;
    jugada[2] = cuadro3fruta;
  
    console.log(jugada);
    console.log(cuadro1fruta);
    console.log(cuadro2fruta);
    console.log(cuadro3fruta);
  
    //Pinta en el html la imagen correspondiente a la fruta aleatoria

      const imgcuadro1fruta = document.createElement("img");
      imgcuadro1fruta.id = "cuadro1fruta";
      imgcuadro1fruta.src = `img/${cuadro1fruta}.png`;
      imgcuadro1fruta.classList.add("slot-fruta");
      divcuadro1fruta.append(imgcuadro1fruta);

      const imgcuadro2fruta = document.createElement("img");
      imgcuadro2fruta.id = "cuadro2fruta";
      imgcuadro2fruta.src = `img/${cuadro2fruta}.png`;
      imgcuadro2fruta.classList.add("slot-fruta");
      divcuadro2fruta.append(imgcuadro2fruta);

  
      const imgcuadro3fruta = document.createElement("img");
      imgcuadro3fruta.id = "cuadro3fruta";
      imgcuadro3fruta.src = `img/${cuadro3fruta}.png`;
      imgcuadro3fruta.classList.add("slot-fruta");
      divcuadro3fruta.append(imgcuadro3fruta);
      buttonPlay.disabled = false;
  
    //Contar frutas diferentes.
    const cantidadFrutas = jugada.reduce((contadorFruta, fruta) => {
      contadorFruta[fruta] = (contadorFruta[fruta] || 0) + 1;
      return contadorFruta;
    }, {});
  
    console.log(cantidadFrutas);
  
    /* Esta parte es la encargada del premio, la cual es encargada de actualizar el contador de monedas, lo pinta,inserta en la tabla resumen 
    el resultado de la jugada y pinta una frase con el premio obtenido. En los premios mayores reproduce un sonido */
    if (cantidadFrutas.zanahoria == 2) {
      console.log("Has ganado 4 monedas.");
      contadorMonedas += 4;
      setTimeout(() => {
        contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td>-1</td>
          <td>4</td>
          <td>${contadorMonedas}</td>
          </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/moneda.png" alt="premio">Has ganado 4 monedas. ';
          var a = new Audio('sounds/3.wav'); 
        a.play();
      }, 2500);
    } else if (cantidadFrutas.zanahoria == 3) {
      console.log("Has ganado 10 monedas.");
      contadorMonedas += 10;
        contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td>-1</td>
          <td>10</td>
          <td>${contadorMonedas}</td>
          </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/moneda.png" alt="premio">Has ganado 10 monedas.';
        var a = new Audio('sounds/3.wav'); 
        a.play();
    } else if (
      cantidadFrutas.aguacate == 3 ||
      cantidadFrutas.ajo == 3 ||
      cantidadFrutas.cebolla == 3 ||
      cantidadFrutas.pepino == 3 ||
      cantidadFrutas.puerro == 3 ||
      cantidadFrutas.tomate == 3
    ) {
      console.log("Has ganado 3 monedas.");
      contadorMonedas += 3;
        contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td>-1</td>
          <td>3</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/moneda.png" alt="premio">Has ganado 3 monedas.';
          var a = new Audio('sounds/3.wav'); 
        a.play();
    } else if (
      (cantidadFrutas.aguacate == 2 ||
        cantidadFrutas.ajo == 2 ||
        cantidadFrutas.cebolla == 2 ||
        cantidadFrutas.pepino == 2 ||
        cantidadFrutas.puerro == 2 ||
        cantidadFrutas.tomate == 2) &&
      cantidadFrutas.zanahoria == 1
    ) {
      console.log("Has ganado 3 monedas.");
      contadorMonedas += 3;
        contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td>-1</td>
          <td>3</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/moneda.png" alt="premio">Has ganado 3 monedas.';
          var a = new Audio('sounds/3.wav'); 
          a.play(); 
    } else if (
      cantidadFrutas.aguacate == 2 ||
      cantidadFrutas.ajo == 2 ||
      cantidadFrutas.cebolla == 2 ||
      cantidadFrutas.pepino == 2 ||
      cantidadFrutas.puerro == 2 ||
      cantidadFrutas.tomate == 2
    ) {
      console.log("Has ganado 2 monedas.");
      contadorMonedas += 2;
        contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td>-1</td>
          <td>2</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/moneda.png" alt="premio">Has ganado 2 monedas.';
    } else if (cantidadFrutas.zanahoria == 1) {
      console.log("Ganaste 1 moneda");
      contadorMonedas += 1;
        contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-light">
          <td>${contadorTiradas}</td>
          <td>-1</td>
          <td>1</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/moneda.png" alt="premio">Has ganado 1 monedas.';
    } else {
        contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-danger">
          <td>${contadorTiradas}</td>
          <td>-1</td>
          <td>0</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/triste.png" alt="premio" width="60px">';
    }
  
    //Comprobación del número de monedas para finalizar el juego.
      if (contadorMonedas == 0) {
        buttonPlay.disabled = true;
        buttonMoney.disabled = false;
        contadorTiradas = 0;
        monedasInicial = 0;
        alert("Las monedas se han agotado.");
        buttonExit.disabled = true;
        var aaudioplay = new Audio('sounds/5.wav '); 
        aaudioplay.play();
      };
  };

  
  //Función del botón salir, se encarga de reiniciar juego, sacar un alert con el resultado obtenido y poner una buena música al final.
  function salir() {
    var aaudioplay = new Audio('sounds/4.wav '); 
    aaudioplay.play();
    buttonPlay.disabled = true;
    buttonMoney.disabled = false;
    contadorTiradas = 0;
    divPremios.innerHTML = "";
    alert(
      `GAME OVER. Monedas Inicio: ${monedasInicial} - Monedas Actualmente: ${contadorMonedas}.`
    );
    contadorMonedas = 0;
    monedasInicial = 0;
    contador.innerHTML = `<h5>${contadorMonedas}</h5>`;
    vaciarFrutas();
    buttonExit.disabled = true;
    divPremios.innerHTML =
    '<img src="img/minion.gif" alt="premio" width="600px">';
  }
  
  //Funciones de ayuda en la web.
  function abrirInfo(){
    modalInfo.classList.add("is-active");
  }
  
  function cerrarInfo(){
    modalInfo.classList.remove("is-active")
  }
  
  // Listeners para los botones para sacar Eventos.
  buttonPlay.addEventListener("click", jugar);
  buttonMoney.addEventListener("click", insertarMoneda);
  buttonExit.addEventListener("click", salir);
  buttonIn.addEventListener("click",abrirInfo);
  cierreInfo.addEventListener("click",cerrarInfo);
})();