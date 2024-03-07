import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';


type ItemProps = { title: string, id: number };

const generateUUID = (digits: number) => {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
  let uuid = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
}


export default function TabOneScreen() {
  const [todo, setTodo] = useState("");
  const { data: todoList, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json()),
  })

  const { mutate } = useMutation({
    mutationFn: () => addTodo()
  })

  const addTodo = () => {
    if (todo.length === 0) return;
    todoList.push({ title: todo, id: generateUUID(10) })
    setTodo("");
    return todoList.reverse()
  }

  const deleteTodo = (id: any) => {
    const newTodoList = [...todoList]
    newTodoList.filter((todo: any) => todo.id !== id);
    return newTodoList
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
      <TextInput placeholder='abcdef' value={todo} style={styles.input} onChangeText={setTodo} />
      <Button
        title="ADD ITEM"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        touchSoundDisabled={true}
        onPress={() => mutate()}
      />
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

{/* <Link href='./user/1'>User - 1</Link>
      <Link href={{
        pathname: "/user/[id]",
        params: { id: '2' }
      }}>User - 2</Link> */}