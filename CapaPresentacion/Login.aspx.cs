using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
	public partial class Login : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<EUsuario> Logeo(string Usuario, string Clave)
        {
            try
            {
                var ClaveEncri = Utilidadesj.GetInstance().ConvertirSha256(Clave);
                var obj = NUsuario.GetInstance().LoginUsuario(Usuario, ClaveEncri);

                return obj;
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuario>
                {
                    Estado = false,
                    Valor = "",
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ActualizarClave(int IdUser, string ClaveActual, string ClaveNueva)
        {
            try
            {
                if (IdUser <= 0)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrio un error intente mas tarde" };
                }
                var ClaveEncri = Utilidadesj.GetInstance().ConvertirSha256(ClaveActual);

                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ListaUsuarios();
                var listaUsuarios = Lista.Data;
                var item = listaUsuarios.FirstOrDefault(x => x.IdUsuario == IdUser);

                if (item == null)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "Usuario no encontrado" };
                }

                string claveBd = item.Clave;

                if (ClaveEncri != claveBd)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "La Clave Actual es Incorrecta" };
                }

                string claveEncriptada = Utilidadesj.GetInstance().ConvertirSha256(ClaveNueva);

                Respuesta<bool> respuesta = NUsuario.GetInstance().ActualizarClave(IdUser, claveEncriptada);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}