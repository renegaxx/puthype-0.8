import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, ActivityIndicator, Dimensions, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação

// Obtém as dimensões da tela
const { width: screenWidth } = Dimensions.get('window');

export default function Primeiro() {
  const [fontsLoaded] = useFonts({
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
  });

  const [slideAnimation] = useState(new Animated.Value(0));
  const [imageScale] = useState(new Animated.Value(1));
  const [imageTranslateY] = useState(new Animated.Value(0));
  const [newImagePosition] = useState(new Animated.ValueXY({ x: 400, y: -400 }));
  const [imagePosition] = useState(new Animated.Value(0)); // Animação horizontal da imagem
  const [currentContent, setCurrentContent] = useState(0);

  const navigation = useNavigation(); // Hook de navegação

  useEffect(() => {
    // Torna a StatusBar transparente com ícones brancos
    StatusBar.setBarStyle('light-content'); // Ícones brancos
    StatusBar.setBackgroundColor('transparent'); // Fundo transparente
    StatusBar.setTranslucent(true); // Para garantir que a StatusBar seja sobreposta

    if (currentContent === 2) {
      // Animação da nova imagem quando o terceiro conteúdo é exibido
      Animated.timing(newImagePosition, {
        toValue: { x: -100, y: 100 },
        duration: 4100,
        useNativeDriver: true,
      }).start();

      // Animação de vai e vem da imagem black1.png
      Animated.loop(
        Animated.sequence([
          Animated.timing(imagePosition, {
            toValue: -screenWidth, // Move a imagem completamente para fora da tela à esquerda
            duration: 22000, // Duração da animação
            useNativeDriver: true,
          }),
          Animated.timing(imagePosition, {
            toValue: 0, // Move a imagem de volta para a posição inicial
            duration: 22000, // Duração da animação
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Pare a animação quando não estiver no terceiro conteúdo
      imagePosition.stopAnimation();
      imagePosition.setValue(0);
    }
  }, [currentContent]);

  const handlePress = () => {
    if (currentContent === 2) {
      // Navega para a tela de carregamento quando estiver no terceiro conteúdo
      navigation.navigate('LoadingScreen');
    } else {
      let animations = [
        Animated.timing(slideAnimation, {
          toValue: -300,
          duration: 500,
          useNativeDriver: true,
        })
      ];

      if (currentContent === 0) {
        animations.push(
          Animated.timing(imageScale, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(imageTranslateY, {
            toValue: 50,
            duration: 500,
            useNativeDriver: true,
          })
        );
      }

      Animated.parallel(animations).start(() => {
        setCurrentContent((prevContent) => prevContent + 1);

        slideAnimation.setValue(300);
        if (currentContent === 0) {
          imageScale.setValue(1.2);
          imageTranslateY.setValue(50);
        }

        Animated.parallel([
          Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          ...(currentContent === 0 ? [
            Animated.timing(imageScale, {
              toValue: 1.2,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateY, {
              toValue: 50,
              duration: 500,
              useNativeDriver: true,
            })
          ] : [])
        ]).start();
      });
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const renderContent = () => {
    if (currentContent === 0) {
      return (
        <>
          <Text style={styles.customFont}>Bem-Vindo</Text>
          <Text style={styles.customFont2}>
            Organize seus eventos de forma prática e tenha todas as informações na palma da sua mão.
          </Text>
        </>
      );
    } else if (currentContent === 1) {
      return (
        <>
          <Text style={styles.customFont}>Gerencie eventos!</Text>
          <Text style={styles.customFont2}>
            Nunca mais esqueça de um evento! O Networking está contigo.
          </Text>
        </>
      );
    } else if (currentContent === 2) {
      return (
        <>
          <Text style={styles.customFont}>Seja Proativo!</Text>
          <Text style={styles.customFont2}>
            Explore nossos recursos e maximize sua produtividade.
          </Text>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imgContainer, { transform: [{ scale: imageScale }] }]}>
        <BlurView style={styles.img} intensity={50} tint="dark" />
        <Animated.Image
          source={require('../assets/black1.png')}
          style={[
            styles.imgBehindButton,
            {
              transform: [{ translateX: imagePosition }],
              width: screenWidth * 2, // Define a largura da imagem como o dobro da largura da tela
              height: '120%', // Mantém a altura proporcional
              position: 'absolute', // Garante que a imagem não afete o layout
              top: 0, // Alinha a imagem ao topo do contêiner
              left: 0, // Garante que a imagem comece da borda esquerda
            }
          ]}
        />
      </Animated.View>

      <Animated.Image
        source={require('../assets/black2.png')}
        style={[
          styles.newImage,
          {
            transform: [
              { translateX: newImagePosition.x },
              { translateY: newImagePosition.y }
            ]
          }
        ]}
      />

      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.issoai,
            { transform: [{ translateX: slideAnimation }] },
          ]}
        >
          {renderContent()}
        </Animated.View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.textbaixo}>{currentContent === 2 ? 'Começar' : 'Avançar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  issoai: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
  },
  customFont: {
    fontFamily: 'Raleway-Bold',
    fontSize: 34,
    color: '#9F3EFC',
  },
  customFont2: {
    color: 'white',
    fontFamily: 'Raleway-Regular',
    fontSize: 19,
  },
  imgContainer: {
    width: '100%',
    height: 180, // Aumentei um pouco o height para mostrar mais da imagem
    position: 'absolute',
    bottom: 0,
  },
  imgBehindButton: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  newImage: {
    width: 600,
    height: 700,
    position: 'absolute',
    top: -400,
    right: -300,
    zIndex: 0,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    backgroundColor: '#9F3EFC',
    borderRadius: 30,
    width: 200,
    height: 60,
    justifyContent: 'center',
    zIndex: 2,
  },
  textbaixo: {
    fontFamily: 'Raleway-Bold',
    color: 'white',
    fontSize: 23,
  },
});
