/*
    INICIO CONTROL DE CANTIDAD DE SIMULADOR
*/
const cantidades = ['25,000', '50,000','75,000' , '100,000', '250,000', '500,000', '750,000', '1,000,000'];
// const cantidades = ['S/. 20,000', 'S/. 30,000', 'S/. 40,000', 'S/. 50,000', 'S/. 75,000', 'S/. 100,000', 'S/. 250,000', 'S/. 500,000', 'S/. 750,000', 'S/. 1,000,000'];
function manejoCantidad(desplazamiento) {
    let amount = document.getElementById("amount-input");
    let posicion = parseInt(amount.attributes.pos.value);
    let final = posicion + desplazamiento;
    if (final > cantidades.length - 1 || final < 0) {
        //Manejo de animacion al clickear mas allÃ¡ del lÃ­mite
        // amount.className = "";
        // window.requestAnimationFrame(function(time) {
        //     window.requestAnimationFrame(function(time) {
        //       amount.className = "buzz-out";
        //     });
        //   });
    } else {
        amount.attributes.pos.value = final;
        amount.value = cantidades[parseInt(amount.attributes.pos.value)];
    }
    
}
function manejoMoneda() {
    const monedaV = document.getElementById("moneda").value;
    const amount = document.getElementById("amount-input");
    let anterior = amount.value;
    switch (monedaV) {
        case 1:     
            amount.value = "S/ " + anterior;
            break;
        case 2:
            amount.value = "$ " + anterior;
            break;
        default:
    }
}

function cambioPlazo() {
    const tipoSelect = document.getElementById("tipo");
    const plazoSelect = document.getElementById("plazo");
    tipoV = parseInt(tipoSelect.value);
    plazoSelect.disabled=false;
    switch(tipoV) {
        case 1:
            plazoSelect.innerHTML = 
            `
            <option value="0">Seleccione</option>
            <option value="12">1 años</option>
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

document.querySelector("#moneda").addEventListener('change', (event) => {
    if(document.querySelector("#moneda").value != '0'){
        document.querySelector("#moneda").classList.remove('invalid-select')
    } 
});

if (window.location.href.includes('prestamo')) {
    document.querySelector("#tipo").addEventListener('change', (event) => {
        if(document.querySelector("#tipo").value != '0'){
            document.querySelector("#tipo").classList.remove('invalid-select')
        } 
    });
}

document.querySelector("#plazo").addEventListener('change', (event) => {
    if(document.querySelector("#plazo").value != '0'){
        document.querySelector("#plazo").classList.remove('invalid-select')
    } 
});

document.querySelector("#tipoDoc").addEventListener('change', (event) => {
    if(document.querySelector("#tipoDoc").value != '0'){
        document.querySelector("#tipoDoc").classList.remove('invalid-select')
    } 
});

if (window.location.href.includes('prestamo')) {
    document.querySelector("#provincia").addEventListener('change', (event) => {
        if(document.querySelector("#provincia").value != '0'){
            document.querySelector("#provincia").classList.remove('invalid-select')
        }
        
    });
}
if (window.location.href.includes('prestamo')) {
    document.querySelector("#garantia").addEventListener('change', (event) => {
        if(document.querySelector("#garantia").value != '0'){
            document.querySelector("#garantia").classList.remove('invalid-select')
        } 
    });
}

window.onload = function() {
    if(document.querySelector("#tipoDoc").value ==0){
        document.querySelector("#nDNI").disabled = true
    } else {
        document.querySelector("#nDNI").disabled = false
    }
};

document.querySelector("#tipoDoc").addEventListener('change', (event) => {
    if(document.querySelector("#tipoDoc").value ==0){
        document.querySelector("#nDNI").disabled = true
    } else {
        document.querySelector("#nDNI").disabled = false
    }
    
    if (document.querySelector("#tipoDoc").value == 1 ) {
        document.querySelector("#nDNI").setAttribute('maxlength','8')
        document.querySelector("#nDNI").setAttribute('minlength','8')
    } else {
        document.querySelector("#nDNI").setAttribute('maxlength','12')
        document.querySelector("#nDNI").setAttribute('minlength','8')
    }
});

document.querySelector("#nDNI").addEventListener('keyup', (event) => {
    if (document.querySelector("#nDNI").value.length > 7) {
        document.querySelector("#nDNI").classList.remove('invalid')
        if (document.querySelector("#nDNI").value.length == 8) {
            var dni = document.querySelector("#nDNI").value;
            var urlencoded = new URLSearchParams();
    
            var requestOptions = {
                method: "POST",
                body: urlencoded,
                redirect: "follow",
            };
    
            fetch(`https://sistema.grupoimagensac.com.pe/api/consulta-dni?numero=${dni}`,requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    var datos = JSON.parse(result);
                    if ((datos.celular != "") & (datos.celular != undefined)) {
                        document.getElementById("nTel").classList.remove('invalid');
                        document.getElementById("nTel").value = datos.celular;
                    }
                    if ((datos.nombres != "") & (datos.nombres != undefined)) {
                        document.getElementById("nombre").classList.remove('invalid');
                        document.getElementById("nombre").value = datos.nombres;
                    }
                    if ((datos.paterno != "") & (datos.paterno != undefined)) {
                        document.getElementById("apellido").classList.remove('invalid');
                        document.getElementById("apellido").value = datos.paterno + " " + datos.materno;
                    }
                    if ((datos.correo != "") & (datos.correo != undefined)) {
                        document.getElementById("correo").classList.remove('invalid');
                        document.getElementById("correo").value = datos.correo;
                    }
                })
                .catch((error) => console.log("Error: ", error));
        }
    }
});

document.querySelector("#nombre").addEventListener('keyup', (event) => {
    if (document.querySelector("#nombre").value.length > 2) {
        document.querySelector("#nombre").classList.remove('invalid')
    }
});

document.querySelector("#apellido").addEventListener('keyup', (event) => {
    if (document.querySelector("#apellido").value.length > 2) {
        document.querySelector("#apellido").classList.remove('invalid')
    }
});

document.querySelector("#nTel").addEventListener('keyup', (event) => {
    if (document.querySelector("#nTel").value.length == 9) {
        document.querySelector("#nTel").classList.remove('invalid')
    }
});

function ValidateEmail(mail) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
}

document.querySelector("#correo").addEventListener('keyup', (event) => {
    if (ValidateEmail(document.querySelector("#correo").value)) {
        document.querySelector("#correo").classList.remove('invalid')
    }
});

function topPage()
{
    window.scrollTo(0, 0);
}
