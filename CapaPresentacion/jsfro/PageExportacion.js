
let tablaActivos;
let ProductosLista = [];

$(document).ready(function () {
    $("#txtCambioDolar").val("0");
    $("#txtCantidadp").val("0");
    $("#txtPrecio").val("0");
    $("#txtTotcantiex").val("0");
    $("#txtTotal").val("0");
    $("#txtTotalDolar").val("0");
    cargarTiposBanana();
    listaDestinos();
    listaCamiones();


})

function cargarTiposBanana() {
    $("#cboTipoBanana").html("");

    $.ajax({
        type: "POST",
        url: "PagePagaduria.aspx/ListaTipoBanana",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {

                $("<option>").attr({ "value": "0" }).text("-- SELECCIONE --").appendTo("#cboTipoBanana")

                $.each(response.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdTipoBanana }).text(row.Descripcion).appendTo("#cboTipoBanana");
                    }

                })
            } else {
                swal("Mensaje", "ocurrio un error", "warning");
            }

        }
    });
}

$('#cboTipoBanana').change(function () {
    const $select = $(this);
    const tipoId = $select.val();
    const tipoNombre = $select.find("option:selected").text();

    if (tipoId === "0") {
        swal("Mensaje", "Debe seleccionar un tipo de banana válido", "warning");
        $("#txtCantidadp").val("0");
        $("#txtPrecio").val("0");
        return;
    }
    $("#txtCantidadp").val("0");
    $("#txtPrecio").val("0");

    //swal("Mensaje", "Texto: " + tipoNombre + "\nValor: " + tipoId, "success");
});

function listaDestinos() {
    $("#cboDestinos").html("");

    $.ajax({
        type: "POST",
        url: "PageDestinos.aspx/ListaDestinos",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {

                $("<option>").attr({ "value": "0" }).text("-- SELECCIONE --").appendTo("#cboDestinos")

                $.each(response.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdDestino }).text(row.Descripcion).appendTo("#cboDestinos");
                    }

                })
            } else {
                swal("Mensaje", "ocurrio un error", "warning");
            }

        }
    });
}

function listaCamiones() {
    $("#cboCamion").html("");

    $.ajax({
        type: "POST",
        url: "PageDestinos.aspx/ObtenerCamiones",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {

                $("<option>").attr({ "value": "0" }).text("-- SELECCIONE --").appendTo("#cboCamion")

                $.each(response.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdCamion }).text(row.Propietario).appendTo("#cboCamion");
                    }

                })
            } else {
                swal("Mensaje", "ocurrio un error", "warning");
            }

        }
    });
}

$('#btnAgregarp').on('click', function () {

    var cantidadStr = $("#txtCantidadp").val().trim();
    var precioStrlis = $("#txtPrecio").val().trim();
    var tipoCambio = $("#txtCambioDolar").val().trim();
    var precioStr = parseFloat($("#txtPrecio").val().trim());

    let tipoId = $("#cboTipoBanana").val();
    let tipoNombre = $("#cboTipoBanana option:selected").text();

    if (cantidadStr === "" || isNaN(cantidadStr) || parseInt(cantidadStr) <= 0) {
        swal("Mensaje", "Debe ingresar una Cantidad válida (mayor a 0)", "warning")
        return;
    }

    if (precioStrlis === "" || isNaN(precioStrlis) || parseFloat(precioStrlis) <= 0) {
        swal("Mensaje", "Debe ingresar un Precio válido (mayor a 0)", "warning")
        return;
    }

    if (tipoCambio === "" || isNaN(tipoCambio) || parseFloat(tipoCambio) <= 0) {
        toastr.warning("", "Debe ingresar el Cambio del dolar (mayor a 0)");
        return;
    }


    if (parseInt(tipoId) === 0) {
        swal("Mensaje", "Ocurrio un error Seleccione nuevamente el tipo de banana.", "warning")
        return;
    }

    let producto_encontradov = ProductosLista.filter(p => p.IdTipoBanana == tipoId)

    if (producto_encontradov.length > 0) {
        swal("Mensaje", "El tipo de banana ya fue agregado", "warning");
        return;
    }

    let activoFormado = {
        IdTipoBanana: tipoId,
        NombreArticulo: tipoNombre,
        Cantidad: parseInt(cantidadStr),
        Precio: precioStr,
        MontoTotal: (parseFloat(cantidadStr) * precioStr)
    };

    ProductosLista.push(activoFormado);

    $("#txtCantidadp").val("0");
    $("#txtPrecio").val("0");

    mosProdr_Precio();

})

function mosProdr_Precio() {

    if ($.fn.DataTable.isDataTable("#tbProductoex")) {
        $("#tbProductoex").DataTable().destroy();
        $("#tbProductoex tbody").empty();
    }

    tablaActivos = $("#tbProductoex").DataTable({
        responsive: true,
        data: ProductosLista,
        columns: [
            {
                defaultContent: '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
                orderable: false,
                searchable: false,
                width: "40px"
            },
            { data: "NombreArticulo" },
            { data: "Cantidad" },
            { data: "Precio" },
            { data: "MontoTotal" }
        ],
        dom: "rt",
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });

    // Calcular el total de Importes
    const total = ProductosLista.reduce((acc, item) => acc + parseFloat(item.MontoTotal || 0), 0);
    const cantidadTotal = ProductosLista.reduce((acc, item) => acc + Number.parseInt(item.Cantidad || 0), 0);
    //const cantidadTotal = ProductosLista.reduce((acc, item) => acc + parseInt(item.Cantidad), 0);

    // valor del dólar (tipo de cambio)
    var valorDolar = parseFloat($("#txtCambioDolar").val().trim());

    // convertir el total a dólares
    const totalDolares = (valorDolar > 0) ? (total / valorDolar) : 0;
    //const totalDolares = total / valorDolar;

    // Mostrar el total en bs
    $("#txtTotal").val(total.toFixed(2));

    // mostrar el total en dólares
    $("#txtTotalDolar").val(totalDolares.toFixed(2));
    $("#txtTotcantiex").val(cantidadTotal);

}

