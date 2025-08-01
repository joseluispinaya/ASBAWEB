<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="PageUsuarios.aspx.cs" Inherits="CapaPresentacion.PageUsuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/cardzer.css" rel="stylesheet">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row justify-content-center mb-2">
    <button type="button" id="btnAddNuevo" class="btn btn-success btn-sm mr-3"><i class="fas fa-user-plus"></i> Nuevo usuario</button>
    <button type="button" id="btnReporte" class="btn btn-primary btn-sm"><i class="fas fa-file-pdf"></i> Reporte</button>
</div>

<div class="card shadow mb-4">
<div class="card-header py-3 bg-second-primary">
    <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-address-book"></i> USUARIOS FYKFKFJHFD</h6>
</div>
<div class="card-body" id="loaddet">
    <div class="row gx-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-start mt-2" id="listar">
        
    </div>
</div>
</div>

<div class="modal fade" id="modalData" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 id="myTitulop">Detalle Usuario</h6>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" value="0" id="txtIdUsuario">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="txtNombre">Nombres</label>
                                <input type="text" class="form-control form-control-sm input-validar" id="txtNombre" name="Nombre">
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="txtapellido">Apellidos</label>
                                <input type="text" class="form-control form-control-sm input-validar" id="txtapellido" name="Apellidos">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="txtCorreo">Correo</label>
                                <input type="email" class="form-control form-control-sm input-validar" id="txtCorreo" name="Correo">
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="txtClave">Contraseña</label>
                                <input type="text" class="form-control form-control-sm input-validar" id="txtClave" name="Contraseña">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-4">
                                <label for="txtCelular">Celular</label>
                                <input type="text" class="form-control form-control-sm input-validar" id="txtCelular" name="Celular">
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="cboEstado">Estado</label>
                                <select class="form-control form-control-sm" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">No Activo</option>
                                </select>
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="cboRol">Rol</label>
                                <select class="form-control form-control-sm" id="cboRol">
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-12">
                                <label for="txtFoto">Foto</label>
                                <input class="form-control-file" type="file" id="txtFoto" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 text-center">
                        <img id="imgUsuarioMx" src="Imagenes/sinimagen.png" alt="Foto usuario" style="height: 150px; max-width: 150px; border-radius: 50%;">
                        <!-- <img id="imgUsuario" style="max-width:200px;" src="Imagenes/sinimagen.png" class="rounded mx-auto d-block" alt="Foto usuario"> -->
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button id="btnGuardarCambios" class="btn btn-primary btn-sm" type="button">Guardar</button>
                <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="https://unpkg.com/jspdf-invoice-template@1.3.1/dist/index.js"></script>
    <script src="jsfro/PageUsuarios.js" type="text/javascript"></script>
</asp:Content>
