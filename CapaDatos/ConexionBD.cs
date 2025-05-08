using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class ConexionBD
    {
        #region "PATRON SINGLETON"
        public static ConexionBD conexion = null;

        public ConexionBD() { }

        public static ConexionBD GetInstance()
        {
            if (conexion == null)
            {
                conexion = new ConexionBD();
            }
            return conexion;
        }
        #endregion

        public SqlConnection ConexionDB()
        {
            SqlConnection conexion = new SqlConnection
            {
                ConnectionString = "Data Source=.;Initial Catalog=ExportacionDB;Integrated Security=True"
            };

            return conexion;
        }
    }
}
