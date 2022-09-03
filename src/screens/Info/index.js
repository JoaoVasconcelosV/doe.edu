import React, { useState, useEffect } from 'react';
import { Text, StatusBar, View, Image, ActivityIndicator, Linking, TouchableOpacity  } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import EStyleSheet from "react-native-extended-stylesheet";

import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Config/firebase'

import Header from '../../Components/Header';
import { 
  Wrapper,
  Container,
  Title,
  Description,
  ShareTitle
} from './styles'

export default function Info({ route, navigation }) {
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async function getData() {
      const docRef = doc(db, "campaigns", route.params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {        
        console.log("No such document!");
      }
    })()
  }, [])

  function linkWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=55${data.phone}&text=Gostaria de ajudar sua campanha no Doe.edu`
    );
  }

  function linkEmail() {
    Linking.openURL('mailto:joaoyama2018@gmail.com')
  }

  function linkPhone() {
    Linking.openURL(`tel:${data.phone}`)
  }  

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#22B07E" />
      <Header font="#fff" sair={() => logout()} />
      <Container>
        <Text onPress={() => navigation.goBack()} style={{ fontSize: EStyleSheet.value('1.125rem') }}>
          <Ionicons name="chevron-back" size={EStyleSheet.value('1.125rem')} color="black" />
          Voltar
        </Text>
        {
          data
            ?
              <View style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                <Image source={{ uri: data?.image }} style={{ width: 300, height: 200, borderRadius: 10 }} />
                <Title>{data?.title}</Title>
                <Description>{data?.description}</Description>
                <ShareTitle>Entre em contato e ajude</ShareTitle>                
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginTop: 5 }}>
                  {data.phone && (
                  <TouchableOpacity onPress={linkWhatsApp}>
                    <Image source={require('../../../assets/whats.png')} />
                  </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={linkEmail}>
                    <Image source={require('../../../assets/gmail.png')} />
                  </TouchableOpacity>
                  {data.phone && (
                  <TouchableOpacity onPress={linkPhone}>
                    <Image source={require('../../../assets/phone.png')} />
                  </TouchableOpacity> 
                  )}                 
                </View>
              </View>
            : <ActivityIndicator size="large" color="#22B07E" style={{ flex: 1 }} />
        }
      </Container>
    </Wrapper>
  )
}