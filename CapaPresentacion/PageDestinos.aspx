<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="PageDestinos.aspx.cs" Inherits="CapaPresentacion.PageDestinos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-shipping-fast mr-2"></i>Panel de Camiones y Destinos</h6>
        </div>
        <div class="card-body">
            <ul class="nav nav-tabs nav-justified" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="profile-tab-2" data-toggle="tab" href="#profile-2" role="tab"
                        aria-controls="profile-2" aria-selected="true">
                        <span class="d-block d-sm-none"><i class="fas fa-shipping-fast"></i></span>
                        <span class="d-none d-sm-block">Panel Camiones</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="home-tab-2" data-toggle="tab" href="#home-2" role="tab" aria-controls="home-2"
                        aria-selected="false">
                        <span class="d-block d-sm-none"><i class="fas fa-globe"></i></span>
                        <span class="d-none d-sm-block">Panel Destinos</span>
                    </a>
                </li>
            </ul>
            <div class="tab-content bg-light">
                <div class="tab-pane fade show active" id="profile-2" role="tabpanel" aria-labelledby="profile-tab-2">
                    
                    <div style="padding: 1rem;">
                        <div class="row" id="loadRe">
                            <div class="col-sm-4">
                                <div class="form-group text-center">
                                    <h5 class="mt-2"><i class="fas fa-shipping-fast mr-2"></i>Registro de Camiones</h5>
                                </div>

                                <input type="hidden" value="0" id="txtIdCamions">

                                <div class="form-row">
                                    <div class="form-group col-sm-6">
                                        <label for="txtNroplaca">Nro Placa</label>
                                        <input type="text" class="form-control form-control-sm input-validar" id="txtNroplaca" name="Nro Placa">
                                    </div>
                                    <div class="form-group col-sm-6">
                                        <label for="txtNrochasis">Nro Chasis</label>
                                        <input type="text" class="form-control form-control-sm input-validar" id="txtNrochasis" name="Nro Chasis">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-sm-6">
                                        <label for="txtPropietario">Propietario</label>
                                        <input type="text" class="form-control form-control-sm input-validar" id="txtPropietario" name="Propietario">
                                    </div>
                                    <div class="form-group col-sm-6">
                                        <label for="txtCelular">Nro Celular</label>
                                        <input type="text" class="form-control form-control-sm input-validar" id="txtCelular" name="Nro Celular">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-sm-6">
                                        <button type="button" class="btn btn-success btn-block btn-sm" id="btnAddCamion"><i class="fas fa-pencil-alt mr-2"></i>Guardar</button>
                                    </div>
                                    <div class="form-group col-sm-6">
                                        <button type="button" class="btn btn-danger btn-block btn-sm" id="btnNeuvoCamio"><i class="fas fa-edit mr-2"></i>Nuevo</button>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-8">
                                <div class="form-group text-center">
                                    <h5 class="mt-2"><i class="fas fa-shipping-fast mr-2"></i>Lista de Camiones</h5>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12">
                                        <table class="table table-sm table-striped" id="tbcamiones" cellspacing="0" style="width: 100%">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Placa</th>
                                                    <th>Chasis</th>
                                                    <th>Propietario</th>
                                                    <th>Celular</th>
                                                    <th>Accion</th>
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
                <div class="tab-pane fade" id="home-2" role="tabpanel" aria-labelledby="home-tab-2">
                    
                    <div style="padding: 1rem;">
                        <div class="row" id="loaddest">
                            <div class="col-sm-5">
                                <div class="form-group text-center">
                                    <h5 class="mt-2"><i class="fas fa-globe mr-2"></i>Registro Destinos</h5>
                                </div>
                                <input type="hidden" value="0" id="txtIdDest">

                                <div class="form-row">
                                    <div class="form-group col-sm-12">
                                        <label for="txtDestino">Ingrese Destino</label>
                                        <input type="text" class="form-control form-control-sm" id="txtDestino">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-sm-6">
                                        <button type="button" class="btn btn-success btn-block btn-sm" id="btnAddnew"><i class="fas fa-pencil-alt mr-2"></i>Guardar</button>
                                    </div>
                                    <div class="form-group col-sm-6">
                                        <button type="button" class="btn btn-danger btn-block btn-sm" id="btnNeuvor"><i class="fas fa-edit mr-2"></i>Nuevo</button>
                                    </div>
                                </div>

                                <%--<div class="form-row align-items-end">

                                    <div class="form-group col-sm-4">
                                        <label for="txtDestino">Destino</label>
                                        <input type="text" class="form-control form-control-sm" id="txtDestino">
                                    </div>
                                    <div class="form-group col-sm-4">
                                        <button type="button" class="btn btn-success btn-block btn-sm" id="btnAddnew"><i class="fas fa-pencil-alt mr-2"></i>Guardar</button>
                                    </div>
                                    <div class="form-group col-sm-4">
                                        <button type="button" class="btn btn-danger btn-block btn-sm" id="btnNeuvor"><i class="fas fa-edit mr-2"></i>Nuevo</button>
                                    </div>
                                </div>--%>

                            </div>
                            <div class="col-sm-7">
                                <div class="form-group text-center">
                                    <h5 class="mt-2"><i class="fas fa-globe mr-2"></i>Lista de Destinos</h5>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12">
                                        <table class="table table-sm table-striped" id="tbDestinos" cellspacing="0" style="width: 100%">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Destinos Reg.</th>
                                                    <th>Estado</th>
                                                    <th>Accion</th>
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
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsfro/PageDestinos.js" type="text/javascript"></script>
</asp:Content>
