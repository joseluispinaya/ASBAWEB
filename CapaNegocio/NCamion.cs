using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NCamion
    {
        #region "PATRON SINGLETON"
        private static NCamion daoEmpleado = null;
        private NCamion() { }
        public static NCamion GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NCamion();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarCamion(ECamion oCamion)
        {
            return DCamion.GetInstance().RegistrarCamion(oCamion);
        }

        public Respuesta<bool> ModificarCamion(ECamion oCamion)
        {
            return DCamion.GetInstance().ModificarCamion(oCamion);
        }

        public Respuesta<List<ECamion>> ListaCamiones()
        {
            return DCamion.GetInstance().ListaCamiones();
        }

        public Respuesta<bool> RegistrarDestino(EDestino oDestino)
        {
            return DCamion.GetInstance().RegistrarDestino(oDestino);
        }

        public Respuesta<bool> ModificarDestino(EDestino oDestino)
        {
            return DCamion.GetInstance().ModificarDestino(oDestino);
        }

        public Respuesta<List<EDestino>> ListaDestinos()
        {
            return DCamion.GetInstance().ListaDestinos();
        }
    }
}
