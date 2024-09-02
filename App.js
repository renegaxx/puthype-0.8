




// App.js
import React from 'react';
import Navigation from './Navigation'; // Certifique-se de que o caminho está correto

export default function App() {
  return <Navigation />;
}





// import React from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, Image } from 'react-native';
// import { useFonts } from 'expo-font';

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
//     'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
//   });

//   if (!fontsLoaded) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#ffffff" />
//       </View>
//     );
//   }

//   return (
    
//       <View style={styles.container}>
//         <View style={styles.tudo}>
//           <View style={styles.issoai}>
//             <Text style={styles.customFont}>Bem-Vindo</Text>
//             <Text style={styles.customFont2}>
//               Organize seus eventos de forma prática e tenha todas as informações na palma da sua mão.
//             </Text>    
{/* <Button
        title="Ir para Outra Tela"
        onPress={() => navigation.navigate('Another')}
      />         */}
//           </View>
//         </View>
//         <Image source={require('./assets/black_4.png')} style={styles.img} />
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#000',

//   },
//   tudo: {
//     marginTop: 'auto',
//     marginBottom: 80,
//     padding: 20

//   },
//   customFont: {
//     fontFamily: 'Raleway-Bold',
//     fontSize: 34,
//     color: '#9F3EFC',
//   },
//   customFont2: {
//     color: 'white',
//     fontFamily: 'Raleway-Regular',
//     fontSize: 19,
//   },
//   img :{
//     width: 410,
//     height: 160

//   },

// },
// );