<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="ListaExportaciones.aspx.cs" Inherits="CapaPresentacion.ListaExportaciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white">Lista de Exportaciones</h6>
        </div>
        <div class="card-body" id="cargann">
            <div class="row">
                <div class="col-sm-12">
                    <table id="tbdataExporta" class="table table-sm table-striped" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Destino</th>
                                <th>Camion Propi.</th>
                                <th>Cantidad - Producto</th>
                                <th>Cambio USD</th>
                                <th>Monto Bs</th>
                                <th>Monto USD</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalDatadetexp" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6>Detalle Exportacion</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-row">
                                <div class="input-group input-group-sm col-sm-4 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupfechar">Registrado:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupfechar" id="txtFechaRegistro" disabled>
                                </div>

                                <div class="input-group input-group-sm col-sm-4 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupcodigo">Codigo:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupcodigo" id="txtNumVenta" disabled>
                                </div>

                                <div class="input-group input-group-sm col-sm-4 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupCambiodolar">Cambio USD:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupCambiodolar" id="txtCambioDolar" disabled>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="input-group input-group-sm col-sm-4 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupnomprod">Popi. Camion:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupnomprod" id="txtproductorn" disabled>
                                </div>

                                <div class="input-group input-group-sm col-sm-4 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupnroci">Nro Placa:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupnroci" id="txtnrocip" disabled>
                                </div>

                                <div class="input-group input-group-sm col-sm-4 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupnrocelu">Celular:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupnrocelu" id="txtnrocelul" disabled>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="input-group input-group-sm col-sm-3 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupTotalpa">Destino:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupTotalpa" id="txtDestinos" disabled>
                                </div>

                                <div class="input-group input-group-sm col-sm-3 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupDescuento">Cant. Total:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupDescuento" id="txtDescuento" disabled>
                                </div>

                                <div class="input-group input-group-sm col-sm-3 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupTotalbspaa">Monto BS:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupTotalbspaa" id="txtTotalBspa" disabled>
                                </div>

                                <div class="input-group input-group-sm col-sm-3 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupTotaldolar">Monto USD:</span>
                                    </div>
                                    <input type="text" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupTotaldolar" id="txtTotalDolar" disabled>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="tbDetalleExpoo" class="table table-sm table-striped">
                                        <thead>
                                            <tr>
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
                <div class="modal-footer">
                    <!-- <a href="#" class="btn btn-primary btn-sm" target="_blank" id="linkImprimir">Imprimir</a> -->
                    <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsfro/ListaExportaciones.js" type="text/javascript"></script>
</asp:Content>
