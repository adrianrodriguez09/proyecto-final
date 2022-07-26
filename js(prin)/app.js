


const contenedorProductos = document.getElementById('contenedor-productos')

const servicios = document.getElementById('servicios')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const URL = 'stockHabitaciones.json';

const button = document.getElementById('ir')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []



const comprarButton = document.querySelector('.comprarButton')
comprarButton.addEventListener('click', ()=>{
    realizarCompra()
    Swal.fire({
        title: 'Finalizada la compra',
      text: 'Gracias por elegirnos',
      icon: 'success',
      })
}
)



let carritoDeCompras = []


button.addEventListener("click", ()=> {
  location.href = "registrate.html"
})

document.addEventListener('DOMContentLoaded', () => {
        carrito = JSON.parse(localStorage.getItem('carrito')) || ['carrito vacio']
        actualizarCarrito()
    
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

fetch('stockHabitaciones.json')
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

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 
    
    actualizarCarrito() 
    
}

const actualizarCarrito = () => {
   
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})"class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length 
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
}

function realizarCompra(){
    contenedorCarrito.innerHTML = "";
    precioTotal.innerHTML = "0";
}


             

