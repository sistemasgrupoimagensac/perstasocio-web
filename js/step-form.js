var currentTab = 0;
document.addEventListener("DOMContentLoaded", function(event) {
            showTab(currentTab);
            
});

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    var child = x[currentTab].getElementsByClassName("tab-inactive");
    x[n].classList.replace("tab-inactive","tab-active");
    
    fixStepIndicator(n)
}

function nextPrev(n) {
    try {
        let x = document.getElementsByClassName("tab");
        const validate_form = validateFormLanding(currentTab);

        //console.log(validate_form);
        if (n == 1 && !validate_form) {
            return false;
        }
        x[currentTab].classList.replace("tab-active", "tab-inactive");
        currentTab = currentTab + n;
        if (currentTab >= x.length) {
            // document.getElementById("regForm").submit();
            // return false;
            //alert("sdf");
            document.getElementById("nextprevious").style.display = "none";
            document.getElementById("all-steps").style.display = "none";
            document.getElementById("register").style.display = "none";
            document.getElementById("text-message").style.display = "block";
        }
        showTab(currentTab);
        if (n>0) {
            document.getElementById("slider1").scrollIntoView();
        }
    } catch (e) {
        console.log(e);
    } finally {
        //document.querySelector(".modal-background").classList.remove("show")
    }
}

function validateFormLanding(tab) {
    //const landing = "LANDING ACRECER WEB";
    //const tipo_producto = 7;
    //const origen = 40;

    var x, y, i, n, combos, valid = true;
    x = document.getElementsByClassName("form-item");
    y = x[tab].getElementsByTagName("input");
    combos = x[tab].getElementsByTagName("select");

    for (i = 0; i < y.length; i++) {

        if (y[i].value.length == 0) {
            y[i].className += " is-invalid";
            valid = false;
        }else{
            y[i].classList.remove("is-invalid");
        }

    }

    //validacion para combos
    for (n = 0; n < combos.length; n++) {
        if (combos[n].value == 0) {
            combos[n].classList.add("is-invalid");
            valid = false;
        }else{
            combos[n].classList.remove("is-invalid");
        }
    }

    return valid;
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
       return (true)
    }
}
function validateForm() {
    var x, y, i, n, combos, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    combos = x[currentTab].getElementsByTagName("select");
    combosSelect2 = x[currentTab].querySelector("#select2-distrito-container");

    for (i = 0; i < y.length; i++) {
        switch (y[i].id) {
            case 'nDNI':
                if (y[i].value.length < 8) {
                    y[i].className += " invalid";
                    valid = false;
                }
                break;
                
            case 'apellido':
                if (y[i].value.length < 3) {
                    y[i].className += " invalid";
                    valid = false;
                }
                break;

            case 'nombre':
                if (y[i].value.length < 3) {
                    y[i].className += " invalid";
                    valid = false;
                }
                break;

            case 'nTel':
                if (y[i].value.length != 9) {
                    y[i].className += " invalid";
                    valid = false;
                }
                break;

            case 'correo':
                if (!ValidateEmail(y[i].value)) {
                    y[i].className += " invalid";
                    valid = false;
                }
                break;
        
            default:
                break;
        }
    }
    
    //validacion para combos
    for (n = 0; n < combos.length; n++) {
        if (combos[n].value == 0) {
            combos[n].classList.add("invalid-select");
            valid = false;
        }
    }

    if (combosSelect2 != null) {
        if (combosSelect2.textContent == '- Distrito -' || combosSelect2.textContent =='Seleccione distrito') {
            combosSelect2.classList.add("invalid-select");
            valid = false;
        }
        document.querySelector("#select2-distrito-container").addEventListener('click', (event) => {
            document.querySelector("#select2-distrito-container").classList.remove('invalid-select')
        });
    }

    if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}
