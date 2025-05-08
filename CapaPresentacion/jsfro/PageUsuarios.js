
var table;

const MODELO_BASE = {
    IdUsuario: 0,
    IdRol: 0,
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Clave: "",
    Celular: "",
    Activo: true,
    ImageFull: ""
}

$(document).ready(function () {
    cargarRoles();
    listaUsuarios();
})

function listaUsuarios() {
    $.ajax({
        type: "POST",
        url: "PageUsuarios.aspx/ObtenerUsuarios",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#loaddet").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddet").LoadingOverlay("hide");

            if (response.d.Estado) {
                var datos = response.d.Data;

                // Limpiamos el contenedor por si hay datos previos
                $("#listar").empty();

                // Recorremos la lista y generamos el HTML
                datos.forEach(function (usuario) {
                    var cardHtml = `
                        <div class="col mb-5">
                            <div class="card h-100">
                                <div class="card-body p-4">
                                    <div class="d-flex justify-content-center mb-3">
                                        <div class="imageze">
                                            <img class="imgre" src="${usuario.ImageFull}" alt="Foto usuario">
                                        </div>
                                    </div>
                                    <div class="text-start" style="font-size:14px">
                                        <p class="m-1"><b>Nombre: </b>${usuario.Nombres}</p>
                                        <p class="m-1"><b>Apellido: </b>${usuario.Apellidos}</p>
                                        <p class="m-1"><b>Correo: </b>${usuario.Correo}</p>
                                    </div>
                                </div>
                                <div class="card-footer bg-transparent">
                                    <div class="row justify-content-between">
                                        <a class="col-5 btn btn-sm btn-outline-primary mt-auto" href="#" onclick="verEditar(${usuario.IdUsuario})"><i class="fas fa-pencil-alt"></i></a>
                                        <a class="col-5 btn btn-sm btn-outline-danger mt-auto" href="#" onclick="eliminarUsua(${usuario.IdUsuario})"><i class="fas fa-trash-alt"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                    // Agregamos al contenedor
                    $("#listar").append(cardHtml);
                });

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddet").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function cargarRoles() {
    $("#cboRol").html("");

    $.ajax({
        type: "POST",
        url: "PageUsuarios.aspx/ObtenerRol",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdRol }).text(row.Descripcion).appendTo("#cboRol");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function mostrarImagenSeleccionada(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgUsuarioMx').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#imgUsuarioMx').attr('src', "Imagenes/sinimagen.png");
    }


}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdUsuario").val(modelo.IdUsuario);
    $("#cboRol").val(modelo.IdRol == 0 ? $("#cboRol option:first").val() : modelo.IdRol);
    $("#txtNombre").val(modelo.Nombres);
    $("#txtapellido").val(modelo.Apellidos);
    $("#txtCorreo").val(modelo.Correo);
    $("#txtClave").val(modelo.Clave);
    $("#txtCelular").val(modelo.Celular);
    $("#cboEstado").val(modelo.Activo == true ? 1 : 0);
    $("#imgUsuarioMx").attr("src", modelo.ImageFull == "" ? "Imagenes/sinimagen.png" : modelo.ImageFull);

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);
    $("#txtClave").prop("disabled", !cboEstadoDeshabilitado); // Deshabilitar clave si es edición
    //$("#txtClave").prop("disabled", !cboEstadoDeshabilitado);
    $("#txtFoto").val("");

    if (cboEstadoDeshabilitado) {
        $("#myTitulop").text("Nuevo Registro");
    } else {
        $("#myTitulop").text("Editar Usuario");
    }

    $("#modalData").modal("show");
}

function verEditar(IdUsuario) {
    swal("Mensaje", "Editar a ID: " + IdUsuario, "success")
    //console.log("Ver detalle con ID: " + IdUsuario);
    //mi logica
}

function eliminarUsua(IdUsuario) {
    //console.log("Eliminar a ID: " + IdUsuario);
    swal("Mensaje", "Eliminar a ID: " + IdUsuario, "warning")
    //mi logica
}

$('#btnAddNuevo').on('click', function () {
    mostrarModal(null, true);
    //$("#modalData").modal("show");
})

function sendDataToServerUsr(request) {
    $.ajax({
        type: "POST",
        url: "PageUsuarios.aspx/GuardarUsua",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaUsuarios();
                $('#modalData').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarCambios').prop('disabled', false);
        }
    });
}

function registerDataUser() {
    var fileInput = document.getElementById('txtFoto');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdUsuario"] = parseInt($("#txtIdUsuario").val());
    modelo["IdRol"] = $("#cboRol").val();
    modelo["Nombres"] = $("#txtNombre").val().trim();
    modelo["Apellidos"] = $("#txtapellido").val().trim();
    modelo["Correo"] = $("#txtCorreo").val().trim();
    modelo["Clave"] = $("#txtClave").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "warning");
            // Rehabilitar el botón si hay un error de validación
            $('#btnGuardarCambios').prop('disabled', false);
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oUsuario: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServerUsr(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oUsuario: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerUsr(request);
    }
}

$('#btnGuardarCambios').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()

        // Rehabilitar el botón si hay campos vacíos
        $('#btnGuardarCambios').prop('disabled', false);
        return;
    }

    //$('#btnGuardarCambios').prop('disabled', true);

    if (parseInt($("#txtIdUsuario").val()) === 0) {
        registerDataUser();
    } else {
        swal("Mensaje", "Falta para Actualizar personal.", "warning")
        // Rehabilitar el botón en caso de advertencia
        $('#btnGuardarCambios').prop('disabled', false);
        //editarDataAjaxU();
    }
})