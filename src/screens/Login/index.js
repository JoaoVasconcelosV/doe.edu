import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import { Input, Button } from "native-base";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10
  },
  span: {
    fontSize: 16,
    marginBottom: 30
  },
  container: {
    width: 250,
    marginTop: 30,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: 120,    
  }  
})

export default function Login({ navigation }) {
  return(
    <View style={styles.wrapper}>
      <Image 
        source={require('../../../assets/logoIFCE.png')}
      />
      <Text style={styles.title}>Doe.edu</Text>
      <Text style={styles.span}>Faça sua doação para ajudar a educação</Text>
      <Input variant="underlined" placeholder="Email" w="70%" />
      <Input variant="underlined" placeholder="Senha" w="70%" />
      <View style={styles.container}>
        <Button style={{ ...styles.button, backgroundColor: '#000'}}>
          <Text style={{ color: '#fff' }}>Entrar</Text>
        </Button>
        <Button variant="outline" style={{ ...styles.button, borderColor: '#000' }}>
          <Text style={{ color: '#000' }}>Cadastrar</Text>
        </Button>
      </View>
      <Text>Esqueceu a senha?</Text>
    </View>
  )
}