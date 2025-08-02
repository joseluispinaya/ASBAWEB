using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NExportacion
    {
        #region "PATRON SINGLETON"
        private static NExportacion daoEmpleado = null;
        private NExportacion() { }
        public static NExportacion GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NExportacion();
            }
            return daoEmpleado;
        }
        #endregion


        public Respuesta<int> RegistrarExportacion(string ActivoXml)
        {
            return DExportacion.GetInstance().RegistrarExportacion(ActivoXml);
        }

        public Respuesta<EExportacion> ObtenerExportacion(int IdExportacion)
        {
            return DExportacion.GetInstance().ObtenerExportacion(IdExportacion);
        }

        public Respuesta<List<EDetalleExportacion>> ObtenerDetalleExport(int IdExportacion)
        {
            return DExportacion.GetInstance().ObtenerDetalleExport(IdExportacion);
        }
    }
}
