import * as React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Registro from './src/containers/clientes/RegistroCliente';
import Aforo from './src/containers/clientes/Aforo';
import { Container, Content } from 'native-base';

export default function App() 
{
  return (
    <Container>
     <Content enableOnAndroid={true} extraScrollHeight={130} >
        <Aforo />
     </Content>
    </Container>
  );
}

