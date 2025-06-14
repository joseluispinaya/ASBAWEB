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
	public partial class PagePagaduria : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<ETipoBanana>> ListaTipoBanana()
        {
            try
            {
                Respuesta<List<ETipoBanana>> Lista = NProductor.GetInstance().ListaTipoBanana();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ETipoBanana>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los tipos: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}