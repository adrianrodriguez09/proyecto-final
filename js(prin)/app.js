
// aqui declare las variables

const contenedorProductos = document.getElementById('contenedor-productos')

const servicios = document.getElementById('servicios')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const comprarButton = document.querySelector('.comprarButton')

const btnFinalizar = document.getElementById('submit')

const button = document.getElementById('ir')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []




document.addEventListener('DOMContentLoaded', () => {
        carrito = JSON.parse(localStorage.getItem('carrito')) || ['carrito vacio']
        actualizarCarrito()
    
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    removerJson()
    actualizarCarrito()
})

 fetch('stockHabitaciones.json') //muestro en pantalla las habitaciones
.then (response => response.json())
.then (habitaciones => {
    mostrarContenido(habitaciones)
    
 })

 function mostrarContenido(habitaciones){
 
habitaciones.forEach(contenido=>{
    const{img, nombre, precio, id, desc, tipo} = contenido
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${img || "lo sentimos esta img no esta cargada"} alt= "">
    <h3>${nombre || "lo sentimos tenemos unos problemas para cargar esta habitacion"}</h3>
    <p>${desc || "lo sentimos estamos teniendo problemas"}</p>
    <p>Tipo: ${tipo || "lo sentimos estamos teniendo problemas para cargar la info"}</p>
    <p class="precioProducto">Precio:$ ${precio}</p>
    <button id="agregar${id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

  
    const boton = document.getElementById(`agregar${id}`)
 

    boton.addEventListener('click', () => {
     
        agregarAlCarrito(id)
        
    })
})

 }
// funcion de agregarAlCarrito
const agregarAlCarrito = (prodId) => {   

    
    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
}


// funcion de eliminar el producto
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 
    removerJson()
    actualizarCarrito() 
    
}

const actualizarCarrito = () => {
   
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const {nombre, precio, cantidad, id} = prod
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${nombre}</p>
        <p>Precio:$${precio}</p>
        <p>Cantidad: <span id="cantidad">${cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${id})"class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length 
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
}

comprarButton.addEventListener('click', ()=>{
   if(carrito.length > 1){  
   location.href = "registrate.html"}else{
    Swal.fire({
        icon: 'error',
        title: 'ups!',
        text: 'por favor agrega productos al carrito para poder realizar esta accion',
    })}
})

function realizarCompra(){
    contenedorCarrito.innerHTML = "";
    precioTotal.innerHTML = "0";
}

function removerJson() {
    localStorage.removeItem("carrito")
}


             

