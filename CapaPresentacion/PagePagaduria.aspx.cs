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

        [WebMethod]
        public static Respuesta<int> GuardarPagaduria(EPagaduria ePagaduria, List<EDetallePagaduria> RequestList)
        {
            try
            {
                if (RequestList == null || !RequestList.Any())
                {
                    return new Respuesta<int> { Estado = false, Mensaje = "La lista está vacía" };
                }

                XElement activoa = new XElement("Activo",
                    new XElement("IdProductor", ePagaduria.IdProductor),
                    new XElement("CantidadTotal", ePagaduria.CantidadTotal),
                    new XElement("TotalCosto", ePagaduria.TotalCosto),
                    new XElement("Descuento", ePagaduria.Descuento),
                    new XElement("DolarCambio", ePagaduria.DolarCambio)
                );

                XElement detallePagaduria = new XElement("DetalleActivo");

                foreach (EDetallePagaduria item in RequestList)
                {
                    detallePagaduria.Add(new XElement("Item",

                        new XElement("IdTipoBanana", item.IdTipoBanana),
                        new XElement("Cantidad", item.Cantidad),
                        new XElement("Precio", item.Precio),
                        new XElement("ImporteTotal", item.ImporteTotal)
                        )

                    );
                }

                activoa.Add(detallePagaduria);

                // Llamar a RegistrarActivo en la capa de negocio y recibir la respuesta
                Respuesta<int> respuesta = NPagaduria.GetInstance().RegistrarPagaduria(activoa.ToString());
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
        public static Respuesta<EPagaduria> DetallePagaduriaRpt(int IdPagaduria)
        {
            try
            {
                if (IdPagaduria <= 0)
                {
                    return new Respuesta<EPagaduria> { Estado = false, Mensaje = "Error el id es cero", Data = null };
                }

                var servicioActivo = NPagaduria.GetInstance();

                // Obtener el activo principal
                var respuesta = servicioActivo.ObtenerPagaduria(IdPagaduria);
                if (!respuesta.Estado || respuesta.Data == null)
                {
                    return new Respuesta<EPagaduria>
                    {
                        Estado = false,
                        Mensaje = $"No se encontró el activo con ID {IdPagaduria}.",
                        Data = null
                    };
                }

                // Obtener los detalles del activo
                var detalleRespuesta = servicioActivo.ObtenerDetallePagaduria(IdPagaduria);
                if (detalleRespuesta.Estado && detalleRespuesta.Data != null)
                {
                    respuesta.Data.ListaDetallePagadurias = detalleRespuesta.Data;
                }
                else
                {
                    respuesta.Mensaje += " No se pudieron cargar los detalles del activo.";
                    respuesta.Data.ListaDetallePagadurias = new List<EDetallePagaduria>(); // Asegurar lista vacía si falla
                }

                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<EPagaduria>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Error inesperado: " + ex.Message
                };
            }
        }

        //solo para pruebas
        [WebMethod]
        public static Respuesta<bool> GuardarPagaduriaPrue(EPagaduria ePagaduria, List<EDetallePagaduria> RequestList)
        {
            try
            {
                if (RequestList == null || !RequestList.Any())
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "La lista está vacía" };
                }

                XElement activoa = new XElement("Activo",
                    new XElement("IdProductor", ePagaduria.IdProductor),
                    new XElement("CantidadTotal", ePagaduria.CantidadTotal),
                    new XElement("TotalCosto", ePagaduria.TotalCosto),
                    new XElement("Descuento", ePagaduria.Descuento),
                    new XElement("DolarCambio", ePagaduria.DolarCambio)
                );

                XElement detallePagaduria = new XElement("DetalleActivo");

                foreach (EDetallePagaduria item in RequestList)
                {
                    detallePagaduria.Add(new XElement("Item",

                        new XElement("IdTipoBanana", item.IdTipoBanana),
                        new XElement("Cantidad", item.Cantidad),
                        new XElement("Precio", item.Precio),
                        new XElement("ImporteTotal", item.ImporteTotal)
                        )

                    );
                }

                activoa.Add(detallePagaduria);
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