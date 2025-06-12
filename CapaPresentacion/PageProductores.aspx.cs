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
	public partial class PageProductores : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EProductor>> ListaProductores()
        {
            try
            {
                Respuesta<List<EProductor>> Lista = NProductor.GetInstance().ListaProductores();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProductor>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productores: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EProductor oProductor)
        {
            try
            {
                Respuesta<bool> respuesta = NProductor.GetInstance().RegistrarProductores(oProductor);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Editar(EProductor oProductor)
        {
            try
            {
                if (oProductor == null || oProductor.IdProductor <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Ocurrio un problema intente mas tarde" };
                }

                Respuesta<bool> respuesta = NProductor.GetInstance().ActualizarProductores(oProductor);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}