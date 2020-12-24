import React, { useState } from "react";
import { Image, StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Alert } from "react-native";
import { Form, Right, Left, Icon } from "native-base";
import RNSpeedometer from "react-native-speedometer";

import aforoServices from "../../services/AforoServices";



var { height, width } = Dimensions.get("window");


//Componente Clase
function Aforo() 
{
  const [aforoClientes, setAforoClientes] = useState(0);

  var segmentacion = 
  [
    {
      name: 'Aforo Bajo',
      labelColor: 'black',
      activeBarColor: '#8DDD00',  //'#39BFC2'  //#A3EE3F
    },
    {
      name: 'Aforo Medio',
      labelColor: 'black',
      activeBarColor: '#FEC34D',  //#F18032
    }
    ,
    {
      name: 'Aforo Alto',
      labelColor: 'red',
      activeBarColor: '#FC3D31', //#F05642
    }
  ];

  
  
  /**
   * Método que permite registrar el ingreso del cliente
   */
  const ingresoCliente = async () => 
  {
    const resultado = await aforoServices.registrarIngresoSalida("ingreso");

    if (resultado.success) 
    {
      setAforoClientes(resultado.aforoClientes);
    }
    else
    {
      if("Network Error" === resultado.message)
      {
        Alert.alert("Advertencia", "No hay conexión a internet.");
      }
    }
  };



  /**
   * Método que permite registrar la salida del cliente
   */
  const salidaCliente = async () => 
  {
    const resultado = await aforoServices.registrarIngresoSalida("salida");

    // console.log("Consulta Aforo");
    // console.log(JSON.stringify(resultado.aforoClientes));

    if (resultado.success && resultado.aforoClientes >= 0) 
    {
      setAforoClientes(resultado.aforoClientes);
    }
    else
    {
      if("Network Error" === resultado.message)
      {
        Alert.alert("Advertencia", "No hay conexión a internet.");
      }
    }
  };



  return (
    <Form style={styles.form}>
      <View style={styles.derecha}>
        <Image
          source={require("../../../assets/Logo_Unicentro.png")}
          style={styles.logo}
        />
      </View>

      <View style={{flexDirection: "column", alignItems: "center"}}>
        <SafeAreaView style={{ marginTop: 60, height: (height/2.7)}}>
          <RNSpeedometer value={aforoClientes} size={width-50} labels={segmentacion} minValue={0} maxValue={2300}/>
        </SafeAreaView>

        <Text style={{ fontSize: 65 }}>{Math.round((100 * aforoClientes) / 2300)}%</Text>

      </View>

      <View style={{ flexDirection: "row", marginTop: 80 }}>
        <Left>
          <TouchableOpacity onPress={salidaCliente}>
            <Icon type="FontAwesome" name="minus-circle" style={{fontSize: 100, color: "red"}}/>
          </TouchableOpacity>
        </Left>
        <View style={{ marginHorizontal: 10 }} />
        <Right>
          <TouchableOpacity onPress={ingresoCliente}>
            <Icon type="FontAwesome" name="plus-circle" style={{fontSize: 100, color: "lime"}}/>
          </TouchableOpacity>
        </Right>
      </View>
      
    </Form>
  );
}

export default Aforo;





const styles = StyleSheet.create(
{
  form: 
  {
    padding: 20,
    // flex:1,
  },
  itemRegistro: 
  {
    marginLeft: 0,
    height: 60,
    marginTop: 12
  },
  labelItem: 
  {
    alignItems: "center",
    color: "gray",
  },
  logo: 
  {
    width: 120,
    height: 80,
  },
  derecha: 
  {
    alignItems: "flex-end"
  },
});
