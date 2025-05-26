document.addEventListener('DOMContentLoaded', function() {
    // Añadir el icono de lápiz a cada celda editable (excepto encabezados y checkbox)
    document.querySelectorAll('table').forEach(tabla => {
        tabla.querySelectorAll('tbody tr').forEach(tr => {
            tr.querySelectorAll('td:not(.col-eliminar)').forEach(td => {
                // Evita duplicar el icono si ya existe
                if (!td.querySelector('.editar-campo')) {
                    const span = document.createElement('span');
                    span.className = 'editar-campo';
                    span.innerHTML = '<i class="bi bi-pencil-square"></i>';
                    td.appendChild(span);
                }
            });
        });
    });

    let celdaActual = null;
    let valorAnterior = '';
    let labelCampo = '';
    let tipoDato = 'string';

    // Función para detectar tipo de dato
    function detectarTipoDato(valor, label) {
        const labelLower = label.toLowerCase();
        if (labelLower.includes('año') || labelLower.includes('experiencia') || labelLower.includes('cp') || labelLower.includes('número') || labelLower.includes('no. ext') || labelLower.includes('no. int')) {
            return 'number';
        }
        if (labelLower.includes('correo')) {
            return 'email';
        }
        if (labelLower.includes('tel')) {
            return 'tel';
        }
        if (labelLower.includes('rfc') || labelLower.includes('curp')) {
            return 'alfa';
        }
        if (labelLower.includes('disponibilidad') || labelLower.includes('pago de casetas')) {
            return 'select';
        }
        if (labelLower.includes('comentario') || labelLower.includes('descrip')) {
            return 'textarea';
        }
        return 'string';
    }

    // Al hacer click en el lápiz, abrir modal de edición
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.editar-campo')) {
            celdaActual = e.target.closest('td');
            // Obtener solo el texto sin el icono ni otros elementos
            let textNode = Array.from(celdaActual.childNodes).find(n => n.nodeType === 3);
            valorAnterior = textNode ? textNode.nodeValue.trim() : celdaActual.textContent.trim();
            // Detectar el encabezado correspondiente
            let ths = celdaActual.closest('table').querySelectorAll('th');
            let cellIndex = Array.from(celdaActual.parentNode.children).indexOf(celdaActual);
            // Ajuste por si hay columnas ocultas (como col-eliminar)
            let visibleIndex = 0;
            for (let i = 0, j = 0; i < celdaActual.parentNode.children.length; i++) {
                if (!celdaActual.parentNode.children[i].classList.contains('col-eliminar')) {
                    if (celdaActual === celdaActual.parentNode.children[i]) {
                        cellIndex = j;
                        break;
                    }
                    j++;
                }
            }
            labelCampo = ths[cellIndex] ? ths[cellIndex].textContent : '';
            tipoDato = detectarTipoDato(valorAnterior, labelCampo);

            document.getElementById('labelEditarCampo').textContent = labelCampo;

            const input = document.getElementById('inputEditarCampo');
            input.value = valorAnterior;
            input.type = (tipoDato === 'number') ? 'number' : (tipoDato === 'email') ? 'email' : (tipoDato === 'tel') ? 'tel' : 'text';
            input.required = true;
            input.style.display = '';
            if (document.getElementById('inputEditarCampoArea')) {
                document.getElementById('inputEditarCampoArea').style.display = 'none';
            }

            if (tipoDato === 'textarea') {
                input.style.display = 'none';
                let area = document.getElementById('inputEditarCampoArea');
                if (!area) {
                    area = document.createElement('textarea');
                    area.className = 'form-control';
                    area.id = 'inputEditarCampoArea';
                    area.required = true;
                    area.rows = 2;
                    input.parentNode.appendChild(area);
                }
                area.value = valorAnterior;
                area.style.display = '';
            }

            const modal = new bootstrap.Modal(document.getElementById('modalEditarCampo'));
            modal.show();
        }
    });

    // Validación de tipo antes de mostrar el modal de confirmación
    document.getElementById('formEditarCampo').addEventListener('submit', function(e) {
        e.preventDefault();
        let nuevoValor = '';
        if (tipoDato === 'textarea') {
            nuevoValor = document.getElementById('inputEditarCampoArea').value.trim();
        } else {
            nuevoValor = document.getElementById('inputEditarCampo').value.trim();
        }

        let valido = true;
        let mensaje = '';

        if (tipoDato === 'number') {
            valido = /^\d+$/.test(nuevoValor);
            mensaje = 'El valor debe ser un número entero.';
        } else if (tipoDato === 'email') {
            valido = /^[\w\.-]+@[\w\.-]+\.\w+$/.test(nuevoValor);
            mensaje = 'El valor debe ser un correo electrónico válido.';
        } else if (tipoDato === 'tel') {
            valido = /^\+?[\d\s\-()]{7,}$/.test(nuevoValor);
            mensaje = 'El valor debe ser un teléfono válido.';
        } else if (tipoDato === 'alfa') {
            valido = /^[A-Z0-9]{10,20}$/i.test(nuevoValor);
            mensaje = 'El valor debe ser alfanumérico (RFC/CURP).';
        } else if (tipoDato === 'string' || tipoDato === 'textarea') {
            valido = nuevoValor.length > 0;
            mensaje = 'El valor no puede estar vacío.';
        }

        if (!valido) {
            alert(mensaje);
            return;
        }

        const modalEditar = bootstrap.Modal.getInstance(document.getElementById('modalEditarCampo'));
        modalEditar.hide();
        const modalConfirmar = new bootstrap.Modal(document.getElementById('modalConfirmarEdicion'));
        modalConfirmar.show();
    });

    // Al confirmar, actualizar solo el valor de texto de la celda (no el icono)
    document.getElementById('btnConfirmarEdicion').addEventListener('click', function() {
        let nuevoValor = '';
        if (tipoDato === 'textarea') {
            nuevoValor = document.getElementById('inputEditarCampoArea').value.trim();
        } else {
            nuevoValor = document.getElementById('inputEditarCampo').value.trim();
        }
        if (celdaActual) {
            // Busca el nodo de texto y actualízalo, sin eliminar el span del lápiz ni otros elementos
            let textNode = Array.from(celdaActual.childNodes).find(n => n.nodeType === 3);
            if (textNode) {
                textNode.nodeValue = nuevoValor + ' ';
            } else {
                // Si no hay nodo de texto, inserta uno antes del span
                let span = celdaActual.querySelector('.editar-campo');
                celdaActual.insertBefore(document.createTextNode(nuevoValor + ' '), span);
            }
        }
        const modalConfirmar = bootstrap.Modal.getInstance(document.getElementById('modalConfirmarEdicion'));
        modalConfirmar.hide();

        // Aquí puedes implementar la lógica para actualizar en el backend en el futuro
        // Por ejemplo: enviar una petición AJAX con el valor, el campo y el id de la fila
    });
});