import { View, Text } from 'react-native';
import { Button } from 'native-base';
import { getAuth } from "firebase/auth";

export default function Home({ navigation }) {
  function logout() {
    getAuth().signOut();
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{"Te amo meu mozin <3"}</Text>
      <Button        
        size="lg"
        borderRadius="50"
        onPress={() => logout()}
      >
        <Text>
          Sair
        </Text>
      </Button>
    </View>
  );
}