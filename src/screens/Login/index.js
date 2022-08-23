import React, { useState } from 'react'
import { StyleSheet, Text, Image, Alert, View } from 'react-native';
import { Input, Button } from 'native-base';
import {
  Wrapper,
  Title,
  Subtitle,
  Container
} from './styles.js'
import Error from '../../Components/Error';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from 'react-hook-form';

const styles = StyleSheet.create({
  button: {
    flex: 1, 
  }  
})

export default function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => login(data);

  function login(data) {
    setIsLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then()
      .catch(() => {
        Alert.alert("Login", "Ocorreu um erro")
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
      <View style={{ width: '70%'}}>
        <Controller 
          control={control}
          render={({field: { onChange, onBlur }}) => (
            <Input
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              variant="underlined" 
              isInvalid={errors.email}
              placeholder="Email" 
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        { errors.email && <Error>Campo obrigatório</Error>}
        <Controller 
          control={control}
          render={({field: { onChange, onBlur }}) => (
            <Input
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              variant="underlined"
              type="password"
              isInvalid={errors.password}
              placeholder="Senha"
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        { errors.password && <Error>Campo obrigatório</Error>}
      </View>
      <Container>
        <Button
          variant="outline" 
          style={{ ...styles.button, borderColor: '#000', marginRight: 5 }}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={{ color: '#000' }}>Cadastrar</Text>
        </Button>
        <Button
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          style={{ ...styles.button, backgroundColor: '#000', marginLeft: 5}}
        >
          <Text style={{ color: '#fff' }}>Entrar</Text>
        </Button>
      </Container>
      {/* <Text>Esqueceu a senha?</Text> SE POSSIVEL*/}
    </Wrapper>
  )
}