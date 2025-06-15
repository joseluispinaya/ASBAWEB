using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EDetallePagaduria
    {
        public int IdDetallePagaduria { get; set; }
        public int IdPagaduria { get; set; }
        public int IdTipoBanana { get; set; }
        public int Cantidad { get; set; }
        public float Precio { get; set; }
        public float ImporteTotal { get; set; }
        public ETipoBanana RefTipoBanana { get; set; }

        //public string PrecioCadena => $"Bs/ {Precio:F2}";
    }
}
