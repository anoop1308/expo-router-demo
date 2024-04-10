import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, DevSettings, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { checkForUpdateAsync, fetchUpdateAsync, reloadAsync } from 'expo-updates';


type ItemProps = { title: string, id: number };

const generateUUID = (digits: number) => {
  let str = '0123456789';
  let uuid = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
}

type dataProps = { title: string, completed: boolean, userId: number | string }

export default function TabOneScreen() {
  const [todo, setTodo] = useState("");
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const queryClient = useQueryClient();
  const { data: todoList, isLoading, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/todos?skip=140").then(res => res.json()),
    staleTime: Infinity,
  })

  const { mutate } = useMutation({
    mutationFn: (data: dataProps) => addTodo(data),
    onSettled: async (_, error) => {
      if (error) return console.log("error");
      await queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const addTodo = async (data: dataProps) => {
    if (todo.length === 0) return;
    console.log("data", data);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    await fetch("https://jsonplaceholder.typicode.com/todos", requestOptions);
    setTodo("");
  }

  async function onFetchUpdateAsync() {
    try {
      const update = await checkForUpdateAsync();
      const reloadAsyncNew = __DEV__ ? DevSettings.reload : reloadAsync;
      if (update.isAvailable) {
        setIsUpdateAvailable(true);
        await fetchUpdateAsync();
        reloadAsyncNew();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  const Item = ({ title, id }: ItemProps) => (
    <View className='flex-1 bg-white mt-3'>
      <View className='flex flex-row items-center justify-between bg-[#b9e2f5] border-[#50b8e7] w-full border px-2 py-1'>
        <Link href={`./user/${id}`}>
          <Text className='font-bold'>{title}</Text>
        </Link>
        <Icon name='close-circle-outline' color="red" size={26} />
      </View>
    </View>
  )


  if (isLoading) {
    return <Text>...Loading</Text>
  }

  return (
    <View className='px-3 flex-1 bg-white'>
      <Text>Update:- {isUpdateAvailable ? 'Available Hai' : 'Available Nahi Hai'}</Text>
      <TextInput placeholder='abcdef' value={todo} style={styles.input} onChangeText={setTodo} />
      <View className='py-4 h-32 flex flex-col justify-between'>
        <Button
          title="ADD ITEM"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          touchSoundDisabled={true}
          onPress={() => mutate({ title: todo, completed: false, userId: generateUUID(2) }
          )}
        />
        <Button
          title="Refetch ITEMS"
          color="red"
          accessibilityLabel="Learn more about this purple button"
          touchSoundDisabled={true}
          onPress={() => refetch()}
        />
      </View>
      <View className='py-4 h-32 flex flex-col justify-between'>
        <Button title="Fetch update manually" color='green' onPress={onFetchUpdateAsync} />
        <Button title='Resume' onPress={() => queryClient.resumePausedMutations()} />
      </View>
      <FlatList data={todoList} renderItem={(item) => <Item title={item.item.title} id={item.item.id} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingLeft: 5,
    borderRadius: 5
  },
});
