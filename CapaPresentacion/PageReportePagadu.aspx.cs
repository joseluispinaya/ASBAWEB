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
	public partial class PageReportePagadu : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EReportePagaduria>> ListaPagadu()
        {
            try
            {
                Respuesta<List<EReportePagaduria>> Lista = NPagaduria.GetInstance().ListaPagaduriaRpt();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EReportePagaduria>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productores: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EReportePagaduria>> PagaduriaRpt(string fechainicio, string fechafin)
        {

            try
            {
                if (string.IsNullOrEmpty(fechainicio) || string.IsNullOrEmpty(fechafin))
                {
                    return new Respuesta<List<EReportePagaduria>>()
                    {
                        Estado = false,
                        Mensaje = "Ingrese las fechas para la consulta",
                        Data = null
                    };

                }

                // Intenta convertir las cadenas de fecha en objetos DateTime ret dd mm yy
                //desde = DateTime.ParseExact(fechainicio, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                //hasta = DateTime.ParseExact(fechafin, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                Respuesta<List<EReportePagaduria>> Lista = NPagaduria.GetInstance().PagaduriaRpt(fechainicio, fechafin);
                return Lista;


            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EReportePagaduria>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productores: " + ex.Message,
                    Data = null
                };
            }

        }
    }
}