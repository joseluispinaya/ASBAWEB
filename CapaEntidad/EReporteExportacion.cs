using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EReporteExportacion
    {
        public int IdExportacion { get; set; }
        public string Codigo { get; set; }
        public string FechaRegistro { get; set; }
        public string PropiCamion { get; set; }
        public string DestinoEx { get; set; }
        public string Producto { get; set; }
        public int CantidadTotal { get; set; }
        public float CostoTotal { get; set; }
        public float DolarCambio { get; set; }
        public float TotalDolares { get; set; }
        public string DolarStr => DolarCambio.ToString("0.00") + " BS";
        public string TotalDolarStr => TotalDolares.ToString("0.00") + " USD";
        public string TotalCalcuStr => "   " + CostoTotal.ToString("0.00") + " BS";
    }
}
