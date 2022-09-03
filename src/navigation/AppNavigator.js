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
import ForgotScreen from '../screens/Forgot'

//protectedRoutes
import HomeScreen from '../screens/Home'
import RegisterScreen from '../screens/Register'
import InfoScreen from '../screens/Info'
import CampaignsScreen from '../screens/Campaigns'
import EditScreen from '../screens/Edit'

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
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="Campaigns" component={CampaignsScreen} />
            <Stack.Screen name="Edit" component={EditScreen} />
          </>
        : 
          <>
            <Stack.Screen name="Home" component={SliderScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} /> 
            <Stack.Screen name="Forgot" component={ForgotScreen} />        
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}