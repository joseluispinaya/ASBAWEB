
let tablaActivos;
let ProductosLista = [];

$(document).ready(function () {
    $("#txtCambioDolar").val("0");
    $("#txtCantidadp").val("0");
    $("#txtPrecio").val("0");
    $("#txtDescuento").val("0");
    $("#txtSubTotal").val("0");
    $("#txtTotal").val("0");
    $("#txtTotalDolar").val("0");
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
    $("#txtNroci").val(data.NroCi);

    $("#cboBuscarProductor").val("").trigger("change")
    //console.log(data);
});

$('#cboTipoBanana').change(function () {
    const $select = $(this);
    const tipoId = $select.val();
    const tipoNombre = $select.find("option:selected").text();

    if (tipoId === "0") {
        swal("Mensaje", "Debe seleccionar un tipo válido", "warning");
        $("#txtCantidadp").val("0");
        $("#txtPrecio").val("0");
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
        swal("Mensaje", "Debe ingresar una Cantidad válida (mayor a 0)", "warning")
        return;
    }

    if (precioStrlis === "" || isNaN(precioStrlis) || parseFloat(precioStrlis) <= 0) {
        swal("Mensaje", "Debe ingresar un Precio válido (mayor a 0)", "warning")
        return;
    }

    if (tipoCambio === "" || isNaN(tipoCambio) || parseFloat(tipoCambio) <= 0) {
        toastr.warning("", "Debe ingresar el Cambio del dolar (mayor a 0)");
        $("#txtCambioDolar").focus();
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

    //var valorDolar = parseFloat($("#txtCambioDolar").val().trim());

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

    // Mostrar en el subtotal sin descuento
    $("#txtSubTotal").val(total.toFixed(2));

    //if (!isNaN(valorDolar) && valorDolar > 0) {
    //    const totalDolares = total / valorDolar;
    //    $("#txtTotal").val(totalDolares.toFixed(2));
    //} else {
    //    $("#txtTotal").val("0");
    //}

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

function calcularTotales() {
    // valor del dólar (tipo de cambio)
    var valorDolar = parseFloat($("#txtCambioDolar").val().trim());

    // monto del descuento, si está vacío lo consideramos como 0
    var montoDescuento = $("#txtDescuento").val().trim() === "" ? 0 : parseFloat($("#txtDescuento").val().trim());

    //const totalsinDescuentoOri = ProductosLista.reduce((acc, item) => acc + parseFloat(item.ImporteTotal || 0), 0);
    // total en Bs sin descuento
    var totalsindescuento = parseFloat($("#txtSubTotal").val().trim());

    // VALIDACIÓN: el descuento no puede ser mayor al total sin descuento
    if (montoDescuento > totalsindescuento) {
        toastr.error("", "El descuento no puede ser mayor al Total");
        $("#txtDescuento").focus();
        return;
    }

    // total a pagar restando el descuento en Bs
    const totalPago = totalsindescuento - montoDescuento;

    // mostrar el total con descuento en Bs
    $("#txtTotal").val(totalPago.toFixed(2));

    // convertir el total a dólares
    const totalDolares = totalPago / valorDolar;

    // mostrar el total con descuento en dólares
    $("#txtTotalDolar").val(totalDolares.toFixed(2));
}


$('#btnCalcular').on('click', function () {

    if (ProductosLista.length < 1) {
        swal("Mensaje", "No existen datos para el calculo", "error");
        return;
    }

    var descuento = $("#txtDescuento").val().trim();
    var valorDolar = $("#txtCambioDolar").val().trim();

    if (descuento === "" || isNaN(descuento) || parseFloat(descuento) < 0) {
        toastr.warning("", "Debe ingresar un valor de Descuento válido (0 o positivo)");
        $("#txtDescuento").focus();
        return;
    }

    if (valorDolar === "" || isNaN(valorDolar) || parseFloat(valorDolar) <= 0) {
        toastr.warning("", "Debe ingresar un monto válido en Cambio del dolar (mayor a 0)");
        $("#txtCambioDolar").focus();
        return;
    }

    calcularTotales();
})

function registrarPagaduria() {

    const cantidadTotal = ProductosLista.reduce((acc, item) => acc + parseInt(item.Cantidad), 0);
    const total = ProductosLista.reduce((acc, item) => acc + parseFloat(item.ImporteTotal), 0);

    // Crear la estructura del request y asignar ProductosLista a RequestList
    var request = {
        ePagaduria: {
            IdProductor: $("#txtIdProductors").val(),
            CantidadTotal: parseInt(cantidadTotal),
            TotalCosto: parseFloat(total),
            Descuento: parseFloat($("#txtDescuento").val().trim()),
            DolarCambio: parseFloat($("#txtCambioDolar").val().trim())
        },
        RequestList: ProductosLista  // Asignamos directamente la lista
    };

    $.ajax({
        type: "POST",
        url: "PagePagaduria.aspx/GuardarPagaduria",
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

                //Limpio input Productor
                $("#txtIdProductors").val("0");
                $("#txtNombreProduct").val("");
                $("#txtNroci").val("");


                $("#txtCambioDolar").val("0");
                $("#txtDescuento").val("0");
                $("#txtTotal").val("0");
                $("#txtTotalDolar").val("0");

                //swal("Mensaje", response.d.Mensaje, "success");

                //var idPagaduria = response.d.Valor;
                //swal("Mensaje", response.d.Mensaje + "\nValor Id: " + idPagaduria, "success");

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
            $('#btnRegistrarPaga').prop('disabled', false);
        }
    });
}


$('#btnRegistrarPaga').on('click', function () {

    $('#btnRegistrarPaga').prop('disabled', true);

    var descuento = $("#txtDescuento").val().trim();
    var valorDolar = $("#txtCambioDolar").val().trim();

    if (ProductosLista.length < 1) {
        swal("Mensaje", "Debe ingresar productos para el registro", "error");
        $('#btnRegistrarPaga').prop('disabled', false);
        return;
    }

    if (descuento === "" || isNaN(descuento) || parseFloat(descuento) < 0) {
        toastr.warning("", "Debe ingresar un valor de Descuento válido (0 o positivo)");
        $("#txtDescuento").focus();
        $('#btnRegistrarPaga').prop('disabled', false);
        return;
    }

    if (valorDolar === "" || isNaN(valorDolar) || parseFloat(valorDolar) <= 0) {
        toastr.warning("", "Debe ingresar un monto válido en Cambio del dolar (mayor a 0)");
        $("#txtCambioDolar").focus();
        $('#btnRegistrarPaga').prop('disabled', false);
        return;
    }


    if (parseInt($("#txtIdProductors").val()) === 0) {
        swal("Mensaje", "Debe Agregar un Productor para el registro", "warning")
        $('#btnRegistrarPaga').prop('disabled', false);
        return;
    }


    registrarPagaduria();
});

function ReportePaga(dataVenta) {
    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Reporte_Pago_2025",
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
            email: "Pagaduria",
            email_1: "asba_srl@gmail.com",
            website: "www.asba_srl.com",
        },
        contact: {
            label: "Pagado A:",
            name: dataVenta.RefProductor.NombreCompleto,
            address: "Departamento de finanzas",
            phone: `Nro Cel: ${dataVenta.RefProductor.Celular}`,
            email: "soporte_asba@gmail.com",
            otherInfo: `Nro CI: ${dataVenta.RefProductor.NroCi}`,
        },
        invoice: {
            label: "Nro #: ",
            num: dataVenta.Codigo,
            invDate: `Cambio USD: ${dataVenta.DolarCambio.toString()}`,
            invGenDate: `Descuento: ${dataVenta.Descuento.toString()}`,
            headerBorder: false,
            tableBodyBorder: false,
            header: ["Producto", "Cantidad", "Precio", "Total"],
            table: dataVenta.ListaDetallePagadurias.map((item, index) => [
                item.RefTipoBanana.Descripcion,
                item.Cantidad.toString(),
                item.Precio.toString(),
                item.ImporteTotal.toString()
            ]),
            invTotalLabel: "Total:",
            invTotal: dataVenta.TotalCosto.toString(),
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

function generarReporte(IdPagaduria) {

    //var request = { IdVenta: parseInt($("#txtIdVentaa").val()) }
    //var request = { IdVenta: 1 }
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