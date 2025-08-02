using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EDetalleExportacion
    {
        public int IdDetalleExportacion { get; set; }
        public int IdExportacion { get; set; }
        public int IdTipoBanana { get; set; }
        public int Cantidad { get; set; }
        public float Precio { get; set; }
        public float MontoTotal { get; set; }

        public ETipoBanana RefTipoBanana { get; set; }
    }
}
