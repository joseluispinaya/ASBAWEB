

$(document).ready(function () {
    $.LoadingOverlay("show");
    obtenerDatosUsua();
})

function obtenerDatosUsua() {

    var usuario = JSON.parse(sessionStorage.getItem('usuarioL'));
    $("#txtIdUsuarioP").val(usuario.IdUsuario);
    $("#imgFotop").attr("src", usuario.ImageFull);
    $("#txtNombre").val(usuario.Nombres);
    $("#txtapellido").val(usuario.Apellidos);
    $("#txtCorreo").val(usuario.Correo);
    $("#txtRol").val(usuario.Rol.Descripcion);
    // Hacer que el LoadingOverlay dure unos segundos antes de desaparecer
    setTimeout(function () {
        $.LoadingOverlay("hide");
    }, 1000); // El overlay se ocultará después de 1 segundo (1000 milisegundos)
}

function mostrarImagenSeleccionad(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgFotop').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#imgFotop').attr('src', "Imagenes/sinimagen.png");
    }
}

$('#txtFotop').change(function () {
    mostrarImagenSeleccionad(this);
});

function CerrarSesionP() {
    sessionStorage.clear();
    window.location.replace('Login.aspx');
}

function cambiarClaveUsuairos() {

    var request = {
        IdUsuario: parseInt($("#txtIdUsuarioP").val()),
        claveActual: $("#txtClaveActual").val().trim(),
        claveNueva: $("#txtClaveNueva").val().trim()
    }

    $.ajax({
        type: "POST",
        url: "PerfilUser.aspx/CambiarClave",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#loadis").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadis").LoadingOverlay("hide");
            if (response.d.Estado) {
                swal("Mensaje", response.d.Mensaje, "success");

                setTimeout(function () {
                    CerrarSesionP();
                }, 2000);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadis").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnCambiarClave').on('click', function () {
    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    const claveNueva = $("#txtClaveNueva").val().trim();
    const confirmarClave = $("#txtConfirmarClave").val().trim();

    // Validar que ambas contraseñas sean iguales
    if (claveNueva != confirmarClave) {
        toastr.warning("", "Las contraseñas no son iguales");
        return;
    }
    cambiarClaveUsuairos();
    //swal("Mensaje", "Todo bien", "success");

})