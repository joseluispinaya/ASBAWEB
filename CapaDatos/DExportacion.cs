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
    public class DExportacion
    {
        #region "PATRON SINGLETON"
        public static DExportacion _instancia = null;

        private DExportacion()
        {

        }

        public static DExportacion GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DExportacion();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<int> RegistrarExportacion(string ActivoXml)
        {
            var respuesta = new Respuesta<int>();

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarExportacion", con))
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

        public Respuesta<EExportacion> ObtenerExportacion(int IdExportacion)
        {
            try
            {
                EExportacion obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerExport", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdExportacion", IdExportacion);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new EExportacion
                                {
                                    IdExportacion = Convert.ToInt32(dr["IdExportacion"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    RefCamion = new ECamion
                                    {
                                        Propietario = dr["Propietario"].ToString(),
                                        Placa = dr["Placa"].ToString(),
                                        Celular = dr["Celular"].ToString()
                                    },
                                    RefDestino = new EDestino
                                    {
                                        Descripcion = dr["Descripcion"].ToString()
                                    },
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    CostoTotal = float.Parse(dr["CostoTotal"].ToString()),
                                    DolarCambio = float.Parse(dr["DolarCambio"].ToString()),
                                    FechaRegistro = dr["FechaRegistro"].ToString()
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EExportacion>
                {
                    Estado = obj != null,  // El operador ternario ya no es necesario aquí, `obj != null` es suficiente
                    Data = obj,
                    Mensaje = obj != null ? "Detalle obtenido exitoso" : "Ocurrio un error"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EExportacion>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EExportacion>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EDetalleExportacion>> ObtenerDetalleExport(int IdExportacion)
        {
            try
            {
                List<EDetalleExportacion> rptLista = new List<EDetalleExportacion>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerDetalleExport", con))
                    {
                        comando.Parameters.AddWithValue("@IdExportacion", IdExportacion);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EDetalleExportacion()
                                {
                                    IdDetalleExportacion = Convert.ToInt32(dr["IdDetalleExportacion"]),
                                    RefTipoBanana = new ETipoBanana
                                    {
                                        Descripcion = dr["Descripcion"].ToString()
                                    },
                                    Cantidad = Convert.ToInt32(dr["Cantidad"]),
                                    Precio = float.Parse(dr["Precio"].ToString()),
                                    MontoTotal = float.Parse(dr["MontoTotal"].ToString())
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EDetalleExportacion>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Detalles obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EDetalleExportacion>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EReporteExportacion>> ListaExportacionesRpt()
        {
            try
            {
                List<EReporteExportacion> rptLista = new List<EReporteExportacion>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ListaExportacionDet", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EReporteExportacion()
                                {
                                    IdExportacion = Convert.ToInt32(dr["IdExportacion"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    FechaRegistro = dr["FechaRegistro"].ToString(),
                                    PropiCamion = dr["PropiCamion"].ToString(),
                                    DestinoEx = dr["DestinoEx"].ToString(),
                                    Producto = dr["BANANAS"].ToString(),
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    CostoTotal = float.Parse(dr["CostoTotal"].ToString()),
                                    DolarCambio = float.Parse(dr["DolarCambio"].ToString()),
                                    TotalDolares = float.Parse(dr["TotalDolares"].ToString())

                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EReporteExportacion>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EReporteExportacion>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
