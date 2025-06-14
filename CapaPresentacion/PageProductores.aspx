<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="PageProductores.aspx.cs" Inherits="CapaPresentacion.PageProductores" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        #tbproductores thead th {
            background-color: #4e73df; /* azul SB Admin 2 */
            color: white;
            font-weight: bold;
            text-align: center;
            vertical-align: middle;
        }

        #tbproductores tbody td {
            vertical-align: middle;
        }

        #tbproductores tbody tr {
            transition: background-color 0.3s ease;
            cursor: pointer;
        }

            #tbproductores tbody tr:hover {
                background-color: #d1e7dd; /* verde claro tipo success */
            }

                #tbproductores tbody tr:hover td {
                    color: #1b4f2c; /* verde más oscuro */
                }

        .input-error {
            border: 2px solid #e74a3b !important;
            animation: shake 0.3s;
        }

        @keyframes shake {
            0% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-4px);
            }

            50% {
                transform: translateX(4px);
            }

            75% {
                transform: translateX(-4px);
            }

            100% {
                transform: translateX(0);
            }
        }
        .position-relative {
            position: relative;
        }

        .icon-feedback {
            position: absolute;
            top: 38px;
            right: 10px;
            font-size: 1.2rem;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

            .icon-feedback.valid {
                color: #28a745; /* verde */
                opacity: 1;
            }

            .icon-feedback.invalid {
                color: #e74a3b; /* rojo */
                opacity: 1;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-id-card mr-3"></i>PANEL DE PRODUCTORES</h6>
        </div>
        <div class="card-body">
            <div class="row justify-content-center mb-4">
                <button type="button" id="btnAddNuevoSo" class="btn btn-success btn-sm mr-3"><i class="fas fa-user-plus mr-2"></i>Nuevo Registro</button>
                <button type="button" id="btnReporteSo" class="btn btn-primary btn-sm"><i class="fas fa-file-pdf mr-2"></i>Generar Reporte</button>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-bordered" id="tbproductores" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th><i class="fas fa-user mr-1"></i>Nombre Completo</th>
                                <th><i class="fas fa-id-card mr-1"></i>Nro CI</th>
                                <th><i class="fas fa-phone-alt mr-1"></i>Contacto</th>
                                <th><i class="fas fa-envelope mr-1"></i>Correo</th>
                                <th><i class="fas fa-toggle-on mr-1"></i>Estado</th>
                                <th><i class="fas fa-tools mr-1"></i>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>


    <div class="modal fade" id="modalProducto" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 id="myTitulopr">Detalle</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" value="0" id="txtIdProductor">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtNombre">Nombres</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtNombre" name="Nombre">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtnroci">Nro CI</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtnroci" name="Nro ci">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-6 position-relative">
                                    <label for="txtCorreo">Correo</label>
                                    <input type="email" class="form-control form-control-sm input-validar" id="txtCorreo" name="Correo">
                                    <span class="icon-feedback" id="correo-feedback"></span>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtCelular">Celular</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtCelular" name="Celular">
                                </div>
                            </div>
                            <div class="form-row align-items-center" style="min-height: 80px;">
                            <div class="form-group col-sm-6">
                                <label for="cboEstado">Estado</label>
                                <select class="form-control form-control-sm" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">No Activo</option>
                                </select>
                            </div>
                            <div class="col-sm-6 d-flex justify-content-center align-items-center">
                                <button id="btnGuardarCambios" class="btn btn-primary btn-sm mr-2" type="button">Guardar</button>
                                <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <%--<script src="https://unpkg.com/jspdf-invoice-template@1.3.1/dist/index.js"></script>--%>
    <script src="vendor/jspdfzero/jspdfzero.js"></script>
    <script src="jsfro/PageProductores.js" type="text/javascript"></script>
</asp:Content>
