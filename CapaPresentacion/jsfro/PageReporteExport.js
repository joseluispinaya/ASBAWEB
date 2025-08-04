
var table;
function ObtenerFechaA() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

$(document).ready(function () {
    $.datepicker.setDefaults($.datepicker.regional["es"])

    $("#txtFechaInicio").datepicker({ dateFormat: "dd/mm/yy" });
    $("#txtFechaFin").datepicker({ dateFormat: "dd/mm/yy" });

    $("#txtFechaInicio").val(ObtenerFechaA());
    $("#txtFechaFin").val(ObtenerFechaA());

    listaExportRpt();

});

function listaExportRpt() {
    if ($.fn.DataTable.isDataTable("#tbdarptExport")) {
        $("#tbdarptExport").DataTable().destroy();
        $('#tbdarptExport tbody').empty();
    }
    var request = {
        fechainicio: $("#txtFechaInicio").val(),
        fechafin: $("#txtFechaFin").val()
    };

    table = $("#tbdarptExport").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageReporteExport.aspx/ExportaRpt',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.Data);
                if (json.d.Estado) {
                    return json.d.Data; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            },
            "beforeSend": function () {
                $("#cargann").LoadingOverlay("show");
            },
            "complete": function () {
                $("#cargann").LoadingOverlay("hide");
            }
        },
        "columns": [
            { "data": "FechaRegistro" },
            { "data": "DestinoEx" },
            { "data": "PropiCamion" },
            { "data": "Producto" },
            { "data": "DolarStr" },
            { "data": "TotalCalcuStr" },
            { "data": "TotalDolarStr" }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#btnBuscar').on('click', function () {

    listaExportRpt();

})

function ReporteDetExp(dataVenta) {

    if (dataVenta.length < 1) {
        swal("Mensaje", "No se puede Generar reporte Vacio", "error");
        return;
    }

    var fechaini = $("#txtFechaInicio").val();
    var fechafin = $("#txtFechaFin").val();

    const totalUsd = dataVenta.reduce((acc, item) => acc + parseFloat(item.TotalDolares), 0);
    const totalBs = dataVenta.reduce((acc, item) => acc + parseFloat(item.CostoTotal), 0);
    const cantidadTotal = dataVenta.reduce((acc, item) => acc + parseInt(item.CantidadTotal), 0);

    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Reporte_ExportFechas_2025",
        orientationLandscape: true,
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
            label: "Reporte Exportacion:",
            name: "Registrados",
            address: "Departamento de finanzas",
            phone: "Soporte tecnico",
            email: "soporte_asba@gmail.com",
            otherInfo: "Codigo interno /0002",
        },
        invoice: {
            label: "Fechas: ",
            num: "- Consulta",
            invDate: `Desde: ${fechaini}`,
            invGenDate: `Hasta: ${fechafin}`,
            headerBorder: false,
            tableBodyBorder: false,
            header: ["Destino", "Camion de", "-- Cantidad - Producto -- ", "Dolar", "Monto Bs", "Monto USD"],
            table: dataVenta.map((item, index) => [
                item.DestinoEx,
                item.PropiCamion,
                item.Producto,
                item.DolarStr,
                item.TotalCalcuStr,
                item.TotalDolarStr
            ]),
            invTotalLabel: "Cantidad:",
            invTotal: cantidadTotal.toString(),
            invCurrency: "UNDS",
            row1: {
                col1: 'Monto Total:',
                col2: totalBs.toString(),
                col3: 'BOB',
                style: {
                    fontSize: 10
                }
            },
            row2: {
                col1: 'Monto Total $:',
                col2: totalUsd.toString(),
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

function cargarDetalleReporteEx() {

    var request = {
        fechainicio: $("#txtFechaInicio").val(),
        fechafin: $("#txtFechaFin").val()
    };

    $.ajax({
        type: "POST",
        url: "PageReporteExport.aspx/ExportaRpt",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var detalle = response.d.Data;
                //console.log(detalle)

                if (detalle.length < 1) {
                    swal("Mensaje", "No se puede Generar reporte Vacio", "error");
                    return;
                }

                ReporteDetExp(detalle)
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

$('#btnImprimir').on('click', function () {

    if ($("#txtFechaInicio").val().trim() === "" || $("#txtFechaFin").val().trim() === "") {
        toastr.warning("", "Debe Ingresar fecha inicio y fin", "Advertencia");
        return;
    }
    cargarDetalleReporteEx();
    //swal("Mensaje", "Falta Implementar Este boton", "warning");

})