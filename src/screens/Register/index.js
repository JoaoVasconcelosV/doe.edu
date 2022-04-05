import React, { useState } from 'react';
import { Text, StatusBar, Alert, StyleSheet, View, Image } from 'react-native';
import { Button, Input, TextArea } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
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
  const [image, setImage] = useState(null);
  const { control, handleSubmit } = useForm();
  async function onSubmit(datas) {
    const uid = getAuth().currentUser.uid;
    const data = {id: uid, ...datas};
    setIsLoading(true);
    await addDoc(collection(db, "campaigns"), {image: image, ...data})
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#22B07E" />
      <Header font="#fff" sair={() => logout()} />
      <Container>      
        <Text onPress={() =>navigation.goBack()}>
          {"<Voltar"}
        </Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={pickImage} style={{ backgroundColor: "#22B07E" }}>
            <Text style={{ color: "#fff" }}>
              Selecione uma imagem
            </Text>
          </Button>
          {image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
        </View>
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