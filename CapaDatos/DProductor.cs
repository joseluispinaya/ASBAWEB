using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DProductor
    {
        #region "PATRON SINGLETON"
        public static DProductor _instancia = null;

        private DProductor()
        {

        }

        public static DProductor GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DProductor();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarProductores(EProductor oProductor)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarProductores", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@NombreCompleto", oProductor.NombreCompleto);
                        cmd.Parameters.AddWithValue("@NroCi", oProductor.NroCi);
                        cmd.Parameters.AddWithValue("@Celular", oProductor.Celular);
                        cmd.Parameters.AddWithValue("@Correo", oProductor.Correo);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro nro de ci"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> ActualizarProductores(EProductor oProductor)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarProductores", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdProductor", oProductor.IdProductor);
                        cmd.Parameters.AddWithValue("@NombreCompleto", oProductor.NombreCompleto);
                        cmd.Parameters.AddWithValue("@NroCi", oProductor.NroCi);
                        cmd.Parameters.AddWithValue("@Celular", oProductor.Celular);
                        cmd.Parameters.AddWithValue("@Correo", oProductor.Correo);
                        cmd.Parameters.AddWithValue("@Activo", oProductor.Activo);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se actualizo correctamente" : "Error al actualizar ingrese otro nro de ci"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EProductor>> ListaProductores()
        {
            try
            {
                List<EProductor> rptLista = new List<EProductor>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerProductores", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EProductor()
                                {
                                    IdProductor = Convert.ToInt32(dr["IdProductor"]),
                                    NombreCompleto = dr["NombreCompleto"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = dr["FechaRegistro"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EProductor>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Productores obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProductor>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EProductor> BuscarProductor(string NroCi)
        {
            try
            {
                EProductor obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_BuscarProductor", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.CommandTimeout = 30;
                        comando.Parameters.AddWithValue("@NroCi", NroCi);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EProductor
                                {
                                    IdProductor = Convert.ToInt32(dr["IdProductor"]),
                                    NombreCompleto = dr["NombreCompleto"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EProductor>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Productor obtenido correctamente" : "El nro de ci no se encuentra registrado"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EProductor>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EProductor>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EProductor>> ObtenerProductoresFiltro(string Busqueda)
        {
            try
            {
                List<EProductor> rptLista = new List<EProductor>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerProductorFiltro", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@Busqueda", Busqueda);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EProductor()
                                {
                                    IdProductor = Convert.ToInt32(dr["IdProductor"]),
                                    NombreCompleto = dr["NombreCompleto"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EProductor>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "productores obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProductor>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ETipoBanana>> ListaTipoBanana()
        {
            try
            {
                List<ETipoBanana> rptLista = new List<ETipoBanana>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerTiposBanana", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ETipoBanana()
                                {
                                    IdTipoBanana = Convert.ToInt32(dr["IdTipoBanana"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ETipoBanana>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Tipos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ETipoBanana>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
