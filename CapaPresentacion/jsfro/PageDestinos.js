
var table;
var tabledes;
//var tableg;

$(document).ready(function () {
    cargarCamiones();
    cargarDestinos();
    //$("#cboEstadoC").prop("disabled", true);
    //$("#cboEstadoG").prop("disabled", true);
})

function cargarCamiones() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbcamiones")) {
        $("#tbcamiones").DataTable().destroy();
        $('#tbcamiones tbody').empty();
    }

    table = $("#tbcamiones").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageDestinos.aspx/ObtenerCamiones',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.Estado) {
                    return json.d.Data; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdCamion", "visible": false, "searchable": false },
            { "data": "Placa" },
            { "data": "Chasis" },
            { "data": "Propietario" },
            { "data": "Celular" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm"><i class="fas fa-pencil-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "40px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbcamiones tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    $("#txtIdCamions").val(model.IdCamion);
    $("#txtNroplaca").val(model.Placa);
    $("#txtNrochasis").val(model.Chasis);
    $("#txtPropietario").val(model.Propietario);
    $("#txtCelular").val(model.Celular);

    //$("#cboEstado").val(model.Activo == true ? 1 : 0);
    //$("#cboEstado").prop("disabled", false);
})

function registerDataCamion() {

    var request = {
        oCamion: {
            IdCamion: parseInt($("#txtIdCamions").val()),
            Placa: $("#txtNroplaca").val().trim(),
            Chasis: $("#txtNrochasis").val().trim(),
            Propietario: $("#txtPropietario").val().trim(),
            Celular: $("#txtCelular").val().trim()
        }
    }

    $.ajax({
        type: "POST",
        url: "PageDestinos.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loadRe").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadRe").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarCamiones();

                $("#txtIdCamions").val("0");
                $("#txtNroplaca").val("");
                $("#txtNrochasis").val("");
                $("#txtPropietario").val("");
                $("#txtCelular").val("");

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadRe").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function editarDataCamion() {

    var request = {
        oCamion: {
            IdCamion: parseInt($("#txtIdCamions").val()),
            Placa: $("#txtNroplaca").val().trim(),
            Chasis: $("#txtNrochasis").val().trim(),
            Propietario: $("#txtPropietario").val().trim(),
            Celular: $("#txtCelular").val().trim(),
            Activo: true
        }
    }

    $.ajax({
        type: "POST",
        url: "PageDestinos.aspx/Actualizar",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loadRe").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadRe").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarCamiones();

                $("#txtIdCamions").val("0");
                $("#txtNroplaca").val("");
                $("#txtNrochasis").val("");
                $("#txtPropietario").val("");
                $("#txtCelular").val("");

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadRe").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


$('#btnAddCamion').on('click', function () {

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    if (parseInt($("#txtIdCamions").val()) === 0) {
        registerDataCamion();
    } else {
        editarDataCamion();
    }
})

function cargarDestinos() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbDestinos")) {
        $("#tbDestinos").DataTable().destroy();
        $('#tbDestinos tbody').empty();
    }

    tabledes = $("#tbDestinos").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageDestinos.aspx/ListaDestinosNuevo',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.Estado) {
                    return json.d.Data; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdDestino", "visible": false, "searchable": false },
            { "data": "Descripcion" },
            {
                "data": "Activo", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-info">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            { "data": "TotalUsos" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editarde btn-sm"><i class="fas fa-pencil-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "40px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbDestinos tbody").on("click", ".btn-editarde", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = tabledes.row(filaSeleccionada).data();
    $("#txtIdDest").val(model.IdDestino);
    $("#txtDestino").val(model.Descripcion);

    //$("#cboEstado").val(model.Activo == true ? 1 : 0);
    //$("#cboEstado").prop("disabled", false);
})

function registerDataDestino() {

    var request = {
        oDestino: {
            IdDestino: parseInt($("#txtIdDest").val()),
            Descripcion: $("#txtDestino").val().trim()
        }
    }

    $.ajax({
        type: "POST",
        url: "PageDestinos.aspx/RegistrarDestino",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loaddest").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddest").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarDestinos();

                $("#txtIdDest").val("0");
                $("#txtDestino").val("");

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddest").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function editarDataDestino() {

    var request = {
        oDestino: {
            IdDestino: parseInt($("#txtIdDest").val()),
            Descripcion: $("#txtDestino").val().trim(),
            Activo: true
        }
    }

    $.ajax({
        type: "POST",
        url: "PageDestinos.aspx/ModificarDestino",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loaddest").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddest").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarDestinos();

                $("#txtIdDest").val("0");
                $("#txtDestino").val("");

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddest").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnAddnew').on('click', function () {

    if ($("#txtDestino").val().trim() === "") {
        toastr.warning("", "Debe completar el campo Destino");
        $("#txtDestino").focus();
        return;
    }

    if (parseInt($("#txtIdDest").val()) === 0) {
        registerDataDestino();
    } else {
        editarDataDestino();
    }
})