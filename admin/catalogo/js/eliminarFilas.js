document.addEventListener('DOMContentLoaded', function() {
    const btnEliminar = document.getElementById('btnEliminar');
    const btnAgregar = document.getElementById('btnAgregar');
    const btnCancelar = document.getElementById('btnCancelarEliminar');
    const btnConfirmar = document.getElementById('btnConfirmarEliminar');
    const tablas = document.querySelectorAll('table');

    let modoEliminar = false;

    btnEliminar.addEventListener('click', function() {
        if (!modoEliminar) {
            // Activar modo eliminación
            tablas.forEach(tabla => {
                tabla.querySelectorAll('.col-eliminar').forEach(col => col.classList.remove('d-none'));
            });
            btnAgregar.disabled = true;
            btnEliminar.classList.add('d-none');
            btnConfirmar.classList.remove('d-none');
            btnCancelar.classList.remove('d-none');
            modoEliminar = true;
        }
    });

    btnCancelar.addEventListener('click', function() {
        tablas.forEach(tabla => {
            tabla.querySelectorAll('.col-eliminar').forEach(col => col.classList.add('d-none'));
            tabla.querySelectorAll('.col-eliminar input[type="checkbox"]').forEach(cb => cb.checked = false);
        });
        btnAgregar.disabled = false;
        btnEliminar.classList.remove('d-none');
        btnConfirmar.classList.add('d-none');
        btnCancelar.classList.add('d-none');
        modoEliminar = false;
    });

    btnConfirmar.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para eliminar las filas seleccionadas
        alert('Eliminar seleccionados (lógica no implementada)');
        tablas.forEach(tabla => {
            tabla.querySelectorAll('.col-eliminar').forEach(col => col.classList.add('d-none'));
            tabla.querySelectorAll('.col-eliminar input[type="checkbox"]').forEach(cb => cb.checked = false);
        });
        btnAgregar.disabled = false;
        btnEliminar.classList.remove('d-none');
        btnConfirmar.classList.add('d-none');
        btnCancelar.classList.add('d-none');
        modoEliminar = false;
    });
});