import * as React from "react"; 
import { Image, StyleSheet, Text, View, Alert } from "react-native"; 
import { Button, Item, Input, Form, Left, Right, Label, Radio } from "native-base";

import clienteServices from "../../services/ClienteServices";

//TODO:
//Solo acoplar la gui de login, el registro, lo hara diana personalmente
//Crear contexto para obtener de la pantalla login el idTienda.


//Componente Clase
class RegistroCliente extends React.Component  
{
  resetState = 
  {
    idCliente: "",
    idBarrio: 1,
    cedula: "",
    nombre: "",
    telefono: "",
    sexo: "F",
    tipoCliente: "covid",
    barrio: "",
    idTienda: 1,
    temperatura: "",
    mensaje: null,
    colorMensaje: "#ffffff",
    isEditarCedula: false,
    isConsultar: true
  }

  constructor() 
  {
    super();

    this.state = this.resetState;
  }
  

 
  render() 
  {
    return (
 
        <Form style={styles.form}>

          <View style={styles.derecha}>
            <Image source={require('../../../assets/Logo_Unicentro.png')} style={styles.logo} />
          </View>

          <Label style={{marginTop: 5, marginBottom: 5, fontSize: 17, fontWeight: "bold", color: "tomato"}}>Aforo Clientes: {this.state.aforoClientes}</Label>

          <Item stackedLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItem}>Cédula</Label>
            <Input disabled={this.state.isEditarCedula} value={this.state.cedula} onChangeText={cedula => this.setState({cedula})} onFocus={() => this.setState({mensaje: null})} keyboardType="phone-pad"/>
          </Item>
          <Item stackedLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItem}>Número de teléfono</Label>
            <Input value={this.state.telefono} onChangeText={telefono => this.setState({telefono})} keyboardType="phone-pad"/>
          </Item>
          <Item stackedLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItem}>Nombres y Apellidos</Label>
            <Input value={this.state.nombre} onChangeText={nombre => this.setState({nombre})}/>
          </Item>
          <Item stackedLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItem}>Barrio</Label>
            <Input value={this.state.barrio} onChangeText={barrio => this.setState({barrio})}/>
          </Item>
          <Item stackedLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItem}>Temperatura</Label>
            <Input value={this.state.temperatura} onChangeText={this.validarTemperatura} keyboardType="phone-pad"/>
          </Item>

          <Item regular style={styles.itemRegistro}>
            <Left>
              <Label style={styles.labelItem}>Sexo</Label>
            </Left>
            <Right style={styles.labelItem}>
              <Label style={styles.labelItem}>Hombre</Label>
              <Radio selected={this.state.sexo === "M" ? true : false} onPress={() => this.setState({sexo: "M"})}/>
            </Right>
            <Right style={styles.labelItem}>
              <Label style={styles.labelItem}>Mujer</Label>
              <Radio selected={this.state.sexo === "F" ? true : false} onPress={() => this.setState({sexo: "F"})} />
            </Right>
          </Item>

          <Label style={{marginTop: 5, marginBottom: 5, fontSize: 17, fontWeight: "bold", color: this.state.colorMensaje}}>{this.state.mensaje}</Label>

          <View style={{marginTop: 40, flexDirection: "row"}}>
            <Left>
              <Button warning full onPress={() => this.limpiarFormulario()} >
                <Text>Limpiar</Text>
              </Button>
            </Left>
            <View style={{marginHorizontal: 10}} />
            <Right>
              <Button success full onPress={() => this.consultarCliente()}>
                <Text>{this.state.isConsultar ? "Consultar" : "Registrar"}</Text>
              </Button>
            </Right>
          </View>

        </Form>
    );
  }

  
  validarTemperatura = (valor) => 
  {
      let temperatura = isNaN(valor) ? "" : valor;
      this.setState({temperatura});
  };

  /**
   * Metodo que permite valdiar si existe el usuario segun el numero de cedula
   */
  async consultarCliente()
  {
    if(this.state.isConsultar)
    {
      const resultado = await clienteServices.consultarCliente(this.state.cedula, this.state.idTienda);

      // console.log("Consulta Cliente");
      // console.log(JSON.stringify(resultado.cliente.idTienda));

      if (resultado.success) 
      {
        this.setState(
        {
          idCliente: resultado.cliente.idCliente,
          idBarrio: resultado.cliente.idBarrio,
          cedula: resultado.cliente.cedula,
          nombre: resultado.cliente.nombre,
          telefono: resultado.cliente.telefono,
          sexo: resultado.cliente.sexo,
          tipoCliente: resultado.cliente.tipoCliente,
          barrio: resultado.cliente.barrio,
          temperatura: "",
          mensaje: null,
          isEditarCedula: true,
          isConsultar: false
        });
      }
      else 
      {
        this.setState({mensaje: "Usuario no registrado", colorMensaje: "red", isEditarCedula: true, isConsultar: false});
      }
    }
    else
    {
      this.registrarCliente();
    }
  }


  /**
   * Método que permite registrar un cliente a traves de api-rest
   */
  async registrarCliente()
  {
    if("" !== this.state.cedula && "" !== this.state.telefono && "" !== this.state.nombre && "" !== this.state.temperatura && "" !== this.state.barrio)
    {
      // console.log("Cliente");
      // console.log(JSON.stringify(this.state.idTienda));

      let cliente =
      {
        idCliente: this.state.idCliente,
        idBarrio: this.state.idBarrio,
        cedula: this.state.cedula,
        nombre: this.state.nombre,
        telefono: this.state.telefono,
        sexo: this.state.sexo,
        tipoCliente: this.state.tipoCliente,
        barrio: this.state.barrio,
        lstVisitas:
        [{
            idTienda: this.state.idTienda,
            temperatura: this.state.temperatura
        }]
      }


      let resultado = await clienteServices.registrarCliente(cliente);
      
      if (resultado.success) 
      {
        this.setState(this.resetState);
        this.setState({mensaje: "Usuario registrado exitosamente!!!", colorMensaje: "green", aforoClientes: resultado.aforoClientes});
      }
      else 
      {
        this.setState({mensaje: "En el momento no es posible registrar el Usuario.", colorMensaje: "orange"});
      }
    }
    else
    {
      Alert.alert("Información", "Todos los campos son obligatorios.");
    }
  }

  limpiarFormulario()
  {
    this.setState(this.resetState);
  }
}

export default RegistroCliente;




const styles = StyleSheet.create({
  form:
  {
    padding: 20
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
    color: "gray"
  },
  logo:
  {
    width: 120,
    height: 80,
    // resizeMode: "contain",
    // borderColor: "blue",
    // borderWidth: 2
  },
  derecha:
  {
    alignItems: "flex-end"
  }
});



