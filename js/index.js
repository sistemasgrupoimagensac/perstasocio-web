async function sendDataForm()
{
    var monto = document.getElementById("amount-input").value;
    var tipo_moneda = document.getElementById("tipoMoneda").value;
    var tipo_prestamo = document.getElementById("tipoPrestamo").value;
    var plazo = document.getElementById("plazoPago").value;
    var tipo_documento = document.getElementById("tipoDocumento").value;
    var documento = document.getElementById("txtDocumento").value;
    var nombres = document.getElementById("txtNombres").value;
    var correo = document.getElementById("txtCorreo").value;
    var celular = document.getElementById("txtCelular").value;

    let modal = document.querySelector(".modal-background");
    modal.classList.add("show");
    
    var formDataEnvio = new FormData();
    formDataEnvio.append('nombres', nombres);
    formDataEnvio.append('apellidos', apellidos);
    formDataEnvio.append('celular', celular);
    formDataEnvio.append('propiedad', propiedad.value);
    formDataEnvio.append('monto', monto);
    formDataEnvio.append('horario_contacto', horario_contacto.value);
    
    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        body: formDataEnvio
      };
      
    const response = await fetch(`mail.php`, requestOptions);
    const datos = await response.text();


    return datos;
        // .then(response => response.text())
        // .then(result => {
        //     console.log(result);
        //     return true;
        // })
        // .catch(error => {
        //     console.log('error', error);
        //     return false;
        // })
        // .finally(() => modal.classList.remove("show"));
    
}
function scrollToForm() {
  const formulario = document.getElementById("regForm");
  formulario.scrollIntoView({ behavior: "smooth" });
}


