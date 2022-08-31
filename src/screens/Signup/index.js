import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, Alert, View } from 'react-native';
import { Input, Button } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import {
  Wrapper,
  Title,
  Subtitle,
  Container
} from './styles.js'
import Error from '../../Components/Error';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const styles = StyleSheet.create({
  button: {
    flex: 1, 
  }  
})

export default function Signup({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => signUp(data);

  function signUp(data) {
    setIsLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        Alert.alert("Conta", "Cadastrado com sucesso!");
      })
      .catch(() => {
        Alert.alert("Conta", "Ocorreu um erro ao fazer seu cadastro!")
      })
      .finally(() => setIsLoading(false));
  }

  return(
    <Wrapper>
      <Image 
        source={require('../../../assets/logoIFCE.png')}
      />
      <Title>Doe.edu</Title>
      <Subtitle>Faça seu cadastro para adicionar sua necessidade</Subtitle>
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
            onChangeText={value => onChange(value)}
            variant="underlined"
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
          style={{ ...styles.button, borderColor: '#000', marginRight: 5}}
          onPress={() => navigation.navigate('Login')}
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