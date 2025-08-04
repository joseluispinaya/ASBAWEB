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
	public partial class Inicio : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<EProductor> ObtenerTotalesLabel()
        {
            Respuesta<List<EProductor>> Lista = NProductor.GetInstance().ListaProductores();
            Respuesta<List<EDestino>> ListaDest = NCamion.GetInstance().ListaDestinos();
            Respuesta<List<ECamion>> ListaCamion = NCamion.GetInstance().ListaCamiones();
            Respuesta<List<EReporteExportacion>> ListaExp = NExportacion.GetInstance().ListaExportacionesRpt();

            EProductor obj = new EProductor
            {
                //totalProductores
                NombreCompleto = (Lista.Data?.Count ?? 0).ToString(),
                //total destinos
                NroCi = (ListaDest.Data?.Count ?? 0).ToString(),
                //total camiones
                Celular = (ListaCamion.Data?.Count ?? 0).ToString(),
                //total exportaciones
                Correo = (ListaExp.Data?.Count ?? 0).ToString()
            };

            return new Respuesta<EProductor>
            {
                Estado = obj != null,
                Data = obj,
                Mensaje = obj != null ? "Datos obtenidos correctamente" : "Ocurrio un error"
            };
        }
    }
}