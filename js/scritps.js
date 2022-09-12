
const mostrarProductos = (coleccionHarryPotter) => {
    const tarjeta = document.getElementById("tarjetas");
    coleccionHarryPotter.forEach(libro => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `<div class="col d-flex justify-content-center mb-2 mt-2 ">
                            <div class="card bg-dark rounded"style="width:18rem;">
                                <h5 class="card-title pt-2 text-center text-primary">${libro.titulo} </h5>
                                <img src="${libro.img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="text-primary text-center">Precio: <span class="precio">$${libro.precio}</span></h5>
                                    <div class="d-grid gap-2">
                                        <button  class="btn btn-primary button">Añadir a Carrito</button>
                                    </div>
                                </div>
                            </div>
                        </div>`
            tarjeta.appendChild(div)
    })   
}
mostrarProductos(coleccionHarryPotter)



const clickbtn = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

clickbtn.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(evento) {
    const button = evento.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}


function addItemCarrito(newItem) {

    const alert = document.querySelector('.alert')

    setTimeout(function () {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    const InputElemnto = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemnto[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }

    carrito.push(newItem)

    renderCarrito()
}


function renderCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout(function () {
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')

    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}

const btnSwal = document.getElementById('botonSwal');
btnSwal.onclick = () => {
    Swal.fire(
        {
            title: 'Travesura Realizada!',
            icon: 'success',
            iconColor: '#311B92',
            timer: 3000,

        }
    )
}
