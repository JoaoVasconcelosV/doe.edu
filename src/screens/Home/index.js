import React, { useState, useEffect } from 'react';
import { Text, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Button, Input } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { collection, onSnapshot } from "firebase/firestore";
import db from '../../Config/firebase'

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

export default function Home({ navigation }) {
  const [campaigns, setCampaigns] = useState([]);
  const { control, handleSubmit } = useForm();
  const onSubmit = data => login(data);

  useEffect(() => {
    const col = collection(db, 'campaigns')
    onSnapshot(col, (querySnapshot) => {
      const camp = [];
      querySnapshot.forEach((doc) => {
        if(doc)           
          camp.push(doc.data());
      });
      setCampaigns(camp);
    });       
  }, [])

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#22B07E" />
      <Header />
      <Container>
        <Text style={{ color: "#8E8E8E" }}>Buscar campanhas</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <Input
              onBlur={onBlur}
              variant="rounded"
              onChangeText={value => onChange(value)}
              placeholder="Digite sua busca..." w="100%"
            />
          )}
          name="search"
          rules={{ required: true }}
        />
        {campaigns.length 
          ?
            <ScrollView style={{ marginBottom: 20 }}>
              {campaigns.map(((campaign, index) =>
                <Card key={index} image={"https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"} title={campaign.title} description={campaign.description} />
              ))}
            </ScrollView>
          :
            <NoCampaign>
              <Text style={{ color: "#8E8E8E", fontSize: 20 }}>Sem campanhas ativas no momento</Text>
            </NoCampaign>
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