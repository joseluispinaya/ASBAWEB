<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="PageExportacion.aspx.cs" Inherits="CapaPresentacion.PageExportacion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-sm-9">
        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow mb-4">
                    <div class="card-header bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white">Registro de exportacion</h6>
                    </div>
                    <div class="card-body">

                        <div class="form-row mb-3">
                            <div class="input-group input-group-sm col-sm-4">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="cboDestinos">Destino</label>
                                </div>
                                <select class="custom-select" id="cboDestinos">
                                </select>
                            </div>
                            <div class="input-group input-group-sm col-sm-5">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="cboCamion">Camion</label>
                                </div>
                                <select class="custom-select" id="cboCamion">
                                </select>
                            </div>
                            <div class="input-group input-group-sm col-sm-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupCambiodolar">Cambio USD:</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small"
                                    aria-describedby="inputGroupCambiodolar" id="txtCambioDolar">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="input-group input-group-sm col-sm-4">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="cboTipoBanana">Banana</label>
                                </div>
                                <select class="custom-select" id="cboTipoBanana">
                                </select>
                            </div>
                            <div class="input-group input-group-sm col-sm-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupCantidadp">Cantidad:</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small"
                                    aria-describedby="inputGroupCantidadp" id="txtCantidadp">
                            </div>
                            <div class="input-group input-group-sm col-sm-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupIGVv">Precio:</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small"
                                    aria-describedby="inputGroupIGVv" id="txtPrecio">
                            </div>
                            <div class="col-sm-2">
                                <button class="btn btn-success btn-sm btn-block" type="button"
                                    id="btnAgregarp">Agregar</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow mb-4">
                    <div class="card-header bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white">Detalle Productos</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-striped table-sm" id="tbProductoex" cellspacing="0" style="width: 100%">
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
    <div class="col-sm-3">

        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow mb-4">
                    <div class="card-header bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white">Detalle de Registro</h6>
                    </div>
                    <div class="card-body" id="loadingAc">
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupTotal">Total en Bs/:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small"
                                aria-describedby="inputGroupTotal" id="txtTotal" disabled>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupSubTotal">Total en $/:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small"
                                aria-describedby="inputGroupSubTotal" id="txtTotalDolar" disabled>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupIGV">Cantidad Total:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small"
                                aria-describedby="inputGroupIGV" id="txtTotcantiex" disabled>
                        </div>
                        <div class="form-group mb-0">
                            <button class="btn btn-success btn-sm btn-block" type="button" id="btnRegistrarExpor">
                                Registrar</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="vendor/jspdfzero/jspdfzero.js"></script>
    <script src="jsfro/PageExportacion.js" type="text/javascript"></script>
</asp:Content>
