// import * as React from 'react';
// import { Text, View, StyleSheet, SafeAreaView,Dimensions } from 'react-native';
// import Constants from 'expo-constants';

// import ProgressCircle from 'react-native-progress-circle';
// import RNSpeedometer from 'react-native-speedometer';

// var { height, width } = Dimensions.get("window");

// export default function App() 
// {
//   var colorAforo = "red";
//   var aforoClientes = 80;

//   var segmentacion = 
//   [
//     {
//       name: 'Bajo',
//       labelColor: 'black',
//       activeBarColor: 'lime',
//     },
//     {
//       name: 'Medio',
//       labelColor: 'black',
//       activeBarColor: 'yellow',
//     }
//     ,
//     {
//       name: 'Alto',
//       labelColor: 'black',
//       activeBarColor: 'red',
//     }
//   ];

//   return (
//     <View>
//       <ProgressCircle
//             percent={aforoClientes}
//             radius={80}
//             borderWidth={20}
//             color={colorAforo}
//             shadowColor="#999"
//             bgColor="#fff"
//         >
//             <Text style={{ fontSize: 18 }}>{aforoClientes}%</Text>
//         </ProgressCircle>

//         <SafeAreaView style={{ marginTop: 60, height: (height/1.5)}}>
//           <RNSpeedometer value={aforoClientes} size={width-20} labels={segmentacion} maxValue={1600}/>
//         </SafeAreaView>

//     </View>
//   );
// }


