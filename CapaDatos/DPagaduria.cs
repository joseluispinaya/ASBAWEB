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
    public class DPagaduria
    {
        #region "PATRON SINGLETON"
        public static DPagaduria _instancia = null;

        private DPagaduria()
        {

        }

        public static DPagaduria GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DPagaduria();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<int> RegistrarPagaduria(string ActivoXml)
        {
            var respuesta = new Respuesta<int>();

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarPagaduria", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Agregar parámetro de entrada
                        cmd.Parameters.AddWithValue("@ActivoXml", ActivoXml);

                        // Agregar parámetro de salida
                        var outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        // Abrir la conexión y ejecutar el comando
                        con.Open();
                        cmd.ExecuteNonQuery();

                        // Obtener el valor del parámetro de salida
                        int resultado = Convert.ToInt32(outputParam.Value);

                        // Configurar respuesta de éxito
                        respuesta.Estado = resultado > 0;
                        respuesta.Valor = resultado.ToString();
                        respuesta.Mensaje = resultado > 0 ? "Registro realizado correctamente." : "Error al registrar, intente más tarde.";
                        respuesta.Data = resultado;
                    }
                }
            }
            catch (SqlException ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = $"Ocurrió un error en la base de datos: {ex.Message}";
            }
            catch (Exception ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = $"Ocurrió un error: {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<EPagaduria> ObtenerPagaduria(int IdPagaduria)
        {
            try
            {
                EPagaduria obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerPagaduria", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdPagaduria", IdPagaduria);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new EPagaduria
                                {
                                    IdPagaduria = Convert.ToInt32(dr["IdPagaduria"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    RefProductor = new EProductor
                                    {
                                        NombreCompleto = dr["NombreCompleto"].ToString(),
                                        NroCi = dr["NroCi"].ToString(),
                                        Celular = dr["Celular"].ToString()
                                    },
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    TotalCosto = float.Parse(dr["TotalCosto"].ToString()),
                                    Descuento = float.Parse(dr["Descuento"].ToString()),
                                    DolarCambio = float.Parse(dr["DolarCambio"].ToString()),
                                    FechaRegistro = dr["FechaRegistro"].ToString()
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EPagaduria>
                {
                    Estado = obj != null,  // El operador ternario ya no es necesario aquí, `obj != null` es suficiente
                    Data = obj,
                    Mensaje = obj != null ? "Detalle obtenido exitoso" : "Ocurrio un error"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EPagaduria>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EPagaduria>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EDetallePagaduria>> ObtenerDetallePagaduria(int IdPagaduria)
        {
            try
            {
                List<EDetallePagaduria> rptLista = new List<EDetallePagaduria>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerDetallePagaduria", con))
                    {
                        comando.Parameters.AddWithValue("@IdPagaduria", IdPagaduria);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EDetallePagaduria()
                                {
                                    IdDetallePagaduria = Convert.ToInt32(dr["IdDetallePagaduria"]),
                                    RefTipoBanana = new ETipoBanana
                                    {
                                        Descripcion = dr["Descripcion"].ToString()
                                    },
                                    Cantidad = Convert.ToInt32(dr["Cantidad"]),
                                    Precio = float.Parse(dr["Precio"].ToString()),
                                    ImporteTotal = float.Parse(dr["ImporteTotal"].ToString())
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EDetallePagaduria>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Detalles obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EDetallePagaduria>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EReportePagaduria>> ListaPagaduriaRpt()
        {
            try
            {
                List<EReportePagaduria> rptLista = new List<EReportePagaduria>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ListaPagaduriaDetalle", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EReportePagaduria()
                                {
                                    IdPagaduria = Convert.ToInt32(dr["IdPagaduria"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    FechaRegistro = dr["FechaRegistro"].ToString(),
                                    Productor = dr["Productor"].ToString(),
                                    Producto = dr["BANANAS"].ToString(),
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    TotalCalculado = float.Parse(dr["TotalCalculado"].ToString()),
                                    Descuento = float.Parse(dr["Descuento"].ToString()),
                                    DolarCambio = float.Parse(dr["DolarCambio"].ToString()),
                                    TotalPagado = float.Parse(dr["TotalPagado"].ToString()),
                                    TotalDolares = float.Parse(dr["TotalDolares"].ToString())

                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EReportePagaduria>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EReportePagaduria>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EReportePagaduria>> PagaduriaRpt(string FechaInicio, string FechaFin)
        {
            try
            {
                List<EReportePagaduria> rptLista = new List<EReportePagaduria>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_PagaduriaDetalleReporte", con))
                    {
                        comando.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                        comando.Parameters.AddWithValue("@FechaFin", FechaFin);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EReportePagaduria()
                                {
                                    IdPagaduria = Convert.ToInt32(dr["IdPagaduria"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    FechaRegistro = dr["FechaRegistro"].ToString(),
                                    Productor = dr["Productor"].ToString(),
                                    Producto = dr["BANANAS"].ToString(),
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    TotalCalculado = float.Parse(dr["TotalCalculado"].ToString()),
                                    Descuento = float.Parse(dr["Descuento"].ToString()),
                                    DolarCambio = float.Parse(dr["DolarCambio"].ToString()),
                                    TotalPagado = float.Parse(dr["TotalPagado"].ToString()),
                                    TotalDolares = float.Parse(dr["TotalDolares"].ToString())

                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EReportePagaduria>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EReportePagaduria>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
