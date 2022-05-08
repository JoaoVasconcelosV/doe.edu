import AppNavigator from './src/navigation/AppNavigator';
import { NativeBaseProvider } from "native-base"
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
}