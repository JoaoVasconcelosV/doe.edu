import { Text } from 'react-native'

export default function Error({ children }) {
  return (
    <Text style={{ color: 'red', marginBottom: 10 }}>
      {children}
    </Text>
  )
}