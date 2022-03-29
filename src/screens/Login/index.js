import React, { useState } from 'react'
import { StyleSheet, Text, Image } from 'react-native';
import { Input, Button } from 'native-base';
import {
  Wrapper,
  Title,
  Subtitle,
  Container
} from './styles.js'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from 'react-hook-form';

const styles = StyleSheet.create({
  button: {
    flex: 1, 
  }  
})

export default function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  const onSubmit = data => login(data);

  function login(data) {
    setIsLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        Alert.alert("Conta", "Cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  return(
    <Wrapper>
      <Image 
        source={require('../../../assets/logoIFCE.png')}
      />
      <Title>Doe.edu</Title>
      <Subtitle>Faça sua doação para ajudar a educação</Subtitle>
      <Controller 
        control={control}
        render={({field: { onChange, onBlur }}) => (
          <Input
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            variant="underlined" 
            placeholder="Email" w="70%" 
          />
        )}
        name="email"
        rules={{ required: true }}
      />
      <Controller 
        control={control}
        render={({field: { onChange, onBlur }}) => (
          <Input
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            variant="underlined"
            type="password"
            placeholder="Senha" w="70%" 
          />
        )}
        name="password"
        rules={{ required: true }}
      />      
      <Container>
        <Button
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          style={{ ...styles.button, backgroundColor: '#000', marginRight: 5}}
        >
          <Text style={{ color: '#fff' }}>Entrar</Text>
        </Button>
        <Button 
          variant="outline" 
          style={{ ...styles.button, borderColor: '#000', marginLeft: 5 }}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={{ color: '#000' }}>Cadastrar</Text>
        </Button>
      </Container>
      {/* <Text>Esqueceu a senha?</Text> SE POSSIVEL*/}
    </Wrapper>
  )
}