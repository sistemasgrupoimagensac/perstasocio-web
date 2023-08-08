$(function () {
  const triggerElement = document.getElementById("to-result");
  const submitElement = document.getElementById("to-form");

  triggerElement.addEventListener("click", () => {
    peticion();
  });
  submitElement.addEventListener("click", () => {
    submitPrestamo();
  });

  $("#distrito").select2({
    theme: "bootstrap4",
  });
});

function submitPrestamo() {
  var btn_send = document.getElementById("to-form");
  btn_send.innerText ='Enviando ...';
  btn_send.classList.add('sending-info');
  const cantidades = [
    50000, 75000, 100000, 250000, 500000, 750000, 1000000,
  ];
  const monto = cantidades[Number(document.getElementById("amount-input").attributes.pos.value)];

  const moneda = document.getElementById("tipoMoneda").value;
  const tipo = document.getElementById("tipoPrestamo").value;
  let plazo = document.getElementById("plazoPago");
  switch (tipo) {
    case "1":
      plazo = plazo.selectedIndex;
      break;

    case "2":
      plazo = plazo.selectedIndex;
      break;
    case "3":
      plazo = 6;
      break;
    default:
      plazo = "error";
      console.log("error");
      break;
  }

  const nDoc = document.getElementById("txtDocumento").value;
  const nombre = document.getElementById("txtNombres").value;
  const apellido = "";
  const nTel = document.getElementById("txtCelular").value;
  const correo = document.getElementById("txtCorreo").value;
  const distrito = document.getElementById("distrito").value;
  const garantia = document.getElementById("tipo_garantia").value;
  //var url = `http://localhost:8000/api/guardar-datos-landing?`;
  var url = `https://sistema.grupoimagensac.com.pe/api/guardar-datos-landing?`;
  url += "numero=" + nDoc;
  url += "&nombres=" + nombre;
  url += "&apellidos=" + apellido;
  url += "&celular=" + nTel;
  url += "&correo=" + correo;
  url += "&monto=" + monto;
  url += "&tipo_garantia=" + garantia;
  url += "&tipo_producto=" + 8;
  url += "&tipo_plazo=" + plazo;
  url += "&origen=" + 46;
  url += "&distrito=" + distrito;
  url += "&moneda=" + moneda;
  url += "&forma_pago=" + tipo;
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then(() => {
        try {
            var fecha = new Date();
            var año = fecha.getFullYear();
            var mes = fecha.getMonth() + 1;
            var dia = fecha.getDate();
            var hora = fecha.getHours();
            var minutos = fecha.getMinutes();
            var segundos = fecha.getSeconds();
            var ahora = año + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;
            const landing = 'prestaEmprendedor';
            var name = nombre;
            var lastName = apellido;
            var dni = nDoc;
            var phone = nTel;
            var district = document.getElementById('select2-distrito-container').textContent;
            var email = correo;
            var policies = 'agree';
            var capital = monto;
            if (garantia=='1') {
                warranty = 'Casa';
            } else if (garantia=='2') {
                warranty = 'Departamento';
            } else if (garantia=='3') {
                warranty = 'Local Comercial';
            } else if (garantia=='4') {
                warranty = 'Terreno';
            }
            plazo = parseInt(document.getElementById("plazoPago").value/12) + "año(s)" + parseInt(document.getElementById("plazoPago").value)%12 + "meses";
            var details = {
                landing,
                ahora,
                name,
                lastName,
                dni,
                phone,
                district,
                email,
                policies,
                capital,
                warranty,
                plazo,
            };
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch("https://prestamos.grupoimagensac.com.pe/send-email", {
                    method: "POST",
                    body: formBody,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message == "Received") {
                        console.log('ok');
                    } else {
                        alert("OcurriÃ³ un error :(");
                    }
                });
        } catch (error) {
            console.log(error);
        }
    })
    .then(()=>{
      //window.location.href = "/gracias-prestamos.php";
    })
    .catch((error) => console.log("Error: ", error));
    //googlesheets appscript
    const distritoText = document.querySelector("#distrito option:checked").textContent;
    const provinciaText = document.querySelector("#provincia option:checked").textContent;
    const garantiaText = document.querySelector("#tipo_garantia option:checked").textContent;
    const plazoText = document.querySelector("#plazoPago option:checked").textContent;
    const tipoMonedaText = document.querySelector("#tipoMoneda option:checked").textContent;

    var detailsS = {
      nombres:nombre,
      tipo_documento:"DNI",
      numero_documento:nDoc,
      celular:nTel,
      email:correo,
      moneda:tipoMonedaText,
      monto:monto,
      plazo:plazoText,
      tipo_garantia:garantiaText,
      provincia:provinciaText,
      distrito:distritoText,
      origen:"PRESTASOCIO WEB - PRESTAMOS",
      tipo_producto:"PRESTASOCIO"
    };
    const urlGooglesheets = "https://script.google.com/macros/s/AKfycbzXZsWdcjUNrAIHMBLhMbZSTeIFK2pQpYKLSQQLjOeGZ2IPAt3c5XrhS9UwCZpMsF_7/exec?action=addRow"
    fetch(urlGooglesheets, {
      mode: 'no-cors',
      redirect: "follow",
      method: "POST",
      body: JSON.stringify(detailsS),
      headers: {
        "Content-Type": "application/json",
    },
    }).then((data) => {
        console.log(data);
    });
}

