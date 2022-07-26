

btnsubmit.addEventListener('click',  ()=>{
    
     guardarDatosDeUsr()
     Swal.fire({
        title: 'TUS DATOS SE CARGARON CORRECTAMENTE!',
      text: 'Gracias!!',
      icon: 'info',
      
      })
     
      form.reset()
      btnVolver.addEventListener("click", ()=> {
        location.href = "index.html"
    })
})


function guardarDatosDeUsr (){
const datosUsr = {
    nombre:inputNombre.value,
    contraseña:inputContraseña.value,
    email:inputEmail.value
}
let str = JSON.stringify(datosUsr)
localStorage.setItem("datosDeUsr", str)

}

function recuperoDatosDeUsr (){

    if(localStorage.getItem("datosDeUsr")){
      const datosDeUsr = JSON.parse(localStorage.getItem("datosDeUsr"))
        inputNombre.value = datosDeUsr.nombre
        inputContraseña.value = datosDeUsr.telefono
        inputEmail.value = datosDeUsr.email
     }
    
}

recuperoDatosDeUsr()
const $btnSingIn = document.querySelector('.sign-in-btn'),
      $btnSingUp = document.querySelector('.sign-up-btn'),
      $signUp = document.querySelector('.sign-up'),
      $signIn = document.querySelector('.sign-in')

document.addEventListener('click', e =>{
    if(e.target === $btnSingIn || e.target === $btnSingUp){
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
})      