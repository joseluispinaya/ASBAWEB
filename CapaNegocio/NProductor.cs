using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NProductor
    {
        #region "PATRON SINGLETON"
        private static NProductor daoEmpleado = null;
        private NProductor() { }
        public static NProductor GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NProductor();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarProductores(EProductor oProductor)
        {
            return DProductor.GetInstance().RegistrarProductores(oProductor);
        }

        public Respuesta<bool> ActualizarProductores(EProductor oProductor)
        {
            return DProductor.GetInstance().ActualizarProductores(oProductor);
        }

        public Respuesta<List<EProductor>> ListaProductores()
        {
            return DProductor.GetInstance().ListaProductores();
        }

        public Respuesta<EProductor> BuscarProductor(string NroCi)
        {
            return DProductor.GetInstance().BuscarProductor(NroCi);
        }

        public Respuesta<List<EProductor>> ObtenerProductoresFiltro(string Busqueda)
        {
            return DProductor.GetInstance().ObtenerProductoresFiltro(Busqueda);
        }

        public Respuesta<List<ETipoBanana>> ListaTipoBanana()
        {
            return DProductor.GetInstance().ListaTipoBanana();
        }
    }
}
