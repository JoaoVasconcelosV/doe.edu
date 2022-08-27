import React, { useState, useEffect } from 'react';
import { Text, StatusBar, Alert, StyleSheet, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Masks, useMaskedInputProps } from 'react-native-mask-input';
import { Button, Input, TextArea } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import EStyleSheet from "react-native-extended-stylesheet";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../Config/firebase'

import Header from '../../Components/Header';
import Error from '../../Components/Error';
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

export default function Edit({ route, navigation }) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ image, setImage ] = useState(null);
  const [ imageName, setImageName ] = useState(null);
  const [ data, setData ] = useState(null);
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  async function onSubmit(datas) {
    let dataReq;
    setIsLoading(true);    
    if(image !== data.image) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      const fileRef = ref(storage, `campaignsImages/${imageName}`);
      await uploadBytes(fileRef, blob).then()    

      blob.close();    

      const result = await getDownloadURL(fileRef)
      dataReq = {id: uid, image: result, ...datas};
    }

    const uid = getAuth().currentUser.uid;
    if(image === data.image)
      dataReq = {id: uid, ...datas};
    
    createRequisition(dataReq);
  };

  async function createRequisition(data) {  
    const docRef = doc(db, "campaigns", route.params.id);
    await updateDoc(docRef, data)
      .then(() => {
        Alert.alert("Campanha", "Editada com sucesso!");
      })
      .catch(() => {
        Alert.alert("Campanha", "Ocorreu um erro durante o cadastro!");
      })
      .finally(() => {
        setIsLoading(false);        
      });
    navigation.navigate('Campaigns');
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      const imageNames = result.uri.split('/')[result.uri.split('/').length - 1]
      setImageName(imageNames);
    }
  };
  
  useEffect(() => {
    (async function getData() {
      const docRef = doc(db, "campaigns", route.params.id);
      const docSnap = await getDoc(docRef);      

      if (docSnap.exists()) {
        setData(docSnap.data())        
      } else {
        console.log("No such document!");
      }      
    })()
  }, [])

  useEffect(() => {
    if(data) {
      setImage(data.image);
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('phone', data.phone);
    }
  }, [data])

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#22B07E" />
      <Header font="#fff" sair={() => logout()} />
      <Container behavior="height">
        {data 
        ?
          <ScrollView style={{ paddingHorizontal: "10%", marginTop: "5%"}}>
            <Text onPress={() => navigation.goBack()}>
              {"<Voltar"}
            </Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
              <Button onPress={pickImage} style={{ backgroundColor: "#22B07E", marginBottom: 20 }}>
                {!image
                  ?
                  <Text style={{ color: "#fff" }}>
                    Selecione uma imagem
                  </Text>
                  :
                  <Text style={{ color: "#fff" }}>
                    Altere a imagem
                  </Text>
                }
              </Button>
              {image && <Image source={{ uri: image }} style={{ width: 300, height: 200, borderRadius: 10 }} />}
            </View>
            <Text style={{ fontSize: EStyleSheet.value('1.125rem'), marginTop: 20, marginBottom: 20 }}>Vamos
              <Text style={{ fontWeight: "bold" }}>{" cadastrar "}</Text>
              sua campanha
            </Text>
            <Text style={{ fontSize: EStyleSheet.value('1.125rem'), marginTop: 10 }}>Titulo</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <Input
                  onBlur={onBlur}
                  value={watch("title")}
                  onChangeText={value => onChange(value)}
                  isInvalid={errors.title}
                  w="100%"
                />
              )}
              name="title"
              rules={{ required: true }}
            />
            { errors.title && <Error>Campo obrigatório</Error> }
            <Text style={{ fontSize: EStyleSheet.value('1.125rem'), marginTop: 10 }}>Descrição</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <TextArea
                  onBlur={onBlur}
                  value={watch("description")}
                  onChangeText={value => onChange(value)}
                  isInvalid={errors.description}
                  w="100%"
                />
              )}
              name="description"
              rules={{ required: true }}
            />
            { errors.description && <Error>Campo obrigatório</Error> }
            <Text style={{ fontSize: EStyleSheet.value('1.125rem'), marginTop: 10 }}>Telefone para contato</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => {
                
                const maskedInputProps = useMaskedInputProps({
                  value: watch("phone"),
                  onChangeText: value => onChange(value),    
                  mask: Masks.BRL_PHONE,
                });
                
                return (
                  <Input    
                    {...maskedInputProps}
                    onBlur={onBlur}                                
                    isInvalid={errors.phone}
                    w="100%"                
                  />
                )
              }}
              name="phone"
              rules={{ required: true, minLength: 14 }}
            />
            { errors.phone?.type === "required" && <Error>Campo obrigatório</Error> }
            { errors.phone?.type === "minLength" && <Error>Digite o número completo</Error> }
            <Button
              borderRadius="15"
              style={styles.button}
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={{ color: "white", fontSize: EStyleSheet.value('1.375rem') }}>
                Editar
              </Text>
            </Button>
          </ScrollView>
        :
          <ActivityIndicator size="large" color="#22B07E" style={{ flex: 1 }} />
        }
      </Container>
    </Wrapper>
  )
}