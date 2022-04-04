import React, { useState } from 'react';
import { Text, StatusBar, Alert, StyleSheet } from 'react-native';
import { Button, Input, TextArea } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import db from '../../Config/firebase'

import Header from '../../Components/Header';
import { 
  Wrapper,
  Container
} from './styles'

const styles = StyleSheet.create({
  button: {    
    backgroundColor: "#22B07E",
    marginTop: 20
  }
})

export default function Register({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  async function onSubmit(datas) {
    const uid = getAuth().currentUser.uid;
    const data = {id: uid, ...datas};
    setIsLoading(true);
    await addDoc(collection(db, "campaigns"), data)
      .then(() => {
        Alert.alert("Campanha", "Cadastrada com sucesso!");
      })
      .catch(() => {
        Alert.alert("Campanha", "Ocorreu um erro durante o cadastro!");
      })
      .finally(() => {
        setIsLoading(false);        
      });
    navigation.navigate('Register');
  };

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#22B07E" />
      <Header font="#fff" sair={() => logout()} />
      <Container>
        <Text onPress={() =>navigation.goBack()}>
          {"<Voltar"}
        </Text>
        <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 20 }}>Vamos 
          <Text style={{ fontWeight: "bold" }}>{" cadastrar "}</Text> 
          sua campanha
        </Text>
        <Text style={{ fontSize: 18 }}>Titulo</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <Input
              onBlur={onBlur}              
              onChangeText={value => onChange(value)}
              w="100%"
            />
          )}
          name="title"
          rules={{ required: true }}
        />
        <Text style={{ fontSize: 18 }}>Descrição</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextArea
              onBlur={onBlur}              
              onChangeText={value => onChange(value)}
              w="100%"
            />
          )}
          name="description"
        />
        <Button
          borderRadius="15"
          style={styles.button}
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white", fontSize: 22 }}>
            Cadastrar
          </Text>
        </Button>
      </Container>
    </Wrapper>
  )
}