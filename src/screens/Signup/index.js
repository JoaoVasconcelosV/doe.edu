import React from 'react'
import { StyleSheet, Text, Image } from 'react-native';
import { Input, Button } from 'native-base';
import {
  Wrapper,
  Title,
  Subtitle,
  Container
} from './styles.js'

const styles = StyleSheet.create({
  button: {
    flex: 1, 
  }  
})

export default function Signup({ navigation }) {
  return(
    <Wrapper>
      <Image 
        source={require('../../../assets/logoIFCE.png')}
      />
      <Title>Doe.edu</Title>
      <Subtitle>Faça seu cadastro para adicionar sua necessidade</Subtitle>
      <Input variant="underlined" placeholder="Nome" w="70%" />
      <Input variant="underlined" placeholder="Celular" w="70%" />
      <Input variant="underlined" placeholder="Email" w="70%" />
      <Input variant="underlined" placeholder="Senha" w="70%" />
      <Container>
        <Button 
          style={{ ...styles.button, backgroundColor: '#000000', marginRight: 5}}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#fff' }}>Entrar</Text>
        </Button>
        <Button 
          variant="outline" 
          style={{ ...styles.button, borderColor: '#000', marginLeft: 5 }}
        >
          <Text style={{ color: '#000' }}>Cadastrar</Text>
        </Button>
      </Container>
    </Wrapper>
  )
}