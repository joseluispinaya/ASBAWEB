
$(document).ready(function () {
    const usuarioL = sessionStorage.getItem('usuarioL');

    if (usuarioL) {
        obtenerDetalleUsuarioRP();
    } else {
        window.location.href = 'Login.aspx';
    }

    //obtenerEsquema();
});

$('#salirsis').on('click', function (e) {
    e.preventDefault();
    CerrarSesion();
});

function obtenerDetalleUsuarioRP() {
    const usuarioL = sessionStorage.getItem('usuarioL');
    if (usuarioL) {
        const usuario = JSON.parse(usuarioL);

        $("#nomUserg").text(usuario.Apellidos);
        $("#imgUsumast").attr("src", usuario.ImageFull);

        const rolUser = usuario.IdRol;

        // Oculta todo al inicio
        $(".menu-adminz, .menu-propdz, .menu-destcamioz, .menu-pagaduz, .menu-exportz, .menu-reportz").hide();

        // Mostrar solo lo que corresponde al rol
        if (rolUser === 1) {
            $(".menu-adminz").show(); // Administrador
        } else if (rolUser === 2) {
            $(".menu-propdz, .menu-pagaduz, .menu-reportz").show(); // Cajero
        } else if (rolUser === 3) {
            $(".menu-destcamioz, .menu-exportz, .menu-reportz").show(); // Secretario
        }

    } else {
        console.error('No se encontró información del usuario en sessionStorage.');
        window.location.href = 'Login.aspx';
    }
}


// Función para cerrar sesión
function CerrarSesion() {
    sessionStorage.clear();
    window.location.replace('Login.aspx');
}