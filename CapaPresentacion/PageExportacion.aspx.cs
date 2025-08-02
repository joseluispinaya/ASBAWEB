using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.Xml.Linq;

namespace CapaPresentacion
{
	public partial class PageExportacion : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<int> GuardarExportacions(EExportacion eExportacion, List<EDetalleExportacion> RequestList)
        {
            try
            {
                if (RequestList == null || !RequestList.Any())
                {
                    return new Respuesta<int> { Estado = false, Mensaje = "La lista está vacía" };
                }

                XElement activoa = new XElement("Activo",
                    new XElement("IdCamion", eExportacion.IdCamion),
                    new XElement("IdDestino", eExportacion.IdDestino),
                    new XElement("CantidadTotal", eExportacion.CantidadTotal),
                    new XElement("CostoTotal", eExportacion.CostoTotal),
                    new XElement("DolarCambio", eExportacion.DolarCambio)
                );

                XElement detalleExportacion = new XElement("DetalleActivo");

                foreach (EDetalleExportacion item in RequestList)
                {
                    detalleExportacion.Add(new XElement("Item",

                        new XElement("IdTipoBanana", item.IdTipoBanana),
                        new XElement("Cantidad", item.Cantidad),
                        new XElement("Precio", item.Precio),
                        new XElement("MontoTotal", item.MontoTotal)
                        )

                    );
                }

                activoa.Add(detalleExportacion);
                // Llamar a RegistrarActivo en la capa de negocio y recibir la respuesta
                Respuesta<int> respuesta = NExportacion.GetInstance().RegistrarExportacion(activoa.ToString());
                return respuesta;

            }
            catch (Exception ex)
            {
                // Capturar cualquier error y retornar una respuesta de fallo
                return new Respuesta<int>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }


        [WebMethod]
        public static Respuesta<EExportacion> DetalleExportacionRpt(int IdExportacion)
        {
            try
            {
                if (IdExportacion <= 0)
                {
                    return new Respuesta<EExportacion> { Estado = false, Mensaje = "Error el id es cero", Data = null };
                }

                var servicioActivo = NExportacion.GetInstance();

                // Obtener el activo principal
                var respuesta = servicioActivo.ObtenerExportacion(IdExportacion);
                if (!respuesta.Estado || respuesta.Data == null)
                {
                    return new Respuesta<EExportacion>
                    {
                        Estado = false,
                        Mensaje = $"No se encontró el detalle con ID {IdExportacion}.",
                        Data = null
                    };
                }

                // Obtener los detalles del activo
                var detalleRespuesta = servicioActivo.ObtenerDetalleExport(IdExportacion);
                if (detalleRespuesta.Estado && detalleRespuesta.Data != null)
                {
                    respuesta.Data.ListaDetalleExportacion = detalleRespuesta.Data;
                }
                else
                {
                    respuesta.Mensaje += " No se pudieron cargar los detalles del activo.";
                    respuesta.Data.ListaDetalleExportacion = new List<EDetalleExportacion>(); // Asegurar lista vacía si falla
                }

                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<EExportacion>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Error inesperado: " + ex.Message
                };
            }
        }

        //solo para pruebas
        [WebMethod]
        public static Respuesta<bool> GuardarExpor(EExportacion eExportacion, List<EDetalleExportacion> RequestList)
        {
            try
            {
                if (RequestList == null || !RequestList.Any())
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "La lista está vacía" };
                }

                XElement activoa = new XElement("Activo",
                    new XElement("IdCamion", eExportacion.IdCamion),
                    new XElement("IdDestino", eExportacion.IdDestino),
                    new XElement("CantidadTotal", eExportacion.CantidadTotal),
                    new XElement("CostoTotal", eExportacion.CostoTotal),
                    new XElement("DolarCambio", eExportacion.DolarCambio)
                );

                XElement detalleExportacion = new XElement("DetalleActivo");

                foreach (EDetalleExportacion item in RequestList)
                {
                    detalleExportacion.Add(new XElement("Item",

                        new XElement("IdTipoBanana", item.IdTipoBanana),
                        new XElement("Cantidad", item.Cantidad),
                        new XElement("Precio", item.Precio),
                        new XElement("MontoTotal", item.MontoTotal)
                        )

                    );
                }

                activoa.Add(detalleExportacion);
                var estructura = activoa.ToString();
                bool encontrado = !string.IsNullOrEmpty(estructura);

                return new Respuesta<bool>
                {
                    Estado = encontrado,
                    Mensaje = encontrado ? "Estructura xml bien" : "No tiene estructura"
                };


            }
            catch (Exception ex)
            {
                // Capturar cualquier error y retornar una respuesta de fallo
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }
    }
}