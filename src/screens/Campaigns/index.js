import React, { useState, useEffect } from 'react';
import { Text, StatusBar, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Input } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useForm, Controller } from 'react-hook-form';
import { getAuth } from "firebase/auth";
import EStyleSheet from "react-native-extended-stylesheet";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../Config/firebase'

import { AntDesign } from '@expo/vector-icons'; 
import Header from '../../Components/Header'
import Card from '../../Components/Card'
import {
  Wrapper,
  Container,
  NoCampaign
} from './styles'

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: "#22B07E",
  }
})

export default function Campaigns({ navigation }) {
  const [campaigns, setCampaigns] = useState(null);
  const [docs, setDocs] = useState([]);  
  const onSubmit = data => login(data);
  const uid = getAuth().currentUser.uid;

  useEffect(() => {
    const col = query(collection(db, 'campaigns'), where("id", "==", uid))
    onSnapshot(col, (querySnapshot) => {
      const camp = [];
      querySnapshot.forEach((doc) => {
        if(doc)                
          camp.push({ docId: doc.id, ...doc.data() });
      });
      setCampaigns(camp);
    });       
  }, [])

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#22B07E" />
      <Header font="#000" />
      <Container>                
        <Text style={{ marginVertical: 10, fontSize: EStyleSheet.value('1.125rem') }} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={EStyleSheet.value('1.125rem')} color="black" />
          Voltar
        </Text>
        <Text style={{ color: "#8E8E8E" }}>Minhas campanhas</Text>        
        {campaigns
          ?
            campaigns.length 
            ?
              <ScrollView style={{ marginBottom: 20 }}>
                {campaigns.map(((campaign, index) =>
                  <Card onPress={() => navigation.navigate('Edit', { id: campaign.docId })} key={index} image={campaign.image} title={campaign.title} description={campaign.description} />
                ))}
              </ScrollView>
            : 
              <NoCampaign>
                <Text style={{ color: "#8E8E8E", fontSize: EStyleSheet.value('1.25rem') }}>Sem campanhas ativas no momento</Text>
              </NoCampaign>
          : <ActivityIndicator size="large" color="#22B07E" style={{ flex: 1 }} />
        }
      </Container>
      <Button
        borderRadius="15"
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={{ color: "white" }}>
          <AntDesign name="plus" size={24} color="white" />
        </Text>
      </Button>
    </Wrapper>
  );
}