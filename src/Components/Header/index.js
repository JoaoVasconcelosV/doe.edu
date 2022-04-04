import React from 'react';
import { getAuth } from "firebase/auth";

import { Text } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { Menu, Pressable } from 'native-base';
import {
  Wrapper,
  Title
} from './styles'

export default function Header(props) {
  function logout() {
    getAuth().signOut();
  }

  return(
    <Wrapper>
      <Title style={{ color: props.font }}>Doe.edu</Title>      
      {/* <Menu w="190" onOpen={() => console.log("opened")} trigger={triggerProps => {        
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <EvilIcons name="gear" size={40} color="black" />
          </Pressable>
        )
      }}>
        <Menu.Item>Arial</Menu.Item>
        <Menu.Item>Nunito Sans</Menu.Item>
        <Menu.Item>Roboto</Menu.Item>
        <Menu.Item>Poppins</Menu.Item>
        <Menu.Item>SF Pro</Menu.Item>
        <Menu.Item>Helvetica</Menu.Item>
        <Menu.Item isDisabled>Sofia</Menu.Item>
        <Menu.Item>Cookie</Menu.Item>
      </Menu> */}
      <Text style={{ color: props.font }} onPress={logout}>Sair</Text>
    </Wrapper>    
  )
}