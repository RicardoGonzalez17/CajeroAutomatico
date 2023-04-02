var btnConsultaSaldo = document.getElementById("btn-consulta")
var modal = document.querySelector(".section-modal");
var btnIngresa = document.getElementById("btn-ingresa")
var btnRetira = document.getElementById("btn-retira")
var btnCloseModal = document.querySelector(".close-modal");
var divModal = document.getElementById("modal");
var cuenta;

const CargarValoresCuenta = () => {
    cuenta = JSON.parse(localStorage.getItem("cuenta"));
    var div = document.querySelector("div");

    div.innerHTML = `
    <h1>Bienvenido  ${cuenta.nombre}</h1>`
    
}
CargarValoresCuenta();
 
const OpenModal = (eventype) =>{
    modal.classList.remove("hidden")
    if (eventype == "consulta")
    {
        divModal.innerHTML = `
        <p>Tu saldo: es</p>
        <h2> $${cuenta.saldo}</h2>`
    }
    else{
        if(eventype == "ingresa")
        {
            divModal.innerHTML = `
            <h2 style="background-color: rgba(28, 53, 59, 0.4);
            border-radius: 5px">Ingresar dinero</h2>
            <label style= "display: flex; 
            flex-direction: column" >¿Cuánto dinero desea ingresar?</label>
            <input style= "margin: 2%;
            padding: 10px 10px;
            font-size: 200%;
            border-radius: 5px;
            width: 30%;" title = "button aceptar"
             type="number"
             id="inputModal">
            <button onclick="btnAceptarModal('ingresar')" style= "display: flex;
            margin: auto;
            padding: 10px;
            font-size: 1.3rem;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            color: white;
            font-family: 'Play', sans-serif;
            background-color: rgba(28, 53, 59, 0.5);" type="button">Aceptar</button>`
        }
        else{
            if(eventype == "retiro")
            {
            divModal.innerHTML = `
            <h2 style="background-color: rgba(28, 53, 59, 0.4);
            border-radius: 5px">Retirar dinero</h2>
            <label style= "display: flex; 
            flex-direction: column" >¿Cuánto dinero desea retirar?</label>
            <input style= "margin: 2%;
            padding: 10px 10px;
            font-size: 200%;
            border-radius: 5px;
            width: 30%;" title = "button aceptar"
             type="number"
             id="inputModal">
            <button onclick="btnAceptarModal('retiro')" style= "display: flex;
            margin: auto;
            padding: 10px;
            font-size: 1.3rem;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            color: white;
            font-family: 'Play', sans-serif;
            background-color: rgba(28, 53, 59, 0.5);" type="button">Aceptar</button>`
            }
            else {
                console.log("s")
            }
        }
    }
}

const btnAceptarModal = (eventype) => {
    if(divModal.getElementsByTagName("p").length==0){
        let p = document.createElement("p")
        divModal.appendChild(p);
        p.style.color = "red"
        
    }
    p = divModal.getElementsByTagName("p")[0]
    if(eventype == "ingresar")
    {
        if(!ValidarIngresoMasSaldo()){
            let inputCantidad = document.getElementById("inputModal");
           if (inputCantidad.value.trim()!="") {
                //Creamos etiqueta p para append en div donde diga operación exitosa y otra etiqueta p donde diga el nuevo saldo
                p.innerHTML = `Ingreso realizado correctamente. Tu nuevo saldo es: $${cuenta.saldo + parseInt(inputCantidad.value)}`
                cuenta.saldo = cuenta.saldo + parseInt(inputCantidad.value)
                localStorage.setItem("cuenta",JSON.stringify(cuenta))
           } else{
            p.innerHTML = `Ingrese una cantidad valida`
           }     
           
        }
        else {
            //Creamos etiqueta p para append en div donde diga que la operación no se realizó porque supera el saldo máximo
            p.innerHTML = `No se realizó la operación, ya que la cuenta no puede tener mas de $990`
        }
    }
    else {
        if(eventype == "retiro")
    {
        if(!ValidarSaldoMenosRetiro()){
            let inputCantidad = document.getElementById("inputModal");
            //Creamos etiqueta p para append en div donde diga operación exitosa y otra etiqueta p donde diga el nuevo saldo
            if (inputCantidad.value.trim()!="") {
                //Creamos etiqueta p para append en div donde diga operación exitosa y otra etiqueta p donde diga el nuevo saldo
                p.innerHTML = `Ingreso realizado correctamente. Tu nuevo saldo es: $${cuenta.saldo - parseInt(inputCantidad.value)}`
                cuenta.saldo = cuenta.saldo - parseInt(inputCantidad.value)
                localStorage.setItem("cuenta",JSON.stringify(cuenta))
           } else{
            p.innerHTML = `Ingrese una cantidad valida`
           }     
        }
        else {
            //Creamos etiqueta p para append en div donde diga que la operación no se realizó porque supera el saldo máximo 
            p.innerHTML = `No se realizó la operación, ya que la cuenta no puede tener menos de $10`
        }
    }
    }
}

function ValidarIngresoMasSaldo() {
    if (cuenta.saldo + parseInt(document.getElementById("inputModal").value) > 990)
    {
        return true;
    }
    else {
        return false
    }
}

function ValidarSaldoMenosRetiro() {
    if (cuenta.saldo - parseInt(document.getElementById("inputModal").value) < 10)
    {
        return true;
    }
    else {
        return false
    }
}

const OpenModalHandler = (eventype) => {
    OpenModal(eventype);
}

btnConsultaSaldo.addEventListener("click", ()=> {
    OpenModalHandler("consulta");
})
btnIngresa.addEventListener("click", ()=> {
    OpenModalHandler("ingresa");
})
btnRetira.addEventListener("click", ()=>{
    OpenModalHandler("retiro")
})


btnCloseModal.addEventListener("click", ()=>{
    modal.classList.add("hidden")
})
