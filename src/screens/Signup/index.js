import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image } from 'react-native';
import { Input, Button } from 'native-base';
import { useForm } from 'react-hook-form';
import {
  Wrapper,
  Title,
  Subtitle,
  Container
} from './styles.js'
import { collection, getDocs } from 'firebase/firestore/lite';
import db from '../../Config/firebase';

const styles = StyleSheet.create({
  button: {
    flex: 1, 
  }  
})

export default function Signup({ navigation }) {
  const [data, setData] = useState([]);
  const { register, setValue, handleSubmit } = useForm();
  const onSubmit = data => console.warn(data);

  useEffect(() => {
    (async function teste() {
      const citiesCol = collection(db, 'test');
      const citySnapshot = await getDocs(citiesCol);
      const cityList = citySnapshot.docs.map(doc => doc.data());
      setData(cityList);
    }())        
  }, [])

  console.warn(data);

  useEffect(() => {
    register("name");
    register("phone");
    register("email");
    register("password");
  }, [register])

  return(
    <Wrapper>
      <Image 
        source={require('../../../assets/logoIFCE.png')}
      />
      <Title>Doe.edu</Title>
      <Subtitle>Faça seu cadastro para adicionar sua necessidade</Subtitle>
      <Input         
        onChangeText={text => setValue('name', text)}
        variant="underlined" 
        placeholder="Nome" 
        w="70%" 
      />
      <Input 
        onChangeText={text => setValue('phone', text)}
        variant="underlined" 
        placeholder="Celular" 
        w="70%" 
      />
      <Input 
        onChangeText={text => setValue('email', text)}
        variant="underlined" 
        placeholder="Email" 
        w="70%" 
      />
      <Input 
        onChangeText={text => setValue('password', text)}
        variant="underlined" 
        placeholder="Senha" 
        w="70%" 
      />
      <Container>
        <Button 
          style={{ ...styles.button, backgroundColor: '#000000', marginRight: 5}}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#fff' }}>Entrar</Text>
        </Button>
        <Button 
          variant="outline"
          onPress={handleSubmit(onSubmit)}
          style={{ ...styles.button, borderColor: '#000', marginLeft: 5 }}
        >
          <Text style={{ color: '#000' }}>
            Cadastrar
          </Text>
        </Button>
      </Container>
    </Wrapper>
  )
}