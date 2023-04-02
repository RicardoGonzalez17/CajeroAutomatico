var cuentas = [
    {
        nombre: "Ricardo González", tarjeta: 1234567890, pin: 1500, saldo:900
    },
    {
        nombre: "Israel Vindiola", tarjeta: 0987654321, pin: 5000, saldo:650
    },
    {
        nombre: "Luis Ramos", tarjeta: 1592637456, pin: 0000, saldo:420
    },
    {
        nombre: "Ricardo González", tarjeta: 1478523690, pin: 1111, saldo:100
    }]

const ValidarInformacion = () => {
    var found = false;
    var inputNoClave = document.getElementById("input-clave")
    var inputPin = document.getElementById("input-pin")
    document.getElementById("div-mensaje").innerHTML=""

    for (let index = 0; index < cuentas.length; index++) {
        if (inputNoClave.value == cuentas[index].tarjeta && inputPin.value == cuentas[index].pin) {
            SetLocalStorage(cuentas[index]);
            LimpiarForm()
            CargarPrincipal();
            found = true;
        }
    }
    if(!found){
        document.getElementById("div-mensaje").innerHTML =
            `<p>Datos incorrectos</p>`

    }
    
}

const LimpiarForm = () => {
    document.getElementById("input-clave").value = ""
    document.getElementById("input-pin").value = ""
}

const CargarPrincipal = () => {
    window.location = "./principal/principal.html"
}

const SetLocalStorage = (cuenta) => {
    localStorage.setItem("cuenta", JSON.stringify(cuenta))
}
