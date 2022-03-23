import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, Alert } from 'react-native';
import { Input, Button } from 'native-base';
import { useForm } from 'react-hook-form';
import {
  Wrapper,
  Title,
  Subtitle,
  Container
} from './styles.js'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const styles = StyleSheet.create({
  button: {
    flex: 1, 
  }  
})

export default function Signup({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, setValue, handleSubmit } = useForm();
  const onSubmit = data => signUp(data);

  function signUp(data) {
    setIsLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        Alert.alert("Conta", "Cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {    
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
          variant="outline"
          style={{ ...styles.button, borderColor: '#000', marginRight: 5}}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#000' }}>Entrar</Text>
        </Button>
        <Button
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          style={{ ...styles.button, backgroundColor: '#000000', marginLeft: 5 }}
        >
          <Text style={{ color: '#fff' }}>
            Cadastrar
          </Text>
        </Button>
      </Container>
    </Wrapper>
  )
}