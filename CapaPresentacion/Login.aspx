<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html lang="ES">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Login</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.css" rel="stylesheet">
    <link href="vendor/toastr/toastr.min.css" rel="stylesheet">
    <link href="vendor/sweetalert/sweetalert.css" rel="stylesheet">
</head>
    <!-- body class="bg-gradient-info"-->
<body class="bg-gradient-success">

    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Bienvenido</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user" id="txtcorreo" value="mario@yopmail.com" placeholder="Correo">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user" id="txtpassword" value="123456" placeholder="Contraseña">
                                        </div>

                                        <button type="button" class="btn btn-success btn-user btn-block" id="ingrsarLo">INGRESAR</button>
										
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <a class="small" href="#" id="btncorreo">¿Olvidó su contraseña?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

    <div class="modal fade" id="modalcorr" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 id="ti">Recuperrar Contraseña</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-row">
                                <div class="form-group col-sm-12">
                                    <label for="txtcxorreo">CORREO</label>
                                    <input type="text" class="form-control form-control-sm" id="txtcxorreo">
                                </div>
                            </div>
                            <div class="row justify-content-center align-items-center mb-2">
                                <button type="button" id="btnEnviarC" class="btn btn-primary btn-sm mr-3"><i class="fas fa-user-plus"></i>Enviar</button>
                                <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalClaveRes" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="loadd">
            <div class="modal-header">
                <h6>Actualizar Contraseña</h6>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
              <input type="hidden" value="0" id="txtIdUsuario">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-row">
                            <div class="form-group col-sm-12">
                                <label for="txtclaveActual">Clave Actual</label>
                                <input type="text" class="form-control form-control-sm" id="txtclaveActual">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-12">
                                <label for="txtclaveNueva">Clave Nueva</label>
                                <input type="text" class="form-control form-control-sm" id="txtclaveNueva">
                            </div>
                        </div>
                        <div class="row justify-content-center align-items-center mb-2">
                            <button type="button" id="btnEnviarn" class="btn btn-primary btn-sm mr-3"><i class="fas fa-user-plus"></i> Enviar</button>
                            <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>


    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/toastr/toastr.min.js"></script>
    <script src="vendor/sweetalert/sweetalert.js"></script>
    <script src="vendor/loadingoverlay/loadingoverlay.min.js"></script>
    <script src="jsfro/Login.js" type="text/javascript"></script>
</body>
</html>
