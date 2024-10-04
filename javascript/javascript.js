document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('json/libros.json');
        const data = await response.json();
        const paginas = data.paginas; 
        const contenidoLibro = document.getElementById('contenidoLibro');

        paginas.forEach(function(url) {
            const paginaDiv = document.createElement('div');
            paginaDiv.classList.add('flipbook');
            
            const img = document.createElement('img');
            img.src = url;
            img.alt = "Página del libro";
            img.classList.add('img-fluid');

            paginaDiv.appendChild(img);
            contenidoLibro.appendChild(paginaDiv);
        });

        if (!Array.isArray(paginas) || paginas.length === 0) {
            console.error('No se encontraron páginas en el JSON.');
            return;
        }

        $('#contenidoLibro').turn({
            display: 'double', 
            acceleration: true,
            gradients: !$.isTouch,
            elevation: 50,
            when: {
                turned: function(e, page) {
                    console.log('Página actual: ', page);
                }
            }
        });
    } catch (error) {
        console.error('Error al cargar el libro:', error);
    }
});

$('#contenidoLibro').on('click', function (e) {
    const containerWidth = $(this).width();
    const clickPosition = e.pageX - $(this).offset().left;

    (clickPosition < containerWidth / 2) 
        ? $(this).turn('previous') 
        : $(this).turn('next');
});

$(window).bind('keydown', function(e){
    if (e.keyCode == 37) { 
        $('#contenidoLibro').turn('previous');
    } else if (e.keyCode == 39) {
        $('#contenidoLibro').turn('next');
    }
});

function seleccionarLibro(tituloLibro, url) {
    localStorage.setItem('libroSeleccionado', tituloLibro);
    window.location.href = url;
}

function obtenerLibroSeleccionado() {
    const libro = localStorage.getItem('libroSeleccionado');
    if (libro) {
        console.log(`Libro seleccionado: ${libro}`);
    } else {
        console.log('No hay libro seleccionado en localStorage.');
    }
}

function eliminarLibroSeleccionado() {
    localStorage.removeItem('libroSeleccionado');
    console.log('Libro seleccionado eliminado de localStorage.');
}