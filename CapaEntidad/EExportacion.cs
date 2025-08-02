using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EExportacion
    {
        public int IdExportacion { get; set; }
        public string Codigo { get; set; }
        public int IdCamion { get; set; }
        public int IdDestino { get; set; }
        public int CantidadTotal { get; set; }
        public float CostoTotal { get; set; }
        public float DolarCambio { get; set; }
        public string FechaRegistro { get; set; }
        public ECamion RefCamion { get; set; }
        public EDestino RefDestino { get; set; }
        public List<EDetalleExportacion> ListaDetalleExportacion { get; set; }

        public string TotalPagado => CostoTotal.ToString("0.00");
        public string TotalDolares => (CostoTotal / DolarCambio).ToString("0.00");
    }
}
