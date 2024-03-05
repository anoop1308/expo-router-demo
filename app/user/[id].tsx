import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function UserId() {
  const { id } = useLocalSearchParams();

  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <Text className='font-extrabold text-xl'>USER ID :-  {id}</Text>
    </View>
  )
}