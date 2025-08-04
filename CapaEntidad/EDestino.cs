using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EDestino
    {
        public int IdDestino { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public int TotalUsos { get; set; }
    }
}
