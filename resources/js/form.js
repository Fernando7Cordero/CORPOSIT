// Inicializar EmailJS
(function(){
    emailjs.init("WJA_y7Z7t9WTH5q9_"); // reemplaza con tu user_id de EmailJS
    })();
    function enviarCorreo(e) {
    e.preventDefault();
    emailjs.sendForm('service_p7ugojp', 'template_jf7mgzl', '#formulario')
    .then(function(response) {
    alert('¡Mensaje enviado con éxito!');
    }, function(error) {
    alert('Error al enviar el mensaje: ' + JSON.stringify(error));
    });
}