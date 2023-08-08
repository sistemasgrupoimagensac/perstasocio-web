$(function () {
    const submitElementInvertir = document.getElementById("to-form-invertir");

    submitElementInvertir.addEventListener("click", () => {
      submitInvertir();
    });

});


function submitInvertir() {
    var btn_send = document.getElementById("to-form-invertir");
    btn_send.innerText ='Enviando ...';
    btn_send.classList.add('sending-info');

    const cantidades = [
        50000, 75000, 100000, 250000, 500000, 750000, 1000000,
    ];

    const monto = cantidades[Number(document.getElementById("amount-input").attributes.pos.value)];

    const moneda = document.getElementById("tipoMoneda").value;
    let plazo = document.getElementById("plazo").value;

    const nDoc = document.getElementById("txtDocumento").value;
    const nombre = document.getElementById("txtNombres").value;
    const apellido = "";
    const nTel = document.getElementById("txtCelular").value;
    const correo = document.getElementById("txtCorreo").value;
    //var url = `http://localhost:8000/api/guardar-datos-inversion?`;
    var url = `https://sistema.grupoimagensac.com.pe/api/guardar-datos-inversion?`;
    url += "numero=" + nDoc;
    url += "&nombres=" + nombre;
    url += "&apellidos=" + apellido;
    url += "&celular=" + nTel;
    url += "&correo=" + correo;
    url += "&monto=" + monto;
    url += "&tipo_producto=" + 8;
    url += "&tipo_plazo=" + plazo;
    url += "&origen=" + 47;
    url += "&moneda=" + moneda;
    var requestOptions = {
        method: "POST",
        redirect: "follow",
    };

    fetch(url, requestOptions)
    .then((response) => response.text())
    .then((response) => {
        console.log('ok');
    })
    .catch((error) => console.log("Error: ", error));

    const tipoMonedaText = document.querySelector("#tipoMoneda option:checked").textContent;
    const plazoText = document.querySelector("#plazo option:checked").textContent;
    var detailsS = {
        nombres: nombre,
        tipo_documento:'DNI',
        dni:nDoc,
        celular:nTel,
        correo:correo,
        tipo_moneda:tipoMonedaText,
        monto:monto,        
        plazo:plazoText,
        origen:'PRESTA SOCIO',
        producto:'PRESTA SOCIO - WEB - INVERSIONES',

    };
    const urlGooglesheets = "https://script.google.com/macros/s/AKfycbxzTKu9oc1L_hM10UkV4EVmPbrkvrWTqIDbQkY9SG9ALU1Vqc32SPPFb2kTbrFrvzA0uw/exec?action=addRow"
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