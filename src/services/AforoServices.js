import axios from "axios";


const BACKEND_URL = "https://unicentro-api-rest.herokuapp.com/api/aforo";
// const BACKEND_URL = "http://192.168.1.8:7788/api/aforo";




/**
 * Función que permite registrar el ingreso de cliente en BD
 */
const registrarIngresoSalida = async (registro) => 
{
  try
  {
    let respuesta = null;

    respuesta = await axios.post(`${BACKEND_URL}/${registro}`);

    return { success: ("" !== respuesta.data), aforoClientes: respuesta.data };
  }
	catch(error)
  {
    // console.log("Cliente ".concat(JSON.stringify(error)));
    console.log(`Error al registrar: ${error}`);
    return { success: false, message: error.message };
  }
}






export default 
{
  registrarIngresoSalida
};