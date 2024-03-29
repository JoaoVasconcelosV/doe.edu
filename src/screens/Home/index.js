import React, { useState, useEffect } from "react";
import {
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Button, Input, useToast } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import toastAlert from "../../utils/Toast";
import EStyleSheet from "react-native-extended-stylesheet";
import { db } from "../../Config/firebase";

import { AntDesign } from "@expo/vector-icons";
import Header from "../../Components/Header";
import Card from "../../Components/Card";
import { Wrapper, Container, NoCampaign } from "./styles";

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#22B07E",
  },
});

export default function Home({ navigation }) {
  const [allCampaigns, setAllCampaigns] = useState(null);
  const [campaigns, setCampaigns] = useState(null);
  const [canRegister, setCanRegister] = useState(false);

  const { control, watch } = useForm();

  const toast = useToast();
  const uid = getAuth().currentUser.uid;

  useEffect(() => {
    const col = collection(db, "campaigns");
    onSnapshot(col, (querySnapshot) => {
      const camp = [];
      querySnapshot.forEach((doc) => {
        if (doc) camp.push({ docId: doc.id, ...doc.data() });
      });
      setCampaigns(camp);
      setAllCampaigns(camp);
    });
  }, []);

  useEffect(() => {
    const col = query(collection(db, "campaigns"), where("id", "==", uid));
    onSnapshot(col, (querySnapshot) => {
      const camp = [];
      querySnapshot.forEach((doc) => {
        if (doc) camp.push({ docId: doc.id, ...doc.data() });
      });
      camp.length > 1 ? setCanRegister(false) : setCanRegister(true);
    });
  }, []);

  useEffect(() => {
    if (watch("search") === "" || watch("search") === undefined)
      setCampaigns(allCampaigns);
    else {
      const search = watch("search");
      let filterCampaigns = [];
      allCampaigns.map((campaign) => {
        if (campaign.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
          filterCampaigns.push(campaign);
      });
      setCampaigns(filterCampaigns);
    }
  }, [watch("search")]);

  const renderItem = ({ item }) => (
    <Card
      onPress={() => navigation.navigate("Info", { id: item.docId })}
      image={item.image}
      title={item.title}
      description={item.description}
    />
  );

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#22B07E" />
      <Header font="#000" />
      <Container>
        <Text style={{ color: "#8E8E8E", marginBottom: 10 }}>
          Buscar campanhas
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <Input
              onBlur={onBlur}
              variant="rounded"
              onChangeText={(value) => onChange(value)}
              placeholder="Digite sua busca..."
              w="100%"
            />
          )}
          name="search"
        />
        {campaigns ? (
          campaigns.length ? (
            <FlatList
              data={campaigns}
              renderItem={renderItem}
              keyExtractor={(item) => item.docId}
              style={{ marginBottom: 20 }}
            />
          ) : (
            <NoCampaign>
              <Text
                style={{
                  color: "#8E8E8E",
                  fontSize: EStyleSheet.value("1.25rem"),
                }}>
                Sem campanhas ativas no momento
              </Text>
            </NoCampaign>
          )
        ) : (
          <ActivityIndicator size="large" color="#22B07E" style={{ flex: 1 }} />
        )}
      </Container>
      <Button
        borderRadius="15"
        style={styles.button}
        onPress={() => {
          if (canRegister) return navigation.navigate("Register");
          toastAlert(
            "Campanhas",
            "Você alcançou o limite de campanhas cadastras, finalize uma campanha para iniciar outra!",
            "error",
            toast
          );
        }}>
        <Text style={{ color: "white" }}>
          <AntDesign name="plus" size={24} color="white" />
        </Text>
      </Button>
    </Wrapper>
  );
}
