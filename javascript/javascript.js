const anteBtn = document.querySelector("#buttonante"); 
const sigBtn = document.querySelector("#buttonsig"); 
const libro = document.querySelector("#libro");

const pagina1 = document.querySelector("#pag1");
const pagina2 = document.querySelector("#pag2");
const pagina3 = document.querySelector("#pag3");

anteBtn.addEventListener("click", irPaginaAnte);
sigBtn.addEventListener("click", irSiguientePag);

let libroTotal = 1;
let numDePagi = 3;
let totalPaginas = numDePagi + 1;

const paginas = [
    document.querySelector("#pag1"),
    document.querySelector("#pag2"),
    document.querySelector("#pag3")
];


const libroEstado = {
    libroTotal: 1,
    totalPaginas: function() {
        return this.numDePagi + 1;
    },
    abrirLibro: function() {
        libro.style.transform = "translateX(50%)";
        anteBtn.style.transform = "translateX(-180px)";
        sigBtn.style.transform = "translateX(180px)";
    },
    cerrarLibro: function(isAtBeginning) {
        if (isAtBeginning) {
            libro.style.transform = "translateX(0%)";
        } else {
            libro.style.transform = "translateX(100%)";
        }
        anteBtn.style.transform = "translateX(0px)";
        sigBtn.style.transform = "translateX(0px)";
    }
};

function redirigir(url) {
    window.location.href = url;
}

function abrirLibro() {
    libro.style.transform = "translateX(50%)";
    anteBtn.style.transform = "translateX(-180px)";
    sigBtn.style.transform = "translateX(180px)";
}

function cerrarLibro(isAtBeginning) {
    if (isAtBeginning) {
        libro.style.transform = "translateX(0%)";
    } else {
        libro.style.transform = "translateX(100%)";
    }
    
    anteBtn.style.transform = "translateX(0px)";
    sigBtn.style.transform = "translateX(0px)";
}

function irSiguientePag() {
    console.log("Botón siguiente presionado");
    if (libroTotal < totalPaginas) {
        switch (libroTotal) {
            case 1:
                abrirLibro();
                pagina1.classList.add("flipped");
                pagina1.style.zIndex = 1;
                break;
            case 2:
                pagina2.classList.add("flipped");
                pagina2.style.zIndex = 2;
                break;
            case 3:
                pagina3.classList.add("flipped");
                pagina3.style.zIndex = 3;
                cerrarLibro(false);
                break;
            default:
                throw new Error("unknown state");
        }
        libroTotal++;
    }
}

function irPaginaAnte() {
    console.log("Botón anterior presionado"); 
    if (libroTotal > 1) {
        switch (libroTotal) {
            case 2:
                cerrarLibro(true);
                pagina1.classList.remove("flipped");
                pagina1.style.zIndex = 3;
                break;
            case 3:
                pagina2.classList.remove("flipped");
                pagina2.style.zIndex = 2;
                break;
            case 4:
                abrirLibro();
                pagina3.classList.remove("flipped");
                pagina3.style.zIndex = 1;
                break;
            default:
                throw new Error("unknown state");
        }
        libroTotal--;
    }
}
