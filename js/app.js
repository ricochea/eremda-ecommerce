const productos = [
	{
		id: 1,
		title: "Café instantáneo Nescafé Dolca lata 170 g",
		price: 5460,
		stock: 35,
		image: "https://unimarc.vtexassets.com/arquivos/ids/192567-480-480/000000000000010524-UN-01.jpg?v=637199839616500000"
	},
	{
		id: 2,
		title: "Crema de leche Nestlé lata abre fácil 236 g",
		price: 3780,
		stock: 42,
		image: "https://unimarc.vtexassets.com/arquivos/ids/198385-480-480/000000000000344300-UN-01.jpg?v=637291753849770000"
	},
	{
		id: 3,
		title: "Pack Cerveza Budweiser botella 6 un de 355 cc",
		price: 7490,
		stock: 33,
		image: "https://unimarc.vtexassets.com/arquivos/ids/220684-480-480/000000000000009071-DIS-01.jpg?v=637692199425800000"
	},
	{
		id: 4,
		title: "Vino Casillero del Diablo reserva cabernet sauvignon 750 cc",
		price: 4750,
		stock: 15,
		image: "https://unimarc.vtexassets.com/arquivos/ids/203835-480-480/000000000000009340-UN-01.jpg?v=637396961780670000"
	},
	{
		id: 5,
		title: "Arroz Miraflores G1 largo ancho bolsa 1 Kg",
		price: 1890,
		stock: 17,
		image: "https://unimarc.vtexassets.com/arquivos/ids/193552-480-480/000000000000006105-UN-01.jpg?v=637220709271470000"
	},
	{
		id: 6,
		title: "Papel higiénico Confort doble hoja 4 un de 25 m",
		price: 1250,
		stock: 10,
		image: "https://unimarc.vtexassets.com/arquivos/ids/224375-480-480/000000000000646142-UN-01.jpg?v=637816709727870000"
	},
	{
		id: 7,
		title: "Quinoa Carozzi 250 g",
		price: 2870,
		stock: 28,
		image: "https://unimarc.vtexassets.com/arquivos/ids/193540-480-480/000000000000623026-UN-01.jpg?v=637220702166070000"
	},
	{
		id: 8,
		title: "Pasta corbatas Carozzi 400 g",
		price: 1610,
		stock: 20,
		image: "https://unimarc.vtexassets.com/arquivos/ids/195278-480-480/000000000000006459-UN-01.jpg?v=637260205530630000"
	},
	{
		id: 9,
		title: "Aceite Chef maravilla 0% colesterol 1 L",
		price: 4090,
		stock: 21,
		image: "https://unimarc.vtexassets.com/arquivos/ids/196324-480-480/000000000000004912-UN-01.jpg?v=637270009560970000"
	},
	{
		id: 10,
		title: "Sal de mar fina Oceánica bolsa 1 Kg",
		price: 360,
		stock: 12,
		image: "https://unimarc.vtexassets.com/arquivos/ids/202258-480-480/000000000000645794-UN-01.jpg?v=637371132537730000"
	}
]
/* INICIO - VARIABLES */
// Declaración de variables del DOM
let pantProducto = document.getElementById("pantProducto")
let pantCarrito = document.getElementById("pantCarrito")

let contProductos = document.getElementById("contProducto")

let btnCarro = document.getElementById('btnCarrito')
let btnMenu = document.getElementById('btnMenu')

const items = document.getElementById('body_carrito')
const footer = document.getElementById('footer_carrito')

const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')

const isOk = true
let pagina = 1
/* FIN - VARIABLES*/

/* INICIO - EVENT LISTENER */
//DOMContentLoaded
window.addEventListener("DOMContentLoaded", () =>{
    
    mostrarProductos()
    mostrarProductosML()
    
       
    if(localStorage.getItem('carrito')){
        state.carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    render()
})
//tbody Tabla Carrito
items.addEventListener('click', e => { btnAccion(e)})

//Botón Carrito de Compras - Muestra sección con tabla con ítems comprados en Carrito
btnCarro.addEventListener('click',()=>{
    pantProducto.classList.add("nomostrar")
    pantProducto.classList.remove("mostrar")

    pantCarrito.classList.add("mostrar")
    pantCarrito.classList.remove("nomostrar")
})

//Botón Menú Productos - Muestra sección con card de productos 
btnMenu.addEventListener('click',()=>{
    pantProducto.classList.add("mostrar")
    pantProducto.classList.remove("nomostrar")

    pantCarrito.classList.add("nomostrar")
    pantCarrito.classList.remove("mostrar")
})

//Botón Siguiente - Paginado de Productos
btnSiguiente.addEventListener('click', () => {
    pagina += 20
	contProductos.innerHTML = "";
	btnAnterior.className = 'btn';
    mostrarProductosML()
})

//Botón Anterior - Paginado de Productos
btnAnterior.addEventListener('click', () => {
    if (pagina > 20) {
        pagina -= 20
		contProductos.innerHTML = "";
        mostrarProductosML()
    } else { 
        mostrarProductos()
        mostrarProductosML()
        btnAnterior.className = 'nobtn';}
})
/* FIN - EVENT LISTENER */

/* INICIO - FUNCIONES PARA FETCH DE PRODUCTOS */
//CustomFetch tipo API
const customFetch = (time,task) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if (isOk){
                resolve(task)
            } else
            {
                reject("Error")
            }
        },time)
    })
}

