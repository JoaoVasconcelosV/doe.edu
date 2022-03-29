import React from 'react';
import { Text, StatusBar, StyleSheet } from 'react-native';
import { Button, Input } from 'native-base';
import { getAuth } from "firebase/auth";
import { useForm, Controller } from 'react-hook-form';

import Header from '../../Components/Header'
import Card from '../../Components/Card'
import {
  Wrapper,
  Container
} from './styles'

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: "#3DAC33",
  }
})

const campaigns = [
  {
    id: 0,
    title: 'The Garden City',
    description: "Bengaluru (also called Bangalore) is the center of India's high-techindustry. The city is also known for its parks and nightlife."
  },
  {
    id: 1,
    title: 'The Garden City2',
    description: "2Bengaluru (also called Bangalore) is the center of India's high-techindustry. The city is also known for its parks and nightlife."
  }
]

export default function Home({ navigation }) {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => login(data);

  function logout() {
    getAuth().signOut();
  }

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#3DAC33" />
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
        {campaigns.map((campaign =>
          <Card key={campaign.id} title={campaign.title} description={campaign.description} />
        ))}
        {/* <Button
          size="lg"
          borderRadius="50"
          onPress={() => logout()}
        >
          <Text>
            Sair
          </Text>
        </Button> */}
      </Container>
      <Button
        borderRadius="15"
        style={styles.button}
        onPress={() => logout()}
      >
        <Text style={{ color: "white" }}>
          +
        </Text>
      </Button>
    </Wrapper>
  );
}