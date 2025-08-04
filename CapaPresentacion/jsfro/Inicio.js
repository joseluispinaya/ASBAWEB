
$(document).ready(function () {

    totalesLabel();
});

function totalesLabel() {

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/ObtenerTotalesLabel",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {

            if (response.d.Estado) {
                var detalle = response.d.Data;

                $("#totalProduct").text(detalle.NombreCompleto + " Registrados");
                $("#totalDestino").text(detalle.NroCi + " Registrados");
                $("#totalExportacc").text(detalle.Correo + " Registrados");
                $("#totalCamions").text(detalle.Celular + " Registrados");
            } else {
                console.log(response.d.Mensaje);
            }

        }
    });
}