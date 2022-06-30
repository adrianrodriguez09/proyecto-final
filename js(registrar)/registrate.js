const focoEnCampus = ()=> {
    const campos = document.querySelectorAll("input")
    for( let campo of campos){
        if( campo.type != "submit"){
            campo.addEventListener("focus", ()=> campo.className = "fondo-red")
            campo.addEventListener("blur", ()=> campo.className = "")
        }
    }
}
focoEnCampus()

btnsubmit.addEventListener("click", (e)=>{
    e.preventDefault()
     guardarDatosDeUsr()
  
})



function guardarDatosDeUsr (){
const datosUsr = {
    nombre:inputNombre.value,
    telefono:inputNombre.value,
    email:inputEmail.value
}
let str = JSON.stringify(datosUsr)
localStorage.setItem("datosDeUsr", str)

    
}

function recuperoDatosDeUsr (){

    if(localStorage.getItem("datosDeUsr")){
      const datosDeUsr = JSON.parse(localStorage.getItem("datosDeUsr"))
        inputNombre.value = datosDeUsr.nombre
        inputTelefono.value = datosDeUsr.telefono
        inputEmail.value = datosDeUsr.email
     }
    
}

recuperoDatosDeUsr()