import React from 'react';
import { getAuth } from "firebase/auth";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Text } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import {
  Wrapper,
  Title
} from './styles'

export default function Header(props) {
  async function logout() {
    await getAuth().signOut();
  }

  return(
    <Wrapper>
      <Title style={{ color: props.font }}>Doe.edu</Title>
      <Menu>
        <MenuTrigger text={<EvilIcons name="gear" size={40} color={props.font} />} />
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text='Campanhas' />          
          <MenuOption onSelect={logout} text='Sair' />
        </MenuOptions>
      </Menu>
    </Wrapper>    
  )
}