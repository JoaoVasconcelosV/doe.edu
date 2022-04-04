import React from 'react';
import { Text } from 'react-native'
import { Box, AspectRatio, Image, Stack, Heading } from 'native-base'

export default function Card(props) {
  return (
    <Box alignItems="center" style={{ marginTop: 15 }}>
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
              uri: props.image
            }} alt="image" />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1" style={{ color: "#367658" }}>
              {props.title}
            </Heading>            
          </Stack>
          <Text fontWeight="400">
            {props.description}
          </Text>
        </Stack>
      </Box>
    </Box>
  )
}