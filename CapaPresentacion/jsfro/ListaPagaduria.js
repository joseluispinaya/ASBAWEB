
var table;

$(document).ready(function () {
    listaPagadurias();
})

function listaPagadurias() {
    if ($.fn.DataTable.isDataTable("#tbdatapagaduria")) {
        $("#tbdatapagaduria").DataTable().destroy();
        $('#tbdatapagaduria tbody').empty();
    }

    table = $("#tbdatapagaduria").DataTable({
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
            { "data": "IdPagaduria", "visible": false, "searchable": false },
            { "data": "Productor" },
            { "data": "Producto" },
            { "data": "TotalCalcuStr" },
            { "data": "DescuentoStr" },
            { "data": "TotalPaBsStr" },
            { "data": "TotalDolarStr" },
            {
                "defaultContent": '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-eye"></i></button>',
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

function detallePagaduriaView(IdPagaduria) {

    var request = { IdPagaduria: IdPagaduria }

    $.ajax({
        type: "POST",
        url: "PagePagaduria.aspx/DetallePagaduriaRpt",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var detalle = response.d.Data;
                $("#txtFechaRegistro").val(detalle.FechaRegistro);
                $("#txtNumVenta").val(detalle.Codigo);
                $("#txtCambioDolar").val(detalle.DolarCambio);
                $("#txtnrocip").val(detalle.RefProductor.NroCi);
                $("#txtproductorn").val(detalle.RefProductor.NombreCompleto);
                $("#txtnrocelul").val(detalle.RefProductor.Celular);

                var totalpas = parseFloat(detalle.TotalCosto);

                $("#txtDescuento").val(detalle.Descuento);
                //$("#txtTotalp").val(detalle.TotalCosto);
                $("#txtTotalp").val(totalpas.toFixed(2));
                $("#txtTotalBspa").val(detalle.TotalPagado);
                $("#txtTotalDolar").val(detalle.TotalDolares);

                $("#tbDetallePag tbody").html("");

                $.each(detalle.ListaDetallePagadurias, function (index, item) {
                    $("<tr>").append(
                        $("<td>").text(item.RefTipoBanana.Descripcion),
                        $("<td>").text(item.Cantidad),
                        $("<td>").text(item.Precio),
                        $("<td>").text(item.ImporteTotal)
                    ).appendTo("#tbDetallePag tbody");
                });

                $("#modalDatadet").modal("show");
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

$("#tbdatapagaduria tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    detallePagaduriaView(model.IdPagaduria)
    

    //var idPagaduria = model.IdPagaduria;
    //swal("Mensaje", "Muestra" + "\nValor Id: " + idPagaduria, "success");

    //$("#modalDatadet").modal("show");
})