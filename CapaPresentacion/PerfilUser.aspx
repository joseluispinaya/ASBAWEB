<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="PerfilUser.aspx.cs" Inherits="CapaPresentacion.PerfilUser" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
  <div class="col-sm-8">

    <div class="card shadow mb-4">
      <div class="card-header py-3 bg-second-primary">
        <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-user"></i> Mis Datos</h6>
      </div>
      <div class="card-body" id="loadPe">
        <input type="hidden" value="0" id="txtIdUsuarioP">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-row">
              <div class="form-group col-sm-12">
                <img id="imgFotop" src="Imagenes/sinimagen.png" class="rounded mx-auto d-block"
                  style="width: 140px; height: 140px;">
              </div>
            </div>

            <hr>
            <div class="row">
              <div class="col-sm-12">
                <button type="button" class="btn btn-success btn-sm btn-block" id="btnGuardarCambiosp">Guardar
                  Cambios</button>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="form-row">
              <div class="form-group col-sm-6">
                <label for="txtNombre">Nombre</label>
                <input type="text" class="form-control form-control-sm" id="txtNombre">
              </div>
              <div class="form-group col-sm-6">
                <label for="txtapellido">Apellidos</label>
                <input type="text" class="form-control form-control-sm" id="txtapellido">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-sm-6">
                <label for="txtCorreo">Correo</label>
                <input type="text" class="form-control form-control-sm" id="txtCorreo">
              </div>
              <div class="form-group col-sm-6">
                <label for="txtRol">Rol</label>
                <input type="text" class="form-control form-control-sm" disabled id="txtRol">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-sm-12">
                <label for="txtFotop">Seleccionar Foto</label>
                <input class="form-control-file" type="file" id="txtFotop" />
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

  </div>
  <div class="col-sm-4">
    <div class="card shadow mb-4" id="loadis">
      <div class="card-header py-3 bg-second-primary">
        <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-key"></i> Cambiar Contraseña</h6>
      </div>
      <div class="card-body">
        <div class="form-row">
            <div class="form-group col-sm-12">
              <label for="txtClaveActual">Contraseña Actual</label>
              <input type="password" class="form-control form-control-sm input-validar" id="txtClaveActual"
                name="Clave Actual">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-sm-12">
              <label for="txtClaveNueva">Nueva Contraseña</label>
              <input type="password" class="form-control form-control-sm input-validar" id="txtClaveNueva"
                name="Clave Nueva">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-sm-12">
              <label for="txtConfirmarClave">Confirmar Contraseña</label>
              <input type="password" class="form-control form-control-sm input-validar" id="txtConfirmarClave"
                name="Confirmar Clave">
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-12">
              <button type="button" class="btn btn-success btn-sm btn-block" id="btnCambiarClave">Guardar
                Cambios</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsfro/PerfilUser.js" type="text/javascript"></script>
</asp:Content>
