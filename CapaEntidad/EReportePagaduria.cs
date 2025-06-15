using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EReportePagaduria
    {
        public int IdPagaduria { get; set; }
        public string Codigo { get; set; }
        public string FechaRegistro { get; set; }
        public string Productor { get; set; }
        public string Producto { get; set; }
        public int CantidadTotal { get; set; }
        public float TotalCalculado { get; set; }
        public float Descuento { get; set; }
        public float DolarCambio { get; set; }
        // totalpagado en bs con descuento
        public float TotalPagado { get; set; }
        public float TotalDolares { get; set; }
        public string TotalDolarStr => TotalDolares.ToString("0.00") + " USD";
        public string TotalCalcuStr => TotalCalculado.ToString("0.00") + " BS";
        public string DescuentoStr => Descuento.ToString("0.00") + " BS";
    }
}
