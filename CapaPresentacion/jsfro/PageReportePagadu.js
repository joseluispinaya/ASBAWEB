
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

    listaPagadur();

});

function listaPagadur() {
    if ($.fn.DataTable.isDataTable("#tbdatare")) {
        $("#tbdatare").DataTable().destroy();
        $('#tbdatare tbody').empty();
    }
    var request = {
        fechainicio: $("#txtFechaInicio").val(),
        fechafin: $("#txtFechaFin").val()
    };

    table = $("#tbdatare").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageReportePagadu.aspx/PagaduriaRpt',
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
            { "data": "Codigo" },
            { "data": "Productor" },
            { "data": "Producto" },
            { "data": "TotalCalcuStr" },
            { "data": "DescuentoStr" },
            { "data": "TotalDolarStr" }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#btnBuscar').on('click', function () {

    listaPagadur();

})

function ReporteDet(dataVenta) {

    if (dataVenta.length < 1) {
        swal("Mensaje", "No se puede Generar reporte Vacio", "error");
        return;
    }

    var fechaini = $("#txtFechaInicio").val();
    var fechafin = $("#txtFechaFin").val();

    const totalUsd = dataVenta.reduce((acc, item) => acc + parseFloat(item.TotalDolares), 0);
    const totalBs = dataVenta.reduce((acc, item) => acc + parseFloat(item.TotalPagado), 0);
    const cantidadTotal = dataVenta.reduce((acc, item) => acc + parseInt(item.CantidadTotal), 0);

    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Reporte_Detalle_2025",
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
            label: "Reporte Pagaduria:",
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
            header: ["Productor", "-- Cantidad - Producto -- ", "  -Total", "Descuento", "Dolar", "Pago Bs", "Pago USD"],
            table: dataVenta.map((item, index) => [
                item.Productor,
                item.Producto,
                item.TotalCalcuStr,
                item.DescuentoStr,
                item.DolarStr,
                item.TotalPaBsStr,
                item.TotalDolarStr
            ]),
            invTotalLabel: "Cantidad:",
            invTotal: cantidadTotal.toString(),
            invCurrency: "UNDS",
            row1: {
                col1: 'Total Pagado:',
                col2: totalBs.toString(),
                col3: 'BOB',
                style: {
                    fontSize: 10
                }
            },
            row2: {
                col1: 'Total Pagado $:',
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

function cargarDetalleReporte() {

    var request = {
        fechainicio: $("#txtFechaInicio").val(),
        fechafin: $("#txtFechaFin").val()
    };

    $.ajax({
        type: "POST",
        url: "PageReportePagadu.aspx/PagaduriaRpt",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var detalle = response.d.Data;
                console.log(detalle)

                if (detalle.length < 1) {
                    swal("Mensaje", "No se puede Generar reporte Vacio", "error");
                    return;
                }

                ReporteDet(detalle)
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

function ReporteDetPrueba() {
    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Reporte_Prueba_2025",
        orientationLandscape: true,
        compress: true,
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
            invDate: ObtenerFechaA(),
            invGenDate: ObtenerFechaA(),
            headerBorder: false,
            tableBodyBorder: false,
            header: [
                {
                    title: "#",
                    style: {
                        width: 10
                    }
                },
                {
                    title: "Title",
                    style: {
                        width: 30
                    }
                },
                {
                    title: "Description",
                    style: {
                        width: 80
                    }
                },
                { title: "Price" },
                { title: "Quantity" },
                { title: "Unit" },
                { title: "Total" }
            ],
            table: Array.from(Array(6), (item, index) => ([
                index + 1,
                "There are many variations ",
                "Lorem Ipsum is simply dummy text dummy text ",
                200.5,
                4.5,
                "m2",
                400.5
            ])),
            invTotalLabel: "Total Reg:",
            invTotal: "5",
            invCurrency: "REG",
            row1: {
                col1: 'Nro Reg:',
                col2: '0005',
                col3: 'Ref',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            invDescLabel: "Gracias por usar nuestro sistema",
            invDesc: "Reporte interno de uso solo para socios Shinahota-Cochabamba-Bolivia. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look",
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

$('#btnImprimir').on('click', function () {

    cargarDetalleReporte();
    //swal("Mensaje", "Falta Implementar Este boton", "warning");

})