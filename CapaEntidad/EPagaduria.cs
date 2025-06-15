using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EPagaduria
    {
        public int IdPagaduria { get; set; }
        public string Codigo { get; set; }
        public int IdProductor { get; set; }
        public int CantidadTotal { get; set; }
        public float TotalCosto { get; set; }
        public float Descuento { get; set; }
        public float DolarCambio { get; set; }
        public string FechaRegistro { get; set; }
        public EProductor RefProductor { get; set; }
        public List<EDetallePagaduria> ListaDetallePagadurias { get; set; }
        public string TotalPagado => (TotalCosto - Descuento).ToString("0.00");
        public string TotalDolares => ((TotalCosto - Descuento) / DolarCambio).ToString("0.00");

        //public string TotalPagado => $"{TotalCosto - Descuento}";
        //public string TotalDolares => $"{(TotalCosto - Descuento) / DolarCambio}";
    }
}
