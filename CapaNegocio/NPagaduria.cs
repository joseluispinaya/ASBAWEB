using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NPagaduria
    {
        #region "PATRON SINGLETON"
        private static NPagaduria daoEmpleado = null;
        private NPagaduria() { }
        public static NPagaduria GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NPagaduria();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<int> RegistrarPagaduria(string ActivoXml)
        {
            return DPagaduria.GetInstance().RegistrarPagaduria(ActivoXml);
        }

        public Respuesta<EPagaduria> ObtenerPagaduria(int IdPagaduria)
        {
            return DPagaduria.GetInstance().ObtenerPagaduria(IdPagaduria);
        }

        public Respuesta<List<EDetallePagaduria>> ObtenerDetallePagaduria(int IdPagaduria)
        {
            return DPagaduria.GetInstance().ObtenerDetallePagaduria(IdPagaduria);
        }

        public Respuesta<List<EReportePagaduria>> ListaPagaduriaRpt()
        {
            return DPagaduria.GetInstance().ListaPagaduriaRpt();
        }
    }
}
