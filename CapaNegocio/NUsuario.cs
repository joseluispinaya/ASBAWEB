using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NUsuario
    {
        #region "PATRON SINGLETON"
        private static NUsuario daoEmpleado = null;
        private NUsuario() { }
        public static NUsuario GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NUsuario();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarUsuario(EUsuario oUsuario)
        {
            return DUsuario.GetInstance().RegistrarUsuario(oUsuario);
        }

        public Respuesta<bool> ActualizarUsuario(EUsuario oUsuario)
        {
            return DUsuario.GetInstance().ActualizarUsuario(oUsuario);
        }

        public Respuesta<List<EUsuario>> ListaUsuarios()
        {
            return DUsuario.GetInstance().ListaUsuarios();
        }

        public Respuesta<EUsuario> LoginUsuario(string Correo, string Clave)
        {
            return DUsuario.GetInstance().LoginUsuario(Correo, Clave);
        }

        public Respuesta<bool> ActualizarClave(int IdUser, string NuevaClave)
        {
            return DUsuario.GetInstance().ActualizarClave(IdUser, NuevaClave);
        }

        public Respuesta<List<ERol>> ListaRoles()
        {
            return DUsuario.GetInstance().ListaRoles();
        }
    }
}
