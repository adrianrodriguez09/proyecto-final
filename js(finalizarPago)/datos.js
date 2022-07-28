
// funcion de guardar datos de usuario

function guardarDatosDeUsr (){
const datosUsr = {
    nombre:inputNombre.value,
    ciudad:inputCiudad.value,
    email:inputEmail.value,
    banco:inputBanco.value,
    telefono:inputTelefono.value

}
let str = JSON.stringify(datosUsr)
localStorage.setItem("datosDeUsr", str)
}

function recuperoDatosDeUsr (){

    if(localStorage.getItem("datosDeUsr")){
      const datosDeUsr = JSON.parse(localStorage.getItem("datosDeUsr"))
        inputNombre.value = datosDeUsr.nombre
        inputCiudad.value = datosDeUsr.ciudad
        inputEmail.value = datosDeUsr.email
        inputBanco.value = datosDeUsr.banco
        inputTelefono.value = datosDeUsr.telefono
     }
    
}

recuperoDatosDeUsr()

btnVolver.addEventListener("click", ()=>{
  location.href = "index.html"
})

btnsubmit.addEventListener("click", (e)=>{
    e.preventDefault()
    inputNombre.value, inputEmail.value, inputCiudad.value, inputTelefono.value, inputBanco.value  === "" ? Swal.fire({
        icon: 'error',
        title: 'oh No!',
        text: 'Parece que faltan algunos datos',
      }) : (guardarDatosDeUsr(), Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Tus datos fueron enviados',
        text: 'Gracias por elegirnos'
      }),storageRemove(),setTimeout(()=>{
        window.scroll(top)
      }, 900)
       ,setTimeout(()=>{
          location.reload()
      }, 900))
      
  
      form.reset()
    
    })

    function storageRemove() {
      localStorage.clear()
  }


recuperarCarrito.addEventListener("click", (e)=>{
  e.preventDefault()
  let carrito = JSON.parse(localStorage.getItem("carrito")) || []
  if (carrito.length > 0) {
      recuperarPedido()
  }else if (carrito.length < 1) {
    Swal.fire({
        icon: 'error',
        title: 'Aquí no hay nada',
        text: 'Tu carrito todavía está vacio',
      })
    }
  })


function recuperarPedido() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || []
  if (carrito.length > 0 ){ 
          
    let div = document.createElement("div")
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    let item = ""
    for (el of carrito) {
        
        item += `<h3>${el.nombre} - $${el.precio} Cantidad:${el.cantidad}</h3>`
    }
    
    miCarrito.innerHTML = item
    
    
    let final  = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
    totalCompra.innerHTML =""
    div.innerHTML = `<h2>TOTAL FINAL: $${final}</h2>` 
    totalCompra.appendChild(div)

}
}
  
   