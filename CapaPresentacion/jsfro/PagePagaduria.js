
let tablaActivos;
let ProductosLista = [];

$(document).ready(function () {
    $("#txtCantidadp").val("0");
    $("#txtPrecio").val("0");
    $("#txtDescuento").val("0");
    $("#txtSubTotal").val("0");
    $("#txtTotal").val("0");
    cargarProductor();
    cargarTiposBanana();

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

                $("<option>").attr({ "value": "0" }).text("-- SELECCIONE TIPO --").appendTo("#cboTipoBanana")

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

function cargarProductor() {

    $("#cboBuscarProductor").select2({
        ajax: {
            url: "PageProductores.aspx/ObtenerProductoresFiltro",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ busqueda: params.term });
            },
            processResults: function (data) {

                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdProductor,
                        text: item.NombreCompleto,
                        NroCi: item.NroCi,
                        Celular: item.Celular,
                        productor: item
                    }))
                };
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            }
        },
        language: "es",
        placeholder: 'Buscar Productor',
        minimumInputLength: 1,
        templateResult: formatoRes
    });
}

function formatoRes(data) {

    var imagenes = "Imagenes/selectedd.jpg";
    // Esto es por defecto, ya que muestra el "buscando..."
    if (data.loading)
        return data.text;

    var contenedor = $(
        `<table width="100%">
            <tr>
                <td style="width:60px">
                    <img style="height:60px;width:60px;margin-right:10px" src="${imagenes}"/>
                </td>
                <td>
                    <p style="font-weight: bolder;margin:2px">${data.text}</p>
                    <p style="margin:2px">${data.NroCi}</p>
                </td>
            </tr>
        </table>`
    );

    return contenedor;
}

$(document).on("select2:open", function () {
    document.querySelector(".select2-search__field").focus();

});

// Evento para manejar la selección del cliente
$("#cboBuscarProductor").on("select2:select", function (e) {

    var data = e.params.data.productor;
    $("#txtIdProductors").val(data.IdProductor);
    $("#txtNombreProduct").val(data.NombreCompleto);

    $("#cboBuscarProductor").val("").trigger("change")
    //console.log(data);
});

$('#cboTipoBanana').change(function () {
    const $select = $(this);
    const tipoId = $select.val();
    const tipoNombre = $select.find("option:selected").text();

    if (tipoId === "0") {
        swal("Mensaje", "Debe seleccionar un tipo válido", "warning");
        return;
    }
    $("#txtCantidadp").val("0");
    $("#txtPrecio").val("0");

    //swal("Mensaje", "Texto: " + tipoNombre + "\nValor: " + tipoId, "success");
});

$('#btnAgregarp').on('click', function () {

    var cantidadStr = $("#txtCantidadp").val().trim();
    var precioStrlis = $("#txtPrecio").val().trim();
    var tipoCambio = $("#txtCambioDolar").val().trim();
    var precioStr = parseFloat($("#txtPrecio").val().trim());

    let tipoId = $("#cboTipoBanana").val();
    let tipoNombre = $("#cboTipoBanana option:selected").text();

    if (cantidadStr === "" || isNaN(cantidadStr) || parseInt(cantidadStr) <= 0) {
        swal("Mensaje", "Debe ingresar una cantidad válida (mayor a 0)", "warning")
        return;
    }

    if (precioStrlis === "" || isNaN(precioStrlis) || parseFloat(precioStrlis) <= 0) {
        swal("Mensaje", "Debe ingresar un monto válido (mayor a 0)", "warning")
        return;
    }

    if (tipoCambio === "" || isNaN(tipoCambio) || parseFloat(tipoCambio) <= 0) {
        swal("Mensaje", "Debe ingresar el Cambio del dolar (mayor a 0)", "warning")
        return;
    }


    if (parseInt(tipoId) === 0) {
        swal("Mensaje", "Ocurrio un error Seleccione nuevamente el Producto.", "warning")
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
        ImporteTotal: (parseFloat(cantidadStr) * precioStr)
    };

    ProductosLista.push(activoFormado);

    $("#txtCantidadp").val("0");
    $("#txtPrecio").val("0");

    mosProdr_Precio();

})

function mosProdr_Precio() {

    var valorDolar = parseFloat($("#txtCambioDolar").val().trim());

    if ($.fn.DataTable.isDataTable("#tbProducto")) {
        $("#tbProducto").DataTable().destroy();
        $("#tbProducto tbody").empty();
    }

    tablaActivos = $("#tbProducto").DataTable({
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
            { data: "ImporteTotal" }
        ],
        dom: "rt",
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });

    // Calcular el total de Importes
    const total = ProductosLista.reduce((acc, item) => acc + parseFloat(item.ImporteTotal || 0), 0);

    // Mostrar en el input txtTotal (puedes formatearlo si deseas)
    $("#txtSubTotal").val(total.toFixed(2));

    // Calcular y mostrar Total en Dólares si el tipo de cambio es válido
    if (!isNaN(valorDolar) && valorDolar > 0) {
        const totalDolares = total / valorDolar;
        $("#txtTotal").val(totalDolares.toFixed(2));
    } else {
        $("#txtTotal").val(""); // Borra el valor si no hay tipo de cambio válido
    }

}

$("#tbProducto tbody").on("click", ".btn-eliminar", function (e) {
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