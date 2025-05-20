

$('#ingrsarLo').on('click', function () {

    $('#ingrsarLo').prop('disabled', true);

    //VALIDACIONES DE USUARIO
    if ($("#txtcorreo").val().trim() === "" || $("#txtpassword").val().trim() === "") {
        swal("Mensaje", "Complete los datos para iniciar sesion", "warning");
        $('#ingrsarLo').prop('disabled', false);
        return;
    }

    loginSistema();
})

function loginSistema() {

    $.ajax({
        type: "POST",
        url: "Login.aspx/Logeo",
        data: JSON.stringify({ Usuario: $("#txtcorreo").val().trim(), Clave: $("#txtpassword").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {

            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {

                const dato = response.d.Data;

                if (dato.ResetearClave) {
                    $("#txtIdUsuario").val(dato.IdUsuario);
                    $("#txtcorreo").val("");
                    $("#txtpassword").val("");

                    $("#modalClaveRes").modal("show");
                } else {

                    sessionStorage.setItem('usuarioL', JSON.stringify(dato));
                    $("#txtcorreo").val("");
                    $("#txtpassword").val("");
                    $("#txtIdUsuario").val("0");

                    window.location.href = 'Inicio.aspx';
                }

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
                //swal("Mensaje", "No se encontro el usuario", "warning")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#ingrsarLo').prop('disabled', false);
        }
    });
}

function actualizarClave() {

    var request = {
        IdUser: parseInt($("#txtIdUsuario").val()),
        ClaveActual: $("#txtclaveActual").val().trim(),
        ClaveNueva: $("#txtclaveNueva").val().trim()
    };

    $.ajax({
        type: "POST",
        url: "Login.aspx/ActualizarClave",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#loadd").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadd").LoadingOverlay("hide");
            if (response.d.Estado) {
                $('#modalClaveRes').modal('hide');

                $("#txtclaveActual").val("");
                $("#txtclaveNueva").val("");
                $("#txtIdUsuario").val("0");

                swal("Mensaje", response.d.Mensaje + " Inicie Sesion", "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadd").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnEnviarn').on('click', function () {

    //VALIDACIONES DE INPUT
    if ($("#txtclaveActual").val().trim() === "" || $("#txtclaveNueva").val().trim() === "") {
        swal("Mensaje", "Complete los datos para actualizar su contraseña", "warning");
        return;
    }

    actualizarClave();
})

//etiqueta <a> no es boton
$('#btncorreo').on('click', function (e) {
    e.preventDefault(); // Evita que el enlace siga el href
    $("#modalcorr").modal("show");
});