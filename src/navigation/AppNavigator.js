import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth } from "firebase/auth";

//START FIREBASE
import { db } from '../Config/firebase'

//AuthRoutes
import LoginScreen from '../screens/Login'
import SliderScreen from '../screens/Slider'
import SignupScreen from '../screens/Signup'

//protectedRoutes
import HomeScreen from '../screens/Home'
import RegisterScreen from '../screens/Register'

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const subscriber = getAuth().onAuthStateChanged(setUser);
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false
        }}
      >
        { user 
        ?
          <>
            <Stack.Screen name="Home" component={HomeScreen} />          
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        : 
          <>
            <Stack.Screen name="Home" component={SliderScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />        
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}