function separator(numero) {
  var separacion = numero.toString().split(".");
  separacion[0] = separacion[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return separacion.join(".");
}

function peticion() {
  const tasaInteres = 0.02;
  const moneda = document.getElementById("tipoMoneda");
  const monto = document.getElementById("amount-input");
  const plazo = document.getElementById("plazoPago");
  const tipo = document.getElementById("tipoPrestamo");
  var simbolo = "";
  const cantidades = [
    25000 , 50000 , 75000, 100000, 250000, 500000, 750000, 1000000,
  ];
  const montoV = cantidades[Number(monto.attributes.pos.value)];
  var tipoV = parseInt(tipo.value);

  const resultMoneda = document.getElementById("r-mone");
  const resultM = document.getElementById("result-m");
  if (moneda.value == 1) {
    simbolo = "S/";
    resultM.innerHTML = simbolo;
    resultMoneda.innerHTML = "Soles";
  } else {
    simbolo = "$";
    resultM.innerHTML = simbolo;
    resultMoneda.innerHTML = "Dolares";
  }

  const resultMonto = document.getElementById("r-monto");
  const cantidadesView = [
    "50,000",
    "75,000",
    "100,000",
    "250,000",
    "500,000",
    "750,000",
    "1,000,000",
  ];
  resultMonto.innerHTML = cantidadesView[Number(monto.attributes.pos.value)];

  const resultTipo = document.getElementById("r-tpago");
  const resultPlazo = document.getElementById("r-plazo");

  switch (tipoV) {
    case 1:
      resultTipo.innerHTML = "Cuotas Fijas";
      resultPlazo.innerHTML = plazo.selectedIndex + " años";
      break;
    case 2:
      resultTipo.innerHTML = "Solo intereses";
      resultPlazo.innerHTML = plazo.selectedIndex + " año";
      break;
    case 3:
      resultTipo.innerHTML = "PrÃ©stamos puente";
      resultPlazo.innerHTML = plazo.value + " meses";

      break;
    default:
      break;
  }

  const resultCuota = document.getElementById("r-cuota");
  resultCuota.innerHTML = plazo.value + " cuotas";
  let meses = plazo.value;
  var settings = {
    url: `https://360creative.pe/calculoCuotas?monto=${montoV}&meses=${meses}&interes=${tasaInteres}&tipo=${tipoV}`,
    //"url": `http://localhost:4000/calculoCuotas?monto=${montoV}&meses=${meses}&interes=${tasaInteres}&tipo=${tipoV}`,
    method: "GET",
    timeout: 0,
  };
 

  $.ajax(settings).done(function (response) {
    let responseFormatted = [];

    response.forEach((e) => {
      responseFormatted.push(separator(e));
    });

    const resultMensual = document.getElementById("r-mensual");
    const resultTiempos = document.getElementById("result-t");
    switch (tipoV) {
      case 1:
        resultMensual.innerHTML = responseFormatted[1];
        break;
      case 2:
        let total = 0;
        response.forEach((element) => {
          total += parseInt(element);
        });
        let totalFormatted = separator(total);
        resultMensual.innerHTML = totalFormatted;
        resultTiempos.innerHTML = "total";
        break;
      case 3:
        resultMensual.innerHTML = responseFormatted[response.length - 1];
        resultTiempos.innerHTML = "total";
    }

    const modal_cronograma = document.getElementById("table_cronograma");
    modal_cronograma.innerHTML = "";
    for (let i = 1; i < response.length; i++) {
      modal_cronograma.innerHTML += 
      `<tr>
        <td>Cuota ${i}</td>
        <td>${simbolo} ${responseFormatted[i]}</td>
      </tr>`;
    }
  });
}
function cambioPlazo() {
  const tipoSelect = document.getElementById("tipoPrestamo");
  const plazoSelect = document.getElementById("plazoPago");
  tipoV = parseInt(tipoSelect.value);
  plazoSelect.disabled=false;
  switch(tipoV) {
      case 1:
          plazoSelect.innerHTML = 
          `
          <option value="0">Seleccione</option>
          <option value="12">1 año</option>
          <option value="24">2 años</option>
          <option value="36">3 años</option>
          <option value="48">4 años</option>
          <option value="60">5 años</option>
          `
          break;
      case 2:
          plazoSelect.innerHTML = 
          `
          <option value="0">Seleccione</option>
          <option value="12">1 año</option>
          `
          break;
      case 3:
          plazoSelect.innerHTML = 
          `
          <option value="0">Seleccione</option>
          <option value="6">6 meses</option>
          `
          break;
      default:
          plazoSelect.innerHTML = `<option value="0">Seleccione tipo</option>`;
          plazoSelect.disabled=true;
  }
}
