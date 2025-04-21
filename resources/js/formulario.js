
function mostrarFormulario(curso) {
    document.getElementById('cursoSeleccionado').value = curso;
    document.getElementById('formulario-overlay').classList.add('active');
}

function ocultarFormulario() {
    document.getElementById('formulario-overlay').classList.remove('active');
}