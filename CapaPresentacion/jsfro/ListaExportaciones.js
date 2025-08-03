
var table;

$(document).ready(function () {
    listaExportaciones();
})

function listaExportaciones() {
    if ($.fn.DataTable.isDataTable("#tbdataExporta")) {
        $("#tbdataExporta").DataTable().destroy();
        $('#tbdataExporta tbody').empty();
    }

    table = $("#tbdataExporta").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ListaExportaciones.aspx/ListaExportacionesp',
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
            { "data": "IdExportacion", "visible": false, "searchable": false },
            { "data": "DestinoEx" },
            { "data": "PropiCamion" },
            { "data": "Producto" },
            { "data": "DolarStr" },
            { "data": "TotalCalcuStr" },
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

function detalleExportacionView(IdExportacion) {

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
                $("#txtFechaRegistro").val(detalle.FechaRegistro);
                $("#txtNumVenta").val(detalle.Codigo);
                $("#txtCambioDolar").val(detalle.DolarCambio);

                $("#txtnrocip").val(detalle.RefCamion.Placa);
                $("#txtproductorn").val(detalle.RefCamion.Propietario);
                $("#txtnrocelul").val(detalle.RefCamion.Celular);

                $("#txtDescuento").val(detalle.CantidadTotal);
                $("#txtDestinos").val(detalle.RefDestino.Descripcion);
                //$("#txtTotalp").val(totalpas.toFixed(2));
                $("#txtTotalBspa").val(detalle.TotalPagado);
                $("#txtTotalDolar").val(detalle.TotalDolares);

                $("#tbDetalleExpoo tbody").html("");

                $.each(detalle.ListaDetalleExportacion, function (index, item) {
                    $("<tr>").append(
                        $("<td>").text(item.RefTipoBanana.Descripcion),
                        $("<td>").text(item.Cantidad),
                        $("<td>").text(item.Precio),
                        $("<td>").text(item.MontoTotal)
                    ).appendTo("#tbDetalleExpoo tbody");
                });

                $("#modalDatadetexp").modal("show");
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

$("#tbdataExporta tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    detalleExportacionView(model.IdExportacion)


    //var idPagaduria = model.IdPagaduria;
    //swal("Mensaje", "Muestra" + "\nValor Id: " + idPagaduria, "success");

    //$("#modalDatadet").modal("show");
})