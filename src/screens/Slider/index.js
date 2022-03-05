import React, { useState } from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: '#606060',
    textAlign: 'center',    
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3DAC33',
    textAlign: 'center',
  },
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
        <Image source={item.image} />
        <Text style={styles.title}>doe.edu</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    )
  }  

  if(showApp) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Real app</Text>
      </View>
    );
  }

  return (    
    <AppIntroSlider      
      renderItem={RenderItem} 
      data={slides}        
      showNextButton={false}
      renderDoneButton={() => <Button color="#3DAC33" onPress={() => setShowApp(true)} title='Concluir'/>}    
      dotStyle={{ backgroundColor: '#C4C4C4' }} 
      activeDotStyle={{ backgroundColor: '#3DAC33' }}
    />
  );
}