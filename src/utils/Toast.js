import { Alert, VStack, HStack, Text, IconButton, CloseIcon } from "native-base";

export default function toastAlert(title, message, status, toast) {  
  toast.show({
    render: ({id}) => {
      return (
        <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status} variant="solid">
        <VStack space={1} flexShrink={1} w="100%">
          <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" flexShrink={1} color="#fff">
                { title }
              </Text>
            </HStack>
            <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{
            color: "#fff"
          }} onPress={() => toast.close(id)} />
          </HStack>
          <Text px="6" color={"#fff"}>
            {message}
          </Text>
        </VStack>
      </Alert>
      )
    }
  })
}