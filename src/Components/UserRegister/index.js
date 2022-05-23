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
import { getAuth, updateProfile  } from "firebase/auth";

const styles = StyleSheet.create({
  button: {
    flex: 1, 
  }  
})

export default function UserRegister({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => signUp(data);

  function signUp(data) {
    setIsLoading(true);
    const auth = getAuth();    
    updateProfile (auth.currentUser, {
      displayName: data.name, 
      phoneNumber: data.phone
    })
      .then(() => {
        Alert.alert("Finalizado", "Cadastrado com sucesso!");
        navigation.navigation("Home")
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
      <Subtitle>Cadastre seus dados</Subtitle>
      <View style={{ width: '70%'}}>
      <Controller
        control={control}
        render={({field: { onChange, onBlur }}) => (
          <Input
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            variant="underlined" 
            placeholder="Nome"
          />
        )}
        name="name"
        rules={{ required: true }}
      />
      { errors.name && <Error>Campo obrigatório</Error>}
      <Controller
        control={control}
        render={({field: { onChange, onBlur }}) => (            
          <Input 
            onChangeText={value => onChange(value)}
            variant="underlined" 
            placeholder="Celular"
            mask="(xx) x xxxx-xxxx"
          />
        )}
        name="phone"
        rules={{ required: true }}
      />
      { errors.phone && <Error>Campo obrigatório</Error>}
      </View>
      <Container>
        <Button
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          style={{ ...styles.button, backgroundColor: '#000000', marginLeft: 5 }}
        >
          <Text style={{ color: '#fff' }}>
            Finalizar cadastro
          </Text>
        </Button>
      </Container>
    </Wrapper>
  )
}