<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="PagePagaduria.aspx.cs" Inherits="CapaPresentacion.PagePagaduria" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="vendor/select2/select2.min.css" rel="stylesheet">
    <style>
        .select2 {
            width: 100% !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-12">
            <div class="card shadow mb-4">
                <div class="card-header bg-second-primary">
                    <h6 class="m-0 font-weight-bold text-white">Datos de Nueva Pagaduria</h6>
                </div>
                <div class="card-body">
                    <input type="hidden" value="0" id="txtIdProductors">
                    <div class="form-row mb-3">
                        <div class="form-group col-sm-4">
                            <label for="cboBuscarProductor">Buscar Productor</label>
                            <select class="form-control form-control-sm" id="cboBuscarProductor">
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="txtNombreProduct">Nombre Productor</label>
                            <input type="text" class="form-control form-control-sm" id="txtNombreProduct" disabled>
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="txtNroci">Nro CI</label>
                            <input type="text" class="form-control form-control-sm" id="txtNroci" disabled>
                        </div>
                        <div class="form-group col-sm-2">
                            <label for="txtCambioDolar">Cambio dolar $:</label>
                            <input type="text" class="form-control form-control-sm" id="txtCambioDolar">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="input-group input-group-sm col-sm-4">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="cboTipoBanana">Tipo Banana</label>
                            </div>
                            <select class="custom-select" id="cboTipoBanana">
                            </select>
                        </div>
                        <div class="input-group input-group-sm col-sm-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupCantidadp">Ingrese Cantidad:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupCantidadp"
                                id="txtCantidadp">
                        </div>
                        <div class="input-group input-group-sm col-sm-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupIGV">Ingrese Precio:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupIGV"
                                id="txtPrecio">
                        </div>
                        <div class="col-sm-2">
                            <button class="btn btn-success btn-sm btn-block" type="button" id="btnAgregarp">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card shadow mb-4">
                        <div class="card-header bg-second-primary">
                            <h6 class="m-0 font-weight-bold text-white">Detalle Productos</h6>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-striped table-sm" id="tbProducto" cellspacing="0"
                                        style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th>Precio</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-sm-4">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card shadow">
                        <div class="card-header bg-second-primary">
                            <h6 class="m-0 font-weight-bold text-white">Detalle de Registro</h6>
                        </div>
                        <div class="card-body" id="loadingAc">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupDescuento">Ingrese Descuento:</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small"
                                    aria-describedby="inputGroupDescuento" id="txtDescuento">
                            </div>

                            <div class="form-group mb-3">
                                <button class="btn btn-primary btn-sm btn-block" type="button"
                                    id="btnCalcular">
                                    Calcular Pago</button>
                            </div>

                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupSubTotal">Total sin Descuento:</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small"
                                    aria-describedby="inputGroupSubTotal" id="txtSubTotal" disabled>
                            </div>
                            
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupTotaldolar">Monto Total en $/:</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupTotaldolar"
                                    id="txtTotalDolar" disabled>
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupTotal">Total a Pagar en Bs/:</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small"
                                    aria-describedby="inputGroupTotal" id="txtTotal" disabled>
                            </div>
                            <div class="form-group mb-0">
                                <button class="btn btn-success btn-sm btn-block" type="button"
                                    id="btnRegistrarPaga">
                                    Registrar</button>
                            </div>
                            <%--<div class="form-group mb-0">
                                <button class="btn btn-info btn-block btn-sm" type="button" id="btnImprimirPr"><i class="fas fa-print mr-2"></i>Reporte</button>
                            </div>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="vendor/jspdfzero/jspdfzero.js"></script>
    <script src="vendor/select2/select2.min.js"></script>
    <script src="vendor/select2/es.min.js"></script>
    <script src="jsfro/PagePagaduria.js" type="text/javascript"></script>
</asp:Content>