//Función para visualizar productos Harcodeados
const mostrarProductos = () => {
    customFetch(1500,productos).then(data => {
                                            for(let d of data){
                                                crearCard(d.id, d.title, d.price, d.stock, d.image)
                                            }
    }
    )
}

//Función para visualizar productos de API MercadoLibre con AXIOS
const mostrarProductosML = async () => {
    try {
        const respuesta = await axios.get('https://api.mercadolibre.com/sites/MLC/search?category=MLC1423', {
            params: {
                limit: 20,
                offset: pagina
            },
        })

        if (respuesta.status === 200) {
            contProductos.innerHTML = "";
            btnSiguiente.className = 'btn';
            const datos = await respuesta.data.results
                for(let d of datos){
                    crearCard(d.id, d.title, d.price, d.available_quantity, d.thumbnail)
                }

        } else if (respuesta.status === 401) {
            console.log('You dont have access to this resource')
        } else if (respuesta.status === 404) {
            console.log('El producto no pudo ser encontrado')
        } else {
            console.log('Algo malo ocurrió...')
        }
    }
     catch(err) {
        console.log('error del catch')
    }
}
/* FIN - FUNCIONES PARA FETCH DE PRODUCTOS */

/* INICIO - REACTIVIDAD EN JS CON ESTADO (Permite renderizar por cambio de ESTADO y solo inmutabilidad por función)*/
//State
const state = {
    carrito : {}
}

//Template UI
const template = () =>{
    if (Object.values(state.carrito).length <1){
        return "0"
    }
    let nCantidad = Object.values(state.carrito).reduce((acc, {cantidad})=> acc + cantidad,0)
    return nCantidad
}

//Render UI
const render = () =>{
    btnCarro.textContent = `🛒 Carrito (${template()})`
    pintarTablaCarrito()
}

//Copiar State
const getState = () => JSON.parse(JSON.stringify(state))

//Set State
const setState = (obj) =>{
    for (let key in obj){
        if (state.hasOwnProperty(key)){
            state[key] = obj[key]
        }
    }
    render()
}

//Set Objeto Carrito con copia de State
const setCarrito = objeto =>{
    const lastState = getState()

    const producto = {
        id: objeto.querySelector('.btn').id,
        title: objeto.querySelector('h2').textContent,
        precio: objeto.querySelector('span').textContent,
        cantidad: 1,
        img: objeto.querySelector('img').src
    }

    if(lastState.carrito.hasOwnProperty(producto.id)){
        producto.cantidad = lastState.carrito[producto.id].cantidad + 1
    }
    lastState.carrito[producto.id] = {...producto}

    setState(lastState)
}

//Evento Btn +- // Agrega o Quita cantidad a un producto del Carrito
const btnAccion = e =>{
    let lastState =getState()

    if(e.target.classList.contains('btn-mas')){
        const producto = lastState.carrito[e.target.dataset.id]
        producto.cantidad = lastState.carrito[e.target.dataset.id].cantidad +1
        setState(lastState)
    }
    if(e.target.classList.contains('btn-menos')){
        const producto = lastState.carrito[e.target.dataset.id]
        producto.cantidad = lastState.carrito[e.target.dataset.id].cantidad -1
        if(producto.cantidad <= 0){
            delete lastState.carrito[e.target.dataset.id]
        }
        setState(lastState)
    }
    e.stopPropagation()
}
/* FIN - REACTIVIDAD EN JS CON ESTADO*/

