
var table;

const MODELO_BASE = {
    IdProductor: 0,
    NombreCompleto: "",
    NroCi: "",
    Celular: "",
    Correo: "",
    Activo: true
}

function ObtenerFecha() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

function esCorreoValido(correo) {
    var emailRegex = /^[a-zA-Z0-9._%+-ñÑáéíóúÁÉÍÓÚ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return correo !== "" && emailRegex.test(correo);
}

$(document).ready(function () {

    listaProductores();

    $("#txtCorreo").on("input", function () {
        const correo = $(this).val().trim();
        const $correoFeedback = $("#correo-feedback");

        if (correo === "") {
            $correoFeedback.removeClass("valid invalid").text("");
            return;
        }

        if (esCorreoValido(correo)) {
            $correoFeedback
                .removeClass("invalid")
                .addClass("valid")
                .text("✅");
        } else {
            $correoFeedback
                .removeClass("valid")
                .addClass("invalid")
                .text("❌");
        }
    });

});

function listaProductores() {
    if ($.fn.DataTable.isDataTable("#tbproductores")) {
        $("#tbproductores").DataTable().destroy();
        $('#tbproductores tbody').empty();
    }

    table = $("#tbproductores").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageProductores.aspx/ListaProductores',
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
            { "data": "IdProductor", "visible": false, "searchable": false },
            { "data": "NombreCompleto" },
            { "data": "NroCi" },
            { "data": "Celular" },
            { "data": "Correo" },
            {
                "data": "Activo", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-info">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm"><i class="fas fa-pencil-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "100px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function (e) { // Captura el evento como 'e'
        if (inputFilter(this.value) || e.key === "Backspace" || e.key === " ") { // Se usa 'e' en lugar de 'event'
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    });
};

//$("#txtNombre").inputFilter(function (value) {
//    return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/u.test(value);
//});

//$("#txtCelular").inputFilter(function (value) {
//    return /^\d*$/.test(value) && value.length <= 8;
//});

$("#txtnroci").inputFilter(function (value) {
    return /^\d*$/.test(value) && value.length <= 10;
});

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdProductor").val(modelo.IdProductor);
    $("#txtNombre").val(modelo.NombreCompleto);
    $("#txtnroci").val(modelo.NroCi);
    $("#txtCelular").val(modelo.Celular);
    $("#txtCorreo").val(modelo.Correo);
    $("#cboEstado").val(modelo.Activo == true ? 1 : 0);

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    if (cboEstadoDeshabilitado) {
        $("#myTitulopr").text("Nuevo Registro");
    } else {
        $("#myTitulopr").text("Editar Productor");
    }

    const $correoFeedback = $("#correo-feedback");
    $correoFeedback.removeClass("valid invalid").text("");

    $("#modalProducto").modal("show");
}

$("#tbproductores tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    mostrarModal(model, false);
})

$('#btnAddNuevoSo').on('click', function () {
    mostrarModal(null, true);
    //$("#modalProducto").modal("show");
})

function registrarProductor() {

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdProductor"] = parseInt($("#txtIdProductor").val());
    modelo["NombreCompleto"] = $("#txtNombre").val().trim();
    modelo["NroCi"] = $("#txtnroci").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["Correo"] = $("#txtCorreo").val().trim();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oProductor: modelo
    };

    $.ajax({
        type: "POST",
        url: "PageProductores.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaProductores();
                $('#modalProducto').modal('hide');
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

function editarProductor() {

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdProductor"] = parseInt($("#txtIdProductor").val());
    modelo["NombreCompleto"] = $("#txtNombre").val().trim();
    modelo["NroCi"] = $("#txtnroci").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["Correo"] = $("#txtCorreo").val().trim();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oProductor: modelo
    };

    $.ajax({
        type: "POST",
        url: "PageProductores.aspx/Editar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaProductores();
                $('#modalProducto').modal('hide');
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
            habilitarBoton();
            //$('#btnGuardarCambios').prop('disabled', false);
        }
    });
}


function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

$('#btnGuardarCambios').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const campo = inputs_sin_valor[0].name;
        const $inputVacio = $(`input[name="${campo}"]`);

        toastr.warning("", `Debe completar el campo: "${campo}"`);

        $inputVacio.addClass("input-error");
        setTimeout(() => $inputVacio.removeClass("input-error"), 500);
        $inputVacio.focus();

        habilitarBoton();
        return;
    }

    //const correo = $("#txtCorreo").val().trim();
    //const $correoFeedback = $("#correo-feedback");

    //if (!esCorreoValido(correo)) {
    //    toastr.warning("", "Debe ingresar un Correo válido");

    //    const $inputCorreo = $("#txtCorreo");
    //    $inputCorreo.addClass("input-error");
    //    setTimeout(() => $inputCorreo.removeClass("input-error"), 500);
    //    $inputCorreo.focus();

    //    $correoFeedback
    //        .removeClass("valid")
    //        .addClass("invalid")
    //        .text("❌");

    //    habilitarBoton();
    //    return;
    //} else {
    //    $correoFeedback
    //        .removeClass("invalid")
    //        .addClass("valid")
    //        .text("✅");
    //}

    if (parseInt($("#txtIdProductor").val()) === 0) {
        registrarProductor();
    } else {
        editarProductor();
    }
})

function ReporteProd(dataVenta) {
    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Reporte_Productores_2025",
        orientationLandscape: false,
        //compress: true,
        logo: {
            src: "../Imagenes/reportt.png",
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 53.33, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        business: {
            name: "ASBA-SRL",
            address: "Shinahota Cochabamba",
            phone: "+591 73999726",
            email: "Exportaciones",
            email_1: "asba_srl@gmail.com",
            website: "www.asba_srl.com",
        },
        contact: {
            label: "Reporte Productores:",
            name: "Registrados",
            address: "Departamento de sistemas",
            phone: "Soporte tecnico",
            email: "soporte_asba@gmail.com",
            otherInfo: "Codigo interno /0002",
        },
        invoice: {
            label: "Nro #: ",
            num: "- R0002",
            invDate: ObtenerFecha(),
            invGenDate: ObtenerFecha(),
            headerBorder: false,
            tableBodyBorder: false,
            header: ["Nombre Productor", "Nro CI", "Correo", "Celular"],
            table: dataVenta.map((item, index) => [
                item.NombreCompleto,
                item.NroCi,
                item.Correo,
                item.Celular
            ]),
            invTotalLabel: "Total Reg:",
            invTotal: dataVenta.length.toString(),
            invCurrency: "REG",
            invDescLabel: "Gracias por usar nuestro sistema",
            invDesc: "Reporte interno de uso solo para socios Shinahota-Cochabamba-Bolivia.",
        },
        footer: {
            text: "Este es un documento generado automáticamente.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    var pdfObject = jsPDFInvoiceTemplate.default(props);
    console.log(pdfObject);
}

function cargarDetalleProducto() {

    $.ajax({
        type: "POST",
        url: "PageProductores.aspx/ListaProductores",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var detalle = response.d.Data;
                ReporteProd(detalle)
                //swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnReporteSo').on('click', function () {
    cargarDetalleProducto();
})