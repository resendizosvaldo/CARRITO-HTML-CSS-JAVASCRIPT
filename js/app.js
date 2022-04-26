//VARIABLES
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners() {
    //CUANDO AGREGAR UN CURSO PRESIONANDO 'AGREGAR AL CARRITO'
    listaCursos.addEventListener('click', agregarCurso);

    //ELIMINA CURSOS DEL CARRITO
    carrito.addEventListener('click', eliminarCurso);

    //VACIAR CARRITO
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo
        limpiarHTML();
    });
};


//FUNCIONES
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // console.log(cursoSeleccionado);
        leerDatosCurso(cursoSeleccionado);
    }

}

//ELMININA EL CURSO DEL CARRITO
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //ELIMINA DEL ARREGLO DE articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //iterar sobre el carrito  y mostrar su HTML
    }
}

//LEE EL CONTENIDO DEL HTML Y EXTRAE LA INFORMACION DEL CURSO

function leerDatosCurso(curso) {
    // console.log(curso);

    //CREAR UN OBJETO CON EL CONTENIDO DEL CURSO ACTUAL
    const infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        //REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //RETORNA EL OBJETO ACTUALIZADO
            } else {
                return curso; //RETORNA OBJETOS QUE NO SON DUPLICADOS
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //AGREGA ELEMENTOS AL ARREGLO DE CARRITO
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);
    carritoHTML();
}

//MUESTRA EL CARRITO DE COMPRAS EN EL HTML

function carritoHTML() {
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
              <td>  
                   <img src="${imagen}" width=100>
              </td>
              <td>${titulo}</td>
              <td>${precio}</td>
              <td>${cantidad} </td>
              <td>
                   <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
              </td>
         `;
        contenedorCarrito.appendChild(row);
    });

}

//ELIMINA LOS CURSOS DEL TABLE BODY

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    //FORMA LENTA
    // contenedorCarrito.innerHTML = '';
}