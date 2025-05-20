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
	public partial class PerfilUser : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<bool> CambiarClave(int IdUsuario, string claveActual, string claveNueva)
        {
            try
            {
                if (IdUsuario <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "No se encro al Usuario Intente mas tarde" };
                }
                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ListaUsuarios();
                var listaUsuarios = Lista.Data;
                var item = listaUsuarios.FirstOrDefault(x => x.IdUsuario == IdUsuario);


                if (item == null)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Usuario no encontrado" };
                }

                bool verifi = VerificarClave(item.Clave, claveActual);
                if (!verifi) // Compara el hash
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Contraseña actual incorrecta" };
                }
                // Validar que la nueva clave no sea igual a la actual
                if (claveActual == claveNueva)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "La nueva contraseña no puede ser igual a la actual" };
                }
                string claveEncriptada = Utilidadesj.GetInstance().ConvertirSha256(claveNueva);
                //item.Clave = EncryptacionH.Encrypt(claveNueva);
                Respuesta<bool> respuesta = NUsuario.GetInstance().ActualizarClave(IdUsuario, claveEncriptada);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        private static bool VerificarClave(string hashAlmacenado, string claveIngresada)
        {
            string hashIngresado = Utilidadesj.GetInstance().ConvertirSha256(claveIngresada);

            // Comparar los hashes
            return hashAlmacenado == hashIngresado;
        }
    }
}