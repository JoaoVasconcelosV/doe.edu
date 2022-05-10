import AppNavigator from './src/navigation/AppNavigator';
import { NativeBaseProvider } from "native-base"
import { LogBox } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <NativeBaseProvider>
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    </NativeBaseProvider>
  );
}