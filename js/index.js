const PRODUCTOS_ARRAY = [
    {id: 1, nombre: "jordans", precio: 250},
    {id: 2, nombre: "pandas", precio: 150},
    {id: 3, nombre: "cracks", precio: 180},
    {id: 4, nombre: "mujer", precio: 260}
];

let carrito = [];

function mostrar_PRODUCTOS() {
    const section_productos = document.getElementById('productos');
    PRODUCTOS_ARRAY.forEach(producto => {
        const CARD_DIV = document.createElement('div');
        CARD_DIV.className = 'card-container';
        CARD_DIV.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button onclick="añadirCarrito(${producto.id})">Agregar</button>
        `;
        section_productos.appendChild(CARD_DIV);
    });
}

function añadirCarrito(id) {
    const CARRITO = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = PRODUCTOS_ARRAY.find(prod => prod.id === id);
    const productoEnCarrito = CARRITO.find(prod => prod.id === id); 
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        CARRITO.push({...producto, cantidad: 1});
    }

    localStorage.setItem('carrito', JSON.stringify(CARRITO));
    mostrarCarrito(); 
}

function mostrarCarrito() {
    const CARRITO = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoList = document.getElementById('carrito');
    carritoList.innerHTML = ''; 
    let total = 0;

    CARRITO.forEach((producto, index) => {
        const li = document.createElement('li'); 
        li.textContent = `${producto.nombre} - ${producto.precio}`;
        li.innerHTML += `<button onclick="eliminarDelCarrito(${index})">Eliminar del carrito</button>`; 
        carritoList.appendChild(li);
        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total').textContent = `Total: ${total}`;
}

function eliminarDelCarrito(index) {
    const CARRITO = JSON.parse(localStorage.getItem('carrito')) || [];
    CARRITO.splice(index, 1); // Elimina el producto en el índice especificado
    localStorage.setItem('carrito', JSON.stringify(CARRITO)); // Actualiza el carrito en localStorage
    mostrarCarrito(); // Actualiza la vista del carrito
}

document.addEventListener('DOMContentLoaded', () => {
    mostrar_PRODUCTOS();
    mostrarCarrito();
});