function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}
function resetForm() {
    nextPrev(-1);
    nextPrev(-1);
    nextPrev(-1);
}
//========================================select por provincia
const lima = {
    0: "Seleccione distrito",
    1249: "LIMA",
    1250: "ANCON",
    1251: "ATE",
    1252: "BARRANCO",
    1253: "BREÑA",
    1254: "CARABAYLLO",
    1255: "CHACLACAYO",
    1256: "CHORRILLOS",
    1257: "CIENEGUILLA",
    1258: "COMAS",
    1259: "EL AGUSTINO",
    1260: "INDEPENDENCIA",
    1261: "JESUS MARIA",
    1262: "LA MOLINA",
    1263: "LA VICTORIA",
    1264: "LINCE",
    1265: "LOS OLIVOS",
    1266: "LURIGANCHO",
    1267: "LURIN",
    1268: "MAGDALENA DEL MAR",
    1269: "PUEBLO LIBRE",
    1270: "MIRAFLORES",
    1271: "PACHACAMAC",
    1272: "PUCUSANA",
    1273: "PUENTE PIEDRA",
    1274: "PUNTA HERMOSA",
    1275: "PUNTA NEGRA",
    1276: "RIMAC",
    1277: "SAN BARTOLO",
    1278: "SAN BORJA",
    1279: "SAN ISIDRO",
    1280: "SAN JUAN DE LURIGANCHO",
    1281: "SAN JUAN DE MIRAFLORES",
    1282: "SAN LUIS",
    1283: "SAN MARTIN DE PORRES",
    1284: "SAN MIGUEL",
    1285: "SANTA ANITA",
    1287: "SANTA ROSA",
    1288: "SANTIAGO DE SURCO",
    1289: "SURQUILLO",
    1290: "VILLA EL SALVADOR",
    1291: "VILLA MARIA DEL TRIUNFO",
    1286: "SANTA MARÃA DEL MAR"

};
const callao = {
    0: "Seleccione distrito",
    678: "CALLAO",
    679: "BELLAVISTA",
    680: "CARMEN DE LA LEGUA REYNOSO",
    681: "LA PERLA",
    682: "LA PUNTA",
    683: "VENTANILLA"

};
const cañete = {
    0: "Seleccione distrito",
    1310: "ASIA",
    1317: "MALA",
    1312: "	CERRO AZUL",
    1309: "SAN VICENTE DE CAÑETE",
    1313: "CHILCA",
    1323: "	SANTA CRUZ DE FLORES"
};
const huaura = {
    0: "Seleccione distrito",
    1369: "	HUACHO",
    1380: "VEGUETA"
}

var todasProvincias = [
    [], lima, callao, cañete, huaura
];

function cambia_provincia() {
    //tomo el valor del select de la provincia elegida
    var provincia;
    provincia = document.fprestamo.provincia[document.fprestamo.provincia.selectedIndex].value;
    //miro a ver si el provincia estÃ¡ definido
    if (provincia != 0) {
        //si estaba definido, entonces coloco las opciones de la provincia correspondiente.
        //selecciono el array de provincia adecuado
        mis_provincias = todasProvincias[provincia];
        num_provincias = Object.keys(mis_provincias).length;
        //calculo el numero de provincias
        // num_provincias = mis_provincias.length;
        //marco el nÃºmero de provincias en el select
        document.fprestamo.distrito.length = num_provincias;
        //para cada provincia del array, la introduzco en el select
        for (i = 0; i < num_provincias; i++) {
            html = "";
            if (provincia == 1) {
                for (var key in lima) {
                    html += "<option value=" + key + ">" + lima[key] + "</option>";
                    document.getElementById("distrito").innerHTML = html;
                }
            } else if (provincia == 2) {
                for (var key in callao) {
                    html += "<option value=" + key + ">" + callao[key] + "</option>";
                    document.getElementById("distrito").innerHTML = html;
                }
            } else if (provincia == 3) {
                for (var key in cañete) {
                    html += "<option value=" + key + ">" + cañete[key] + "</option>";
                    document.getElementById("distrito").innerHTML = html;
                }
            } else if (provincia == 4) {
                for (var key in huaura) {
                    html += "<option value=" + key + ">" + huaura[key] + "</option>";
                    document.getElementById("distrito").innerHTML = html;
                }
            }
        }
    } else {
        //si no habÃ­a provincia seleccionada, elimino las provincias del select
        document.fprestamo.distrito.length = 1;
        //coloco un guiÃ³n en la Ãºnica opciÃ³n que he dejado
        document.fprestamo.distrito.options[0].value = "-";
        document.fprestamo.distrito.options[0].text = "-";
    }
    //marco como seleccionada la opciÃ³n primera de distrito
    document.fprestamo.distrito.options[0].selected = true;
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

