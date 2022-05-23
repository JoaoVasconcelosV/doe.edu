import React, { useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';

export default function Header(props) {  
  const navigation = useNavigation();  

  async function logout() {
    await getAuth().signOut();
  }

  return(
    <Wrapper>
      <Title onPress={() => navigation.navigate('Home')} style={{ color: props.font }}>Doe.edu</Title>
      <Menu>
        <MenuTrigger text={<EvilIcons name="gear" size={40} color={props.font} />} />
        <MenuOptions>
          <MenuOption onSelect={() => navigation.navigate('Campaigns')} text='Minhas Campanhas' />          
          <MenuOption onSelect={logout} text='Sair' />
        </MenuOptions>
      </Menu>
    </Wrapper>    
  )
}