
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

    table = $("#tbdatare").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageReportePagadu.aspx/ListaPagadu',
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