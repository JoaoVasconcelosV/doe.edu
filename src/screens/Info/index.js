import React, { useState, useEffect } from 'react';
import { Text, StatusBar, View, Image, ActivityIndicator } from 'react-native'

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

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#22B07E" />
      <Header font="#fff" sair={() => logout()} />
      <Container>
        <Text onPress={() => navigation.goBack()}>
          {"<Voltar"}
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
                  <Image source={require('../../../assets/whats.png')} />
                  <Image source={require('../../../assets/gmail.png')} />
                  <Image source={require('../../../assets/phone.png')} />
                </View>
              </View>
            : <ActivityIndicator size="large" color="#22B07E" style={{ flex: 1 }} />
        }
      </Container>
    </Wrapper>
  )
}