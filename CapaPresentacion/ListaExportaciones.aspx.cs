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
	public partial class ListaExportaciones : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EReporteExportacion>> ListaExportacionesp()
        {
            try
            {
                Respuesta<List<EReporteExportacion>> Lista = NExportacion.GetInstance().ListaExportacionesRpt();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EReporteExportacion>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productores: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}