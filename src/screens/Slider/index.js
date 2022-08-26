import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, StyleSheet, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Button as NativeButton } from 'native-base';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  },
  image: {    
    marginBottom: 20,
  },
  text: {
    color: '#606060',
    textAlign: 'center',    
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#22B07E',
    textAlign: 'center',
    marginBottom: 20,
  },
});

const loginStyles = StyleSheet.create({
  view: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  button: {
    backgroundColor: "#22B07E",
    height: 50,
    width: 230,
    marginBottom: 10
  },
  link: {
    color: "#22B07E"
  }
});

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('../../../assets/slide1.png'),    
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('../../../assets/slide2.png'),    
  }
];

export default function SliderScreen({ navigation }) { 
  const [showApp, setShowApp] = useState(false);
  
  function RenderItem({ item }) {    
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>doe.edu</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    )
  }

  async function getFirstAccess() {
    const isFirst = await AsyncStorage.getItem("isFirstAccess");
    setShowApp(isFirst ? true : false); 
  }

  useEffect(() => {
    getFirstAccess();
  }, [])
  
  async function setFirstAccess() {
    await AsyncStorage.setItem("isFirstAccess", "false");
    setShowApp(true)
  }

  if(showApp) {
    return (
      <View style={loginStyles.view}>
        <Image source={require('../../../assets/slide3.png')}/>
        <Text style={styles.title}>doe.edu</Text>
        <NativeButton
          style={loginStyles.button}           
          size="lg"
          borderRadius="50"
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={loginStyles.text}>
            Entrar
          </Text>
        </NativeButton>
        
        <Text>
          {"Não possui conta? "}          
          <Text onPress={() => navigation.navigate('Signup')} style={loginStyles.link}>Cadastre-se aqui</Text>
        </Text>
      </View>
    );
  }

  return (    
    <AppIntroSlider      
      renderItem={RenderItem} 
      data={slides}        
      showNextButton={false}
      renderDoneButton={() => <Button color="#22B07E" onPress={setFirstAccess} title='Concluir'/>}    
      dotStyle={{ backgroundColor: '#C4C4C4' }} 
      activeDotStyle={{ backgroundColor: '#22B07E' }}
    />
  );
}