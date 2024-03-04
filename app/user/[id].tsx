import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function UserId() {
  const { id } = useLocalSearchParams();

  return <Text>USER ID :-  {id}</Text>;
}