$("#tbProductoex tbody").on("click", ".btn-eliminar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const data = tablaActivos.row(filaSeleccionada).data();

    // Buscar el índice del objeto en DetalleActili para eliminarlo
    ProductosLista = ProductosLista.filter(p => p.IdTipoBanana != data.IdTipoBanana);

    mosProdr_Precio();
});

function registrarExportacion() {

    const cantidadTotal = ProductosLista.reduce((acc, item) => acc + parseInt(item.Cantidad), 0);
    const total = ProductosLista.reduce((acc, item) => acc + parseFloat(item.MontoTotal), 0);

    // Crear la estructura del request y asignar ProductosLista a RequestList
    var request = {
        eExportacion: {
            IdCamion: $("#cboCamion").val(),
            IdDestino: $("#cboDestinos").val(),
            CantidadTotal: parseInt(cantidadTotal),
            CostoTotal: parseFloat(total),
            DolarCambio: parseFloat($("#txtCambioDolar").val().trim())
        },
        RequestList: ProductosLista  // Asignamos directamente la lista
    };

    $.ajax({
        type: "POST",
        url: "PageExportacion.aspx/GuardarExportacions",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#loadingAc").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadingAc").LoadingOverlay("hide");
            if (response.d.Estado) {
                ProductosLista = [];
                mosProdr_Precio();

                generarReporte(response.d.Valor);

                $("#txtCambioDolar").val("0");
                $("#txtTotal").val("0");
                $("#txtTotalDolar").val("0");
                $("#txtTotcantiex").val("0");

                //swal("Mensaje", response.d.Mensaje, "success");

                //var idExport = response.d.Valor;
                //swal("Mensaje", response.d.Mensaje + "\nValor Id: " + idExport, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadingAc").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnRegistrarExpor').prop('disabled', false);
        }
    });
}

$('#btnRegistrarExpor').on('click', function () {

    $('#btnRegistrarExpor').prop('disabled', true);

    var valorDolar = $("#txtCambioDolar").val().trim();

    if (ProductosLista.length < 1) {
        swal("Mensaje", "Debe ingresar productos para el registro", "error");
        $('#btnRegistrarExpor').prop('disabled', false);
        return;
    }

    if (valorDolar === "" || isNaN(valorDolar) || parseFloat(valorDolar) <= 0) {
        toastr.warning("", "Debe ingresar un monto válido en Cambio del dolar (mayor a 0)");
        $('#btnRegistrarExpor').prop('disabled', false);
        return;
    }


    if (parseInt($("#cboDestinos").val()) === 0) {
        swal("Mensaje", "Debe Seleccionar un Destino para el registro", "warning")
        $('#btnRegistrarExpor').prop('disabled', false);
        return;
    }

    if (parseInt($("#cboCamion").val()) === 0) {
        swal("Mensaje", "Debe Seleccionar un Camion para el registro", "warning")
        $('#btnRegistrarExpor').prop('disabled', false);
        return;
    }


    registrarExportacion();
});

function ReportePaga(dataVenta) {
    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Reporte_Export_2025",
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
            label: "Reporte de:",
            name: "Exportacion",
            address: "Departamento de finanzas",
            phone: "4687852",
            email: "soporte_asba@gmail.com",
            otherInfo: "entregado",
        },
        invoice: {
            label: "Nro #: ",
            num: dataVenta.Codigo,
            invDate: `Cambio USD: ${dataVenta.DolarCambio.toString()}`,
            invGenDate: "Detalles",
            headerBorder: false,
            tableBodyBorder: false,
            header: ["Producto", "Cantidad", "Precio", "Total"],
            table: dataVenta.ListaDetalleExportacion.map((item, index) => [
                item.RefTipoBanana.Descripcion,
                item.Cantidad.toString(),
                item.Precio.toString(),
                item.MontoTotal.toString()
            ]),
            invTotalLabel: "Total:",
            invTotal: dataVenta.CostoTotal.toString(),
            invCurrency: "BOB",
            row1: {
                col1: 'Total Pagado:',
                col2: dataVenta.TotalPagado,
                col3: 'BOB',
                style: {
                    fontSize: 10
                }
            },
            row2: {
                col1: 'Total Pagado $:',
                col2: dataVenta.TotalDolares,
                col3: 'USD',
                style: {
                    fontSize: 10
                }
            },
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

function generarReporte(IdExportacion) {

    //var request = { IdVenta: parseInt($("#txtIdVentaa").val()) }
    //var request = { IdVenta: 1 }
    var request = { IdExportacion: IdExportacion }

    $.ajax({
        type: "POST",
        url: "PageExportacion.aspx/DetalleExportacionRpt",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var detalle = response.d.Data;
                console.log(detalle)
                ReportePaga(detalle)
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

//$('#btnImprimirPr').on('click', function () {

//    generarReporte(1);
//});