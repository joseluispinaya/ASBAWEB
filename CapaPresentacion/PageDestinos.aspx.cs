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
	public partial class PageDestinos : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}
        [WebMethod]
        public static Respuesta<List<ECamion>> ObtenerCamiones()
        {
            try
            {
                Respuesta<List<ECamion>> Lista = NCamion.GetInstance().ListaCamiones();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECamion>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los camiones: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(ECamion oCamion)
        {
            try
            {
                Respuesta<bool> respuesta = NCamion.GetInstance().RegistrarCamion(oCamion);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Actualizar(ECamion oCamion)
        {
            try
            {
                if (oCamion == null || oCamion.IdCamion <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Ocurrio un problema intente mas tarde" };
                }

                Respuesta<bool> respuesta = NCamion.GetInstance().ModificarCamion(oCamion);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<List<EDestino>> ListaDestinos()
        {
            try
            {
                Respuesta<List<EDestino>> Lista = NCamion.GetInstance().ListaDestinos();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EDestino>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los camiones: " + ex.Message,
                    Data = null
                };
            }
        }

        // nuevo metodo
        [WebMethod]
        public static Respuesta<List<EDestino>> ListaDestinosNuevo()
        {
            try
            {
                Respuesta<List<EDestino>> Lista = NCamion.GetInstance().ListaDestinosNuevo();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EDestino>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los camiones: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> RegistrarDestino(EDestino oDestino)
        {
            try
            {
                Respuesta<bool> respuesta = NCamion.GetInstance().RegistrarDestino(oDestino);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ModificarDestino(EDestino oDestino)
        {
            try
            {
                if (oDestino == null || oDestino.IdDestino <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Ocurrio un problema intente mas tarde" };
                }

                Respuesta<bool> respuesta = NCamion.GetInstance().ModificarDestino(oDestino);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}