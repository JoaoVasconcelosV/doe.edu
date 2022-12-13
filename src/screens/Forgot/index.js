import React, { useState } from "react";
import { Text, Image, View } from "react-native";
import { Input, Button, useToast } from "native-base";
import toastAlert from "../../utils/Toast";
import { Wrapper, Title, Subtitle } from "./styles.js";
import Error from "../../Components/Error";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import { ForgotMessages } from "../../utils/MessageErros";

export default function Forgot({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const onSubmit = (data) => login(data);

  function login(data) {
    setIsLoading(true);
    const auth = getAuth();

    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toastAlert(
          "Email de recuperação",
          "Enviado com sucesso... Cheque seu spam!",
          "success",
          toast
        );
      })
      .catch((error) => {
        toastAlert(
          "Email de recuperação",
          ForgotMessages(error),
          "error",
          toast
        );
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Wrapper>
      <Image source={require("../../../assets/logoDoe.png")} />
      <Title>Doe.edu</Title>
      <Subtitle>Altere sua senha</Subtitle>
      <View style={{ width: "70%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              variant="underlined"
              isInvalid={errors.email}
              placeholder="Email"
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        {errors.email && <Error>Campo obrigatório</Error>}
      </View>
      <Button
        isLoading={isLoading}
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#000",
          width: "70%",
          marginBottom: 10,
          marginTop: 20,
        }}>
        <Text style={{ color: "#fff" }}>Enviar email</Text>
      </Button>
      <Button
        variant="outline"
        style={{ borderColor: "#000", width: "70%" }}
        onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#000" }}>Entrar</Text>
      </Button>
    </Wrapper>
  );
}