/* INICIO - FORMATO ESTRUCTURA DE TABLA Y PRODUCTOS */
// Formato template Card de Productos
const crearCard = (id, title, price, stock, image) =>{
	const cardProducto = document.createElement("div")
	cardProducto.classList.add("boxCard")
	let prodTitulo = document.createElement("h2")
	prodTitulo.textContent = title
	cardProducto.appendChild(prodTitulo)

	let prodImg = document.createElement("img")
	prodImg.classList.add("imgCard")
	prodImg.setAttribute("src",image)
	cardProducto.appendChild(prodImg)

    let prodPrice = document.createElement("p")
    let prodSpan = document.createElement("span")
    prodSpan.textContent = price
    prodPrice.textContent = "Precio: $ "
    prodPrice.appendChild(prodSpan) 
	cardProducto.appendChild(prodPrice)

	let prodStock = document.createElement("p")
	prodStock.textContent = "Stock Disponible: " + stock
	cardProducto.appendChild(prodStock)

	let btnAgregar = document.createElement("button")
	btnAgregar.textContent = "Comprar"
	btnAgregar.classList.add("btn")
	btnAgregar.setAttribute("id", id)
    btnAgregar.addEventListener("click", e => {
        addCarrito(e)
    })
	cardProducto.appendChild(btnAgregar)
	contProductos.append(cardProducto)
}

//Evento Btn Comprar // Agrega productos al Carro
const addCarrito = e =>{
    setCarrito(e.target.parentElement)
    e.stopPropagation()
} 

//Formato template de productos en Tabla // Muestra detalle de productos agregados al Carrito
const pintarTablaCarrito = () =>{
    items.innerHTML = ""
    Object.values(state.carrito).forEach(producto => {
        let thRow = document.createElement('tr')

        let tdId = document.createElement('th')
        tdId.textContent = producto.id
        thRow.appendChild(tdId)

        let Imagen = document.createElement("img")
	    Imagen.classList.add("imgCardTabla")
	    Imagen.setAttribute("src",producto.img)
        
        let tdimg = document.createElement('td')
        tdimg.appendChild(Imagen)
        thRow.appendChild(tdimg)
    
        let tdTitle = document.createElement('td')
        tdTitle.textContent = producto.title
        thRow.appendChild(tdTitle)

        let tdPrecio = document.createElement('td')
        tdPrecio.textContent = producto.precio
        thRow.appendChild(tdPrecio)

        let tdCant = document.createElement('td')
        tdCant.textContent = producto.cantidad
        thRow.appendChild(tdCant)

        let tdTotal = document.createElement('td')
        tdTotal.textContent = parseInt(producto.precio) * parseInt(producto.cantidad)
        thRow.appendChild(tdTotal)

        let tdOpciones = document.createElement('td')
        let btnMas = document.createElement('button')
        btnMas.textContent = "+"
        btnMas.classList.add("btn")
        btnMas.classList.add("btn-mas")
        btnMas.dataset.id = producto.id

        tdOpciones.appendChild(btnMas)
        let btnMenos = document.createElement('button')
        btnMenos.textContent = "-"
        btnMenos.classList.add("btn")
        btnMenos.classList.add("btn-menos")
        btnMenos.dataset.id = producto.id

        tdOpciones.appendChild(btnMenos)
        thRow.appendChild(tdOpciones)     

        items.appendChild(thRow)
    })
    pintarTablaFooter()
    localStorage.setItem('carrito', JSON.stringify(state.carrito))
}

//Formato template de footer en Tabla // Muestra mensaje de "Carrito Vacio" o "Detalle del Total de Compras"
const pintarTablaFooter = () =>{
    footer.innerHTML = ""
    if (Object.keys(state.carrito).length === 0){
        footer.innerHTML = '<th colspan="7">Carrito Vacío - Compre algún producto</th>'
        return
    }

    const nCantidad = Object.values(state.carrito).reduce((acc, {cantidad})=> acc + cantidad,0)
    const nTotal = Object.values(state.carrito).reduce((acc, {cantidad, precio})=>acc + (cantidad * precio),0)

    let thTotalProd = document.createElement('th')
    thTotalProd.setAttribute('colspan',4)
    thTotalProd.textContent = "Total Productos"
    footer.appendChild(thTotalProd)

    let tdTotalCantidad = document.createElement('td')
    tdTotalCantidad.textContent = nCantidad
    footer.appendChild(tdTotalCantidad)

    let tdTotalPrecio= document.createElement('td')
    tdTotalPrecio.textContent = nTotal
    footer.appendChild(tdTotalPrecio)

    let tdBoton = document.createElement('td')
    let btnVaciarCarrito = document.createElement('button')
    btnVaciarCarrito.textContent = "Vaciar Todo"
    btnVaciarCarrito.classList.add('btn')
    btnVaciarCarrito.addEventListener('click', () =>{
        let lastState = getState()
        lastState.carrito = {}
        setState(lastState)
    })
    tdBoton.appendChild(btnVaciarCarrito)
    footer.appendChild(tdBoton)
}
/* FIN - FORMATO ESTRUCTURA DE TABLA Y PRODUCTOS */











