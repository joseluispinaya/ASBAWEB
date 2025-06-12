using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EProductor
    {
        public int IdProductor { get; set; }
        public string NombreCompleto { get; set; }
        public string NroCi { get; set; }
        public string Celular { get; set; }
        public string Correo { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
    }
}
