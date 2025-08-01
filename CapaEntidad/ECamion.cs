using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ECamion
    {
        public int IdCamion { get; set; }
        public string Placa { get; set; }
        public string Chasis { get; set; }
        public string Propietario { get; set; }
        public string Celular { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
    }
}
