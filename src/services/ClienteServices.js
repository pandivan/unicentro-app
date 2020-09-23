import axios from "axios";

const BACKEND_URL = "https://unicentro-api-rest.herokuapp.com/api/cliente/covid";
// const BACKEND_URL = "http://192.168.1.8:7788/api/cliente/covid";




/**
 * Función que permite actualizar o registrar un nuevo cliente en BD
 * @param cliente, Cliente actualizar o registrar
 */
const registrarCliente = async (cliente) => 
{
  try
  {
    let respuesta = null;

    if("" === cliente.idCliente)
    {
      //se crea el cliente y la visita
      respuesta = await axios.post(`${BACKEND_URL}`, cliente);
    }
    else
    {
      //se actualiza el cliente y se crea la visita
      respuesta = await axios.put(`${BACKEND_URL}`, cliente);
    }

    return { success: ("" !== respuesta.data), aforoClientes: respuesta.data };
  }
	catch(error)
  {
    // console.log("Cliente ".concat(JSON.stringify(error)));
    // console.log(`Error al registrar: ${error}`);
    return { success: false, message: error.message };
  }
}



/**
 * Función que permite validar un cliente en BD, según la cédula
 * @param cedula, Cedula a consultar
 */
const consultarCliente = async (cedula, idTienda) => 
{
  try
  {
    let respuesta = await axios.get(`${BACKEND_URL}/${cedula}`);

    // console.log("Respuesta API-RES");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), cliente: respuesta.data };
  }
  catch(error)
  {
    return { success: false, message: error.message };
  }
}


export default 
{
  registrarCliente,
  consultarCliente
};