// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, runOnJS } from 'react-native-reanimated';

export default function LoadingScreen() {
  const navigation = useNavigation();

  // Valores compartilhados para animação
  const upperImagePosition = useSharedValue(0);
  const lowerImagePosition = useSharedValue(0);
  const upperImageBlur = useSharedValue(0); // Começa sem blur
  const lowerImageBlur = useSharedValue(0);
  const contentScale = useSharedValue(0.1); // Começa menor
  const contentBlur = useSharedValue(200); // Começa com máximo blur
  const textColor = useSharedValue(10); // 0 = preto, 1 = branco

  useEffect(() => {
    // Animação das imagens
    upperImagePosition.value = withTiming(-100, { duration: 1000 }, () => {
      runOnJS(applyBlur)(); // Aplica o blur após a animação de movimentação
    });
    lowerImagePosition.value = withTiming(100, { duration: 1000 });

    // Animação do conteúdo central
    contentScale.value = withDelay(1000, withTiming(1, { duration: 1000 }));
    contentBlur.value = withDelay(1000, withTiming(0, { duration: 1000 }));

    // Animação do texto de preto para branco
    textColor.value = withDelay(1500, withTiming(1, { duration: 1000 }));

    // Redireciona para a nova tela após 5 segundos
    const timer = setTimeout(() => {
      navigation.navigate('Cadastro');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  // Função para aplicar o blur após a animação de movimentação
  const applyBlur = () => {
    upperImageBlur.value = withTiming(15, { duration: 500 });
    lowerImageBlur.value = withTiming(15, { duration: 500 });
  };

  // Estilos animados para as imagens
  const upperImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: upperImagePosition.value }],
    filter: `blur(${upperImageBlur.value}px)`,
  }));

  const lowerImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: lowerImagePosition.value }],
    filter: `blur(${lowerImageBlur.value}px)`,
  }));

  // Estilos animados para o conteúdo central
  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: contentScale.value }],
    opacity: contentScale.value,
    filter: `blur(${contentBlur.value}px)`,
  }));

  // Estilo animado para o texto
  const textStyle = useAnimatedStyle(() => {
    const color = textColor.value === 1 ? 'white' : 'black';
    return {
      color,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/black2.png')}
        style={[styles.upperImage, upperImageStyle]}
      />
      
      <Animated.View style={[styles.contentContainer, contentStyle]}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
        />
        <Animated.Text style={[styles.texto, textStyle]}>
          Tudo Para o Seu Networking
        </Animated.Text>       
        <ActivityIndicator size="large" color="#9F3EFC" style={styles.loader} />
      </Animated.View>

      <Animated.Image
        source={require('../assets/black3.png')}
        style={[styles.lowerImage, lowerImageStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  texto: {
    fontFamily: 'Raleway-Regular',
    fontSize: 32,
    marginTop: 10,
    textAlign: 'center',
    color: 'white'
  },
  upperImage: {
    position: 'absolute',
    top: 0,
    width: '140%',
    height: 280,
  },
  lowerImage: {
    position: 'absolute',
    bottom: 0,
    width: '140%',
    height: 240,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 318,
    height: 80,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});
